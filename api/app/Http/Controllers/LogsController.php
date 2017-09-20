<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

use App;
use App\User;
use App\UserDetail;
use App\Log;
use App\Locked_Data;

class LogsController extends Controller
{
    /**
     * returns a detailed summary of the states a user has been in
     * @param  Request $request request parameters
     * @return json object containing that day's summary
     */
    public function daySummary(Request $request,$locale = "default") {
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->user_id) && !empty($request->date)) {
            if(UserDetail::where('api_token',$request->header('X-API-KEY'))->count() != 0) {
                // check if a change of state offset is given
                if(isset($request->cos_offset))
                    $cosOffset = $request->cos_offset;
                else
                    $cosOffset = 0;
                // acquire the data to be sent
                $data = [];
                // pass basic user data for next api request
                $data['user'] = ['user_id' => $request->user_id, 'x_api_key' => $request->header('X-API-KEY')];
                // get the days data from locked__datas -------------- call that new function
                $daysData = Locked_Data::where(['user_id' => $request->user_id, 'work_date' => $request->date])->get();
                $data['day_data'] = (new Locked_Data)->formattedLockedData($request->user_id,$daysData);  // formatted locked data
                // get the user's day logs
                $logs = [];
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
                        if((new Log)->timeDifferenceInMins($start,$end) >= $cosOffset) {
                            array_push($logs,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => (new Log)->timeDifferenceInMins($start,$end)]);
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
                        if((new Log)->timeDifferenceInMins($start,$end) >= $cosOffset) {
                            array_push($logs,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => (new Log)->timeDifferenceInMins($start,$end)]);
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
                array_push($logs,['state' => $state, 'start_time' => $start, 'end_time' => $end, 'state_time' => null]);
                $data['logs'] = $logs;
                return response()->json(['status' => 200, 'message' => __('api_messages.day_summary'), 'data' => $data]);
            }
            else
                return response()->json(['status' => 400, 'message' => __('api_messages.authorisation')]);
        }
        else
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
    }
}
