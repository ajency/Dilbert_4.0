<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

use App\Locked_Data;

class UserActivity extends Model
{
    /**
     * calculates the total time based on the user activity table
     * @param  [type]  $userId       user's id
     * @param  [type]  $workDate     date for which to calculate the total time
     * @param  boolean $workFromHome to consider only office activity or other as well
     *                               default false
     * @param  [type]  $userActivity array of prefetched user activity | optional
     * @return string                in the "hh:mm" format ex: "12:00"
     */
    public function computeUserTotalTime($userId, $workDate, $workFromHome = false, $userActivity = null) {
        $totalMins = 0;
        /**
         * check if the user activity is already passed
         */
        if($userActivity == null) {
            // fetch the user's activity
            $userActivity = $this::where([
                'user_id' => $userId,
                'work_date' => $workDate,
            ])->get();

            // if user activity is empty, return the existing total time
            // as is. This case arises for days before the user_activity table introduction.
            if(count($userActivity) == 0)
                return Locked_Data::where(['user_id' => $userId, 'work_date' => $workDate])->first()->total_time;
        }

        /**
         * Calculate the total office time
         */
        $firstOfficeEntry = $userActivity->where('type','office')->first();
        $lastOfficeEntry = $userActivity->where('type','office')->last();

        if($firstOfficeEntry != null)   // i.e. both the first and the last entry exists
            $totalMins = $totalMins + (new Carbon($firstOfficeEntry->from))->diffInMinutes(new Carbon($lastOfficeEntry->to));

        /**
         * Include the 'other' time if $workFromHome is true
         */
        if($workFromHome) {
            $otherEntries = $userActivity->where('type','other');

            // if first and last office entries are null, consider all home entries
            // as it means the user has worked from home the whole time
            if($firstOfficeEntry == null)
                $takeAllEntries = true;
            else
                $takeAllEntries = false;

            foreach($otherEntries as $otherEntry) {
                if($takeAllEntries || (
                    new Carbon($otherEntry->to) <= new Carbon($firstOfficeEntry->from) ||
                    new Carbon($otherEntry->from) >= new Carbon($lastOfficeEntry->to)
                    )   // i.e. the 'other' activity lies outside of the entire 'office' period
                ) {
                    // then calculate the time difference and add to the total time
                    $totalMins = $totalMins + (new Carbon($otherEntry->from))->diffInMinutes(new Carbon($otherEntry->to));
                }
            }
        }

        /**
         * Convert and return the total time to a "hh:mm" string
         */
         return str_pad((int)($totalMins / 60),2,'0',STR_PAD_LEFT).":".str_pad(($totalMins % 60),2,'0',STR_PAD_LEFT);
    }
}
