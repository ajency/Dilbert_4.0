<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;
use DateTime;

use App\Slots;
use App\Log;

class SlotsController extends Controller
{
    /**
     * adds slots information for a particular user
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function editSlots(Request $request) {
        $message = '';
        foreach($request->slot_data as $slotData) {
            // check if that slot exists for that user on that day
            $slotEntry = Slots::where(['user_id' => $request->user_id, 'work_date' => $request->work_date, 'type' => $slotData['type']]);

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

            $totalTime = (new Log)->timeDifferenceInMins($slotStart, $slotEnd);

            if($slotData['type'] != 'no_slot') {
                // create a slots object if it does not exist
                if($slotEntry->exists())
                    $slotEntry = $slotEntry->first();
                else
                    $slotEntry = new Slots;

                // make an entry to the slots table
                $slotEntry->user_id = $request->user_id;
                $slotEntry->type = $slotData['type'];
                $slotEntry->work_date = $request->work_date;
                $slotEntry->start_time = $slotStart;
                $slotEntry->end_time = $slotEnd;
                $slotEntry->total_time = ((int)($totalTime/60)).':'.$totalTime%60;
                $slotEntry->save();
            }
            else {
                // if 'no_slot' is sent some slot timings may change
                // get all slots
                $allSlots = Slots::where(['user_id' => $request->user_id, 'work_date' => $request->work_date])->get();

                $slotStart = new DateTime($slotStart);
                $slotEnd = new DateTime($slotEnd);
                foreach($allSlots as $markedSlot) {
                    $markedSlotStart = new DateTime($markedSlot->start_time);
                    $markedSlotEnd = new DateTime($markedSlot->end_time);
                    if($slotStart <= $markedSlotStart && $markedSlotStart <= $slotEnd && $slotEnd <= $markedSlotEnd) {
                        // start of this slot needs to be changed
                        $markedSlot->start_time = $slotEnd->format('H:i');
                        $markedSlot->save();
                    }
                    else if($markedSlotStart <= $slotStart && $slotStart <= $markedSlotEnd && $markedSlotEnd <= $slotEnd) {
                        // end of this slot needs to be modified
                        $markedSlot->end_time = $slotStart->format('H:i');
                        $markedSlot->save();
                    }
                    else if($slotStart <= $markedSlotStart && $markedSlotStart <= $markedSlotEnd && $markedSlotEnd <= $slotEnd) {
                        // marked slot lies completely inside no_slot | delete this slot
                        $markedSlot->delete();
                    }
                    else if($markedSlotStart <= $slotStart && $slotStart <= $slotEnd && $slotEnd <= $markedSlotEnd) {
                        // no_slot lies inside marked slot | throw eror
                        $message = $message."'No slot' cannot be marked.";
                    }
                }
            }
        }

        // check if any error messages exist
        if($message == '')
            return response()->json(['status' => 200, 'message' => 'Slots added successfully.']);
        else
            return response()->json(['status' => 400, 'message' => $message]);
    }
}
