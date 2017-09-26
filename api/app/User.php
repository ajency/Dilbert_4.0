<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Spatie\Permission\Traits\HasRoles;

use Ajency\User\Ajency\userauth\UserAuth;
use App\Role;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;   //for role management
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'lang', 'acd', 'orgId', 'role', 'api_token', 'gender', 'dob'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['deleted_at'];

    public function getUserDetails() {
        return $this->hasOne('App\UserDetail', 'user_id');
    }

    public function updateUserDetails($request, $user) {
        $userData = ["username" => $user->email];
        $userDetails = [];
        $userComm = [];
        if(isset($request->details))
            $userDetails = $request->details;
        if(isset($request->status)) {
            $userData = ["username" => $user->email, "status" => $request->status];
        }
        if(isset($request->role)) {
            // check if that role exists
            if(Role::where('name',$request->role)->exists()) {
                // append it to the userdata so that it can be handled by the package
                $userData['roles'] = $request->role;
            }
            else {
                return ['status' => 400, "message" => "Role does not exist"];
            }
        }
        if(isset($request->permissions)) {
            // [TODO] check if all permission are valid
            $userData['permissions'] = ["edit-user","super-user"];/*$request->permissions;*/
        }
        $data = (new UserAuth)->updateOrCreateUser($userData,$userDetails,$userComm);
        return ["status" => 200, "message" => "User details edit successful.", "data" => $data];
    }

}
