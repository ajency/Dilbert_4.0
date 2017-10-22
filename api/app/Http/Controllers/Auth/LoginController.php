<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Http\Requests;

use Laravel\Socialite\Contracts\User as ProviderUser;
use Socialite;

use App\User;
use App\Organisation;

use Symfony\Component\Console\Output\ConsoleOutput;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticateUser(Request $request) {
        // get the user details from the token provided
        $token = $request['token'];
        $userDetails = Socialite::driver('google')->userFromToken($token);
        //check if the organisation exists
        if(isset($userDetails->user['domain'])) {   // if domain is present
            $org = Organisation::where('domain',$userDetails->user['domain']);
            if($org->exists()) {
                $arraySocial = $this->createOrGetUser($userDetails);
                $orgDetails = $org->first();
                $user = $arraySocial[0];
                $status = $arraySocial[1];
                if($status == "exists") {
                    return response()->json(['status' => 'success', 'code' => 'dash', 'message' => 'Go to dashboard', 'data' => ['user_id' => $user->id, 'userEmail' => $user->email, 'x_api_key' => $user->api_token]]);
                }
                else if($status == "present") {   //join organisation
                    $company = $orgDetails->name;
                    $domain = $orgDetails->domain;
                    $userEmail = $user->email;
                    $user_id = $user->id;
                    $xak = $user->api_token;
                    $timeZones = array($orgDetails->default_tz);// default time zone
                    $timeZones = array_merge($timeZones, unserialize($orgDetails->alt_tz));//merge default & alt
                    return response()->json(['status' => 'success', 'code' => 'join', 'message' => 'Join organisation', 'data' => compact('user_id', 'company', 'domain', 'userEmail', 'timeZones', 'xak')]);
                }
            }
            else {  // add organisation
                $arraySocial = $this->createOrGetUser($userDetails);
                $user = $arraySocial[0];
                $userEmail = $user->email;
                $user_id = $user->id;
                $xak = $user->api_token;
                // $status = "new";
                $domain = $userDetails->user['domain'];
                $ip = $_SERVER['REMOTE_ADDR'];
                return response()->json(['status' => 'success', 'code' => 'new', 'message' => 'Add new organisation', 'data' => compact('user_id', 'userEmail', 'ip', 'domain', 'xak')]);
            }
        }
        else {  //if the domain doesnt exist
            return response()->json(['status' => 'failure','message' => 'Domain does not exist']);
        }
    }

    public function createOrGetUser(ProviderUser $userDetails) {
        $user = User::whereEmail($userDetails->getEmail())->first();
        $org = Organisation::where('domain',$userDetails->user["domain"])->get();
        // status of the organisation
        $status = "exists";
        if (!$user) {
            $user = new User;
            $user->name = $userDetails->getName();
            $user->email = $userDetails->getEmail();
            $user->password = 'user';
            $user->avatar = $userDetails->getAvatar();
            $user->lang = 'en'; //default en
            // $user->timeZone = "India"
            $user->acd = date('Y-m-d');
            $user->org_id = 0;
            $user->role = 'employee';
            $user->api_token = str_random(60);
            $user->gender = (isset($userDetails->gender)) ? $userDetails->gender: "-";
            // $user->dob = (isset($userDetails->birthday)) ? $userDetails->birthday : "-";
            $user->is_active = false;
            $user->save();
            $status = 'present';
        }
        else if($user->org_id == 0) {   // safe-point, just incase user account is created but not linked with any organization, then redirect him/her to Join Organization page
            $status = "present";
        }
        return array($user, $status);
    }
}
