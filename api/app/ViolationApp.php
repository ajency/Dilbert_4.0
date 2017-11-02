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
     * @param  $rhsFields  rhs field keys (only keys)
     * @param  $mailList  contains the cc and bcc lists( only roles)
     * @return formatted violation data object
     */
    public function createFormattedViolationData($userData,$keyFields,$rhsFields,$mailList) {
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

        // // populate the cc list
        // $cc_list = [];
        // foreach($mailLists['cc_list'] as $cc) {
        //     $ccEmail = (new OrganisationMeta)->getParamValue($cc,$userDetails['org_id'],0);
        //     if($ccEmail != null)
        //         array_push($cc_list,$ccEmail);
        // }
        // $violation_data['cc_list'] = $cc_list;
        //
        // // populate the bcc list
        // $bcc_list = [];
        // foreach($mailLists['bcc_list'] as $bcc) {
        //     $bccEmail = (new OrganisationMeta)->getParamValue($bcc,$userDetails['org_id'],0);
        //     if($ccEmail != null)
        //         array_push($bcc_list,$bccEmail);
        // }
        // $violation_data['bcc_list'] = $bcc_list;

        // populate the mailing lists
        $mlList = [];
        foreach($mailList as $ml) {
            $mlEmail = (new OrganisationMeta)->getParamValue($ml,$userDetails['org_id'],0);
            if($mlEmail != null)
                $mlList[$ml] = $mlEmail;
        }
        $violation_data['mailing_list'] = $mlList;

        $data['violation_data'] = $violation_data;

        // rule_key_fields
        $data['rule_key_fields'] = $keyFields;

        // rule_rhs
        if(count(array_filter(array_keys($rhsFields),'is_string')) == 0) {  // this means that they are not key value pairs
            foreach($rhsFields as $rhsf) {
                $rule_rhs[$rhsf] = (new OrganisationMeta)->getParamValue($rhsf,$userDetails['org_id'],$user['violation_grp_id']);
            }
            $data['rule_rhs'] = $rule_rhs;
        }
        else {
            $data['rule_rhs'] = $rhsFields;
        }
        return $data;
    }

    /**
     * gives a formatted violations data
     * @param  [type] $violations data returned from getViolations()
     * @return [type]             [description]
     */
    public function getFormattedViolationData($violations) {
        $formattedViolations = [];
        foreach($violations as $violation) {
            $vioData['type'] = $violation['type'];
            $vioData['user_id'] = $violation['who_id'];
            $vioData['user_meta'] = $violation['who_meta'];
            $vioData['violation_meta'] = $violation['whom_meta'];
            array_push($formattedViolations,$vioData);
        }
        return $formattedViolations;
    }
}
