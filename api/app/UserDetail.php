<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    // The inverse of getUserDetails
    public function getUserFromDetails() {
        return $this->belongsTo('App\User','user_id','id');
    }
}
