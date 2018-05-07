@extends('layouts.email')	
@section('content') 
		<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="text-align: center; margin: auto; background-color: white; padding-bottom: 50px;" class="email-container">
		<tr>
			<td bgcolor="#ffffff" style="padding-bottom: 10px; text-align: center; padding-left: 30px;padding-right: 30px;">
				<h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; font-weight: bold; padding-top: 10px;padding-bottom: 10px;"> A Summary Of Your Week </h1>
			</td>
		</tr>
		<tr>
			<td bgcolor="#ffffff" align="center">
                    <img src="<?php echo $message->embed($violation_data['dilbertweekly']); ?>"  alt="dilbert" border="0" align="center"  class="g-img">
            </td>
		</tr>
		<tr>
			<td bgcolor="#ffffff" style="padding-top: 40px;padding-bottom: 10px; text-align: center;">
				<h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;"><span style="color:#282828a3;">Hi</span> {{$violation_data['name']}},</h1>
			</td>
		</tr>

		<tr>
			<td bgcolor="#ffffff" style="padding-top: 10px;padding-bottom: 40px; text-align: center;">
				<h3 style="margin: 0; font-family: sans-serif;  line-height: 125%; color: #333333; font-weight: normal;"><span style="color:#282828a3;">Your total hours for the week ending </span><span>{{date('jS F, Y', strtotime($violation_data['endDate']))}} </span></h3>
			</td>
		</tr>
		<!-- 2 Even Columns : BEGIN -->
		<tr>
		    <td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding: 0 10px 20px 10px">
		        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:600px; font-family: sans-serif;">
		            <tr>
		                <td align="left" valign="top" width="40%" style="padding-left:55px;padding-right: 15px;">
		                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left; background-color:#eeeeee4a; padding: 10px;padding-top: 15px;padding-bottom: 15px; border-radius: 5px;   ">
		                        <tr>
		                            <td style="text-align: center;">
		                               <span style="font-size:20px;">Your total work hours</span>
		                               @if($violation_data['violation_status'] == "true")
		                               <span style="color: red; font-size:35px;font-weight: bold;">
		                               	@else
		                               	<span style="color: #613eb0; font-size:35px;font-weight: bold;">
		                               	@endif
		                               	{{$violation_data['totalHours']}} <span>hrs</span></span>
		                            </td>
		                        </tr>
		                    </table>
		                </td>
		                <td align="left" valign="top" width="40%" style="padding-left:15px;padding-right: 55px;">
		                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left;background-color:#eeeeee4a;padding: 10px;padding-top: 15px;padding-bottom: 15px; border-radius: 5px;">
		                        <tr>
		                            <td style="text-align: center;">
		                                <span style="font-size:20px;">Your total lunch hours</span>
		                                <span style="color: #F0C60A; font-size:35px;font-weight: bold;">{{$violation_data['lunch_total']}} <span>hrs</span></span>
		                            </td>
		                        </tr>
		                    </table>
		                </td>
		            </tr>
		        </table>
		    </td>
		</tr>
                <!-- Two Even Columns : END -->

		<tr>
			<td bgcolor="#ffffff" style="padding-bottom: 0px;padding-top:0px; text-align: center;font-family: sans-serif;">
				<p style="color:#282828a3;">Take a look at your week's log:</p>
			</td>
		</tr>
			
		<tr>
			<td>
				<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="padding-left:50px;padding-right: 50px; text-align: center; margin: auto; background-color: white;/*box-shadow: 1px 2px 15px 0px #0000004d; */ " class="email-container">
				<tr style="height:50px;font-family: sans-serif;background-color: #eee; color: grey;">
					<th>Date</th>
					<th>Worked</th>
					<th>Lunch</th>
				</tr>
				@for($i = 0; $i < count($violation_data['totalTime']); $i++)
					@if($violation_data['weekStatus'][$i] == "Leave due to violation")
						<tr style="height:50px;font-family: sans-serif;color: red;background-color: white">
					@elseif($violation_data['weekStatus'][$i]=="Weekend")
						<tr style="height:50px;font-family: sans-serif;color: #04dada;background-color: white">
					@else
						<tr style="height:50px;font-family: sans-serif;color: grey;background-color: white">
					@endif

						<td style="border: 1px solid #eee;">{{ date('D, jS F', strtotime($violation_data['weekDate'][$i]))}}</td>
							@if($violation_data['totalTime'][$i]=="00:00" || $violation_data['totalTime'][$i]==NULL)
								<td style="border: 1px solid #eee;" colspan="2">{{$violation_data['weekStatus'][$i]}}</td>
							@else
								<td style="border: 1px solid #eee;">{{$violation_data['totalTime'][$i]}}<span>hr</span></td>
							@endif
						@if($violation_data['totalTime'][$i]!="00:00")
						<td style="border: 1px solid #eee;">
							@if(empty($violation_data['lunchSlot'][date('D', strtotime($violation_data['weekDate'][$i]))]))
								0
							@else
								{{$violation_data['lunchSlot'][date('D', strtotime($violation_data['weekDate'][$i]))]}}
							@endif 
							<span>hr</span>
						</td>
					@endif
					</tr>
				@endfor

			</table>
	</td>
</tr>
	<tr>
		<td style="padding-top: 10px; font-weight: bold;">
			<!-- <sub style="padding-left: 10px;color:#613eb0;font-size:30px; t">&#x2192;</sub> -->
			<a href="{{$violation_data['url']}}" style="color:#613eb0">View your full log here<sub><img style="padding-left: 5px;" src="<?php echo $message->embed($violation_data['arrowRight']); ?>" ></sub></a>
		</td>
	</tr>
<!-- 	<tr>
		<td>
			<hr style="border: 1px solid #eee; margin-left: 10px; margin-right: 10px; ">
		</td>
	</tr> -->
	<tr>
		<td style="padding-top: 20px; font-family: sans-serif;">
			<span style="color: #282828a3;">Please reply to this email if you see errors in your logs or have questions.<br/>
			<span style="color: #312f2fd1;">Thanks!</span> </span>
		</td>
	</tr>

</table>
<table style="background-color: white; width: 600px; text-align: center;">
	<tr>
		<td>
			<hr style="border: 1px solid #eee; margin-left: 10px; margin-right: 10px; ">
		</td>
	</tr>
</table>
<!-- Email Body : End -->
@endsection