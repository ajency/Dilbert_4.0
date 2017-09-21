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
        if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api
                // check if the user_id exists in the users table
                if(User::where('id',$request->user_id)->count() != 0)
                    $user = UserDetail::where('user_id',$request->user_id)->first();
                else
                    return response()->json(['status' => 400, 'message' => __('api_messages.user_dne')]);
                // if($user->can('edit-personal')) {        // role check removed for now
                    // user has permissions to view this data
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
                    $output->writeln(count($currentData));
                    $cDayData = (new Locked_Data)->formattedLockedData($request->user_id,$currentData);
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
                    $periodData = (new Locked_Data)->formattedLockedData($request->user_id,$lockedData);
                    $data['periodData'] = $periodData;
                    return response()->json(['status' => 200, 'message' => __('api_messages.user_periodic_data'), 'data' => $data]);
                // }
                // else {
                //     return response()->json(['status' => 400, 'message' => __('api_messages.permissions')]);
                // }
            }
            else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authorisation')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }
}
