<?php

namespace App\Http\Controllers\Ajency\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use Socialite;
use App\User;
use App\Organisation;
use Exception;
use Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

use Symfony\Component\Console\Output\ConsoleOutput;

/* Plugin Access Headers */
use Ajency\User\Ajency\socialaccount\SocialAccountService;
use Ajency\User\Ajency\userauth\UserAuth;

class SocialAuthController extends Controller {
    public function urlSocialAuthRedirect($provider) { // for Provider authentication -> Provider = ['Google', 'Facebook']
        //Session::put('url.failed', URL::previous());
        return Socialite::driver($provider)->redirect();
    }

    public function urlSocialAuthCallback(SocialAccountService $service, Request $request, $provider) { // after 'Provider' authentication & redirection

        /*$url = Session::get('url.failed', url('/'));
        Session::forget('url.failed');*/
        $userauthObj = new UserAuth;
        $output = new ConsoleOutput();
        if (! $request->input('code')) {
            return redirect(config('aj_user_config.social_failure_redirect_url')."?login=true&message=social_permission_denied"); // Redirect to Fail user defined URL
        } else {
            $account = Socialite::driver($provider)->stateless()->user(); /* trying to use socialite on a laravel with socialite sessions deactivated */
        }

        $social_data = $service->getSocialData($account, $provider);
        $valid_response = $userauthObj->validateUserLogin($social_data["user"], $provider);

        /*
         "$response" => Returns [
            'status' -> Status of the Response,
            'user' -> User Object from DB,
            'authentic_user' -> If the Logged-In source of the User is Authentic (as in If it is "SocialAccount" then it is "Authentic" by Default; else If "Email Signup", then "Email verification" is necessary & if verified, then the account is "Authentic".),
            'required_fields_filled' -> Flag that defines if the required fields are Filled by User or Not
         ]
        */

        if($valid_response["status"] == "success" || $valid_response["message"] == "no_account") {
            if ($valid_response["authentic_user"]) { // If the user is Authentic, then Log the user in

                if($valid_response["user"]) { // If $valid_response["user"] == None, then Create/Update the User, User Details & User Communications
                    $user_resp = $userauthObj->getUserData($valid_response["user"]);
                } else {
                    $user_resp = $userauthObj->updateOrCreateUser($social_data["user"], [], $social_data["user_comm"]);
                }

                if($user_resp["user"]) {
                    return ;
                } else {
                    return redirect(config('aj_user_config.social_failure_redirect_url'));//."?message=");
                }
            }
        } else { //status == "error"
            return redirect(config('aj_user_config.social_failure_redirect_url')."?login=true&message=".$valid_response["message"]); // Redirect to Fail user defined URL
        }
    }



