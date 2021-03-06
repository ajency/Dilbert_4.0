<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Data_Changes;
use App\ViolationApp;
use App\Http\Controllers\CronController;
use Ajency\User\Ajency\userauth\UserAuth;
use Ajency\Violations\Ajency\ViolationRules;

use Symfony\Component\Console\Output\ConsoleOutput;

class Locked_Data extends Model
{
    /**
     * Gives a formatted locked data with leave status, live status, and
     * violation data
     * @param  $user_id
     * @param  [type] $lockedData Eloquent object
     * @param  start  start_date of period
     * @param  end    end_date of period
     * @param  sortOrder  order of period data | default 'asc'
     * @param  sendPeriodMeta  flag to send period_meta object in the returned data | default false
     * @return array containing the formatted data
     */
    public function formattedLockedData($user_id,$lockedData,$start,$end,$sortOrder = "asc", $sendPeriodMeta = false) {
        // if period_meta needs to be sent
        if($sendPeriodMeta)
            $totalPeriodHours = 0;

        // expected no of hours
        $expectedCounter = 0;

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
                "total_time" => "00:00",
                "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true),
                "slots" => [
                    "lunch" => (new Slots)->getTotalSlotTime($user_id, 'lunch', $dateCounter->format('Y-m-d'), $dateCounter->format('Y-m-d'))
                ]
            ]);
            if($sendPeriodMeta) {
                return [
                    'data' => $data,
                    'total_period_hours' => '00:00',
                    'expected_period_hours' => '00:00'
                ];
            }
            else
                return $data;
        }
        foreach ($lockedData as $ld) {
            // if status is null calculate the status
            if($ld->status == null && $ld->start_time != null)
                $ld->status = (new CronController)->getUserStatus('present',$udet['user_details'][0]['org_id'],$udet['user']['violation_grp_id'],$ld->work_date);

            // increment the expectedCounter
            if(in_array($ld->status, ['Present', 'Worked', 'Leave due to violation']))
                $expectedCounter = $expectedCounter + 1;

            if($sendPeriodMeta) {
                if($ld->total_time != null) {
                    $totalTime = explode(':', $ld->total_time);
                    $totalPeriodHours = $totalPeriodHours + ($totalTime[0]*60 + $totalTime[1]);
                }
                else
                    $totalTime = 0;
            }
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
                    "total_time" => "00:00",
                    "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                    "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true),
                    "slots" => [
                        "lunch" => (new Slots)->getTotalSlotTime($user_id, 'lunch', $dateCounter->format('Y-m-d'), $dateCounter->format('Y-m-d'))
                    ]
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
                $dayData['total_time'] = "00:00";
                $dayData['violations'] = (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $ld->work_date], "who_id" => $user_id]));
                $dayData['changes'] = (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$ld->work_date,$ld->work_date],true);
                $dayData['slots']['lunch'] = (new Slots)->getTotalSlotTime($user_id, 'lunch', $ld->work_date, $ld->work_date);
                array_push($data,$dayData);
                continue;
            }
            if($ld->end_time != null) {
                $endTime = new \DateTime($ld->end_time);
                $dayData['end_time'] = $endTime->format('H:i');
                // if current day get status from logs
                if($ld->work_date == date('Y-m-d'))
                    $dayData['status'] = $this->getCurrentStatus($user_id,$udet['user_details'][0]['org_id'],date('Y-m-d'));
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
                $dayData['status'] = ''/*$this->getCurrentStatus($user_id,$udet['user_details'][0]['org_id'],date('Y-m-d'))*/;
                $dayData['total_time'] = "00:00";
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
            $dayData['slots']['lunch'] = (new Slots)->getTotalSlotTime($user_id, 'lunch', $ld->work_date, $ld->work_date);
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
                "total_time" => "00:00",
                "violations" => (new ViolationApp)->getFormattedViolationData((new ViolationRules)->getViolations(["date_range" => ["start" => $dateCounter->format('Y-m-d')], "who_id" => $user_id])),
                "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true),
                "slots" => [
                    "lunch" => (new Slots)->getTotalSlotTime($user_id, 'lunch', $dateCounter->format('Y-m-d'), $dateCounter->format('Y-m-d'))
                ]
            ]);
            // to handle comparing datecounter and end based on the order
            $dateCounter->modify($dateModifyString);
        }

        // format the totalPeriodHours to hh:mm format
        if($sendPeriodMeta) {
            $totalPeriodMinutes = $totalPeriodHours%60;
            $tpHours = (int)($totalPeriodHours/60);
            if($tpHours < 10)
                $tpHours = '0'.$tpHours;
            if($totalPeriodMinutes < 10)
                $totalPeriodMinutes = '0'.$totalPeriodMinutes;
            $totalPeriodHours = $tpHours.':'.$totalPeriodMinutes;
            $expectedPeriodHours = $expectedCounter * (int) (new OrganisationMeta)->getParamValue('default_day_hours',$udet['user_details'][0]['org_id'],0);
            if($expectedPeriodHours < 10)
                $expectedPeriodHours = '0'.$expectedPeriodHours;
            return [
                'data' => $data,
                'total_period_hours' => $totalPeriodHours,
                'expected_period_hours' => $expectedPeriodHours.':00'
            ];
        }
        else
            return $data;
    }

    /**
     * Gives the users live status
     * @param  $userId
     * @param  $workDate
     * @return active/idle/offline/''
     */
    public function getCurrentStatus($userId,$orgId,$workDate) {
        // get org ip addresses
        $orgDetails = Organisation::where('id',$orgId)->first();
        $ipList = unserialize($orgDetails->ip_lists);
        $usersLogs = Log::where(['user_id' => $userId, 'work_date' => $workDate])->whereIn('ip_addr',$ipList)->orderBy('id','desc');
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
