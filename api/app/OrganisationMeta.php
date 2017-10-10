<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganisationMeta extends Model
{
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
