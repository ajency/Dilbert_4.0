<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Data_Changes;

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
    public function formattedLockedData($user_id,$lockedData,$start,$end,$sortOrder = "default") {
        $data = [];
        $output = new ConsoleOutput;
        $output->writeln(json_encode($lockedData));
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
        $output->writeln("start: ".$start->format('Y-m-d')." end: ".$end->format('Y-m-d'));
        $dateCounter = clone $start;
        // special case when acquired the formatted locked data of a non existent date (single)
        if($dateCounter == $end && count($lockedData) == 0) {
            array_push($data,[
                "work_date" => $dateCounter->format('Y-m-d'),
                "status" => "",
                "leave_status" => "",
                "start_time" => "",
                "end_time" => "",
                "total_time" => "",
                "violation_count" => "",
                "changes" => (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$dateCounter->format('Y-m-d'),$dateCounter->format('Y-m-d')],true)
            ]);
        }
        foreach ($lockedData as $ld) {
            $output->writeln("date counter: ".$dateCounter->format('Y-m-d'));
            while($dateCounter->format('Y-m-d') != $ld->work_date && $dateCounter != $end) {
                // add an empty item
                array_push($data,[
                    "work_date" => $dateCounter->format('Y-m-d'),
                    "status" => "",
                    "leave_status" => "",
                    "start_time" => "",
                    "end_time" => "",
                    "total_time" => "",
                    "violation_count" => "",
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
                $dayData['leave_status'] = 'Leave';
                $dayData['start_time'] = '';
                $dayData['end_time'] = '';
                $dayData['total_time'] = 0;
                $dayData['violation_count'] = 0;
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
            }
            else {
                //the day isnt over yet
                $endTime = new \DateTime();
                //set as the current time
                $dayData['end_time'] = $endTime/*->modify('+5 hour +30 minutes')*/->format('H:i');
                $dayData['status'] = $this->getCurrentStatus($user_id,date('Y-m-d'));
            }
            $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
            $dayData['leave_status'] = 'Present';
            //violation status - for now dummy
            $dayData['violation_count'] = 0;
            $dayData['changes'] = (new Data_Changes)->getDataChanges(0,$user_id,"locked__datas",["work_date",$ld->work_date,$ld->work_date],true);
            array_push($data,$dayData);
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
        $usersLogs = Log::where(['user_id' => $userId, 'work_date' => $workDate])->orderBy('created_at','desc');
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
