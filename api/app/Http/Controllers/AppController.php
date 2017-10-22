<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ajency\User\Ajency\userauth\UserAuth;

use App\Log;
use App\Locked_Data;
use App\Organisation;

use Symfony\Component\Console\Output\ConsoleOutput;

class AppController extends Controller
{
    public function periodicalPing(Request $request)
    {
        // check if all parameters are there
        if ($request->header('from') != null && $request->header('X-API-KEY') != null && $request->from_state != null && $request->to_state != null) {
            // authenticate the user
            $user = (new UserAuth)->getUserData($request->header('from'), true);
            $user['user_details'] = $user['user_details']->first();
            if ($user['user_details']['api_token'] == $request->header('X-API-KEY')) {
                // first make an entry into the logs table
                $orgDetails = Organisation::find($user['user_details']['org_id']);
                $timeZone = ($user['user_details']['timeZone'] == null) ? $orgDetails['default_tz'] : $user['user_details']['timeZone'];
                if (Log::where(['user_id' => $request->header('from'), 'work_date' => date('Y-m-d')])->count() == 0) {
                    // that is this the first log entry of the day, directly add to the logs table
                    $log = new Log;
                    $log->work_date = date("Y-m-d");
                    $log->cos = $this->getCurrentTimeZoneTime($timeZone);
                    $log->user_id = $request->header('from');
                    $log->from_state = $request->from_state;
                    $log->to_state = $request->to_state;
                    $log->ip_addr = $request->ip();
                    $log->save();
                } elseif ($request->from_state != $request->to_state) {
                    // ie theres a state change
                    // check if last entry is the same as request, if not make a log entry
                    $lastLog = Log::where(['user_id' => $request->header('from'), 'work_date' => date('Y-m-d')])->orderBy('id', 'desc')->first();
                    if ($request->from_state != $lastLog->from_state || $request->to_state != $lastLog->to_state) {
                        // then make an entry to the logs
                        $timeZone = ($user['user_details']['timeZone'] == null) ? $orgDetails['default_tz'] : $user['user_details']['timeZone'];
                        $log = new Log;
                        $log->work_date = date("Y-m-d");
                        $log->cos = $this->getCurrentTimeZoneTime($timeZone);
                        $log->user_id = $request->header('from');
                        $log->from_state = $request->from_state;
                        $log->to_state = $request->to_state;
                        $log->ip_addr = $request->ip();
                        $log->save();
                    }
                }

                // check the ip from the request
                $orgDetails = Organisation::where(['id' => $user['user_details']['org_id']])->first();
                $ipList = unserialize($orgDetails['ip_lists']);
                $lockedEntry = Locked_Data::where(['user_id' => $request->header('from'), 'work_date' => date('Y-m-d')]);
                if(!in_array($request->ip(), $ipList)) {
                    // add entry to locked_data table
                    // check if it is the first entry for the day [ TODO add this to the queue ]
                    if ($lockedEntry->count() == 0) {
                        // [ TODO violation check for late_alert ]
                        $locked = new Locked_Data;
                        $locked->user_id = $request->header('from');
                        $locked->work_date = date('Y-m-d');
                        $locked->start_time = date('Y-m-d')." ".$this->getCurrentTimeZoneTime($timeZone);
                        $locked->end_time = date('Y-m-d')." ".$this->getCurrentTimeZoneTime($timeZone);
                        $locked->total_time = "00:00";
                        $locked->status = "Present";
                        $locked->save();
                    } else {
                        // just update the end time and total time
                        $lockedEntry = $lockedEntry->first();
                        $lockedEntry->end_time = date('Y-m-d')." ".$this->getCurrentTimeZoneTime($timeZone);
                        $output = new ConsoleOutput;
                        $output->writeln('start '.$lockedEntry->start_time);
                        $output->writeln('start '.$lockedEntry->end_time);
                        $output->writeln(date('Y-m-d H:i'));
                        $output->writeln($this->getTimeDifference($lockedEntry->start_time, date('Y-m-d H:i')));
                        $lockedEntry->total_time = $this->getTimeDifference($lockedEntry->start_time, date('Y-m-d')." ".$this->getCurrentTimeZoneTime($timeZone));
                        $lockedEntry->save();
                    }
                }
                // return the start, end and total time from the locked_data
                $newLockedEntry = Locked_Data::where(['user_id' => $request->header('from'), 'work_date' => date('Y-m-d')]);
                if($newLockedEntry->count() == 0)
                    return response()->json(['start_time' => '-', 'end_time' => '-', 'total_time' => '-']);
                else {
                    $newLockedEntry = $newLockedEntry->first();
                    return response()->json(['start_time' => $newLockedEntry->start_time, 'end_time' => $newLockedEntry->end_time, 'total_time' => $newLockedEntry->total_time]);
                }
            } else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authentication')]);
            }
        } else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }

    public function getCurrentTimeZoneTime($userTimeZone)
    {
        // Get the TimeZone value from the whole content
        $tempTimeZone = explode(':', explode(')', explode('GMT', $userTimeZone)[1])[0]); // Split using GMT, ) & : from [<Country> ({+/-}hr:min)]

        // Check the time slot & get Hours, Minutes & +/- sign
        if (strpos($tempTimeZone[0], "+") !== false) { /* It does have '+' timezone*/
            $zoneValues = explode("+", $tempTimeZone[0]);
            $hr = $zoneValues[1];
            $min = $tempTimeZone[1];
            $sign = '+';
        } elseif (strpos($tempTimeZone[0], "-") !== false) { /* It does have '-' timezone*/
            $zoneValues = explode("-", $tempTimeZone[0]);
            $hr = $zoneValues[1];
            $min = $tempTimeZone[1];
            $sign = '-';
        } else { /* No TimeZone assigned */
            $hr = '00';
            $min = '00';
            $sign = '+';
        }

        /* Get current System UTC+0:0 time & increment w.r.t that employee's Timezone */
        $x = strtotime($sign . $hr . " hour " . $sign . $min . " min", strtotime(date('Y-m-d H:i:s')));
        $timeZone = date("H:i", $x); // Get the new Time in Hr:Min format
        return $timeZone;
    }

    /**
     * returns the timedifference between two datetime string
     * both start and end must be on the same day (time diff < 24:00)
     * @param  [type] $start [description]
     * @param  [type] $end   [description]
     * @return [type]        [description]
     */
    public function getTimeDifference($start, $end)
    {
        // return the time difference in minutes - start and end are both strings
        $startTime = new \DateTime($start);
        $endTime = new \DateTime($end);
        $d = date_diff($startTime, $endTime);
        $h = (strlen($d->h) == 1) ? "0".$d->h : $d->h;
        $m = (strlen($d->i) == 1) ? "0".$d->i : $d->i;
        return $h.":".$m;
    }
}