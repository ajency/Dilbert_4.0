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
                    <p style="margin: 0;">You worked  <span style="font-weight: bold;"> 
                    {{str_replace(":"," hr ",$violation_data['worked_hours'])}} m</span> today <br>
                    That’s way less than the minimum of {{str_replace(":", " hr ", $violation_data['minimum_hrs_in_day'])}}m you should put in on any given day. This shortfall has triggered a leave. If you think there may be a mistake in the logs, please do bring it up. Happy to reverse it :)<br>
                	</p>
                </td>
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
	        <tr>
	        	  <!-- Main Content2 : BEGIN -->
	            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 10px;">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
	                    <tr>
	                    	<td style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; padding: 0 10px 10px; text-align: center;" >
								<p>
									To help you understand what we think (also laid out in the Ajency.in handbook):<br> 
									“For it to be a work day, it has to be a <span style="font-weight: bold;">minimum of 5 work hours</span>. Anything less than that is essentially a leave. At the same time, anything more than 10 work hours per day does not count (less than 5 is too short to do meaningful work and more than 10 is too long to do good work).”
								</p>
	                        </td>
	                       
	                    </tr>
	                </table>
	            </td>
	              <!-- Main Content2 : End -->
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