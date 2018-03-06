<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class leave extends Model
{
    //
    public function addLeaveData()
    {
    	$leave = new leave;

        $leave->user_id = 81;
        $leave->leave_date='2018-03-01';
        $leave->leave_entry_type='leave_taken';
        $leave->reason='very well';
        $leave->no_of_days=1;
        $leave->save();
        return $leave;
    }

    public function updateLeaveData($request)
    {
        $leave = leave::where('user_id',81)->first();
        $leave->no_of_days = $request->no_of_days;
        $leave->save();
        return $leave;
    }

    public function viewLeaveData()
    {
         $leave = leave::all();
         return $leave;
    }

    public function deleteLeaveData()
    {
        $leave = leave::find(1);
        $leave->delete();
    }
}
