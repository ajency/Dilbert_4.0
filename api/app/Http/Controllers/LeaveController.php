<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\leave;

class LeaveController extends Controller
{
	//add a leave
    public function addLeave(Request $request)
    {
 		echo "Adding";
        if (!empty($request->user_id) &&
            !empty($request->leave_date) &&
            !empty($request->leave_entry_type) &&
            !empty($request->reason) &&
            !empty($request->no_of_days) &&
            $request->header('X-API-KEY')!= null &&
            $request->header('from')!= null)
        {
            $leaveData = (new leave)->addLeaveData($request);
        }
        else
        {
            $leaveData="Insufficient data";
        }
 		echo "______________________________________________\n";
 		print_r($leaveData);
 		echo "\n______________________________________________\n";
	}

	//Update a leave
	public function updateLeavesData(Request $request)
	{
		echo "Updating";
 		$leaveData = (new leave)->updateLeaveData($request);
 		echo "______________________________________________\n";
 		print_r($leaveData);
 		echo "\n______________________________________________\n";
	}

    //view a leave
    public function viewLeaves(Request $request)
    {
    	echo "Displaying";
 		$leaveData = (new leave)->viewLeaveData();
 		echo "______________________________________________\n";
 		foreach ($leaveData as $data) {
 			print_r($data);
 		}
 		echo "\n______________________________________________\n";
    }

    //delete a leave
    public function deleteLeaves(Request $request)
    {
    	echo "Deleting";
        if (!empty($request->user_id) &&
            !empty($request->leave_date) &&
            $request->header('X-API-KEY')!= null &&
            $request->header('from')!= null)
        {
 		     $leaveData = (new leave)->deleteLeaveData($request);
        }
        else
        {
            $leaveData="Insufficient data";
        }
 		echo "______________________________________________\n";
 		print_r($leaveData);
 		echo "\n______________________________________________\n";
    }
}
