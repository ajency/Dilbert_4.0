<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Helper extends Model
{
    /**
     * gives the time in milliseconds
     * @return [type] [description]
     */
    function currentTimeInMilliseconds() {
        $mt = explode(' ', microtime());
        return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
    }
}
