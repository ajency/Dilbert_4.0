<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use App\User;
use App\UserDetail;
use App\Data_Changes;

use Symfony\Component\Console\Output\ConsoleOutput;


class DataChangesController extends Controller
{
    public function viewLockedDataChanges(Request $request, $locale = "default") {
        $output = new ConsoleOutput();
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(count($request->all()) != 0 && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                /** [ NOTE ]
                 * Right now assuming user_ids will always be passed and the date range is always work_date range. handle when both are given.
                 * Also handle locked__datas and logs. Right now locked__datas assumed
                 */
                $data = [];
                // get the start and the end date
                $start = $request->input('filters.work_date_range.start');
                if($request->input('filters.work_date_range.end') != null)
                    $end = $request->input('filters.work_date_range.end');
                else
                    $end = $request->input('filters.work_date_range.start');
                // table to consider
                $table = "locked__datas";
                // get the type - work_date/modified_by
                $dateType = "work_date";
                // for each user fetch the changes data
                foreach($request->user_id as $user) {
                    // first create the user object
                    $changesData['users'] = [
                        'id' => $user,
                        'name' => User::find($user)->name,
                        'avatar' => UserDetail::where('user_id',$user)->first()->avatar
                    ];
                    // fetch all the changes for that date range
                    $output->writeln("Data Changes".json_encode((new Data_Changes)->getDataChanges($request->header('from'), $user, $table, [$dateType, $start, $end])));
                    $changesData['history'] = (new Data_Changes)->getDataChanges($request->header('from'), $user, $table, [$dateType, $start, $end]);
                    array_push($data,$changesData);
                }

                return response()->json(['status' => 200, 'message' => __('api_messages.user_data_changes'), 'data' => $data]);
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }
}
