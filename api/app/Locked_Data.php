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
     * @param  $user_id        User's id - can be sent as null
     * @param  $lockedData     Eloquent object
     * @param  start           start_date of period
     * @param  end             end_date of period
     * @param  sortOrder       order of period data | default 'asc'
     * @param  sendPeriodMeta  flag to send period_meta object in the returned data | default false
     * @param  meta            all extra data goes here
     * @return array containing the formatted data
     *
     * Possible data in meta
     * Everything in this array is optional
     * $meta = [
     *      'user_org_id' => '',
     *      'user_violation_grp_id' => '',
     *      'special_days' => [],    // Eloquent object of SpecialDays model. Required to calculate leave_status
     *      'extra_params' => null   // extra_params default null
     * ]
     * $extra_params defaults
     * [
     *      'changes' => true,   // these defaults will be assumed if not sent
     *      'slots' => true,
     *      'violations' => true,
     * ]
     */
    public function formattedLockedData($user_id,$lockedData,$start,$end,$sortOrder = "asc", $sendPeriodMeta = false, $meta = []) {
        // if period_meta needs to be sent
        if($sendPeriodMeta)
            $totalPeriodHours = 0;

        // expected no of hours
        $expectedCounter = 0;

        // extra params that are to be sent. Assign defaults if not sent.
        if($meta['extra_params'] != null) {
            // i.e extra_params required
            // if param_key not present, that param shouldn't be sent
            $sendParam = [
                'changes' => isset($meta['extra_params']['changes']) ? $meta['extra_params']['changes'] : false,
                'slots' => isset($meta['extra_params']['slots']) ? $meta['extra_params']['slots'] : false,
                'violations' => isset($meta['extra_params']['violations']) ? $meta['extra_params']['violations'] : false,
            ];
        }
        else {
            $sendParam = [
                'changes' => true,
                'slots' => true,
                'violations' => true,
            ];
        }
        // getUserStatus requires special days - for faster performance this is sent to the function
        if(isset($meta['special_days']))
            $specialDays = $meta['special_days'];
        else
            $specialDays = SpecialDays::whereBetween('date',[$start,$end]);

        $data = [];
        // user details to be used later
        if($user_id != null) {
            // when the necessary data isnt passed in meta
            $udet = (new UserAuth)->getUserData($user_id,true);
            $userOrgId = $udet['user_details'][0]['org_id'];
            $userViolationGrpId = $udet['user']['violation_grp_id'];
        }
        else {
            $userOrgId = $meta['user_org_id'];
            $userViolationGrpId = $meta['user_violation_grp_id'];
        }

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
                "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$userOrgId,$userViolationGrpId,$dateCounter->format('Y-m-d'),$specialDays),
                "start_time" => "",
                "end_time" => "",
                "total_time" => "00:00",
                "violations" => 0,
                "slots" => [
                    "lunch" => "00:00"
                ]
                + ($sendParam['changes'] ? ["changes" => 0] : [])
                + ($sendParam['violations'] ? ["violations" => 0] : [])
                + ($sendParam['slots'] ? ["slots" => [
                    "lunch" => "00:00"
                ]] : [])
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
                $ld->status = (new CronController)->getUserStatus('present',$userOrgId,$userViolationGrpId,$ld->work_date,$specialDays);

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
                    "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$userOrgId,$userViolationGrpId,$dateCounter->format('Y-m-d'),$specialDays),
                    "start_time" => "",
                    "end_time" => "",
                    "total_time" => "00:00",
                ]
                + ($sendParam['changes'] ? ["changes" => 0] : [])
                + ($sendParam['violations'] ? ["violations" => 0] : [])
                + ($sendParam['slots'] ? ["slots" => [
                    "lunch" => "00:00"
                ]] : [])
                );
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
                ($sendParam['violations']) ? ($dayData['violations'] = 0) : null;
                ($sendParam['changes']) ? ($dayData['changes'] = 0) : null;
                ($sendParam['slots']) ? ($dayData['slots']['lunch'] = "00:00") : null;
                array_push($data,$dayData);
                continue;
            }
            if($ld->end_time != null) {
                $endTime = new \DateTime($ld->end_time);
                $dayData['end_time'] = $endTime->format('H:i');
                // if current day get status from logs
                if($ld->work_date == date('Y-m-d'))
                    $dayData['status'] = $this->getCurrentStatus($user_id,$userOrgId,date('Y-m-d'));
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
                $dayData['status'] = ''/*$this->getCurrentStatus($user_id,$userOrgId,date('Y-m-d'))*/;
                $dayData['total_time'] = "00:00";
            }
            // $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
            /*
                for calculating leave status
             */
            // $udet = (new UserAuth)->getUserData($user_id,true);
            $dayData['leave_status'] = ($ld->status == null) ? (new CronController)->getUserStatus('present',$userOrgId,$userViolationGrpId,$ld->work_date,$specialDays) : $ld->status;
            //violation status - for now dummy
            ($sendParam['violations']) ? ($dayData['violations'] = $ld->violations_count) : null;
            ($sendParam['changes']) ? ($dayData['changes'] = $ld->changes_count) : null;
            ($sendParam['slots']) ? ($dayData['slots']['lunch'] = (new Slots)->getTotalSlotTime($user_id, 'lunch', $ld->work_date, $ld->work_date)) : null;
            array_push($data,$dayData);
        }
        // so that the last entry is not excluded if empty
        while(($sortOrder == 'asc' && $dateCounter <= $end) || ($sortOrder == 'desc' && $dateCounter >= $end)) {
            // [REDUNDANT CODE] create a function generateLeaveData()
            array_push($data,[
                "work_date" => $dateCounter->format('Y-m-d'),
                "status" => "",
                "leave_status" => ($dateCounter->format('Y-m-d') == date('Y-m-d')) ? '' : (new CronController)->getUserStatus('absent',$userOrgId,$userViolationGrpId,$dateCounter->format('Y-m-d'),$specialDays),
                "start_time" => "",
                "end_time" => "",
                "total_time" => "00:00",
            ]
            + ($sendParam['changes'] ? ["changes" => 0] : [])
            + ($sendParam['violations'] ? ["violations" => 0] : [])
            + ($sendParam['slots'] ? ["slots" => [
                "lunch" => "00:00"
            ]] : [])
            );
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
            $expectedPeriodHours = $expectedCounter * (int) (new OrganisationMeta)->getParamValue('default_day_hours',$userOrgId,0);
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
