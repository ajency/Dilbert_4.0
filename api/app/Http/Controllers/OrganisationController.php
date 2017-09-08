<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

use App\User;
use App\Organisation;

class OrganisationController extends Controller
{
    public function joinOrAddOrganisation(Request $request) {
        if(isset($request->username) && isset($request->organisation) && $request->header('X-API-KEY')!= null) {    // parameter check
            if(User::where('api_token',$request->header('X-API-KEY'))->count() != 0) {  // authorised user check
                if($request->has('organisation.id')) {
                    // join organisation
                    // if organisation id is present link the user with that organisation
                    $orgDetails = Organisation::where('id',$request->input('organisation.id'))->get();
                    if(count($orgDetails) > 0) {
                        // the organisation id provided is valid
                        $orgData = $this->joinOrganisation($request->username,$request->input('organisation.id'));
                        return response()->json(['status' => 'success', 'message' => 'Organisation joined successfully.', 'data' => $orgData]);
                    }
                    else
                        return response()->json(['status' => 'failure', 'message' => 'Bad Organisation Id provided.']);
                }
                else {
                    // Add organisation
                    // add a new organisation and link the user to that organisation
                    $orgId = $this->addNewOrganisation($request);
                    $orgData = $this->joinOrganisation($request->username,$orgId);
                    return response()->json(['status' => 'success', 'message' => 'Organisation created and joined successfully.', 'data' => $orgData]);
                }
            }
            else
                return response()->json(['status' => 'failure', 'message' => 'You are not authorised.']);
        }
        else
            return response()->json(['status' => 'failure', 'message' => 'Some parameter are missing.']);
    }

    public function joinOrganisation($userName,$orgId) {
        //get the organisation details
        $orgDetails = Organisation::where('id',$orgId)->first();
        // update the org_id in user table and set timezone as default and is_active attribute as 1
        $user = User::where('email',$userName)->update(['org_id' => $orgDetails->id, 'timeZone' => $orgDetails->default_tz, 'is_active' => true]);
        // return the organisation data
        $orgData  = ['id' => $orgDetails->id, 'name' => $orgDetails->name];
        return $orgData;
    }

    public function addNewOrganisation(Request $request) {
        //validate if the passerd organisation details
        if($request->has(['organisation.name', 'organisation.domain', 'organisation.default_TZ', 'organisation.idle_time', 'organisation.default_language', 'organisation.ip', 'organisation.ip_type'])) {
            // if all the necesary parameters are provided
            $validation = $this->validate($request, [
                // 'organisation.name' => 'required | min:4 | regex:<([A-z0-9])+>',
                // 'organisation.domain' => 'required | regex:(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$',
                'organisation.default_TZ' => 'required',
                // 'organisation.idle_time' => 'required | min:1 | regex:/([0-9])+/',
                'organisation.default_language' => 'required',
                // 'organisation.ip' => 'required | regex:\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b',
                'organisation.ip_type' => 'required | min:1'
            ]);
            // if($validation->fails()) {
            //     return response()->json($validator->messages());
            // }
            // // $errors = new MessageBag();
            // $errors = $validator->errors();
            // return $errors;

            $alt_TZ = array();
        	$ip = array();
        	$ip_type = array();

        	if(count($request->input('organisation.alt_TZ')) > 0){ // checks if alternate Time zones are selected
        		for($i = 0;$i < count($request->input('organisation.alt_TZ')); $i++){
        			$alt_TZ[$i] = $request->input('organisation.alt_TZ')[$i];
        		}
        	}

        	if(count($request->input('organisation.ip')) > 0){ // 1st value is null of IP
        		for($i = 0;$i < count($request->input('organisation.ip')); $i++ ){
        			$ip[$i] = $request->input('organisation.ip')[$i];
        			$ip_type[$i] = $request->input('organisation.ip')[$i];
        		}
        	}
            $org = new Organisation;
        	$org->name = $request->input('organisation.name');
        	$org->domain = $request->input('organisation.domain');
        	// $org->logo = $request->input('organisation.logo');
        	$org->default_tz = $request->input('organisation.default_TZ');
        	$org->alt_tz = serialize($alt_TZ);//$alt_TZ;//serialize($request->alt_TZ);
            $org->idle_time = $request->input('organisation.idle_time');
            $org->default_lang = $request->input('organisation.default_language');
        	$org->ip_lists = serialize($ip);//serialize($request->ip);
        	$org->ip_status = serialize($ip_type);// unserialize() to read from database
        	$org->save();

            $orgId = Organisation::where('name',$request->input('organisation.name'))->first();
            return $orgId->id;

        }
        else {
            return request()->json(['status' => 'success', 'message' => 'Not all organisation parameters are provided.']);
        }
        return response()->json(['message' => 'inside add new organisation']);
    }
}
