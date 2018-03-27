<?php

namespace App\Http\Controllers;

use DateTime;
use App\ViolationApp;
use App\Locked_Data;
use App\Log;
use App\User;
use App\UserDetail;
use App\Organisation;
use App\SpecialDays;
use App\Slots;
use App\UserCommunication;
use App\OrganisationMeta;
use Illuminate\Support\Facades\Mail;

use Ajency\User\Ajency\userauth\UserAuth;
use Ajency\Violations\Ajency\ViolationRules;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

class CronController extends Controller
{
    /**
     * run every day at 10:30 pm IST
     * @return [type] [description]
     */
    public function daily() {
        $logger = new ConsoleOutput;
        // get all the users
        $users = User::select('id','violation_grp_id')->where('status','active')->get();
        echo "got users\n";
        foreach($users as $user) {
            $logger->writeln("user: ".$user->id);
            $org = UserDetail::select('org_id')->where('user_id',$user->id)->first();
            echo $user->id."\n";
            // get the Locked Data
            $userLockedData = Locked_Data::where(['user_id' => $user->id, 'work_date' => date('Y-m-d')]);
            if(!$userLockedData->exists()) {
                echo "absent\n";
                // enter an empty locked entry
                $lockedEntry = new Locked_Data;
                $lockedEntry->user_id = $user->id;
                $lockedEntry->work_date = date('Y-m-d');
                $lockedEntry->start_time = null;
                $lockedEntry->end_time = null;
                $lockedEntry->total_time = "00:00";
                $lockedEntry->status = $this->getUserStatus('absent',$org->org_id,$user->violation_grp_id);
                $lockedEntry->save();
            }
            else {
                echo "present\n";
                $userLockedData = $userLockedData->first();

                // check for min hours per day
                $userData = (new UserAuth)->getUserData($user->id,true);
               /* $total_time=str_replace(":", " hr ", $userLockedData['total_time']);
                $total_time=$total_time." m";*/
                $total_time=$userLockedData['total_time'];
                $total_time = explode(":", $total_time);
                $total_time=$total_time[0] + ($total_time[1]/60);
                echo "TOTAL TIME : ".$total_time;
                $keyFields = ['total_hrs_in_day' => $total_time];        // this type casting returns you the only the hours
                $rhsFields = ['minimum_hrs_in_day'];
                $mailList = ['hr','owner1','owner2'];
                $data = (new ViolationApp)->createFormattedViolationData($userData,$keyFields,$rhsFields,$mailList);
                echo "\n TOTAL TIME : ";
                print_r($data['rule_key_fields']);
                $data['logo']= public_path().'/img/ajency-logo.png';
                $data['dilbert']=public_path().'/img/dilbert.png';
                $data['documentation']=public_path().'/img/ajency-email.png';
                $data['worked_hours']=$userLockedData['total_time'];
                $minimum_hrs_in_day=$data['rule_rhs']['minimum_hrs_in_day'];
                $minimum_hrs_in_day=explode(".",$minimum_hrs_in_day);
                print_r($minimum_hrs_in_day);
                $minimum_hrs=$minimum_hrs_in_day[1]*60;
                $data['minimum_hrs_in_day']=$minimum_hrs_in_day[0].":".$minimum_hrs/10;
                $vioResponse = (new ViolationRules)->checkForViolation('minimum_hrs_of_day',$data,false,true);
                if($vioResponse['status'] == 'violation') {
                    $userLockedData->status = "Leave due to violation";
                    $userLockedData->save();
                }
                else {
                    $userLockedData->status = $this->getUserStatus('present',$org->org_id,$user->violation_grp_id);
                    $userLockedData->save();
                }
            }
            $logger->writeln(isset($userLockedData->status) ? $userLockedData->status : '');
        }
    }

