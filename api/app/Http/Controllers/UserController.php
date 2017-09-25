<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use App\User;
use App\UserDetail;
use App\Organisation;
use App\Role;
use App\Permission;
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
        if($request->header('from')!= null && !empty($request->input('org_id')) && $request->header('X-API-KEY')!= null) {
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
                    if($request->input('filters.display_limit') != null)
                        $filters['displayLimit'] = $request->input('filters.display_limit');
                    if($request->input('filters.page') != null)
                        $filters['page'] = $request->input('filters.page');
                    if($request->input('filters.sort_by') != null)
                        $filters['sortBy'] = $request->input('filters.sort_by');
                    if($request->input('filters.sort_order') != null)
                        $filters['sortOrder'] = $request->input('filters.sort_order');
                    if($request->input('filters.status') != null)
                        $filters['status'] = $request->input('filters.status');
                    /**
                     * handle the other filters like status (where clause type)
                     */
                     $data['org_id'] = $request->input('org_id');
                     $data['org_logo'] = Organisation::where('id',$request->input('org_id'))->first()->logo;
                     $data['users'] = (new Organisation)->getOrgUsers($request->input('org_id'),$filters);
                     return response()->json(['status' => 200, "message" => "Organisations users returned.", "data" => $data]);
                }
                else {
                    return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
                }
            }
            else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authentication')]);
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
        // set the preferred locale
        if($locale == "default") {
            $userDets = UserDetail::where('user_id',$request->input('user_id'))->first();
            $locale = $userDets['lang'];
        }
        App::setLocale($locale);
        if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null && $request->header('from')!= null) {
            if(UserDetail::where(['api_token' => $request->header('X-API-KEY'), 'user_id' =>$request->header('from')])->count() != 0) {
                // when some valid user accesses this api check if the calling user has the right permissions
                $callingUser = User::where('id',$request->header('from'))->first();
                if($callingUser->can('edit-user')) {

                }
                else {
                    return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
                }
            }
            else {
                return response()->json(['status' => 400, 'message' => __('api_messages.authentication')]);
            }
        }
        else {
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        }
    }
}
