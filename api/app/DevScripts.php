<?php

namespace App;

use App\Locked_Data;
use App\Data_Changes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DevScripts extends Model
{
    public function updateChangesCount() {
        $dataChanges = DB::table('data__changes')->select(DB::raw('user_id, work_date, count(id) as total_changes'))->groupBy('user_id','work_date')->get();
        foreach($dataChanges as $dc) {
            $lockedEntry = Locked_Data::where(['user_id' => $dc->user_id, 'work_date' => $dc->work_date])->first();
            $lockedEntry->changes_count = $dc->total_changes;
            $lockedEntry->save();
        }
    }
}
