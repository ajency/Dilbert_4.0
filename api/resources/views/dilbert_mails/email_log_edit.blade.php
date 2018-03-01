
	 <!-- Email Body : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto;  background-color: white;" class="email-container">
            <!-- Main Content1 : BEGIN -->           
            <tr>
                <td bgcolor="#ffffff" style="padding: 40px 40px 20px; text-align: center;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;">Hi {{$user_data['name']}}</h1>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 0 40px 40px; font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555; text-align: center;">
                	<p>{{date('F jS, Y', strtotime($user_data['modified_on']))}}</p>
					@foreach($user_data['values'] as $values)
						@if($values['column_modified']!="")
                    		<p>{{str_replace("_"," ",$values['column_modified'])}}
                    		was changed from
                    	@endif 

                    	@if($values['column_modified']=="status")
           					<!-- if status changed to leave -->
           					{{$values['old_value']}} to {{$values['new_value']}}

	                    @elseif($values['column_modified']=="start_time" || $values['column_modified']=="end_time")
                    		<!-- if value changed is start or end time -->
                    		@if($values['new_value']=="" && $values['old_value']=="" || date('H:i',strtotime($values['new_value']))=="00:00" && date('H:i',strtotime($values['old_value']))=="00:00")
	                    		00:00 to 00:00
	                    	@elseif($values['new_value']=="" || date('H:i',strtotime($values['new_value']))=="00:00")
		                    	{{date('h:i:s a m/d/Y', strtotime($values['old_value']))}}
		                    	to
		                    	00:00
	                    	@elseif($values['old_value']=="" || date('H:i',strtotime($values['old_value']))=="00:00")
		                    	00:00
		                    	to
		                    	{{date('h:i:s a m/d/Y', strtotime($values['new_value']))}}
                    		@else
		                    	{{date('h:i:s a m/d/Y', strtotime($values['old_value']))}}
		                    	to
		                    	{{date('h:i:s a m/d/Y', strtotime($values['new_value']))}}
                    		@endif
                    	@elseif($values['column_modified']=="total_time")
                    		<!-- if value changed is total hours -->
                    		{{date('H\h i\m', strtotime($values['old_value']))}}
	                    	to
	                    	{{date('H\h i\m', strtotime($values['new_value']))}}
	                    @endif
	                @endforeach
                    @if(isset($user_data['status']))
                    	<p>Your status is {{$user_data['status']}} </p>
                    @endif
					<p>of date {{date('F jS, Y', strtotime($user_data['work_date']))}}</p>
                    <p>was modified by {{$user_data['modified_by']}}</p>       
                </td>
            </tr>
            <!-- Main Content1 : End -->
    	</table>

		<table style="background-color: white; width: 600px;">
			<tr>
				<td>
					<hr style="border: 1px solid #eee; margin-left: 10px; margin-right: 10px; ">
				</td>
			</tr>
		</table>
    <!-- Email Body : END -->
