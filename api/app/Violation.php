<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Organisation_Meta;

class Violation extends Model
{
    /**
     * creates a formatted violation data object for the package
     * @param  [type] $userData  all the user details
     * @param  [type] $keyFields violation key fieds
     * @param  $rhsFields  rhs field keys
     * @return formatted violation data object
     */
    public function createFormattedViolationData($userData,$keyFields,$rhsFields) {
        $data = [];
        // all user data
        $user = $userData['user'];
        $userDetails = $userData['user_details']->first();
        $userComm = $userData['user_comm'];

        // generate the violation_data part
        $violation_data['who_id'] = $user['id'];
        $violation_data['who_type'] = $user->getRoleNames()->first(); // role
        $violation_data['who_meta']['email'] = $userComm->where('type','email')->first()->value;
        $violation_data['who_meta']['name'] = $user['name'];
        $data['violation_data'] = $violation_data;

        // rule_key_fields
        $rule_key_fields = $keyFields;
        $data['rule_key_fields'] = $rule_key_fields;

        // rule_rhs
        foreach($rhsFields as $rhsf) {
            $rule_rhs[$rhsf] = (new Organisation_Meta)->getParamValue($rhsf,$userDetails['org_id'],$user['violation_grp_id']);
        }
        $data['rule_rhs'] = $rule_rhs;
        return $data;
    }
}
