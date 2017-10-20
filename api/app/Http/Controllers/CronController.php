<?php

namespace App\Http\Controllers;

use DateTime;
use ViolationApp;
use Locked_Data;
use User;
use Ajency\User\Ajency\userauth\UserAuth;
use Ajency\Violations\Ajency\ViolationRules;

use Illuminate\Http\Request;

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
}
