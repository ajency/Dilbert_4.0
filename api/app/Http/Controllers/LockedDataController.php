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
use App\OrganisationMeta;
use App\UserCommunication;
use App\Slots;
use DateTime;
use Ajency\User\Ajency\userauth\UserAuth;

use Symfony\Component\Console\Output\ConsoleOutput;

use Illuminate\Support\Facades\Log as LogForErrors;

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
                    $u = User::where('id',$request->user_id);
                    if($u->count() != 0)
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
                            $startDateYear = ($sdWeekNo == 1 && $date[1] == 12) ? ($date[0] + 1) : $date[0];
                            $startDate = new \DateTime();
                            $startDate = $startDate->setISODate($startDateYear,$sdWeekNo)->setTime(0,0);
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

                    // check if end date is ahead of time
                    if($endDate > new \DateTime())
                        $endDate = new \DateTime();
                    // $output->writeln("enddate: ".$endDate->format('Y-m-d'));
                    //get all the user details from the locked_data table
                    // return response()->json(['count' => count($lockedData)]);
                    $data = [];
                    $name = $u->first()->name;
                    if($request->header('from') == $request->user_id)
                        $self = true;
                    else
                        $self = false;
                    $data['user'] = ['user_id' => $request->user_id, 'name' => $name, 'self' => $self, 'joining_date' => $user->joining_date];

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
                    $periodData = (new Locked_Data)->formattedLockedData($request->user_id,$lockedData,$startDate->format('Y-m-d'),$endDate->format('Y-m-d'),$sortOrder,true);
                    $data['periodData'] = $periodData['data'];

                    // adding dummy period_meta attribute for now
                    $data["period_meta"] = [
                        "period_unit" => $request->input('filters.period_unit'),
                        "worked_total" => $periodData['total_period_hours'],
                        "worked_expected" => $periodData['expected_period_hours'],
                        "lunch_total" => (new Slots)->getTotalSlotTime($request->user_id,'lunch',$startDate->format('Y-m-d'),$endDate->format('Y-m-d'))
                    ];

                    return response()->json(['status' => 200, 'message' => __('api_messages.user_periodic_data'), 'data' => $data]);
                // }
                // else {
                //     return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
                // }
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
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
    public function editPeriodData(Request $request, $userCode, $locale = "default") {
        $output = new ConsoleOutput();
        //adding a variable for mailing data
        $dataToMail=array();

        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('from'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->input('changes')) && !empty($request->input('work_date')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                if(User::where('id',$userCode)->count() != 0)
                    $user = UserDetail::where('user_id',$userCode)->first();
                else
                    return response()->json(['status' => 400, 'message' => __('api_messages.user_dne')]);
                // check if it's a member (not hr / admin) who wants to make a change a second time
                $userRole = (User::find($request->header('from')))->getRoleNames()->first();
                // make status empty if user has 'member' role because normal user doesnt have the previleges to make changes to the status
                if($userRole == 'member')
                {
                    $request->status = '';
                    // echo "sad :(";
                }
                $maxCount = (int)OrganisationMeta::where(['organisation_id' => UserDetail::where('user_id',$userCode)->first()->org_id, 'key' => 'changes_max_count_'.$userRole])->first()->value;
                if($maxCount != -1 && Data_Changes::where(['user_id' => $userCode, 'modified_by' => $request->header('from'), 'work_date' => $request->work_date])->count() >= $maxCount)
                    return response()->json(['status' => 400, "message" => __('api_messages.allowed_changes_error')]);
                // see which all chnages are to be made
                try {
                    // get the data for that day
                    $lockedEntry = Locked_Data::where(['user_id' => $userCode, 'work_date' => $request->work_date])->get();
                    // when no data exists
                    if(count($lockedEntry) == 0)
                        return response()->json(['status' => 400, 'message' => __('api_messages.period_data_dne')]);
                    // when more than one entries are there (extremely rare scenario)
                    if(count($lockedEntry) == 1)
                        $lockedEntry = $lockedEntry->first();
                    else
                        return response()->json(['status' => 400, 'message' => __api('api_messages.more_than_one_period_data_entry')]);
                    // if person has to be marked as leave
                    // if($request->mark_as_leave != NULL and $request->mark_as_leave) {
                    if($request->status == 'Leave' || $request->status == 'Holiday') {
                        $current_status=$request->status;
                        // make an entry in the data changes table
                        foreach(['start_time' => null, 'end_time' => null, 'total_time' => null, 'status' => $request->status] as $ckey => $cvalue){
                            $dataChanges = new Data_Changes;
                            $dataChanges->user_id = $userCode;
                            $dataChanges->modified_by = $request->header('from');
                            $dataChanges->modified_on = date('Y-m-d');
                            $dataChanges->table_modified = 'locked__datas';
                            $dataChanges->column_modified = $ckey;
                            $dataChanges->work_date = $request->work_date;
                            $dataChanges->old_value = $lockedEntry->$ckey;
                            $dataChanges->new_value = $cvalue;
                            $dataChanges->save();
                            array_push($dataToMail, $dataChanges);
                            
                        }
                        $lockedEntry->start_time = NULL;
                        $lockedEntry->end_time = NULL;
                        $lockedEntry->total_time = "00:00";
                        $lockedEntry->status = $current_status;
                        $lockedEntry->save();
                        array_push($dataToMail, $lockedEntry);
                        $this->edit_log_email($dataToMail);
                        return response()->json(['status' => 200, 'message' => __('api_messages.marked_as_leave'), 'data' => (new Locked_Data)->formattedLockedData($userCode,array($lockedEntry),$request->work_date,$request->work_date)]);
                    }
                    // for the other changes
                    $roleMeta = (new OrganisationMeta)->getAllRoleMeta(UserDetail::where('user_id',$userCode)->first()->org_id,$userRole);
                    // $output->writeln(json_encode($roleMeta));
                    $st=0;
                    $et=0;                    
                    foreach($request->input('changes') as $ckey => $cvalue) {
                        // do the time check
                        $now = new DateTime();
                        $createdAt = new DateTime($lockedEntry->created_at);
                        // [ NOTE undefined index needs to be handled ]
                        $threshold = (int)$roleMeta['changes_allowed_time_'.$ckey.'_'.$userRole];
                        if($threshold != -1 && ((date_diff($now,$createdAt)->d * 24) + date_diff($now,$createdAt)->h) > $threshold)
                            return response()->json(['status' => 400, 'message' => __('api_messages.time_up')]);
                        // first check to see if the value really needs to be changed
                        // if the field is start time or end time get it in the right format
                        if($ckey == 'start_time' || $ckey == 'end_time') {
                            $cvalue = new \DateTime($request->work_date.' '.$cvalue);
                            $cvalue = $cvalue->format('Y-m-d H:i:s');
                        }
                        if($lockedEntry->$ckey != $cvalue) {
                            // make an entry in the data_changes table
                            $dataChanges = new Data_Changes;
                            $dataChanges->user_id = $userCode;
                            $dataChanges->modified_by = $request->header('from');
                            $dataChanges->modified_on = date('Y-m-d');
                            $dataChanges->table_modified = 'locked__datas';
                            $dataChanges->column_modified = $ckey;
                            $dataChanges->work_date = $request->work_date;
                            $dataChanges->old_value = $lockedEntry->$ckey;
                            $dataChanges->new_value = $cvalue;
                            $dataChanges->save();
                            array_push($dataToMail, $dataChanges);
                            // reflect this change in the locked__datas table
                            $lockedEntry->$ckey = $cvalue;
                                
                        }
                        if ($ckey=="start_time") {
                            $st=new DateTime($lockedEntry->start_time);
                        }
                        else if ($ckey=="end_time") {
                            $et = new DateTime($lockedEntry->end_time);                                    
                        }
                    }
                    if($lockedEntry->end_time != null) {
                                    $dataChanges = new Data_Changes;
                                    $dataChanges->user_id = $userCode;
                                    $dataChanges->modified_by = $request->header('from');
                                    $dataChanges->modified_on = date('Y-m-d');
                                    $dataChanges->table_modified = 'locked__datas';
                                    $dataChanges->column_modified = 'total_time';
                                    $dataChanges->work_date = $request->work_date;
                                    $dataChanges->old_value = $lockedEntry->total_time;
                                    $dataChanges->new_value = date_diff($st,$et)->format("%H:%I");
                                    $dataChanges->save();
                                    $lockedEntry->total_time = date_diff($st,$et)->format("%H:%I");
                                }                            
                            $lockedEntry->save();
                            array_push($dataToMail, $dataChanges);
                    // $data = $lockedEntry;
                    // $data['violation_count'] = 0;
                    //
                    // $output->writeln(json_encode($lockedEntry));
                    // if status not passed
                    if($request->status == null || $request->status == '') {
                        // then you calculate the status
                        $uDets = (new UserAuth)->getUserData($userCode,true);
                        // update the status
                        $lockedEntry->status = (new CronController)->getUserStatus('present',$uDets['user_details'][0]['org_id'],$uDets['user']['violation_grp_id'],$request->work_date);
                        // get the total time
                        $totalTimeEntry = explode(':',$lockedEntry->total_time);
                        if((int)$totalTimeEntry[0] <= (int)(new OrganisationMeta)->getParamValue('minimum_hrs_in_day',$uDets['user_details'][0]['org_id'],$uDets['user']['violation_grp_id']) && $request->work_date != date('Y-m-d'))
                            $lockedEntry->status = 'Leave due to violation';

                        $lockedEntry->save();
                        $status=$lockedEntry->status;
                    }
                    else {
                        $lockedEntry->status = $request->status;
                        $lockedEntry->save();
                        $status=$lockedEntry->status;
                    }
                    //formatting edit log to send a mail
                    array_push($dataToMail, $lockedEntry);
                    $this->edit_log_email($dataToMail,$status);

                    return response()->json(['status' => 200, 'message' => __('api_messages.changes_made_success'), 'data' => (new Locked_Data)->formattedLockedData($userCode,array($lockedEntry),$request->work_date,$request->work_date)]);
                }
                catch(Exception $e) {
                    return response()->json(['status' => 400, 'message' => $e->getMessage()]);
                }
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing'), 'data' => ['user_id' => $userCode, 'changes' => json_encode($request->input('changes')), 'x-api-key' => $request->header('X-API-KEY'), 'from' => $request->header('from')]]);
        }
    }

    public function allUsersSummary(Request $request, $orgId, $locale = "default") {
        $output = new ConsoleOutput();
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('from'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // get the organisation details
                $orgDetails = Organisation::where('id',$orgId)->first();
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
                        $startDateYear = ($sdWeekNo == 1 && $date[1] == 12) ? ($date[0] + 1) : $date[0];
                        $startDate = new \DateTime();
                        $startDate = $startDate->setISODate($startDateYear,$sdWeekNo)->setTime(0,0);
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

                // check if end date is ahead of time
                if($endDate > new \DateTime())
                    $endDate = new \DateTime();

                // get all the users in the organisation
                $orgUsers = User::join('user_details','user_details.user_id','=','users.id')->orderBy('name','asc')->where('user_details.org_id',$orgId)->get();
                $data = [];
                foreach($orgUsers as $oUser) {
                    // check if user is active
                    if($oUser->status != 'active')
                        continue;
                    // user details
                    $userObj['user'] = [
                        'user_id' => $oUser->user_id,
                        'name' => $oUser->name,
                        'avatar' => $oUser->avatar,
                        'joining_date' => $oUser->joining_date
                    ];

                    // summary
                    // user's data for the particular period
                    // $output->writeln($startDate->format('Y-m-d')." ".$endDate->format('Y-m-d'));
                    $summaryData = Locked_Data::where('user_id',$oUser->user_id)->whereBetween('work_date',[$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])->orderBy('work_date', 'asc')->get();
                    $periodData = (new Locked_Data)->formattedLockedData($oUser->user_id,$summaryData,$startDate->format('Y-m-d'),$endDate->format('Y-m-d'),'asc',true);
                    $userObj['summary'] = $periodData['data'];

                    // period meta
                    $userObj['period_meta']['worked_total'] = $periodData['total_period_hours'];
                    $userObj['period_meta']['lunch_total'] = (new Slots)->getTotalSlotTime($oUser->user_id, 'lunch', $startDate->format('Y-m-d'),$endDate->format('Y-m-d'));

                    array_push($data,$userObj);
                }
                return response()->json(['status' => 200, 'message' => __('api_messages.summary_returned'), 'data' => $data]);
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }

    function edit_log_email($dataToMails,$status=null)
    {
        try {
        $data=array();
        $data['values']=array();
        $cc_mail=array();
        $cc_mail_list=array();
        $flag=0;
        foreach ($dataToMails as $dataToMail) {
            if ($dataToMail['column_modified']!=NULL) {
            // getting name for subject of the person whose data is modified
            $data['user_id']=$dataToMail['user_id'];
            $user = User::where(['id' => $data['user_id']])->first();
            $name=$user['name'];
            $name = explode(' ',$user['name']);
            $data['name']= $name[0];
            $data['org_id']=$user['org_id'];

            //getting data for mailing
            $modifier = User::where(['id' => $dataToMail['modified_by']])->first();
            $name = explode(' ',$modifier['name']);
            $data['modified_by']= $name[0];
            $data['modified_on']= $dataToMail['modified_on'];
            $data['work_date']= $dataToMail['work_date'];
            $dataEdit['column_modified']= $dataToMail['column_modified'];
            $dataEdit['old_value']= $dataToMail['old_value'];
            $dataEdit['new_value']= $dataToMail['new_value'];
            $data['status']=$status;
            array_push($data['values'], $dataEdit);
 
            // getting subject
            $subject=' Dilbert 4 - '.$data['name'].'\'s Log edited';
            //getting email id of user
            $comm=UserCommunication::where('object_id','=', $data['user_id'])->where('object_type','App\\User')->first();

            // getting CC and BCC list for mails
            //$recipients=config('log_edit_email');

            $flag=1;
            }
        }
        if ($flag==1) {
             //getting authorized users
            $users=User::all();
            foreach ($users as $user) {
                if ($user->hasPermissionTo('edit_log_mails')) {
                    $cc_list=UserCommunication::where('object_id','=', $user['id'])->where('object_type','App\\User')->first();  
                    array_push($cc_mail, $cc_list);
                }
            }
            $cc_mail=array_unique($cc_mail);
            foreach ($cc_mail as $cc_m) {
                    array_push($cc_mail_list,$cc_m['value']);
            }
            $data['redirect_url']='dilbert_mails/email_log_edit';
            $data['logo']= public_path().'/img/ajency-logo.png';
            $data['editLog']=public_path().'/img/edit_logs.png';
            $bcc_mail=array();
            $dataOfUser=end($dataToMails);
            $data['startTime']=$dataOfUser['start_time'];
            $data['endTime']=$dataOfUser['end_time'];
            $data['totalTime']=$dataOfUser['total_time'];
            $data['status']=$dataOfUser['status'];
            //print_r($data);
            send_mails($data,$subject,$comm['value'],$cc_mail_list,$bcc_mail);
        }
        } catch (\Exception $e) {
            LogForErrors::error('Error Type: Edit log mails, error:'.$e->getMessage()." other data : user-".$user['id']." ".$user['name']);
            return response()->json(['status' => 400, 'message' => $e->getMessage()]);          
        }
    }
}
