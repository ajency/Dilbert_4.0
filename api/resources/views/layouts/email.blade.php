<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body style="background-color: #eee;">
	<center style="background-color: #eee;">
		<!-- Header Start -->
		<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto; background-color: white;" class="email-container">
			<tr>
				<td style="padding-top:30px;padding-left: 30px; padding-bottom: 30px;  text-align: left">
					<a href="https://ajency.in" target="_blank">
						<img src="<?php echo $message->embed($violation_data['logo']); ?>" style="width: 100px;">
					</a>
				</td>	
			</tr>
		</table>
		<!-- Header End -->
 
@yield('content')

    <!-- Email Footer Start -->
	     <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="width: 600px; font-family: sans-serif; color: #888888; font-size: 12px; line-height: 140%; background-color: white;">
	        <tr>
	            <td style="padding-bottom:30px; width: 100%; font-family: sans-serif; font-size: 12px; line-height: 140%; text-align: center; color: #888888;" class="x-gmail-data-detectors">
	            	<a href="https://ajency.in" style="text-decoration: none; color:grey;" target="_blank">
                    	<h1>Ajency.in</h1>
                	</a>
                    <span>(C) 2018 Digital Dwarves Pvt Ltd. All Rights Reserved</span>
	            </td>
	        </tr>
	    </table>
	    <!-- Email Footer End -->
	</center>

</body>
</html>