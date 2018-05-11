<?php
use App\User;
use App\UserCommunication;

function leave_due_to_violation($data)
{
     addLeaveRequest($data);
}

// adds leaves which are caused due to violation in firestore
// data: data of violation and users data 
function addLeaveRequest($data)
{
    if(!isset($data["work_date"]))
    {
        $current_timestamp = \Carbon\Carbon::now();
        $work_date = [$current_timestamp->toDateString()];
    }
    else
    {
        $work_date =[$data["work_date"]];
    }
    $current_timestamp = \Carbon\Carbon::now();
    $taggedUsers = leavesTaggedUsers($data['violation_data']['mailing_list']);
    print_r($data['violation_data']['mailing_list']);
    $data1 = [
         'user' => [
                    "user_id" => $data['violation_data']['who_id'] ,
                    "email" => $data['violation_data']['who_meta']['email'],
                    "name" => $data['violation_data']['who_meta']['name']
                ],       
                "date_of_application" => $current_timestamp,             
                "leave_date" => $work_date,             
                "leave_note" => "<b>Leave due to violation</b> - Minimum hours of ".str_replace(":", " hr ", $data['minimum_hrs_in_day'])."m not met for the day. Total hours worked: ".str_replace(":"," hr ",$data['worked_hours'])."m",
                "leave_status"=> "",    
                "leave_type"=>"leave_due_to_violation",            
                "tagged_users"=>$taggedUsers
        ];

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://us-central1-dilbert-34d6c.cloudfunctions.net/addLeave",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30000,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($data1),
        CURLOPT_HTTPHEADER => array(
            // Set here requred headers
            "accept: */*",
            "accept-language: en-US,en;q=0.8",
            "content-type: application/json",
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
         echo "success";
        print_r(json_decode($response));
    }
}

function leavesTaggedUsers($mail_list)
{
    $return_tagged = [];
    foreach ($mail_list as $ml) {
        $comm = UserCommunication::where('value','=',$ml)->first();
        $user_id = $comm['object_id'];
        $user_details = User::where('id',"=",$comm['object_id'])->first();
        $name = $user_details['name'];
        $tagged['id'] = $user_id;
        $tagged['name'] = $name;
        $tagged['email'] = $ml;
        array_push($return_tagged,$tagged);
    }
    return $return_tagged;
}