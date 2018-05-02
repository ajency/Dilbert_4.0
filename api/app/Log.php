<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Symfony\Component\Console\Output\ConsoleOutput;

class Log extends Model
{
    /**
     * Finds the time difference in minutes
     * @param  string $start
     * @param  string $end
     * @return number of minutes
     */
    public function timeDifferenceInMins($start,$end) {
        // return the time difference in minutes - start and end are both strings
        $startTime = new \DateTime($start);
        $endTime = new \DateTime($end);
        $output = new ConsoleOutput;
        $d = date_diff($startTime,$endTime);
        return $d->h*60 + $d->i;
    }

    /**
     * iterates through the users logs and gives a properly formatted day summary
     * @param  [type] $ip_list      array of valid ips
     * @param  [type] $userLogs     users logs
     * @param  [type] $cosOffset    change of state offset - any state_time less
     *                              than this is ignored
     * @param  [type] $sendAllLogs  send all logs (office and other) | default false
     * @return [type]               formatted day summary
     */
    public function getDaySummary($ip_list, $userLogs, $cosOffset, $sendAllLogs = false) {

        $logs = [];
        // $state = null;
        // $start = null;
        // $end = null;
        // foreach($userLogs as $log) {
        //
        //     // check if the logs ip belongs to organisation's ip_lists
        //     // if not skip the log
        //     if(!$sendAllLogs) {
        //      // if(!in_array($log->ip_addr,$ip_list))
        //      //     continue;
        //     }
        //
        //     // if this is the start of the startDate
        //     if($start == null && $log->to_state == 'New Session') {   // New Session = active
        //             $state = 'active';
        //             $start = $log->cos;
        //             $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //             continue;
        //     }
        //     // signifying the end of the offline state
        //     else if($state == 'offline' && $log->to_state == 'New Session') {
        //         $end = $log->cos;
        //         if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
        //             array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
        //             $state = 'active';
        //             $start = $log->cos;
        //             $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //             $end = null;
        //             continue;
        //         }
        //         else {
        //             // edit the end time of the previous record
        //             $lastRecord = array_pop($logs);
        //             if($lastRecord == null) {
        //                 // if this the first entry to the logs array
        //                 array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
        //                 $state = $log->to_state;
        //                 $start = $log->cos;
        //                 $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //                 $end = null;
        //             }
        //             else {
        //                 // ignore the current record and use the previous one
        //                 $state = $lastRecord['state'];
        //                 $start = $lastRecord['start_time'];
        //                 $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //                 $end = null;
        //             }
        //         }
        //     }
        //     // detects the end of the state and also curbs multiple
        //     // offline entries from being reported
        //     if(($log->from_state == $state || $log->to_state == 'offline') && $state != 'offline') {
        //         $end = $log->cos;
        //         // check if this change of state is to be passed
        //         if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
        //             array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
        //             $state = $log->to_state;
        //             $start = $log->cos;
        //             $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //             $end = null;
        //         }
        //         else {
        //             // edit the end time of the previous record
        //             $lastRecord = array_pop($logs);
        //             if($lastRecord == null) {
        //                 // if this the first entry to the logs array
        //                 array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
        //                 $state = $log->to_state;
        //                 $start = $log->cos;
        //                 $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
        //                 $end = null;
        //             }
        //             else {
        //                 // ignore the current record and use the previous one
        //                 $state = $lastRecord['state'];
        //                 $start = $lastRecord['start_time'];
        //                 $workFromHome = $lastRecord['work_from_home'];
        //                 $end = null;
        //             }
        //         }
        //     }
        //     else
        //         continue;
        // }
        // if($state != null)
        //     array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => null, 'slot' => '', 'work_from_home' => $workFromHome]);$logs = [];
        $state = null;
        $start = null;
        $end = null;
        foreach($userLogs as $log) {
            // check if the logs ip belongs to organisation's ip_lists
            // if not skip the log
            if(!$sendAllLogs) {
                if(!in_array($log->ip_addr,$ip_list))
                    continue;
            }
            // if this is the start of the startDate
            if($start == null && $log->to_state == 'New Session') {   // New Session = active
                    $state = 'active';
                    $start = $log->cos;
                    $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
                    continue;
            }
            // signifying the end of the offline state
            else if($state == 'offline' && $log->to_state == 'New Session') {
                $end = $log->cos;
                if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
                    array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
                    $state = 'active';
                    $start = $log->cos;
                    $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
                    $end = null;
                    continue;
                }
                else {
                    // edit the end time of the previous record
                    $lastRecord = array_pop($logs);
                    if($lastRecord == null) {
                        // if this the first entry to the logs array
                        $end = null;
                    }
                    else {
                        // ignore the current record and use the previous one
                        $state = $lastRecord['state'];
                        $start = $lastRecord['start_time'];
                        $workFromHome = $lastRecord['work_from_home'];
                        $end = null;
                    }
                }
            }
            // detects the end of the state and also curbs multiple
            // offline entries from being reported
            if(($log->from_state == $state || $log->to_state == 'offline') && $state != 'offline') {
                $end = $log->cos;
                // check if this change of state is to be passed
                if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
                    array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '', 'work_from_home' => $workFromHome]);
                    $state = $log->to_state;
                    $start = $log->cos;
                    $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
                    $end = null;
                }
                else {
                    // edit the end time of the previous record
                    $lastRecord = array_pop($logs);
                    if($lastRecord == null) {
                        // if this the first entry to the logs array
                        $end = null;
                    }
                    else {
                        // ignore the current record and use the previous one
                        $state = $lastRecord['state'];
                        $start = $lastRecord['start_time'];
                        $workFromHome = ($this->getIPType($log->ip_addr, $ip_list) == 'other') ? true : false;
                        $end = null;
                    }
                }
            }
            else
                continue;
        }
        if($state != null)
            array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => null, 'slot' => '', 'work_from_home' => '']);

        return $logs;
    }

    /**
     * determines the type of ip address
     * @param  [type] $ipAddress ip address
     * @param  [type] $ipList    list of 'office' ip addresses
     * @param  [type] $orgId     organisation id - to be sent only if ip_list is null
     * @return [type]            office / other
     */
    public function getIPType($ipAddress, $ipList = null, $orgId = null) {
        // if the ip address list is not passed,
        // fetch it from the organisations table
        if($ipList == null) {
            $ipList = unserialize(Organisation::find($orgId)->ip_lists);
        }

        if(in_array($ipAddress, $ipList))
            return 'office';
        else
            return 'other';
    }
}
