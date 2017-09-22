<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null) {
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
        if(!empty($request->user_id) && !empty($request->input('filters.date_range')) && $request->header('X-API-KEY')!= null) {
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
