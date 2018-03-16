@extends('layouts.email')	
@section('content') 
	 <!-- Email Body : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;  background-color: white;" class="email-container">
            <!-- Main Content1 : BEGIN -->
            <!-- Dilbert Image : BEGIN -->
            <tr>
                <td bgcolor="#ffffff" align="center">
                    <img src="<?php echo $message->embed($violation_data['dilbert']); ?>"  alt="dilbert" border="0" align="center"  class="g-img">
                </td>
            </tr>
            <!--  Dilbert Image : END -->
            <tr>
                <td bgcolor="#ffffff" style="padding: 40px 40px 20px; text-align: center;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Hi {{$name}}</h1>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; text-align: center;">
                     <p style="margin: 0;">Total hours logged this week: <span style="font-weight: bold;"> {{$violation_data['rule_key_fields']['total_hrs_in_week']}}/ {{$violation_data['rule_rhs']['total_week_hours']}}</span> - i.e. <b>That's {{isset($violation_data['meta']['time_difference']) ? $violation_data['meta']['time_difference'] : ' ' }} short</b> of the required time <br/>
                     	This shortfall has triggered a leave. If you think there may be a mistake in the logs, please do bring it up. Happy to reverse it :)
            </tr>
            <!-- Main Content1 : End -->
            <tr>
	            <td bgcolor="#ffffff" align="center" valign="top" style="">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-right: 20px; padding-left: 20px;">
	                    <tr>
	                        <td class="stack-column-center">
                                 <a href="https://drive.google.com/open?id=0B17ClWYMGibaMHZiWnE4TEp3WlE">
                                    <img border="0" src="<?php echo $message->embed($violation_data['documentation']); ?>" style="width: 100%;">
                                </a>
	                        </td>
	                    </tr>
	                </table>
	            </td>
	        </tr>

    	</table>

		<table style="background-color: white; width: 600px;">
			<tr>
				<td>
					<hr style="border: 1px solid #eee; margin-left: 10px; margin-right: 10px; ">
				</td>
			</tr>
		</table>
    <!-- Email Body : END -->
@endsection