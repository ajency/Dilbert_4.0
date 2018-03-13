
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="text-align: center; margin: auto; background-color: white; padding-bottom: 50px;" class="email-container">
	<tr>
		<td bgcolor="#ffffff" style="padding-bottom: 10px; text-align: center; padding-left: 30px;padding-right: 30px;">
			<h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; font-weight: bold; padding-top: 10px;padding-bottom: 10px;">Your Weekly Summary </h1>
		</td>
	</tr>
	<tr>
		<td bgcolor="#ffffff" style="padding-top: 40px;padding-bottom: 10px; text-align: center;">
			<h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Hi {{$user_data['name']}}</h1>
		</td>
	</tr>

	<tr>
		<td bgcolor="#ffffff" style="padding-top: 10px;padding-bottom: 40px; text-align: center;">
			<h3 style="margin: 0; font-family: sans-serif;  line-height: 125%; color: #333333; font-weight: normal;">Your total hours for the week ending on 
				<span>{{date('F jS, Y', strtotime($user_data['endDate']))}} are</span></h3>
		</td>
	</tr>
		<!-- 2 Even Columns : BEGIN -->
	<tr>
		<td bgcolor="#ffffff" align="center" height="100%" valign="top" width="100%" style="padding: 0 10px 40px 10px">
		    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:600px; font-family: sans-serif;">
		        <tr>
		            <td align="left" valign="top" width="50%" style="padding-left:5px;padding-right: 5px;">
		                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left; background-color:#eeeeee4a; padding: 10px;padding-top: 15px;padding-bottom: 15px; border-radius: 5px;">
		                    <tr>
		                        <td style="text-align: center;">
		                           <span style="font-size:20px;">Your Total work Hours</span>
		                          @if($user_data['totalHours'] < $user_data['minHrs'])
		                            <span style="color: red; font-size:50px;">{{$user_data['totalHours']}} <span>hr</span></span>
		                          @else
		                            <span style="color: blue; font-size:50px;">{{$user_data['totalHours']}}<span>hr</span></span>
		                          @endif
		                        </td>
		                    </tr>
		                </table>
		            </td>
		             <td align="left" valign="top" width="50%" style="padding-left:5px;padding-right: 5px;">
		                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size: 14px; text-align: left;background-color: #eeeeee4a;padding: 10px;padding-top: 15px;padding-bottom: 15px; border-radius: 5px;">
		                    <tr>
		                        <td style="text-align: center;">
		                            <span style="font-size:20px;">Your Total lunch Hours</span>
		                            <span style="color: blue; font-size:50px;">{{$user_data['lunch_total']}}<span>hr</span></span>
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
		<td bgcolor="#ffffff" style="padding-bottom: 10px;padding-top:10px; text-align: center;font-family: sans-serif;">
			<h3>Take a look at your current weeks log.</h3>
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
			@for($i = 0; $i < 7; $i++)
				@if($user_data['totalHours'] < $user_data['minHrs'] AND $user_data['totalTime'][$i]!=NULL)
					<!-- if total time for day is grater than required time -->
					@if((int)$user_data['totalTime'][$i] >= $user_data['default_hours'])
						<tr style="height:50px;font-family: sans-serif;color: grey;background-color: #eeeeee30">
					@else
						<tr style="height:50px;font-family: sans-serif;color: grey;background-color: #eeeeee30; color:red;">
					@endif
				@else
					<tr style="height:50px;font-family: sans-serif;color: grey;background-color: #eeeeee30">
				@endif

				<!-- date and day -->
				<td style="border: 1px solid #eee;">{{ date('D, jS F', strtotime($user_data['weekDate'][$i]))}}</td>
				<!-- if there is no total time display status -->
					@if($user_data['totalTime'][$i]==NULL)
						<td style="border: 1px solid #eee;">
						{{$user_data['weekStatus'][$i]}}
						</td>
					@else
						<td style="border: 1px solid #eee;">
							{{$user_data['totalTime'][$i]}}
							<span>hr</span>	
						</td>			
					@endif

				<!-- Lunch slot -->

				<td style="border: 1px solid #eee;">
					@if(empty($user_data['lunchSlot'][date('D', strtotime($user_data['weekDate'][$i]))]))
						0
					@else
						{{$user_data['lunchSlot'][date('D', strtotime($user_data['weekDate'][$i]))]}}
					@endif
					<span>hr</span></td>
			</tr>
			@endfor

			</table>
		</td>
	</tr>
	<tr>
		<td style="padding-top:20px;">
			<a href="{{$user_data['url']}}"> View you full logs here </a>
		</td>
	</tr>
	<tr>
		<td style="padding-top: 40px; font-family: sans-serif;">
			<span>Just reply to this email if you see some errors in your logs or have questions.<br/>
			Thanks! </span>
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