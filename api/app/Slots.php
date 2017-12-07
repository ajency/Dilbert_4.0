<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
