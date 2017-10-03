<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use App\User;
use App\UserDetail;
use App\Locked_Data;
use App\Log;
use App\Organisation;
use App\Role;
use App\Permission;
use App\Data_Changes;
use Ajency\User\Ajency\userauth\UserAuth;

use Symfony\Component\Console\Output\ConsoleOutput;


class LockedDataController extends Controller
{
    //
    public function periodData(Request $request,$locale = "default") {
        $output = new ConsoleOutput();
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api check if the calling user has the right permissions
                $callingUser = User::where('id',$request->header('from'))->first();
                // if($callingUser->can('edit-personal')) {
                    // check if the user_id exists in the users table
                    if(User::where('id',$request->user_id)->count() != 0)
                        $user = UserDetail::where('user_id',$request->user_id)->first();
                    else
                        return response()->json(['status' => 400, 'message' => __('api_messages.user_dne')]);
                        // get the organisation details
                        $orgDetails = Organisation::where('id',$user->org_id)->first();
                        // check if the start and end dates are given
                        if($request->has('filters.date_range.start') && $request->has('filters.date_range.end')) {
                            // if both start and end are given
                            $startDate = new \DateTime($request->input('filters.date_range.start'));
                            $endDate = new \DateTime($request->input('filters.date_range.end'));
                        }
                        else if($request->has('filters.date_range.start')) {
                            // if only start is given
                            if(!empty($request->input('filters.period_unit')))
                                $periodUnit = $request->input('filters.period_unit');
                            else
                                $periodUnit = $orgDetails->period_unit;
                            //startDate and endDate will be the first and the last day of the org_period
                            $date = explode('-',$request->input('filters.date_range.start'));
                            if($periodUnit == 'week') {
                                $sdWeekNo = new \DateTime($request->input('filters.date_range.start'));
                                $sdWeekNo = $sdWeekNo->format('W');
                                $startDate = new \DateTime();
                                $startDate = $startDate->setISODate($date[0],$sdWeekNo)->setTime(0,0);
                                $endDate = clone $startDate;
                                $endDate->modify('+6 days');
                            }
                            else if ($periodUnit == 'month'){
                                $startDate = new \DateTime($date[0].'-'.$date[1].'-01');
                                $endDate = new \DateTime($date[0]."-".$date[1]."-".cal_days_in_month(CAL_GREGORIAN,$date[1],$date[0]));
                            }
                            else
                                //just in case the organisation's period_unit is not set
                                return response()->json(['status' => 400, 'message' => __('api_messages.org_period_unit')]);
                        }

                        //get all the user details from the locked_data table
                        // return response()->json(['count' => count($lockedData)]);
                        $data = [];
                        $data['user_id'] = $request->user_id;

                        //get latest data (current data)
                        $currentData = Locked_Data::where(['user_id' => $request->user_id, 'work_date' => date('Y-m-d')])->get();
                        $cDayData = (new Locked_Data)->formattedLockedData($request->user_id,$currentData,date('Y-m-d'),date('Y-m-d'));
                        $data['current'] = $cDayData;

                        // if sorting options are set
                        if(isset($request->sort_by))
                            $sortCol = $request->sort_by;
                        else
                            $sortCol = 'work_date';
                        if(isset($request->sort_order))
                            $sortOrder = $request->sort_order;
                        else
                            $sortOrder = 'desc';
                        // user's data for the particular period
                        $lockedData = Locked_Data::where('user_id',$request->user_id)->whereBetween('work_date',[$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])->orderBy($sortCol, $sortOrder)->get();
                        $periodData = (new Locked_Data)->formattedLockedData($request->user_id,$lockedData,$startDate->format('Y-m-d'),$endDate->format('Y-m-d'),$sortOrder);
                        $data['periodData'] = $periodData;
                        return response()->json(['status' => 200, 'message' => __('api_messages.user_periodic_data'), 'data' => $data]);
                // }
                // else {
                //     return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
                // }
            }
            else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }

    /**
     * edit a users lockedData (start time, end time)
     * @param  Request $request request data
     * @param  string  $locale  preferred language
     * @return object   response same as periodData
     */
    public function editPeriodData(Request $request, $locale = "default") {
        $output = new ConsoleOutput();
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('from'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->user_id) && !empty($request->input('changes')) && !empty($request->input('work_date')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                if(User::where('id',$request->user_id)->count() != 0)
                    $user = UserDetail::where('user_id',$request->user_id)->first();
                else
                    return response()->json(['status' => 400, 'message' => __('api_messages.user_dne')]);
                // see which all chnages are to be made
                try {
                    // get the data for that day
                    $lockedEntry = Locked_Data::where(['user_id' => $request->user_id, 'work_date' => $request->work_date])->first();
                    foreach($request->input('changes') as $ckey => $cvalue) {
                        // first check to see if the value really needs to be changed
                        // if the field is start time or end time get it in the right format
                        if($ckey == 'start_time' || $ckey == 'end_time') {
                            $cvalue = new \DateTime($request->work_date.' '.$cvalue);
                            $cvalue = $cvalue->format('Y-m-d h:i:s');
                        }
                        if($lockedEntry->$ckey != $cvalue) {
                            // make an entry in the data_changes table
                            $dataChanges = new Data_Changes;
                            $dataChanges->user_id = $request->user_id;
                            $dataChanges->modified_by = $request->header('from');
                            $dataChanges->modified_on = date('Y-m-d');
                            $dataChanges->table_modified = 'locked__datas';
                            $dataChanges->column_modified = $ckey;
                            $dataChanges->old_value = $lockedEntry->$ckey;
                            $dataChanges->new_value = $cvalue;
                            $dataChanges->save();
                            // reflect this change in the locked__datas table
                            $lockedEntry->$ckey = $cvalue;
                            $lockedEntry->save();
                        }
                    }
                    // $data = $lockedEntry;
                    // $data['violation_count'] = 0;
                    //
                    // $output->writeln(json_encode($lockedEntry));
                    return response()->json(['status' => 200, 'message' => 'Changes made successfully.', 'data' => (new Locked_Data)->formattedLockedData($request->user_id,array($lockedEntry),$request->work_date,$request->work_date)]);
                }
                catch(Exception $e) {
                    return response()->json(['status' => 400, 'message' => $e->getMessage()]);
                }
            }
            else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            $output->writeln("sdddddddddddddddddddddddd");
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing'), 'data' => ['user_id' => $request->user_id, 'changes' => json_encode($request->input('changes')), 'x-api-key' => $request->header('X-API-KEY'), 'from' => $request->header('from')]]);
        }
    }
}
