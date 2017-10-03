<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Organisation_Meta;

class Organisation_Meta extends Model
{
    /**
     * fetches you the parameter value from the Organisation meta table
     * @param  $key   paramter name
     * @param  $orgId organisation id
     * @param  $grpId violation group id
     * @return returns value of $key
     */
    public function getParamValue($key,$orgId,$grpId) {
        $metaData =  Organisation_Meta::where(['org_id' => $orgId, 'group_id' => $grpId, 'key' => $key])->first();
        if($metaData->exists())	//return if single value
            return $metaData->value;
    }
}
