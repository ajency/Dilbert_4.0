<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Symfony\Component\Console\Output\ConsoleOutput;

class Locked_Data extends Model
{
    /**
     * Gives a formatted locked data with leave status, live status, and
     * violation data
     * @param  $user_id
     * @param  [type] $lockedData Eloquent object
     * @return array containing the formatted data
     */
    public function formattedLockedData($user_id,$lockedData) {
        $data = [];
        $output = new ConsoleOutput;
        $output->writeln("fld: ".count($lockedData));
        foreach ($lockedData as $ld) {
            $output->writeln("inside for each");
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
                array_push($data,$dayData);
                continue;
            }
            if($ld->end_time != null) {
                $endTime = new \DateTime($ld->end_time);
                $dayData['end_time'] = $endTime->format('H:i');
                $dayData['status'] = '';
            }
            else {
                //the day isnt over yet
                $endTime = new \DateTime();
                //set as the current time
                $dayData['end_time'] = $endTime->modify('+5 hour +30 minutes')->format('H:i');
                $dayData['status'] = $this->getCurrentStatus($user_id,date('Y-m-d'));
            }
            $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
            $dayData['leave_status'] = 'Present';
            //violation status - for now dummy
            $dayData['violation_count'] = 0;
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
                return 'Offline';
            else
                return $usersLogs->to_state;
        }
        else
            return '';
    }
}
