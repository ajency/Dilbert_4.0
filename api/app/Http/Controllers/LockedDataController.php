<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Locked_Data;
use App\Log;
use App\Organisation;
use App\Role;
use App\Permission;


class LockedDataController extends Controller
{
    //
    public function periodData(Request $request) {
        if(!empty($request->user_id) && !empty($request->date) && $request->header('X-API-KEY')!= null) {
            if(User::where('api_token',$request->header('X-API-KEY'))->count() != 0) {
                //when some valid user accesses this api
                //check if the user_id exists in the users table
                if(User::where('id',$request->user_id)->count() != 0)
                    $user = User::where('id',$request->user_id)->first();
                else
                    return response()->json(['status' => 'failure', 'message' => 'User does not exist.']);
                if($user->can('edit-personal')) {
                    //user has permissions to view this data
                    //get the organisation details
                    $orgDetails = Organisation::where('id',$user->org_id)->first();
                    //end date will be the current date passed
                    //start date will be the start of the week or month
                    $endDate = new \DateTime($request->date);
                    if($orgDetails->period_unit == 'week') {
                        $year = explode('-',$request->date);
                        $sdWeekNo = clone $endDate;
                        $sdWeekNo = $sdWeekNo->format('W');
                        $startDate = new \DateTime();
                        $startDate = $startDate->setISODate($year[0],$sdWeekNo)->setTime(0,0);

                        // return response()->json(['period' => 'week','start_date' => $startDate->format('Y-m-d'), 'end_date' => $endDate->format('Y-m-d')]); //test
                    }
                    else if ($orgDetails->period_unit == 'month'){

                        return response()->json(['period' => 'month']); //test
                    }
                    else
                        //just in case the ordanisation's period_unit is not set
                        return response()->json(['status' => 'failure', 'message' => 'Organisation period unit not set.']);

                    //get all the user details from the locked_data table
                    $lockedData = Locked_Data::where('user_id',$request->user_id)->whereBetween('work_date',[$startDate, $endDate])->orderBy('work_date', 'DESC')->get();
                    // return response()->json(['count' => count($lockedData)]);
                    $data = [];
                    foreach ($lockedData as $ld) {
                        //handle total_time = null
                            $dayData = [];
                            $dayData['date'] = $ld->work_date;
                            $day = new \DateTime($ld->work_date);
                            $dayData['day'] = $day->format('D');
                            $startTime = new \DateTime($ld->start_time);
                            $dayData['start_time'] = $startTime->modify('-5 hour -30 minutes')->format('H:i');
                        if($ld->end_time != null) {
                            $endTime = new \DateTime($ld->end_time);
                            $dayData['end_time'] = $endTime->modify('-5 hour -30 minutes')->format('H:i');

                            // $dayData['total_time'] = $ld->total_time;
                        }
                        else {
                            //the day isnt over yet
                            $endTime = new \DateTime();
                            //set as the current time
                            $dayData['end_time'] = $endTime->modify('+5 hour +30 minutes')->format('H:i');
                            // $dayData['total_time'] = $this->getTimeDifference($ld->start_time,$endTime->format('Y-m-d H:i:s'));

                        }
                        $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
                        array_push($data,$dayData);
                    }
                    return response()->json(['status' => 'success','data' => $data]);

                }
                else {
                    return response()->json(['status' => 'failure', 'message' => 'You do not have the necessary permissions.']);
                }
            }
            else {
                return response()->json(['status' => 'failure', 'message' => 'You are not authorised.']);
            }
        }
        else {
            return response()->json(['status' => 'failure', 'message' => 'Some parameters are missing.']);
        }
    }
}
