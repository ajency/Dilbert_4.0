<?php
 /*this is a common method for sending mails to users
 data : users data
 subject : whatyour mail subject should be
 to_list : whom is the mail for
 cc_list : list of people in cc list (optional)
 bcc_list : list of people in bcc list (optional)
 */

function send_mails($data,$subject,$to_list,$cc_list=NULL,$bcc_list=NULL)
{
	
	if (!empty($cc_list) && !empty($bcc_list)) 
	 {
	 	//if bcc cc list is given
	 	Mail::send( $data['redirect_url'], ['user_data' => $data], function($message) use($to_list,$cc_list,$bcc_list,$subject){
	                 $message->to($to_list)
	                 ->cc($cc_list)
	                 ->bcc($bcc_list)
	                 ->subject($subject);
	         });
	}
	elseif (empty($cc_list) && !empty($bcc_list)) {
		//if cc list is empty
		Mail::send( $data['redirect_url'], ['user_data' => $data], function($message) use($to_list,$cc_list,$subject){
	                 $message->to($to_list)
	                 ->bcc($bcc_list)
	                 ->subject($subject);
	         });
	}
	elseif (!empty($cc_list) && empty($bcc_list)) {
		//if bcc list is empty
		Mail::send( $data['redirect_url'], ['user_data' => $data], function($message) use($to_list,$cc_list,$subject){
	                 $message->to($to_list)
	                 ->cc($cc_list)
	                 ->subject($subject);
	         });
	}
	else
	{
		Mail::send( $data['redirect_url'], ['user_data' => $data], function($message) use($to_list,$cc_list,$subject){
	                 $message->to($to_list)
	                 ->subject($subject);
	         });
	}
}