    /**
     * returns the users status based on their presence (present / absent)
     * @param  [type] $presence present / absent
     * @param         $orgId
     * @param         $grpId
     * @return [type]           [description]
     */
    public function getUserStatus($presence,$orgId,$grpId,$date = 'default') {
        if($date == 'default')
            $date = date('Y-m-d');
        if($presence == 'absent') {
            if(SpecialDays::where(['date' => $date/*date('Y-m-d')*/, 'type' => 'holiday'])->exists())
                // if it is a holiday
                return 'Holiday';
            else if((date('w',strtotime($date)) == 0 || date('w',strtotime($date)) == 6) && !SpecialDays::where(['date' => $date/*date('Y-m-d')*/, 'type' => 'working_day', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // if sat or sun and not a working weekend
                return 'Weekend';
            else
                return 'Leave';
        }
        else {
            if(SpecialDays::where(['date' => $date/*date('Y-m-d')*/, 'type' => 'holiday', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // if it is a holiday
                return 'Worked on holiday';
            else if(SpecialDays::where(['date' => $date/*date('Y-m-d')*/, 'type' => 'working_day', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // special working day like working-weekend
                return 'Worked';
            else if(date('w',strtotime($date)) == 0 || date('w',strtotime($date)) == 6)
                // if today is a sat or a sun
                return 'Worked on weekend';
            else
                return 'Worked';
        }
    }

    /**
     * runs every sunday at 10:30 pm IST
     * @return [type] [description]
     */
    public function weekly() {
        $date = new DateTime(date('Y-m-d'));
        //check for each user who violates the minimum work hours
        //get all the active users
        $users = User::where(['status' => 'active'])->get(); // Get users that are active
        foreach($users as $user) {
            $u = (new UserAuth)->getUserData($user);
            echo "start ".$date->modify('-6 days')->format('Y-m-d')." end ".$date->modify('+6 days')->format('Y-m-d')."\n";
            $userHours = Locked_Data::where('user_id',$u['user']['id'])->whereBetween('work_date',[$date->modify('-6 days')->format('Y-m-d'),$date->modify('+6 days')->format('Y-m-d')])->whereNotNull('start_time')->get();	//number of days present
            $minHours = count($userHours) * 9;
            echo "min hours".$minHours;
            //minimum workhours for a week is 45
            if($minHours > 45)
                $minHours = (int)45;
                echo "min hours".$minHours;
            // total time in minutes
            $totalHours = 0;
            foreach($userHours as $uh) {
                if($uh['total_time'] != null && $uh['total_time'] != '') {
                    $time = explode(':',$uh['total_time']);
                    $totalHours = $totalHours + (int)$time[0]*60 + (int)$time[1];
                }
            }

            // calculate the time difference between rhs and rule_key_fields if key < rhs
            if((int)$totalHours < ((int)$minHours * 60)) {
                $tdHours = ($totalHours%60 == 0) ? ($minHours - (int)($totalHours/60)) : ($minHours - (int)($totalHours/60) - 1);
                $tdMinutes = 60 - ($totalHours%60);

                // getting the hours and minutes in 00:00 format
                if($tdHours < 10)
                    $tdHours = '0'.$tdHours;
                if($tdMinutes < 10)
                    $tdMinutes = '0'.$tdMinutes;
                else if($tdMinutes == 60)
                    $tdMinutes = '00';

                $timeDiff = $tdHours.'h '.$tdMinutes.'m ';
            }

            // getting the total hours
            $totalHours = (int)($totalHours/60).'h '.($totalHours%60).'m ';
            echo "total hours".$totalHours;

            // check for violation
            $keyFields = ['total_hrs_in_week' => $totalHours];
            $rhsFields = ['total_week_hours' => $minHours];
            $mailList = ['hr','owner1','owner2'];
            $data = (new ViolationApp)->createFormattedViolationData($u,$keyFields,$rhsFields,$mailList);

            // add the meta data to $data
            if(isset($timeDiff))  // if time difference exists
                $data['meta']['time_difference'] = $timeDiff;


                $data['logo']= public_path().'/img/ajency-logo.png';
                $data['dilbert']=public_path().'/img/dilbert.png';
                $data['documentation']=public_path().'/img/ajency-email.png';
            (new ViolationRules)->checkForViolation('minimum_hrs_of_week',$data,false,true);

            //call weekly summary
            $this->weekly_summary_mail($user);
        }
    }

    /**
     * runs last day of every month at 10:30 pm IST
     * @return [type] [description]
     */
    public function monthly() {
        $date = new DateTime(date('Y-m-d'));
        //check for each user who violates the minimum work hours
        //get all the active users
        $users = User::where(['status' => 'active'])->get(); // Get users that are active
        foreach($users as $user) {
            $u = (new UserAuth)->getUserData($user);
            $userHours = Locked_Data::where('user_id',$u['user']['id'])->whereBetween('work_date',[$date->modify('first day of this month')->format('Y-m-d'),$date->modify('last day of this month')->format('Y-m-d')])->whereNotNull('start_time')->get();	//number of days present
            $minHours = count($userHours) * 9;
            //minimum workhours
            if($minHours > $this->getWorkingDaysOfMonth($date) * 9)
                $minHours = $this->getWorkingDaysOfMonth($date) * 9;
            // total time in minutes
            $totalHours = 0;
            foreach($userHours as $uh) {
                if($uh['total_time'] != null && $uh['total_time'] != '') {
                    $time = explode(':',$uh['total_time']);
                    $totalHours = $totalHours + (int)$time[0]*60 + (int)$time[1];
                }
            }

            // calculate the time difference between rhs and rule_key_fields if key < rhs
            if((int)$totalHours < ((int)$minHours * 60)) {
                $tdHours = ($totalHours%60 == 0) ? ($minHours - (int)($totalHours/60)) : ($minHours - (int)($totalHours/60) - 1);
                $tdMinutes = 60 - ($totalHours%60);

                // getting the hours and minutes in 00:00 format
                if($tdHours < 10)
                    $tdHours = '0'.$tdHours;
                if($tdMinutes < 10)
                    $tdMinutes = '0'.$tdMinutes;
                else if($tdMinutes == 60)
                    $tdMinutes = '00';

                $timeDiff = $tdHours.'h '.$tdMinutes.'m ';
            }

            // getting the total hours
            $totalHours = (int)($totalHours/60).'h '.($totalHours%60).'m';
            // check for violation
            $keyFields = ['total_hrs_in_month' => $totalHours];
            $rhsFields = ['total_month_hours' => $minHours];
            $mailList = ['hr','owner1','owner2'];
            $data = (new ViolationApp)->createFormattedViolationData($u,$keyFields,$rhsFields,$mailList);

            // add the meta data to $data
            if(isset($timeDiff))  // if time difference exists
                $data['meta']['time_difference'] = $timeDiff;


                $data['logo']= public_path().'/img/ajency-logo.png';
                $data['dilbert']=public_path().'/img/dilbert.png';
                $data['documentation']=public_path().'/img/ajency-email.png';

            (new ViolationRules)->checkForViolation('minimum_hrs_of_month',$data,false,true);
        }
    }

    /**
     * gives you the number of days in a month excluding sat and sun
     * @param  DateTime $date any date in the month
     * @return [type]       [description]
     */
    public function getWorkingDaysOfMonth($date) {
        $count = 0;
        $start = clone $date->modify('first day of this month');
        $end = clone $date->modify('last day of this month');
        $dateCounter = clone $start;
        while($dateCounter <= $end) {
            $day = $dateCounter->format('D');
            if($day != 'Sun' && $day != 'Sat')
                $count = $count + 1;
            $dateCounter->modify('+1 days');
        }
        return $count;
    }

    /**
     * runs every 5 mins to check if any users gone offline
     * @return [type] [description]
     */
    public function stateUpdate() {
        // get all the users that are present today
        $presentUsers = Locked_Data::where(['work_date' => date('Y-m-d')])->get();
        // for each user check the last log
        foreach($presentUsers as $pUser) {
            $user = (new UserAuth)->getUserData($pUser['user_id'],true);
            // get the users last log from a valid organisation ip
            $orgDetails = Organisation::find($user['user_details'][0]['org_id']);
            $ipList = unserialize($orgDetails['ip_lists']);
            $lastLog = Log::where(['user_id' => $pUser['user_id'], 'work_date' => date('Y-m-d')])->whereIn('ip_addr',$ipList)->orderBy('id','desc')->first();

            //if last log is offline continue else check the update_time
            if($lastLog->to_state == 'offline' || $lastLog->to_state == 'Offline' || $lastLog->to_state == 'OFFLINE')
                continue;
            else {
                if($this->getTimeDifferenceInMinutes($pUser['updated_at'],date('H:i')) >= 5) {
                    // add offline state in logs for that user
                    $offlineLog = new Log;
                    $offlineLog->work_date = date('Y-m-d');
                    $offlineLog->cos = $pUser['end_time']; // cos if of time so datetime get convert to time only format
                    $offlineLog->user_id = $pUser['user_id'];
                    $offlineLog->from_state = ($lastLog->to_state == 'New Session') ? 'active' : $lastLog->to_state;
                    $offlineLog->to_state = 'offline';
                    $offlineLog->ip_addr = $lastLog->ip_addr;
                    $offlineLog->save();
                }
            }
        }
        return response()->json(['status' => 200]);
    }

    /**
     * returns the time difference in minutes
     * @param  [type] $start [description]
     * @param  [type] $end   [description]
     * @return [type]        [description]
     */
    public function getTimeDifferenceInMinutes($start,$end) {
        $start = new DateTime($start);
        $end = new DateTime($end);
        $dateDiff = date_diff($start,$end);
        return (((int)$dateDiff->h * 60) + (int)($dateDiff->i));
    }

    //weekly cron for hours completed
    public function weekly_summary_mail($user)
    {
        try {
            $date = new DateTime(date('Y-m-d'));
            //start and end date to get weeks data
            $start_date= $date->modify('-6 days')->format('Y-m-d');
            $end_date=$date->modify('+6 days')->format('Y-m-d');
            $u = (new UserAuth)->getUserData($user);
            $org = UserDetail::select('org_id')->where('user_id',$u['user']['id'])->first();
            $org=$org->org_id;
            echo "start : ".$start_date." end : ".$end_date."\n";
            $userHoursCount = Locked_Data::where('user_id',$u['user']['id'])->whereBetween('work_date',[$start_date,$end_date])->whereNotNull('start_time')->get();
            $userHours = Locked_Data::where('user_id',$u['user']['id'])->whereBetween('work_date',[$start_date,$end_date])->orderBy('work_date', 'asc')->get();    //number of days present

            $minHours = count($userHoursCount) * 9;
            echo " min hours: ".$minHours;
            //minimum workhours for a week is 45
            if($minHours > 45)
                $minHours = (int)45;
            echo " min hours : ".$minHours;
            // total time in minutes
            $totalHours = 0;
            $time_count=0;
            foreach($userHours as $uh) 
            {
                //getting total hours of week
                if($uh['total_time'] != null && $uh['total_time'] != '') {
                    $time = explode(':',$uh['total_time']);
                    $totalHours = $totalHours + (int)$time[0]*60 + (int)$time[1];
                }
                //getting total hours of day,date,status
                $totalTime[$time_count]=$uh['total_time'];
                $weekDate[$time_count]=$uh['work_date'];
                $weekStatus[$time_count]=$uh['status'];
                $time_count=$time_count+1;
            }
            //saving all in array
            $data['totalTime']=$totalTime;
            $data['weekDate']=$weekDate;
            $data['weekStatus']=$weekStatus;
            for($i=0;$i<$time_count;$i++)
            {
                echo "\n";
                echo " total time : ".$totalTime[$i];
                echo " work date : ".$weekDate[$i];
                echo " week status : ".$weekStatus[$i];
                echo "\n";
            }

            // calculate the time difference between rhs and rule_key_fields if key < rhs
            if((int)$totalHours < ((int)$minHours * 60)) 
            {
                $tdHours = ($totalHours%60 == 0) ? ($minHours - (int)($totalHours/60)) : ($minHours - (int)($totalHours/60) - 1);
                $tdMinutes = 60 - ($totalHours%60);

                // getting the hours and minutes in 00:00 format
                if($tdHours < 10)
                $tdHours = '0'.$tdHours;
                if($tdMinutes < 10)
                $tdMinutes = '0'.$tdMinutes;
                else if($tdMinutes == 60)
                $tdMinutes = '00';

                $timeDiff = $tdHours.':'.$tdMinutes;
            }

            // getting the total hours
            $totalHours = (int)($totalHours/60).':'.($totalHours%60);
            echo " total hours : ".$totalHours;

            // check for violation
            $keyFields = ['total_hrs_in_week' => $totalHours];
            $rhsFields = ['total_week_hours' => $minHours];
            $mailList = ['hr','owner1','owner2'];
            $data['totalHours']=$totalHours;
            // $data = (new ViolationApp)->createFormattedViolationData($u,$keyFields,$rhsFields,$mailList);

            // add the meta data to $data
            if(isset($timeDiff))  // if time difference exists
                $data['meta']['time_difference'] = $timeDiff;

            $data['minHrs']=$minHours;
            //(new ViolationRules)->checkForViolation('minimum_hrs_of_week',$data,false,true);
            $name=$user['name'];
            $name = explode(' ',$user['name']);
            $data['name']= $name[0];

            $data['user_id']=$user['ID'];

            //lunch time slot
            $lunch_total= (new Slots)->getTotalSlotTime($user['id'],'lunch',$start_date,$end_date);
            $data['lunch_total']=$lunch_total;

            $slotLunchs = Slots::where('user_id',$u['user']['id'])->whereBetween('work_date',[$start_date,$end_date])->get();
            foreach ($slotLunchs as $slotLunch) {
                $lunchCount=date('D', strtotime($slotLunch['work_date']));
                $lunchSlot[$lunchCount]=$slotLunch['total_time'];
            }
            if (empty($lunchSlot)) {
                $data['lunchSlot']=0;
            }
            else
            {
                $data['lunchSlot']=$lunchSlot;
            }
            $data['endDate']=$end_date;

            //getting email id
            $comm=UserCommunication::where('object_id','=',$user['id'])->where('object_type','App\\User')->first();
            echo "comm ".$comm['value'];
            $mail=0;
            foreach ($mailList as $ml) 
            {
                $mlEmail[$mail] = (new OrganisationMeta)->getParamValue($ml,$org,0);
                echo "email : ".$mlEmail[$mail];
                $mail++;
            }
            $default_hours = (new OrganisationMeta)->getParamValue('default_day_hours',$org,0);
            $data['default_hours']=$default_hours;


            // url for  View you full logs here
            $data['url']='https://dilbert4.ajency.in/dashboard?user_id='.$user['id'].'&start_date='.$start_date.'&period_unit=week?summary_date='.$start_date;
            //mail the weekly summary
                    Mail::send('dilbert_mails/email_weekly_work_summary_hour', ['user_data' => $data], function($message) use($comm,$mlEmail){
                            $message->to($comm['value'])
                            ->cc($mlEmail[0])
                            ->cc($mlEmail[1])
                            ->bcc($mlEmail[2])
                            ->subject('Dilbert 4 : Weekly update - '.date('F jS, Y'));
                    });
        } catch (\Exception $e) {
            return response()->json(['status' => 400, 'message' => $e->getMessage()]);          
        }
    }
}