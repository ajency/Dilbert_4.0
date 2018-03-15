<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\leave;
use App\User;
use Google_Client;
use Google\Spreadsheet\ServiceRequestFactory;
use Google\Spreadsheet\DefaultServiceRequest;
use Google\Spreadsheet\SpreadsheetService;
class LeaveController extends Controller
{
    //add a leave
    public function addLeave($data)
        {
            $data=$data[0];
            echo "Adding";
            $data['listFeed']->insert([
               'date' => $data['leave_date'],
               'entry' => $data['leave_entry_type'],
               //'no.ofdays' => $data['no_of_days'],
               // ...
            ]);
            print_r($data['listFeed']);
            //add to table
            $leaveData = (new leave)->addLeaveData($data);
            
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

    public function document(Request $request)
    {
    
        $data = [];
        $data['path']="/google_sheet_client/client_secret.json";
        $spreadsheet = insert_to_sheet("Dilbert Leaves_Shreya",$data);

        // Get the first worksheet (tab)
        $worksheets = $spreadsheet->getWorksheetFeed()->getEntries();
        $worksheet = $worksheets[0];
        $listFeed = $worksheet->getListFeed();
        
        $cellFeed = $worksheet->getCellFeed();  
       /* $cellFeed->editCell(1,5, "Leave");
        $cellFeed->editCell(1,6, "DOJ");
        $cellFeed->editCell(1,7, "Leave quota");*/
        $cellFeed->editCell(1,1, "Date");
        $cellFeed->editCell(1,2, "Entry");
        $cellFeed->editCell(1,3, "No of days");

         $listFeed = $worksheet->getListFeed();
        $user_id = $request->user_id;
        $user_data=User::where('id',$user_id)->first();
        $user_name=$user_data->name;
        $doj = $request->doj;
        $leavequota=$request->leavequota;
        $leave_entry_type = $request->leave_entry_type;
        $reason = $request->reason;
        $leave_date=$request->leave_date['start_date'];
        $start_date=date_create($request->leave_date['start_date']);
        $end_date=date_create($request->leave_date['end_date']);
        $no_of_days=date_diff($start_date,$end_date);
        $no_of_days=$no_of_days->format('%a')+1;
        echo "\n data \n";
        if (($cellFeed->getCell(1,7))==null) {
            $cellFeed->editCell(1,7,$user_name);
           /* $listFeed->insert([
               'leave' => $user_id,
               'doj'=>$doj,
               'leavequota' => $leavequota]);*/
        }

        $dataLeave['listFeed']=$listFeed;
        $dataLeave['user_id']=$user_id;
        $dataLeave['doj']=$doj;
        $dataLeave['leavequota']=$leavequota;
        $dataLeave['leave_date']=$leave_date;
        $dataLeave['leave_entry_type']=$leave_entry_type;
        $dataLeave['reason']=$reason;
        $dataLeave['no_of_days']=$no_of_days;
        
        // $cellFeed->editCell(12,2,$leave_entry_type);
        // $cellFeed->editCell(12,1,$leave_date);
        array_push($data,$dataLeave);
        $this->addLeave($data);
        echo "inserted";
    }
}
