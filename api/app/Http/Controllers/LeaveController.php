<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\leave;

class LeaveController extends Controller
{
	//add a leave
    public function addLeave(Request $request)
    {
    	/*if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) 
    	{
    	 	if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) 
    	 	{*/
    	 		echo "Adding";
    	 		$leaveData=0;
    	 		$leaveData = (new leave)->addLeaveData();
    	 		echo "______________________________________________\n";
    	 		print_r($leaveData);
    	 		echo "\n______________________________________________\n";
    	 	/*}
    	 	else 
    	 	{
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
    	 	}
    	}
    	else 
    	{
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
	    }*/
	}

	//Update a leave
	public function updateLeavesData(Request $request)
	{
		echo "Updating";
 		$leaveData=0;
 		$leaveData = (new leave)->updateLeaveData($request);
 		echo "______________________________________________\n";
 		print_r($leaveData);
 		echo "\n______________________________________________\n";
	}

    //view a leave
    public function viewLeaves(Request $request)
    {
    	echo "Displaying";
 		$leaveData=0;
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
 		$leaveData=0;
 		$leaveData = (new leave)->deleteLeaveData();
 		echo "______________________________________________\n";
 		print_r($leaveData);
 		echo "\n______________________________________________\n";
    }
}
