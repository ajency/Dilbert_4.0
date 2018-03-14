
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
    date:any;
    

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




    // this.date=

  	this.events.subscribe("update:summarydatanew",(data12) => {
      	console.log("user-summary-content inside subscribe data---------------");
      	this.user_summary_contentdata=data12;
        console.log("here------------------");
        console.log(this.user_summary_contentdata);

        console.log(this.user_summary_contentdata.newdata.summary.length);
        this.datalength=this.user_summary_contentdata.newdata.summary.length;
        console.log(this.user_summary_contentdata.newdata.summary[this.datalength-1]);
        console.log(this.user_summary_contentdata.newdata.user.joining_date+"joining date");
        // let i=0; 
        // if(this.datalength !=0)
        // {
        //   for(i=0;i<this.datalength;i++)
        //   {
        //     console.log(this.user_summary_contentdata.newdata.summary[i].work_date);
        //     if(this.user_summary_contentdata.newdata.user.joining_date > this.user_summary_contentdata.newdata.summary[i].work_date){
        //       this.user_summary_contentdata.newdata.summary[i].leave_status='Not joined';
        //     }
        //     if(this.user_summary_contentdata.newdata.summary[i].violations.length !=0){
        //      for(var j=0;j<this.user_summary_contentdata.newdata.summary[i].violations.length;j++){
        //       console.log(this.user_summary_contentdata.newdata.summary[i].violations[j].type);
        //       if(this.user_summary_contentdata.newdata.summary[i].violations[j].type=="late_alert"){
        //         if(this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.start_time != this.user_summary_contentdata.newdata.summary[i].start_time){
        //           console.log("Logs Changed");
        //           this.user_summary_contentdata.newdata.summary[i].violations[j].type="Logs Changed start_time";
        //           console.log("start time changed from"+this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.start_time +"To "+this.user_summary_contentdata.newdata.summary[i].start_time);
        //         }
        //       }
        //        if(this.user_summary_contentdata.newdata.summary[i].violations[j].type=="minimum_hrs_of_day"){
        //         if(this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.total_hrs_in_day != this.user_summary_contentdata.newdata.summary[i].total_time){
        //           console.log("Logs Changed");
        //           this.user_summary_contentdata.newdata.summary[i].violations[j].type="Logs Changed total_time";
        //           console.log("total time changed from"+this.user_summary_contentdata.newdata.summary[i].violations[j].violation_meta.total_hrs_in_day +"To "+this.user_summary_contentdata.newdata.summary[i].total_time);
        //         }
        //       }


        //      }
        //     }
        //     if(this.user_summary_contentdata.newdata.summary[i].changes !=0){
        //       console.log("logs changed ");
        //     }

        //   }

        // }





  	  });
  this.events.subscribe("update:weekBucketdata",(weekBucketdata) => {
     console.log(" week inside subscribe data---------------");
     this.weekBucketdata=weekBucketdata;
     console.log("this is  weekbucketdata");
     console.log(this.weekBucketdata);
     console.log(this.weekBucketdata.length);
     this.weekbucketlength=this.weekBucketdata.length;
   });

    this.events.subscribe("update:summarydate",(summarydate) => {
        this.date=summarydate;

          console.log(this.date);

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

 navigateToDashboard(data){
  console.log(this.appGlobalsProvider.newsummary_params.param1);
  // if(this.appGlobalsProvider.newsummary_params.param1 !='' || this.appGlobalsProvider.newsummary_params.param1 != undefined ){
  //   this.date=this.appGlobalsProvider.newsummary_params.param1.start_date;
  // }
      // this.events.subscribe("update:summarydate",(summarydate) => {
      //   this.date=summarydate;

      //     console.log(this.date);

      //    });


  console.log(data);
  if((data== '') || (data == undefined) ){ 

    if((this.appGlobalsProvider.newsummary_params.param1=='')||(this.appGlobalsProvider.newsummary_params.param1==undefined)){
      if(this.date ==""|| this.date==undefined){
      this.date=this.formatDate(new Date());
    }
    }
    else{
      if(this.date==""||this.date==undefined){
        this.date=this.appGlobalsProvider.newsummary_params.param1.start_date;
      }
    }
         let dash_param1 = {
          user_id : this.user_summary_contentdata.newdata.user.user_id,
          start_date : this.date,
          period_unit : this.appGlobalsProvider.period_unit
        }

    let dash_param2 = {
          summary_date : this.date
    }

      this.appGlobalsProvider.dashboard_params.param1 = dash_param1;
      this.appGlobalsProvider.dashboard_params.param2 = dash_param2;
      this.events.publish('app:navroot', 'dashboard'); 
 

  }
  else{
    console.log(" data present");

     this.date=data.work_date;
    let dash_param1 = {
          user_id : this.user_summary_contentdata.newdata.user.user_id,
          start_date : this.date,
          period_unit : this.appGlobalsProvider.period_unit
        }

    let dash_param2 = {
          summary_date : this.date
    }

      this.appGlobalsProvider.dashboard_params.param1 = dash_param1;
      this.appGlobalsProvider.dashboard_params.param2 = dash_param2;
      this.events.publish('app:navroot', 'dashboard'); 
  }
 

 }


formatDate(date) {
    let temp = new Date(date);
    let month = (temp.getMonth() + 1) < 10 ? '0'+(temp.getMonth() + 1).toString()  : (temp.getMonth() + 1).toString();
    let day = temp.getDate() < 10 ? '0' + temp.getDate().toString() : temp.getDate().toString();
    return temp.getFullYear() + '-' + month + '-' + day;
  }



}
