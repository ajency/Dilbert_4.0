<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use App\User;
use App\UserDetail;
use App\Organisation;
use App\Role;
use App\Permission;
use App\Locked_Data;
use Ajency\User\Ajency\userauth\UserAuth;
use Symfony\Component\Console\Output\ConsoleOutput;

class UserController extends Controller
{
    /**
     * Displays all the users in the organisation
     * @param  Request $request
     * @param locale Language to be used
     * @return users from an orgnisation
     */
    public function displayUsers(Request $request, $locale = "default") {
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if($request->header('from')!= null && !empty($request->input('filters.org_id')) && $request->header('X-API-KEY')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api check if the calling user has the right permissions
                $callingUser = User::where('id',$request->header('from'))->first();
                if($callingUser->can('edit-user')) {
                    // check for all the optional parameter to be taken into consideration
                    $filters['displayLimit'] = 50;
                    $filters['page'] = 0;
                    $filters['sortBy'] = "name";
                    $filters['sortOrder'] = "asc";
                    $filters['status'] = "active";
                    if($request->input('display_limit') != null)
                        $filters['displayLimit'] = $request->input('display_limit');
                    if($request->input('page') != null)
                        $filters['page'] = $request->input('page');
                    if($request->input('sort_by') != null)
                        $filters['sortBy'] = $request->input('sort_by');
                    if($request->input('sort_order') != null)
                        $filters['sortOrder'] = $request->input('sort_order');
                    if($request->input('status') != null)
                        $filters['filters.status'] = $request->input('status');
                    /**
                     * handle the other filters like status (where clause type)
                     */
                     $data['org_id'] = $request->input('filters.org_id');
                     $data['org_logo'] = Organisation::where('id',$request->input('org_id'))->first()->logo;
                     $data['users'] = (new Organisation)->getOrgUsers($request->input('org_id'),$filters);
                     return response()->json(['status' => 200, "message" => __('api_messages.org_users_returned'), "data" => $data]);
                }
                else {
                    return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
                }
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }

    /**
     * edit the users details
     * @param  Request $request [description]
     * @param $userCode a reference code to identify the user
     * @param  locale Language to be used for the response
     * @return response success / failure
     */
    public function editUserDetails(Request $request, $userCode, $locale = "default") {
        $output = new ConsoleOutput;
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if($request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api check if the calling user has the right permissions
                $callingUser = User::where('id',$request->header('from'))->first();
                if($callingUser->can('edit-user')) {
                    $user = User::find($userCode);
                    if($user != null) {
                        $response = (new User)->updateUserDetails($request,$user);
                        // if user exists
                        if(isset($request->delete) && $request->delete == true) {
                            // deleting a record
                            $user->delete();
                            return response()->json(["status" => 200, "message" => __('api_messages.user_deleted')]);
                        }
                        return response()->json($response);
                    }
                    else if(isset($request->delete) && $request->delete == false) {
                        // the user was soft deleted and needs to retrieved
                        $trashedUser = User::withTrashed()->where('id',$userCode);
                        if($trashedUser != null) {
                            $trashedUser->restore();
                        }
                        // now that user is restored we update the details
                        $user = User::find($userCode);
                        $response = (new User)->updateUserDetails($request,$user);
                        $response['message'] = __('api_messages.user_restored').$response['message'];
                        return response()->json($response);
                    }
                    else
                        return response()->json(["status" => 400, "message" => __('api_messages.user_dne')]);
                }
                else {
                    return response()->json(["status" => 403, "message" => __('api_messages.authorisation')]);
                }
            }
            else {
                return response()->json(['status' => 401, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }

    /**
     * reset users api_token | used to force users to login again
     * @param [type] $users array of users - if empty all users will be considered
     */
    public function resetApiTokens($users) {
        // if there are no users mentioned, take all users
        if(count($users) == 0) {
            $users = User::select('id')->get();
        }
        // access all user details
        $usersDetails = UserDetail::whereIn('user_id',$users)->get();

        // create a new api_token and save
        foreach($usersDetails as $user) {
            $user->api_token = str_random(60);
            $user->save();
        }
    }

    public function workFromHome(Request $request, $locale = "default") {
        // set the preferred locale
        if($locale == "default")
            App::setLocale('en');
        else
            App::setLocale($locale);

        if($request->header('X-API-KEY')!= null && $request->header('from')!= null && $request->has('users')) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api check if the calling user has the right permissions
                $callingUser = User::where('id',$request->header('from'))->first();

                // work from home can be marked by an 'admin' or 'hr' for all users
                // and a 'member' for themselves
                if($callingUser->hasRole(['admin', 'hr']) || (count($request->users) == 1 && $request->users[0] == $request->header('from'))) {
                    foreach($request->users as $user) {
                        foreach($user['user_id'] as $userId) {
                            $pastDays = [];
                            $days = array_pluck($user['days'],'work_from_home','work_date');
                            // fetch all locked_data entries
                            $lockedDataEntries = Locked_Data::where('user_id',$userId)->whereIn('work_date',array_keys($days))->get();
                            // set the flag for each locked entry
                            foreach($lockedDataEntries as $lockedEntry) {
                                array_push($pastDays,$lockedEntry->work_date);
                                $lockedEntry->work_from_home = $days[$lockedEntry->work_date];
                                $lockedEntry->save();

                                // [TODO] recalculate the total hours

                            }

                            // handle future days
                            $futureDays = array_values(array_diff(array_keys($days),$pastDays));

                            // make entry for the future days
                            // currently entry will be made only for current day
                            // [TODO] function in user activity model to make an entry in the locked__datas table for current day

                            // update the global setting for the users
                            if(isset($user['work_from_home'])) {
                                // mark the user as a 'work_from_home' user
                                $userObj = User::find($userId);
                                $userObj->work_from_home = $user['work_from_home'];
                                $userObj->save();
                            }
                        }
                    }
                    return response()->json(['status' => 200, 'message' => __('api_messages.work_from_home_success')]);
                }
                else {
                    return response()->json(["status" => 403, "message" => __('api_messages.authorisation')]);
                }
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
