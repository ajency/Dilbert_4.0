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
        // get all the users
        $users = User::select('id','violation_grp_id')->where('status','active')->get();
        echo "got users\n";
        foreach($users as $user) {
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
                $keyFields = ['total_hrs_in_day' => (int)$userLockedData['total_time']];        // this type casting returns you the only the hours
                $rhsFields = ['minimum_hrs_in_day'];
                $mailList = ['time_manager','hr','owner'];
                $data = (new ViolationApp)->createFormattedViolationData($userData,$keyFields,$rhsFields,$mailList);
                $vioResponse = (new ViolationRules)->checkForViolation('minimum_hrs_of_day',$data);
                if($vioResponse['status'] == 'violation') {
                    $userLockedData->status = "Leave due to violation";
                    $userLockedData->save();
                }
                else {
                    $userLockedData->status = $this->getUserStatus('present',$org->org_id,$user->violation_grp_id);
                    $userLockedData->save();
                }
            }
        }
    }

    /**
     * returns the users status based on their presence (present / absent)
     * @param  [type] $presence present / absent
     * @param         $orgId
     * @param         $grpId
     * @return [type]           [description]
     */
    public function getUserStatus($presence,$orgId,$grpId) {
        if($presence == 'absent') {
            if(SpecialDays::where(['date' => date('Y-m-d'), 'type' => 'holiday'])->exists())
                // if it is a holiday
                return 'Holiday';
            else if((date('w') == 0 || date('w') == 1) && !SpecialDays::where(['date' => date('Y-m-d'), 'type' => 'working_day', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // if sat or sun and not a working weekend
                return 'Weekend';
            else
                return 'Leave';
        }
        else {
            if(SpecialDays::where(['date' => date('Y-m-d'), 'type' => 'holiday', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // if it is a holiday
                return 'Worked on holiday';
            else if(SpecialDays::where(['date' => date('Y-m-d'), 'type' => 'working_day', 'org_id' => $orgId, 'grp_id' => $grpId])->exists())
                // special working day like working-weekend
                return 'Worked';
            else if(date('w') == 0 || date('w') == 1)
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
                $minHours = 45;
            // total time in minutes
            $totalHours = 0;
            foreach($userHours as $uh) {
                if($uh['total_time'] != null && $uh['total_time'] != '') {
                    $time = explode(':',$uh['total_time']);
                    $totalHours = $totalHours + (int)$time[0]*60 + (int)$time[1];
                }
            }
            // getting the total hours
            $totalHours = (int)$totalHours/60;
            echo "total hours".$totalHours;
            // check for violation
            $keyFields = ['total_hrs_in_week' => $totalHours];
            $rhsFields = ['total_week_hours' => $minHours];
            $mailList = ['time_manager','owner'];
            $data = (new ViolationApp)->createFormattedViolationData($u,$keyFields,$rhsFields,$mailList);
            (new ViolationRules)->checkForViolation('minimum_hrs_of_week',$data);
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
            // getting the total hours
            $totalHours = (int)$totalHours/60;
            // check for violation
            $keyFields = ['total_hrs_in_month' => $totalHours];
            $rhsFields = ['total_month_hours' => $minHours];
            $mailList = ['time_manager','owner'];
            $data = (new ViolationApp)->createFormattedViolationData($u,$keyFields,$rhsFields,$mailList);
            (new ViolationRules)->checkForViolation('minimum_hrs_of_month',$data);
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
            if($lastLog->to_state == 'offline' || $lastLog->to_state == 'offline - cron')
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
}
