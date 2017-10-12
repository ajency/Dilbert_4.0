<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganisationMeta extends Model
{
    /**
     * fetches you the parameter value from the Organisation meta table
     * @param  $key   paramter name
     * @param  $orgId organisation id
     * @param  $grpId violation group id
     * @return returns value of $key
     */
    public function getParamValue($key,$orgId,$grpId) {
        $metaData =  OrganisationMeta::where(['organisation_id' => $orgId, 'group_id' => $grpId, 'key' => $key])->first();
        if(count($metaData))	//return if single value
            return $metaData->value;
        else
            return null;
    }

    /**
     * returns all role's meta
     * @param  [type] $orgId oragnisation id
     * @param  [type] $role  role
     * @return associative array of the role' meta
     */
    public function getAllRoleMeta($orgId, $role) {
        $roleMeta = OrganisationMeta::where('key','like','%'.$role)->get();
        $metaData = [];
        // create a associative array from result
        foreach($roleMeta as $rm) {
            $metaData[$rm->key] = $rm->value;
        }
        return $metaData;
    }
}
