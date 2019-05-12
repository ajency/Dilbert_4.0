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
     * @param  [type]  $ip_list         array of valid ips
     * @param  [type]  $userLogs        users logs
     * @param  [type]  $cosOffset       change of state offset - any state_time less
     *                                  than this is ignored
     * @param  boolean $filterByIpList  If logs have to filtered by ip list
     * @return [type]                   formatted day summary
     */
    public function getDaySummary($ip_list, $userLogs, $cosOffset, $filterByIpList) {
        $logs = [];
        $state = null;
        $start = null;
        $end = null;
        foreach($userLogs as $log) {
            // check if the logs ip belongs to organisation's ip_lists
            // if not skip the log
            if($filterByIpList && !in_array($log->ip_addr,$ip_list))
                continue;
            // if this is the start of the startDate
            if($start == null && $log->to_state == 'New Session') {   // New Session = active
                    $state = 'active';
                    $start = $log->cos;
                    continue;
            }
            // signifying the end of the offline state
            else if($state == 'offline' && $log->to_state == 'New Session') {
                $end = $log->cos;
                if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
                    array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                    $state = 'active';
                    $start = $log->cos;
                    $end = null;
                    continue;
                }
                else {
                    // edit the end time of the previous record
                    $lastRecord = array_pop($logs);
                    if($lastRecord == null) {
                        // if this the first entry to the logs array
                        array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                        $state = $log->to_state;
                        $start = $log->cos;
                        $end = null;
                    }
                    else {
                        // ignore the current record and use the previous one
                        $state = $lastRecord['state'];
                        $start = $lastRecord['start_time'];
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
                    array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                    $state = $log->to_state;
                    $start = $log->cos;
                    $end = null;
                }
                else {
                    // edit the end time of the previous record
                    $lastRecord = array_pop($logs);
                    if($lastRecord == null) {
                        // if this the first entry to the logs array
                        array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                        $state = $log->to_state;
                        $start = $log->cos;
                        $end = null;
                    }
                    else {
                        // ignore the current record and use the previous one
                        $state = $lastRecord['state'];
                        $start = $lastRecord['start_time'];
                        $end = null;
                    }
                }
            }
            else
                continue;
        }
        if($state != null)
            array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => null, 'slot' => '']);$logs = [];
            $state = null;
            $start = null;
            $end = null;
            foreach($userLogs as $log) {
                // check if the logs ip belongs to organisation's ip_lists
                // if not skip the log
                if($filterByIpList && !in_array($log->ip_addr,$ip_list))
                    continue;
                // if this is the start of the startDate
                if($start == null && $log->to_state == 'New Session') {   // New Session = active
                        $state = 'active';
                        $start = $log->cos;
                        continue;
                }
                // signifying the end of the offline state
                else if($state == 'offline' && $log->to_state == 'New Session') {
                    $end = $log->cos;
                    if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
                        array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                        $state = 'active';
                        $start = $log->cos;
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
                        array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => $this->timeDifferenceInMins($start,$end), 'slot' => '']);
                        $state = $log->to_state;
                        $start = $log->cos;
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
                            $end = null;
                        }
                    }
                }
                else
                    continue;
            }
            if($state != null)
                array_push($logs,['state' => $state, 'start_time' => substr($start,0,5), 'end_time' => substr($end,0,5), 'state_time' => null, 'slot' => '']);

            return $logs;
    }
}
