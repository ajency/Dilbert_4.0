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
     * @param          $user       user's reference code who is requesting to view these changes
     *                             for only count you can send any id for from because it doesn't matter
     *                             ideally send 0 [this is used to figure out modified_by_self]
     * @param          $userCode   user reference code who's changes are requested - for now user id
     * @param          $table      locked__datas/logs
     * @param          $dateObj    array consisting of date type(modified/work_date) and start and end date
     * @param  boolean $onlyCount  default false, set to true if only the number changes required
     * @return  count or array of all chnages
     */
    public function getDataChanges($user, $userCode, $table, $dateObj, $onlyCount = false) {
        $output = new ConsoleOutput;
        $output->writeln($user);
        $output->writeln($userCode);
        $output->writeln($table);
        $output->writeln($dateObj);
        $output->writeln($onlyCount);

        // parse the date object
        $dataChanges = Data_Changes::where(['user_id' => $userCode, 'table_modified' => $table])->whereBetween($dateObj[0],[$dateObj[1],$dateObj[2]])->get();
        // $dataChanges = Data_Changes::where(['user_id' => $userCode, 'work_date' => $workDate])->get();

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
            // check if start time or time to send only time and not time stamp
            if($change->column_modified == "start_time" || $change->column_modified == "end_time") {
                if($change->old_value != null)
                    $from = substr($change->old_value,11,5);
                else
                    $from = null;
                if($change->new_value != null)
                    $to = substr($change->new_value,11,5);
                else
                    $to = null;
            }
            else {
                $from = $change->old_value;
                $to = $change->new_value;
            }
            $changeData = [
                "modified_by" => User::find($change->modified_by)->name,
                "modified_on" => $change->created_at->modify('+5 hours 30 minutes')->format('Y-m-d h:i'),
                "work_date" => $change->work_date,
                "type" => $type[$change->table_modified],
                "name" => $change->column_modified,
                "from" => $from,
                "to" => $to,
                "modified_by_self" => ($user == $change->modified_by ? true : false)
            ];
            array_push($changes,$changeData);
        }
        return $changes;
    }

//     /**
//      * if the person can make changes to their own data for that particular day
//      * @param  $user   user changing self data
//      * @param  $workDate data of which date is being changed
//      * @return boolean true/false
//      * [future functionality] may have to check number of changes for a specific field
//      */
//     public function userCanMakeChanges($user, $workDate) {
//         // user can make self change only once
//         if(Data_Changes::where(['user_id' => $user, 'modified_by' => $user, 'work_date' => $workDate])->count() > 0)
//             return false;
//         else
//             return true;
//     }
}
