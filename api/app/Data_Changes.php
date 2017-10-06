<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\User;
use App\Data_Changes;
use Symfony\Component\Console\Output\ConsoleOutput;


class Data_Changes extends Model
{
    /**
     * Fetches all changes made to a users data on that particular day
     * @param          $user      user's reference code who is requesting to view these changes
     *                            for only count you can send any id for from because it doesn't matter
     *                            ideally send 0 [this is used to figure out self]
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

    /**
     * if the person can make changes to their own data for that particular day
     * @param  $user   user changing self data
     * @param  $workDate data of which date is being changed
     * @return boolean true/false
     * [future functionality] may have to check number of changes for a specific field
     */
    public function userCanMakeChanges($user, $workDate) {
        // user can make self change only once
        if(Data_Changes::where(['user_id' => $user, 'modified_by' => $user, 'work_date' => $workDate])->count() > 0)
            return false;
        else
            return true;
    }
}
