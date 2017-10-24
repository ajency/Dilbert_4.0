<?php

namespace App\Http\Controllers;

use DateTime;
use App\ViolationApp;
use App\Locked_Data;
use App\Log;
use App\User;
use App\Organisation;
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

    }

    /**
     * runs every sunday at 12:30 am IST
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
            echo "exit";
        }
    }

    /**
     * runs every 1st at 12:30 am IST
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
            (new ViolationRules)->checkForViolation('mingetimum_hrs_of_month',$data);
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
     * runs every 5 mins to check
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
            if($lastLog->to_state == 'offline')
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
        return (($dateDiff->h * 60) + ($dateDiff->m));
    }
}
