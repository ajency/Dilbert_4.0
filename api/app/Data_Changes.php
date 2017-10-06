<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\User;
use App\Data_Changes;

class Data_Changes extends Model
{
    /**
     * Fetches all changes made to a users data on that particular day
     * @param          $user      user's reference code who is requesting to view these changes
     * @param          $userCode  user reference code who's changes are requested - for now user id
     * @param          $work_Date date
     * @param  boolean $onlyCount default false, set to true if only the number chnages required
     * @return [type]             [description]
     */
    public function getDataChanges($user, $userCode, $workDate, $onlyCount = false) {
        $dataChanges = Data_Changes::where(['user_id' => $userCode, 'work_date' => $workDate])->get();
        // if onlyCount is true return count
        if($onlyCount)
            return count($dataChanges);
        $changes = [];
        // mapping table names to type
        $type = [
            "locked__datas" => "Period data",
            "logs" => "Day summary"
        ];
        foreach($dataChanges as $change) {
            echo $change->modifed_by;
            $changeData = [
                "modified_by" => User::find($change->modified_by)->name,
                "modified_on" => $change->modified_on,
                "work_date" => $change->work_date,
                "type" => $type[$change->table_modified],
                "name" => $change->column_modified,
                "from" => $change->old_value,
                "to" => $change->new_value,
                "self" => ($user == $change->modified_by ? true : false)
            ];
            array_push($changes,$changeData);
        }
        return $changes;
    }
}