    public function apiSocialAuth(Request $request, $provider) {
        // try {
            $output = new ConsoleOutput();
            // response template
            $response = array("next_url" => "", "status" => 400, "message" => "", "data" => []);
            $userauthObj = new UserAuth;
            $service = new SocialAccountService;
            $token = $request->token;//"ya29.Glu3BER1pDE1i7Y77B7IiDo_He-Z-zcsZqs193WTR57qTGO4Lw3a2XnGjJO_PLjGGs4H-Qvjexh_KdEuNCWL1SjRfyQoiXe0oJfbBJg3BC6LL22FE1Onwjfm7GC9";

            $output->writeln("apiSocialAuth");

            $account = Socialite::driver($provider)->userFromToken($token);
            $social_data = $service->getSocialData($account, $provider);

            $output->writeln("");
            $output->writeln("SocialAuthController - Social Data");
            $output->writeln(json_encode($social_data));
            $output->writeln("");

            $valid_response = $userauthObj->validateUserLogin($social_data["user"], $provider);

            $output->writeln("SocialAuthController - valid data: ".json_encode($valid_response));

            if($valid_response["status"] == "success" || $valid_response["message"] == "no_account") {
                if ($valid_response["authentic_user"]) { // If the user is Authentic, then
                    // do pre user creation checks
                    if($this->preChecks($account)) {
                        $userDetails = [
                            'avatar' => $account->getAvatar(),
                            'lang' => 'en', //default en
                            'joining_date' => date('Y-m-d'),
                            'api_token' => str_random(60),
                        ];

                        $output->writeln("");
                        $output->writeln("SocialAuthController - user_details before passing");
                        $output->writeln(json_encode($userDetails));
                        $output->writeln("");

                        if(!$valid_response["user"]) { // If $valid_response["user"] == None, then Create/Update the User, User Details & User Communications
                            $user_resp = $userauthObj->updateOrCreateUser($social_data["user"], $userDetails, $social_data["user_comm"]);
                        } else {
                            $user_resp = $userauthObj->getUserData($valid_response["user"]);
                        }

                        $output->writeln("");
                        $output->writeln("SocialAuthController - user_resp");
                        $output->writeln(json_encode($user_resp));
                        $output->writeln("");

                        $output->writeln(count($user_resp['user_details']));

                        return response()->json($this->getNextUrl($account,$user_resp,$response));

                    }
                    else {
                        $response['next_url'] = "/login";
                        $response['status'] = 400;
                        $response['message'] = "Domain does not exist on gmail.";
                        return response()->json($response);
                    }

                    // if($user_resp["status"] == "success") {
                    //     if ($valid_response["required_fields_filled"]) { // If the required fields are filled
                    //         return response()->json(array("next_url" => "", "status" => 200, "message" => "", "data" => "")); // Data should have JSON of USer, User Details & User Communication
                    //     } else { // Required fields are not Filled
                    //         return response()->json(array("next_url" => "", "status" => 200, "message" => "", "data" => ""));
                    //     }
                    // } else {
                    //     return response()->json(array("next_url" => "", "status" => 400, "message" => "", "data" => ""));
                    // }
                } else { // User account is not Authenticated
                    return response()->json(array("next_url" => "", "status" => 403, "message" => $valid_response["message"])); // Unauthorized
                }
        } else { //status == "error"
            return response()->json(array("next_url" => "", "status" => 400, "message" => "")); // Bad Request
        }

        // } catch (Exception $e) {

        // }
    }

    /**
     * Check whether a user should be created or no.
     * @param account Socialite object containing all the account information
     * @return bool true = success/false = failure
     */
    public function preChecks($account) {
        // Check if the domain is a valid gmail domain
        if(isset($account->user['domain']))
            return true;
        else
            return false;
    }

    /**
     * Once the user is created determines the the next url and the appropriate
     * data to be sent in the reponse.
     * @param  SocialiteObject $account   [description]
     * @param  $user_resp contains user_details, user_comm and user objects
     * @param  $response pre-initialised response array
     * @return response to be sent
     */
    public function getNextUrl($account,$user_resp,$response) {
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
        $output->writeln(json_encode($user_resp["required_fields_filled"]));
        $output->writeln("");

        $user_resp['user_details'] = $user_resp['user_details']->first();
        // check if the organisation exists
        $org = Organisation::where('domain',$account->user['domain']);
        if($org->exists()) {
            // if($user_resp['user']->required_fields_filled['field_required']) {
            if($user_resp['required_fields_filled']['filled_required']) {
                // go to dashboard
                $response['next_url'] = "/dashboard";
                $response['status'] = 200;
                $response['message'] = "Go to dashboard.";
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
                $response['message'] = "Join an organisation.";
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
            $response['message'] = "Create a new organisation.";
            $output->writeln("count user_resp: ".count($user_resp));
            $output->writeln($user_resp['user']->id);
            $response['data'] = [
                'email' => $email,
                'user_id' => $user_resp['user']->first()->id,
                'x_api_key' => $user_resp['user_details']->api_token,
                'domain' => $account->user['domain'],
                'ip' => $_SERVER['REMOTE_ADDR'],
            ];
            return $response;
        }
    }
}
