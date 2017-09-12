<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Locked_Data;
use App\Log;
use App\Organisation;
use App\Role;
use App\Permission;

use Symfony\Component\Console\Output\ConsoleOutput;


class LockedDataController extends Controller
{
    //
    public function periodData(Request $request) {
        $output = new ConsoleOutput();
        if(!empty($request->user_id) && !empty($request->date_range) && $request->header('X-API-KEY')!= null) {
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
                    // check if the start and end dates are given
                    if($request->has('date_range.start') && $request->has('date_range.end')) {
                        // if both start and end are given
                        $startDate = new \DateTime($request->input('date_range.start'));
                        $endDate = new \DateTime($request->input('date_range.end'));
                    }
                    else if($request->has('date_range.start')) {
                        // if only start is given
                        if(!empty($request->period_unit))
                            $periodUnit = $request->period_unit;
                        else
                            $periodUnit = $orgDetails->period_unit;
                        //startDate and endDate will be the first and the last day of the org_period
                        $date = explode('-',$request->input('date_range.start'));
                        if($periodUnit == 'week') {
                            $sdWeekNo = new \DateTime($request->input('date_range.start'));
                            $sdWeekNo = $sdWeekNo->format('W');
                            $startDate = new \DateTime();
                            $startDate = $startDate->setISODate($date[0],$sdWeekNo)->setTime(0,0);
                            $endDate = clone $startDate;
                            $endDate->modify('+6 days');
                        }
                        else if ($periodUnit == 'month'){
                            $startDate = new \DateTime($date[0].'-'.$date[1].'-01');
                            $endDate = new \DateTime($date[0]."-".$date[1]."-".cal_days_in_month(CAL_GREGORIAN,$date[1],$date[0]));
                        }
                        else
                            //just in case the ordanisation's period_unit is not set
                            return response()->json(['status' => 'failure', 'message' => 'Organisation period unit not set.']);
                    }

                    //get all the user details from the locked_data table
                    // return response()->json(['count' => count($lockedData)]);
                    $data = [];
                    $data['user_id'] = $request->user_id;

                    //get latest data (current data)
                    $currentData = Locked_Data::where(['user_id' => $request->user_id, 'work_date' => date('Y-m-d')])->first();
                    $cDayData = [];
                    $cDayData['work_date'] = date('Y-m-d');
                    if(count($currentData) && $currentData->start_time != null) { // handles leaves (leaves plus sundays)
                        $startTime = new \DateTime($currentData->start_time);
                        $cDayData['start_time'] = $startTime->format('H:i');
                        if($currentData->end_time != null) {
                            $endTime = new \DateTime($currentData->end_time);
                            $cDayData['end_time'] = $endTime->format('H:i');
                            $cDayData['status'] = '';
                        }
                        else {
                            //the day isnt over yet
                            $endTime = new \DateTime();
                            //set as the current time
                            $cDayData['end_time'] = $endTime->modify('+5 hour +30 minutes')->format('H:i');
                            $cDayData['status'] = $this->getCurrentStatus($request->user_id,date('Y-m-d'));
                            $output->writeln($this->getCurrentStatus($request->user_id,date('Y-m-d')));
                        }
                        $cDayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
                        $cDayData['leave_status'] = 'Present';
                        //violation status - for now dummy
                        $cDayData['violation_count'] = 0;
                    }
                    else {
                        // it's a leave
                        $cDayData['status'] = '';
                        $cDayData['leave_status'] = 'Leave';
                        $cDayData['start_time'] = '';
                        $cDayData['end_time'] = '';
                        $cDayData['total_time'] = 0;
                        $cDayData['violation_count'] = 0;
                    }
                    $data['current'] = $cDayData;

                    // user's data for the particular period
                    $lockedData = Locked_Data::where('user_id',$request->user_id)->whereBetween('work_date',[$startDate->format('Y-m-d'), $endDate->format('Y-m-d')])->orderBy('work_date', 'DESC')->get();
                    $periodData = [];
                    foreach ($lockedData as $ld) {
                        // handle total_time = null
                        $dayData = [];
                        $dayData['work_date'] = $ld->work_date;
                        $day = new \DateTime($ld->work_date);
                        $startTime = new \DateTime($ld->start_time);
                        if($ld->start_time != null)  // handles leaves
                            $dayData['start_time'] = $startTime->format('H:i');
                        else {
                            // it's a leave
                            $dayData['status'] = '';
                            $dayData['leave_status'] = 'Leave';
                            $dayData['start_time'] = '';
                            $dayData['end_time'] = '';
                            $dayData['total_time'] = 0;
                            $dayData['violation_count'] = 0;
                            array_push($periodData,$dayData);
                            continue;
                        }
                        if($ld->end_time != null) {
                            $endTime = new \DateTime($ld->end_time);
                            $dayData['end_time'] = $endTime->format('H:i');
                            $dayData['status'] = '';
                        }
                        else {
                            //the day isnt over yet
                            $endTime = new \DateTime();
                            //set as the current time
                            $dayData['end_time'] = $endTime->modify('+5 hour +30 minutes')->format('H:i');
                            $dayData['status'] = $this->getCurrentStatus($request->user_id,date('Y-m-d'));
                        }
                        $dayData['total_time'] = date_diff($startTime,$endTime)->format('%h:%i');
                        $dayData['leave_status'] = 'Present';
                        //violation status - for now dummy
                        $dayData['violation_count'] = 0;
                        array_push($periodData,$dayData);
                    }
                    $data['periodData'] = $periodData;
                    return response()->json(['status' => 'success', 'message' => "User's periodic data.", 'data' => $data]);

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

    // put this in the model
    public function getCurrentStatus($userId,$workDate) {
        $usersLogs = Log::where(['user_id' => $userId, 'work_date' => $workDate])->orderBy('created_at','desc')->first();
        if($usersLogs->to_state == 'New Session')
            return 'Offline';
        else
            return $usersLogs->to_state;
    }
}
