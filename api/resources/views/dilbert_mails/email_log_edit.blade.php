@extends('layouts.email')   
@section('content') 
        <center>
                 <!-- Email Body : BEGIN -->

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="text-align: center; margin: auto; background-color: white; padding-bottom: 50px;" class="email-container">
            <tr>
                <td bgcolor="#ffffff" style="padding-bottom: 10px; text-align: center; padding-left: 30px;padding-right: 30px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; font-weight: bold; padding-top: 10px;padding-bottom: 10px;">Edit Logs </h1>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" align="center">
                        <img src="<?php echo $message->embed($violation_data['editLog']); ?>"  alt="Edit Log dilbert" border="0" align="center"  class="g-img">
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding-top: 10px;padding-bottom: 10px; text-align: center;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 24px; line-height: 125%; color: #333333; font-weight: normal;"><span style="color:#282828a3;">Hi</span>  {{$violation_data['name']}},</h1>
                </td>
            </tr>

            <tr>
                <td bgcolor="#ffffff" style="padding-top: 10px;padding-bottom: 40px; text-align: center;">
                    <h3 style="margin: 0; font-family: sans-serif;  line-height: 125%; color: #333333; font-weight: normal;"><span style="color:#282828a3;"> Your 
                        <span style="font-weight: bold;">
                            @php
                                $count = 0;
                                foreach($violation_data['values'] as $values) {
                                    $count++;
                                    echo str_replace("_"," ",$values['column_modified']);
                                    if($count == sizeof($violation_data['values']) - 1) {
                                        echo " <span style='font-weight: normal;'>and</span> ";
                                    }
                                    elseif($count != sizeof($violation_data['values'])) {
                                        echo "<span style='font-weight: normal;'>,</span> ";
                                    }
                                }
                            @endphp
                    </span>
                was changed </span><span style="color:#282828a3;">for </span><span style="font-weight: bold;">{{date('F jS, Y', strtotime($violation_data['work_date']))}} </span></h3>
                </td>
            </tr>
            <tr>
                <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="padding-left:50px;padding-right: 50px; text-align: center; margin: auto; background-color: white;/*box-shadow: 1px 2px 15px 0px #0000004d; */ " class="email-container">
                        <tr style="height:20px;font-family: sans-serif;color: grey;background-color: white;font-size: 12px;">
                            <td style="">(Start time)</td>
                            <td style="">(End time)</td>
                            <td style="">(Total time)</td>
                        </tr>
                        <tr style="height:20px;font-family: sans-serif;color: #613eb0;background-color: white;font-weight: bold;font-size: 18px;">
                            <td style="">
                                {{date('h:i:s a', strtotime($violation_data['startTime']))}}
                            </td>
                            <td style="border-right: 2px solid #eee;border-left: 2px solid #eee;">{{date('h:i:s a', strtotime($violation_data['endTime']))}}</td>
                            <td style="">{{date('H\h i\m', strtotime($violation_data['totalTime']))}}</td>
                        </tr>

                        <tr style="height:20px;font-family: sans-serif;color: grey;background-color: white;font-size: 12px;">
                            @php $start=0; $end=0; $total=0; @endphp
                            @foreach($violation_data['values'] as $values)
                                @if($values['column_modified']=="start_time" && $start==0 )
                                    <td style="">{{date('h:i:s a', strtotime($values['old_value']))}}</td>
                                    @php $start=1 @endphp
                                    @continue
                                @elseif($start!=1)
                                    <td style=""> {{date('h:i:s a', strtotime($violation_data['startTime']))}}</td>
                                @endif
                                @if($values['column_modified']=="end_time" && $end==0)
                                    <td style="">{{date('h:i:s a', strtotime($values['old_value']))}}</td>
                                     @php $end=1 @endphp
                                    @continue
                                @elseif($end!=1)
                                    <td style=""> {{date('h:i:s a', strtotime($violation_data['endTime']))}}</td>
                                @endif
                                @if($values['column_modified']=="total_time" && $total==0)
                                    <td style="">{{date('H\h i\m', strtotime($values['old_value']))}}</td>
                                     @php $total=1 @endphp
                                    @continue
                                @elseif($total!=1)
                                    <td style="">{{date('H\h i\m', strtotime($violation_data['totalTime']))}}</td>
                                @endif
                            @endforeach
                        </tr>
                    </table>
                </td>
            </tr>
             @foreach($violation_data['values'] as $values)
             @if($values['column_modified']=="status")
            <tr>
                <td style="padding-top: 30px;font-family: sans-serif;">
                    <span>Your status changed to</span>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 0px; font-family: sans-serif;">
                    <h3><span style="color:#282828a3"> {{$values['old_value']}} </span> <img style="padding-left: 5px;" src="D:\work\dilb_combo_fix\Dilbert_4.0\api\resources\views\dilbert_mails\dilb_weekly_arrow.jpg"><span style="font-weight: bold;padding-left: 10px;"> {{$$values['new_value']}}</span></h3>
                </td>
            </tr>
            @endif
            @endforeach
            <tr>
                <td style="font-family: sans-serif;color: #282828a3; padding-top: 30px;">
                    <sub><span><sup>__</sup> Was modified on <span>{{date('F jS, Y', strtotime($violation_data['modified_on']))}}</span> by <span> {{$violation_data['modified_by']}} </span></span></sub>
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

    </center>
@endsection
