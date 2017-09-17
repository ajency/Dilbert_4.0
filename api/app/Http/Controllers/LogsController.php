<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

use App\User;
use App\Log;

class LogsController extends Controller
{
    /**
     * returns a detailed summary of the states a user has been in
     * @param  Request $request request parameters
     * @return json object containing that day's summary
     */
    public function daySummary(Request $request) {
        if(!empty($request->user_id) && !empty($request->date)) {
            if(User::where('api_token',$request->header('X-API-KEY'))->count() != 0) {
                // check if a change of state offset is given
                if(isset($request->cos_offset))
                    $cosOffset = $request->cos_offset;
                else
                    $cosOffset = 0;
                // acquire the data to be sent
                $data = [];
                $userLogs = Log::where(['user_id' => $request->user_id, 'work_date' => $request->date])->get(); // all logs
                $state = null;
                $start = null;
                $end = null;
                foreach($userLogs as $log) {
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
                            array_push($data,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => $this->timeDifferenceInMins($start,$end)]);
                        }
                        $state = 'active';
                        $start = $log->cos;
                        $end = null;
                        continue;
                    }
                    // detects the end of the state and also curbs multiple
                    // offline entries from being reported
                    if($log->from_state == $state || $log->to_state == 'offline' && $state != 'offline') {
                        $end = $log->cos;
                        // check if this change of state is to be passed
                        if($this->timeDifferenceInMins($start,$end) >= $cosOffset) {
                            array_push($data,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => $this->timeDifferenceInMins($start,$end)]);
                        }
                        $state = $log->to_state;
                        $start = $log->cos;
                        $end = null;
                    }
                    else
                        continue;
                }
                array_push($data,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => null]);
                return response()->json(['status' => 'success', 'message' => 'User day summary returned.', 'data' => $data]);
            }
            else
                return response()->json(['status' => 'failure', 'message' => 'You are not authorised.']);
        }
        else
            return response()->json(['status' => 'failure', 'message' => 'Some parameters are missing']);
    }

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
        $output->writeln($d->i);
        return $d->h*60 + $d->i;
    }
}
