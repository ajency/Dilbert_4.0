<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
        $output->writeln("");
        $output->writeln("getNextUrl");
        $output->writeln("");

        // $user_resp['user'] = $user_resp['user']->first();
        $email = $user_resp['user_comm']->first()->value;

        $output->writeln("Email");
        $output->writeln($email);
        $output->writeln("");

        // $user_resp['user_details'] = $user_resp['user_details']->first();

        $output->writeln("getnexturl - user_details");
        $output->writeln(json_encode($user_resp["user_details"]));
        $output->writeln("");

        $output->writeln("getnexturl - required_fields_filled");
        // $output->writeln(json_encode($user_resp["required_fields_filled"]));
        $output->writeln($user_resp["required_fields_filled"]["filled_required"]);
        $output->writeln("");

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
                $response['next_url'] = "/dashboard";
                $response['status'] = 200;
                // $response['message'] = "Go to dashboard.";
                $response['message'] = __('api_messages.goto_dashboard');
                $response['data'] = [
                    'user_id' => $user_resp['user']->first()->id,
                    'userEmail' => $email,
                    'x_api_key' => $user_resp['user_details']->api_token,
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
                    // 'timeZones' => array_merge(array($orgDetails->default_tz), unserialize($orgDetails->alt_tz)),    //merge default & alt
                    'timeZones' => $orgDetails->default_tz,
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
                'user_id' => $user_resp['user']->first()->id,
                'x_api_key' => $user_resp['user_details']->api_token,
                'domain' => $domain,
                'ip' => $ip,
            ];
            return $response;
        }
    }
}
