<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

use App\Slots;
use App\Log;

class SlotsController extends Controller
{
    public function editSlots(Request $request) {
        $message = '';
        foreach($request->slot_data as $slotData) {
            // check if that slot exists for that user on that day
            $slot = Slots::where(['user_id' => $request->user_id, 'work_date' => $request->work_date, 'type' => $slotData['type']]);

            // return an error
            if($slot->exists()) {
                $message = $message.'Slot \''.$slotData['type'].'\' already exists. ';
                continue;
            }

            // check to see if the logs sent are continuous and take the start and end time
            $continue = false;  // to detect if any error occurred while going through the logs
            $slotStart = '';
            $slotEnd = '';
            foreach($slotData['logs'] as $log) {
                // if its the first log
                if($slotStart == '' && $slotEnd == '') {
                    $slotStart = $log['start_time'];
                    $slotEnd = $log['end_time'];
                    continue;
                }
                // check if the logs are continuos
                if($log['start_time'] != $slotEnd) {
                    $message = $message.'Logs selected are not continuous in \''.$slotData['type'].'\' slot. ';
                    $continue = true;
                    break;
                }
                else
                    $slotEnd = $log['end_time'];
            }

            // check if you need to continue
            if($continue)
                continue;

            // make an entry to the slots table
            $slotEntry = new Slots;
            $slotEntry->user_id = $request->user_id;
            $slotEntry->type = $slotData['type'];
            $slotEntry->work_date = $request->work_date;
            $slotEntry->start_time = $request->work_date.' '.$slotStart;
            $slotEntry->end_time = $request->work_date.' '.$slotEnd;
            $slotEntry->total_time = (new Log)->timeDifferenceInMins($slotStart, $slotEnd);
            $slotEntry->save();
        }

        // check if any error messages exist
        if($message == '') {
            // $allSlots = Slots::select('type','work_date','start_time','end_time','total_time')->where(['user_id' => $request->user_id, 'work_date' => $request->work_date])->get();
        return response()->json(['status' => 200, 'message' => 'Slots added successfully.'/*, 'data' => $allSlots*/]);
        }
        else
            return response()->json(['status' => 400, 'message' => $message]);
    }
}
