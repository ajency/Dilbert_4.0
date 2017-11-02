<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Data_Changes;
use App\ViolationApp;
use App\Http\Controllers\CronController;
use Ajency\User\Ajency\userauth\UserAuth;

use Symfony\Component\Console\Output\ConsoleOutput;

class Locked_Data extends Model
{
    /**
     * Gives a formatted locked data with leave status, live status, and
     * violation data
     * @param  $user_id
     * @param  [type] $lockedData Eloquent object
     * @param  start  start_date of
     * @return array containing the formatted data
     */
    public function formattedLockedData($user_id,$lockedData,$start,$end,$sortOrder = "asc") {
        $data = [];
        // user details to be used later
        $udet = (new UserAuth)->getUserData($user_id,true);
        $output = new ConsoleOutput;
        // $output->writeln(json_encode($lockedData));
        $start = new \DateTime($start);
        $end = new \DateTime($end);
        $dateModifyString = "+1 days";
        // if in descending order interchange the start and end
        if($sortOrder == "desc") {
            $temp = $start;
            $start = $end;
            $end = $temp;
            $dateModifyString = "-1 days";
        }
        // $output->writeln("start: ".$start->format('Y-m-d')." end: ".$end->format('Y-m-d'));
        $dateCounter = clone $start;
        // special case when acquired the formatted locked data of a non existent date (single)
        if($dateCounter == $end && count($lockedData) == 0) {
            // [REDUNDANT CODE] create a function generateLeaveData()
            array_push($data,[
                "work_date" => $dateCounter->format('Y-m-d'),
                "status" => "",
                "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$udet['user_details'][0]['org_id'],$udet['user']['violation_grp_id'],$dateCounter->format('Y-m-d')),
                "start_time" => "",
                "end_time" => "",
                "total_time" => "",
                "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true)
            ]);
            return $data;
        }
        foreach ($lockedData as $ld) {
            // $output->writeln("date counter: ".$dateCounter->format('Y-m-d'));
            while($dateCounter->format('Y-m-d') != $ld->work_date && $dateCounter != $end) {
                // add an empty item
                // [REDUNDANT CODE] create a function generateLeaveData()
                array_push($data,[
                    "work_date" => $dateCounter->format('Y-m-d'),
                    "status" => "",
                    "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$udet['user_details'][0]['org_id'],$udet['user']['violation_grp_id'],$dateCounter->format('Y-m-d')),
                    "start_time" => "",
                    "end_time" => "",
                    "total_time" => "",
                    "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                    "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true)
                ]);
                // to handle comparing datecounter and end based on the order
                $dateCounter->modify($dateModifyString);
                // $output->writeln("date counter: ".$dateCounter->format('Y-m-d'));
            }
            $dateCounter->modify($dateModifyString);
            // handle total_time = null
            $dayData = [];
            $dayData['work_date'] = $ld->work_date;
            $day = new \DateTime($ld->work_date);
            $startTime = new \DateTime($ld->start_time);
            if($ld->start_time != null)  // handles leaves
                $dayData['start_time'] = $startTime->format('H:i');
            else {
                // it's a leave
                $dayData['status'] = '';
                $dayData['leave_status'] = /*'Leave'*/$ld->status;
                $dayData['start_time'] = '';
                $dayData['end_time'] = '';
                $dayData['total_time'] = 0;
                $dayData['violations'] = (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $ld->work_date], "who_id" => $user_id]));
                $dayData['changes'] = (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$ld->work_date,$ld->work_date],true);
                array_push($data,$dayData);
                continue;
            }
            if($ld->end_time != null) {
                $endTime = new \DateTime($ld->end_time);
                $dayData['end_time'] = $endTime->format('H:i');
                // if current day get status from logs
                if($ld->work_date == date('Y-m-d'))
                    $dayData['status'] = $this->getCurrentStatus($user_id,date('Y-m-d'));
                else
                    $dayData['status'] = '';
                $dayData['total_time'] = $ld->total_time;
            }
            else {
                // the day isnt over yet
                // [ NOTE ] this will never be triggered for Dilbert 4 because
                // you will always have an end time due to pinging
                $endTime = new \DateTime();
                //set as the current time
                $dayData['end_time'] = ''/*$endTime->modify('+5 hour +30 minutes')->format('H:i')*/;
                $dayData['status'] = ''/*$this->getCurrentStatus($user_id,date('Y-m-d'))*/;
                $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
            }
            // $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
            /*
                for calculating leave status
             */
            // $udet = (new UserAuth)->getUserData($user_id,true);
            $dayData['leave_status'] = ($ld->status == null) ? (new CronController)->getUserStatus('present',$udet['user_details'][0]['org_id'],$udet['user']['violation_grp_id'],$ld->work_date) : $ld->status/*'Present'*/;
            //violation status - for now dummy
            $dayData['violations'] = (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $ld->work_date], "who_id" => $user_id]));
            $dayData['changes'] = (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$ld->work_date,$ld->work_date],true);
            array_push($data,$dayData);
        }
        // so that the last entry is not excluded if empty
        while(($sortOrder == 'asc' && $dateCounter <= $end) || ($sortOrder == 'desc' && $dateCounter >= $end)) {
            // [REDUNDANT CODE] create a function generateLeaveData()
            array_push($data,[
                "work_date" => $dateCounter->format('Y-m-d'),
                "status" => "",
                "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$udet['user_details'][0]['org_id'],$udet['user']['violation_grp_id'],$dateCounter->format('Y-m-d')),
                "start_time" => "",
                "end_time" => "",
                "total_time" => "",
                "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true)
            ]);
            // to handle comparing datecounter and end based on the order
            $dateCounter->modify($dateModifyString);
        }
        return $data;
    }

    /**
     * Gives the users live status
     * @param  $userId
     * @param  $workDate
     * @return active/idle/offline/''
     */
    public function getCurrentStatus($userId,$workDate) {
        $usersLogs = Log::where(['user_id' => $userId, 'work_date' => $workDate])->orderBy('id','desc');
        if($usersLogs->exists()) {
            $usersLogs = $usersLogs->first();
            if($usersLogs->to_state == 'New Session')
                return 'active';
            else
                return $usersLogs->to_state;
        }
        else
            return '';
    }
}
