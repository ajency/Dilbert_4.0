<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class leave extends Model
{
    //
    public function addLeaveData($request)
    {
    	$leave = new leave;

        $leave->user_id = $request->user_id;
        $leave->leave_date=$request->leave_date;
        $leave->leave_entry_type=$request->leave_entry_type;
        $leave->reason=$request->reason;
        $leave->no_of_days=$request->no_of_days;
        $leave->save();
        return $leave;
    }

    public function updateLeaveData($request)
    {
        $leave = leave::where('user_id',$request->user_id)->where('leave_date',$request->leave_date)->first();
        if(!is_null($leave))
        {
            foreach($request->input('changes') as $ckey => $cvalue) {
                $leave->$ckey = $cvalue;
            }
            $leave->save();
        }
        else
            $leave="No Data";
        return $leave;
    }

    public function viewLeaveData()
    {
         $leave = leave::all();
         if(is_null($leave))
            $leave="No Leaves";
         return $leave;
    }

    public function deleteLeaveData($request)
    {
        $leave = leave::where('user_id',$request->user_id)->where('leave_date',$request->leave_date)->first();
        if(!is_null($leave))
        {
        $leave->delete();
        }
        else
        {
            $leave="No Data To delete";
        }
        return $leave;
    }
}
