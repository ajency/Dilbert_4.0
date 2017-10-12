<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\OrganisationMeta;

class ViolationApp extends Model
{
    /**
     * creates a formatted violation data object for the package
     * @param  [type] $userData  all the user details (UserAuth obj)
     * @param  [type] $keyFields violation key fields (key => value)
     * @param  $rhsFields  rhs field keys
     * @param  $mailLists  contains the cc and bcc lists( only roles)
     * @return formatted violation data object
     */
    public function createFormattedViolationData($userData,$keyFields,$rhsFields,$mailLists) {
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

        // populate the cc list
        $cc_list = [];
        foreach($mailLists['cc_list'] as $cc) {
            $ccEmail = (new OrganisationMeta)->getParamValue($cc,$userDetails['org_id'],0);
            if($ccEmail != null)
                array_push($cc_list,$ccEmail);
        }
        $violation_data['cc_list'] = $cc_list;

        // populate the bcc list
        $bcc_list = [];
        foreach($mailLists['bcc_list'] as $bcc) {
            $bccEmail = (new OrganisationMeta)->getParamValue($bcc,$userDetails['org_id'],0);
            if($ccEmail != null)
                array_push($bcc_list,$bccEmail);
        }
        $violation_data['bcc_list'] = $bcc_list;

        $data['violation_data'] = $violation_data;

        // rule_key_fields
        $data['rule_key_fields'] = $keyFields;

        // rule_rhs
        foreach($rhsFields as $rhsf) {
            $rule_rhs[$rhsf] = (new OrganisationMeta)->getParamValue($rhsf,$userDetails['org_id'],$user['violation_grp_id']);
        }
        $data['rule_rhs'] = $rule_rhs;
        return $data;
    }
}
