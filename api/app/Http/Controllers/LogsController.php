<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

use App;
use App\User;
use App\UserDetail;
use App\Organisation;
use App\UserCommunication;
use App\Log;
use App\Locked_Data;
use App\Slots;

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
        if(!empty($request->user_id) && !empty($request->date) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // check for the user-permissions
                $callingUser = User::where('id',$request->header('from'))->first();
                // if($callingUser->can('edit-personal')) {
                    // check if a change of state offset is given
                    if(isset($request->cos_offset))
                        $cosOffset = $request->cos_offset;
                    else
                        $cosOffset = 0;
                    // acquire the data to be sent
                    $data = [];
                    // pass basic user data for next api request
                    $user = User::where(['id' => $request->user_id]);
                    if($user->exists())
                        $name = $user->first()->name;
                    else
                        return response()->json(['status' => 400, 'message' => __('api_messages.user_dne')]);
                    // if the calling user is requesting their own data
                    if($request->header('from') == $request->user_id)
                        $self = true;
                    else
                        $self = false;
                    $email_id = UserCommunication::where('object_id','=',$request->user_id)->where('object_type','App\\User')->first();
                    $email = $email_id['value'];
                    $data['user'] = ['user_id' => $request->user_id, 'name' => $name, 'self' => $self, 'email' => $email];
                    // get the days data from locked__datas -------------- call that new function
                    $daysData = Locked_Data::where(['user_id' => $request->user_id, 'work_date' => $request->date])->get();
                    $data['day_data'] = (new Locked_Data)->formattedLockedData($request->user_id,$daysData,$request->date,$request->date);  // formatted locked data
                    // get the user's day logs
                    $userLogs = Log::where(['user_id' => $request->user_id, 'work_date' => $request->date])->get(); // all logs
                    // Organisation's ip list
                    $ip_list = unserialize(Organisation::find(UserDetail::where(['user_id' => $request->user_id])->first()->org_id)->ip_lists);
                    $logs = (new Log)->getDaySummary($ip_list, $userLogs, $cosOffset);
                    // add slots to the logs
                    $slots = Slots::where(['user_id' => $request->user_id, 'work_date' => $request->date])->get();
                    $slottedLogs = (new Slots)->addSlotsToLogs($logs, $slots);
                    $data['logs'] = $slottedLogs;
                    $data['leave_status_values'] = ['Holiday', 'Weekend', 'Worked', 'Worked on weekend', 'Worked on holiday', 'Leave', 'Leave due to violation'];
                    $data['slot_values'] = [
                        'no_slot' => 'No slot',
                        'lunch' => 'Lunch',
                    ];
                    return response()->json(['status' => 200, 'message' => __('api_messages.day_summary'), 'data' => $data]);
                // }
                // else {
                //     return response()->json(["message" => "you dont have the right permissions."]);
                // }
            }
            else
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
        }
        else
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
    }
}
