
import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the UserSummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-content',
  templateUrl: 'user-summary-content.html'
})
export class UserSummaryContentComponent {

  text: string;
  user_summary_contentdata:any;
    weekBucketdata:any;
    userdata:any;
    param1:any;
    user_id:any;
    temp:any;
    datalength:any;
    datalength1:any;
    dummyarray:any;
    period_unit_data:any;
    weekbucketlength:any;

  constructor( public events : Events,
               public zone : NgZone,
               public modalCtrl : ModalController,
               public popoverCtrl : PopoverController,
               public authguard : AuthguardProvider,
               public appServiceProvider : AppServiceProvider,
               public appGlobalsProvider : AppGlobalsProvider,
               public storage : Storage) {
    console.log('Hello UserSummaryContentComponent Component');
    this.text = 'Summary';

  	this.events.subscribe("update:summarydatanew",(data12) => {
      	console.log("user-summary-content inside subscribe data---------------");
      	this.user_summary_contentdata=data12;
        console.log("here------------------");
        console.log(this.user_summary_contentdata);
        console.log(this.user_summary_contentdata.newdata.summary.length);
        this.datalength=this.user_summary_contentdata.newdata.summary.length;

        console.log(this.user_summary_contentdata.newdata.user.joining_date+"joining date");
        let i=0; 
        if(this.datalength !=0)
        {
          for(i=0;i<this.datalength;i++)
          {
            console.log(this.user_summary_contentdata.newdata.summary[i].work_date);
            if(this.user_summary_contentdata.newdata.user.joining_date > this.user_summary_contentdata.newdata.summary[i].work_date){
              this.user_summary_contentdata.newdata.summary[i].leave_status='Not joined';
            }
            if(this.user_summary_contentdata.newdata.summary[i].violations.length !=0){
             for(var j=0;j<this.user_summary_contentdata.newdata.summary[i].violations.length;j++){
              console.log(this.user_summary_contentdata.newdata.summary[i].violations[j].type);
              if(this.user_summary_contentdata.newdata.summary[i].violations[j].type=="late_alert"){
                if(this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.start_time != this.user_summary_contentdata.newdata.summary[i].start_time){
                  console.log("Logs Changed");
                  this.user_summary_contentdata.newdata.summary[i].violations[j].type="Logs Changed start_time";
                  console.log("start time changed from"+this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.start_time +"To "+this.user_summary_contentdata.newdata.summary[i].start_time);
                }
              }
               if(this.user_summary_contentdata.newdata.summary[i].violations[j].type=="minimum_hrs_of_day"){
                if(this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.total_hrs_in_day != this.user_summary_contentdata.newdata.summary[i].total_time){
                  console.log("Logs Changed");
                  this.user_summary_contentdata.newdata.summary[i].violations[j].type="Logs Changed total_time";
                  console.log("total time changed from"+this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.total_hrs_in_day +"To "+this.user_summary_contentdata.newdata.summary[i].total_time);
                }
              }

             }
            }
          }

        }





  	  });
  //period_unit_info


  this.events.subscribe("update:weekBucketdata",(weekBucketdata) => {
     console.log(" week inside subscribe data---------------");
     this.weekBucketdata=weekBucketdata;
     console.log("this is  weekbucketdata");
     console.log(this.weekBucketdata);
     console.log(this.weekBucketdata.length);
     this.weekbucketlength=this.weekBucketdata.length;
   });

  this.events.subscribe("update:period_unit_info",(data) => {
    console.log(" week inside subscribe data---------------");
    this.period_unit_data=data;
    console.log("this is  weekbucketdata");
    console.log(this.period_unit_data);
   // console.log(this.user_summary_contentdata.newdata.user.name);
   });



  }

  timeconvert(time,date){

    var tempdate=date+" "+time;
    var x= moment(tempdate).format('LT');

    return x;
  }
  // testfunction(data){
  //   console.log(data);
  // }
}
