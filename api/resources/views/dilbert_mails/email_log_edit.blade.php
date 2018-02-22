
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
						<p>On:  {{$user_data['modified_on']}}</p>
						@foreach($user_data['values'] as $values)
	                    	<p>{{$values['column_modified']}} 
	                    	 was changed from 
	                    	{{$values['old_value']}}
	                    	 to
	                    	{{$values['new_value']}}</p>
	                    @endforeach
						<p>of date {{$user_data['work_date']}}</p>
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
