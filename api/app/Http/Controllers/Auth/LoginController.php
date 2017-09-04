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
        $org = Organisation::where('domain',$userDetails->user['domain']);
        if(isset($userDetails->user['domain'])) {   // if domain is present
            if($org->exists()) {
                $arraySocial = $this->createOrGetUser($userDetails);
                $orgDetails = $org->first();
                $user = $arraySocial[0];
                $status = $arraySocial[1];
                if($status == "exists") {
                    return response()->json(['message' => 'success']);
                }
                else if($status == "present") {   //join organisation
                    // $company = $orgDetails[0]->name;
                    // $domain = $orgDetails[0]->domain;
                    // $userEmail = $user->email;
                    // $timeZones = array($org[0]->default_tz);// default time zone
                    // $timeZones = array_merge($timeZones, unserialize($org[0]->alt_tz));//merge default & alt
                    return response()->json(['message' => 'Inside join organisation']);
                }
            }
            else {  // add organisation
                return response()->json(['message' => 'Inside add organisation']);
            }
        }
        else {  //if the domain doesnt exist
            return response()->json(['status' => 'error', 'message' => 'Domain doesnt exist']);
        }
    }

    public function createOrGetUser(ProviderUser $userDetails) {
        $user = User::whereEmail($userDetails->getEmail())->first();
        $org = Organisation::where('domain',$userDetails->user["domain"])->get();
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
            return response()->json(['msg' => 'user created'], 200);
        }
        else if($user->org_id == 0) {   // safe-point, just incase user account is created but not linked with any organization, then redirect him/her to Join Organization page
            $status = "present";
        }
        return array($user, $status);
    }
}
