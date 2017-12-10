<?php

namespace App;

use DateTime;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Console\Output\ConsoleOutput;

class Slots extends Model
{
    /**
     * returns the total slot time for the given range
     * @param  [type] $userId    [description]
     * @param  [type] $type      [description]
     * @param  [type] $startDate [description]
     * @param  [type] $endDate   [description]
     * @return [type]            [description]
     */
    public function getTotalSlotTime($userId, $type, $startDate, $endDate) {
        $slotHours = Slots::select('total_time')->where(['user_id' => $userId, 'type' => $type])->whereBetween('work_date', [$startDate,$endDate])->get();

        // iterate through slotHours
        $totalSlotTime = 0;
        foreach($slotHours as $hours) {
            $totalTime = explode(':', $hours->total_time);
            $totalSlotTime = $totalSlotTime + $totalTime[0]*60 + $totalTime[1];
        }

        // convert the minutes in the hh::mm format
        return (int)($totalSlotTime/60).':'.$totalSlotTime%60;
    }

    /**
     * add a slot attribute to all logs
     * @param [type] $logs  users logs
     * @param [type] $slots all slots marked
     */
    public function addSlotsToLogs($logs, $slots) {
        foreach ($slots as $slot) {
            $slotStart = new DateTime($slot['start_time']);
            $slotEnd = new DateTime($slot['end_time']);
            $count = 0;
            foreach($logs as $log) {
                // ignore the last log which has the end_time as ''
                if($log['end_time'] == '')
                    break;
                $logStart = new DateTime($log['start_time']);
                $logEnd = new DateTime($log['end_time']);
                if($slotStart <= $logStart && $slotEnd >= $logEnd) {  // slot is exact or log lies completely inside a log
                    $logs[$count]['slot'] = $slot['type'];
                }
                else if($slotStart > $logStart && $slotEnd < $logEnd) {  // slot lies in between a log
                    $newLogs = [
                        [
                            'state' => $log['state'],
                            'start_time' => $logStart->format('H:i'),
                            'end_time' => $slotStart->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($logStart->format('H:i'),$slotStart->format('H:i')),
                            'slot' => ''
                        ],
                        [
                            'state' => $log['state'],
                            'start_time' => $slotStart->format('H:i'),
                            'end_time' => $slotEnd->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($slotStart->format('H:i'),$slotEnd->format('H:i')),
                            'slot' => $slot['type']
                        ],
                        [
                            'state' => $log['state'],
                            'start_time' => $slotEnd->format('H:i'),
                            'end_time' => $logEnd->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($slotEnd->format('H:i'),$logEnd->format('H:i')),
                            'slot' => ''
                        ]
                    ];
                    array_splice($logs,$count,1,$newLogs);
                    break;
                }
                else if($slotStart > $logStart && $slotStart < $logEnd) {  // slotStart lies in between a log
                    $newLogs = [
                        [
                            'state' => $log['state'],
                            'start_time' => $logStart->format('H:i'),
                            'end_time' => $slotStart->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($logStart->format('H:i'),$slotStart->format('H:i')),
                            'slot' => ''
                        ],
                        [
                            'state' => $log['state'],
                            'start_time' => $slotStart->format('H:i'),
                            'end_time' => $logEnd->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($slotStart->format('H:i'),$logEnd->format('H:i')),
                            'slot' => $slot['type']
                        ]
                    ];
                    array_splice($logs,$count,1,$newLogs);
                    $count = $count + 1;
                }
                else if($slotEnd > $logStart && $slotEnd < $logEnd) {  // slotEnd lies in between a log
                    $newLogs = [
                        [
                            'state' => $log['state'],
                            'start_time' => $logStart->format('H:i'),
                            'end_time' => $slotEnd->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($logStart->format('H:i'),$slotEnd->format('H:i')),
                            'slot' => $slot['type']
                        ],
                        [
                            'state' => $log['state'],
                            'start_time' => $slotEnd->format('H:i'),
                            'end_time' => $logEnd->format('H:i'),
                            'state_time' => (new Log)->timeDifferenceInMins($slotEnd->format('H:i'),$logEnd->format('H:i')),
                            'slot' => ''
                        ]
                    ];
                    array_splice($logs,$count,1,$newLogs);
                    $count = $count + 1;
                }
                $count = $count + 1;
            }
        }
        return $logs;
    }
}
