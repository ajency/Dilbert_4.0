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
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Hi Nutan</h1>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; text-align: center;">
                    <p style="margin: 0;">We see that Dilbert has logged your start time as:<span style="font-weight: bold;"> {{$start}}</span> <br/>
                    It may be a one-off day, but just a small note to let you know what we think,<br/>
                    as also laid out in the Ajency.in Handbook.</p>
                </td>
            </tr>
            <!-- Main Content1 : End -->
            <tr>
	            <td bgcolor="#ffffff" align="center" valign="top" style="">
	                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="padding-right: 20px; padding-left: 20px;">
	                    <tr>
	                        <td class="stack-column-center">
                                <a href="Ajency.inAtoZ.pdf" download="Ajency.inAtoZ.pdf">
                                    <img border="0" src="<?php echo $message->embed($email); ?>" style="width: 100%;">
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
									"Start your day any time after <span style="font-weight: bold;">9:30 am</span> and end by <span style="font-weight: bold;">8:30 pm</span>.<br/>
									We suggest starting the day latest by <span style="font-weight: bold;">11 am</span>. There may be days when you <br/> want to start your day late but don't make it a regular practice.
								</p>
								<p>
									For very simple reason, we work in a team.<br/>
									A team where each person is dependent on the other, so there has to be an <br/> 
									overlap of at least 80% of your time. While it is okay some times,<br/>
									please  don't make it a regular practice"
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