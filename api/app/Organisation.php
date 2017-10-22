<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use Symfony\Component\Console\Output\ConsoleOutput;

class Organisation extends Model
{
    //
    protected $table = 'organizations';

    /**
     * Once the user is created determines the the next url and the appropriate
     * data to be sent in the reponse.
     * @param  SocialiteObject $account   [description]
     * @param  $user_resp contains user_details, user_comm and user objects
     * @param  $response pre-initialised response array
     * @return response to be sent
     */
    public function getNextUrl($account,$user_resp,$response,$ip) {
        $output = new ConsoleOutput;

        // $user_resp['user'] = $user_resp['user']->first();
        // $email = $user_resp['user_comm']->first()->value;
        $email = $account->email;

        // $user_resp['user_details'] = $user_resp['user_details']->first();

        $user_resp['user_details'] = $user_resp['user_details']->first();
        // check if the organisation exists (this check is done for devMode)
        if(isset($account->user['domain'])) {
            $org = Organisation::where('domain',$account->user['domain']);
            $domain = $account->user['domain'];
        }
        else {
            $org = Organisation::where('domain','000');     // just to get an empty object
            $domain = "dev-mode-domain.com";
        }

        if($org->exists()) {
            if($user_resp['required_fields_filled']['filled_required'] == true)
                $dashFlag = true;
            else {
                if(!in_array('user_details-> org_id',$user_resp['required_fields_filled']['fields_to_be_filled']))
                    $dashFlag = true;
                else
                    $dashFlag = false;
            }
            if($dashFlag) {
            // if($user_resp['user_details']->org_id) {
                // go to dashboard
                $orgDetails = $org->first();
                $response['next_url'] = "/dashboard";
                $response['status'] = 200;
                // $response['message'] = "Go to dashboard.";
                $response['message'] = __('api_messages.goto_dashboard');
                $response['data'] = [
                    'name' => $user_resp['user']->name,
                    'user_id' => $user_resp['user']->id,
                    'userEmail' => $email,
                    'x_api_key' => $user_resp['user_details']->api_token,
                    'idle_time' => $orgDetails['idle_time'],
                    'ping_freq' => $orgDetails['ping_freq']
                ];
                return $response;
            }
            else {
                $orgDetails = $org->first();
                // join an organisation
                $response['next_url'] = "/join_organisation";
                $response['status'] = 200;
                $response['message'] = __('api_messages.join_organisation');
                $response['data'] = [
                    'email' => $email,
                    'user_id' => $user_resp['user']->id,
                    'x_api_key' => $user_resp['user_details']->api_token,
                    'company' => $orgDetails->name,
                    'domain' => $orgDetails->domain,
                    'timeZones' => array_merge(array($orgDetails->default_tz), unserialize($orgDetails->alt_tz)),    //merge default & alt
                    // 'timeZones' => $orgDetails->default_tz,
                ];
                return $response;
            }
        }
        else {
            // create a new organisation
            $response['next_url'] = "new_organisation";
            $response['status'] = 200;
            $response['message'] = __('api_messages.new_organisation');
            $output->writeln("count user_resp: ".count($user_resp));
            $output->writeln($user_resp['user']->id);
            $response['data'] = [
                'email' => $email,
                'user_id' => $user_resp['user']->id,
                'x_api_key' => $user_resp['user_details']->api_token,
                'domain' => $domain,
                'ip' => $ip,
            ];
            return $response;
        }
    }

    /**
     * return an array of all the users belonging to a particular organisation
     * @param  $orgId Organisation ID
     * @param  $filters filters that will be applied to the query (display_limit, page, sort_by, sort_order, status)
     * @return  array
     */
    public function getOrgUsers($orgId,$filters) {
        $orgUsers = DB::table('users')->join('user_details','users.id','=','user_details.user_id')->join('user_communications','users.id','=','user_communications.object_id')->where(['type' => 'email', 'org_id' => $orgId, 'status' => $filters['status']])->orderBy($filters['sortBy'],$filters['sortOrder'])->offset(((int)$filters['page'] - 1) * $filters['displayLimit'])->limit($filters['displayLimit'])->get();
        // $orgUsers = UserDetail::with('getUserFromDetails')->where('org_id',$orgId)->orderBy("getUserFromDetails.".$filters['sortBy'],$filters['sortOrder'])->offset(((int)$filters['page'] - 1) * $filters['displayLimit'])->limit($filters['displayLimit'])->get();

        // return name and role for now
        $users = [];
        foreach($orgUsers as $ou) {
            $user['id'] = $ou->user_id;
            // $user['name'] = $ou->getUserFromDetails()->first()->name;
            $user['name'] = $ou->name;
            $user['avatar'] = $ou->avatar;
            $user['role'] = User::find($ou->user_id)->getRoleNames()->first();
            $user['joining_date'] = $ou->joining_date;
            array_push($users,$user);
        }
        return $users;
    }
}
