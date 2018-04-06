
import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';

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
    view:any;
    

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
    this.events.subscribe("update:searchdata",(data) => {
      this.user_summary_contentdata=data;
      this.test();
  });

  	this.events.subscribe("update:summarydatanew",(data12) => {
      	console.log("user-summary-content inside subscribe data---------------");
      	this.user_summary_contentdata=data12;
        console.log("here------------------");
        console.log(this.user_summary_contentdata);
         console.log(this.user_summary_contentdata.lengh);
        console.log(this.user_summary_contentdata.newdata);
        console.log(this.user_summary_contentdata.newdata[0]);
        this.test();

        for(var x=0;x<this.user_summary_contentdata.newdata.length;x++){
          for (var j = 0; j < this.user_summary_contentdata.newdata[x].summary.length; j++) {
              if(this.user_summary_contentdata.newdata[x].summary[j].violations.length !=0){
                for(var t=0; t <this.user_summary_contentdata.newdata[x].summary[j].violations.length;t++){
                  if(this.user_summary_contentdata.newdata[x].summary[j].violations[t].type=="minimum_hrs_of_week"){
                      console.log(this.user_summary_contentdata.newdata[x].user.name);
                      console.log(this.user_summary_contentdata.newdata[x].summary[j].violations[t].type);
                  }
                }
              }
          }
        }

  	  });

  this.events.subscribe("update:weekBucketdata",(weekBucketdata) => {
     console.log(" week inside subscribe data---------------");
     this.weekBucketdata=weekBucketdata;
     console.log("this is  weekbucketdata");
     console.log(this.weekBucketdata);
     console.log(this.weekBucketdata.length);
     this.weekbucketlength=this.weekBucketdata.length;
   });

  this.events.subscribe("update:mobileviewsummary1",(dummy) => {
      console.log(dummy);
      this.viewmobilesummary();

   });
    this.events.subscribe("update:summarydate",(summarydate) => {
       console.log("summary data here");
        this.date=summarydate;
        console.log(this.date);
   });

  this.events.subscribe("update:period_unit_info",(data) => {
    console.log(" week inside subscribe data---------------");
    this.period_unit_data=data;
    console.log(this.period_unit_data);
   });



  }


  timeconvert(time,date){

    var tempdate=date+" "+time;
    var x= moment(tempdate).format('LT');

    return x;
  }
  navigateToDashboardUser(data,userdata){
    console.log(data);
    console.log(userdata);
         let dash_param1 = {
      user_id : userdata.user.user_id,
      start_date : data.work_date,
      period_unit : this.appGlobalsProvider.period_unit
    }

    let dash_param2 = {
      summary_date :  data.work_date
    }
    console.log(dash_param2.summary_date);
    this.appGlobalsProvider.dashboard_params.param1 = dash_param1;
    this.appGlobalsProvider.dashboard_params.param2 = dash_param2;
    this.events.publish('app:navroot', 'dashboard');

  }

 navigateToDashboard(data){
  console.log(this.appGlobalsProvider.newsummary_params.param1);
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
    console.log("data present");

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

goBackToSummary(){
  $('.maincontainer').addClass('test');
  let dummy;
  this.events.publish("update:mobileviewusersidebar", dummy);
}

// mobileviewsummary
viewmobilesummary(){
   $('.maincontainer').removeClass('test');
}

    getDayDate(date: string, option: number): string {
    var text: string;
    switch (option) {
      case 1:
        text = moment(date, "YYYY-MM-DD").format("ddd");
        break;
      case 2:
        text = moment(date, "YYYY-MM-DD").format("MMM");
        break;
      case 3:
        text = moment(date, "kk:mm:ss").format("hh:mm a");
        break;
      case 4:
        if (date.length > 0) {
          text = moment(date, "kk:mm:ss").format("hh:mm a");
        } else {
          text = 'Online'
        }
        break;
      case 5:
        text = moment(date, "kk:mm:ss").format("HH:mm");
        break;
      case 6:
        text = moment(date, "YYYY-MM-DD").format("D");
        break;
    }
    return text;
  }
  test(){     
    this.view=0;
        console.log(this.user_summary_contentdata.newdata.length);
        if(this.user_summary_contentdata.newdata.length !=0){
          for(var j=0;j<this.user_summary_contentdata.newdata.length;j++){
            if(this.user_summary_contentdata.newdata[j].summary.length == 7){
                if(this.user_summary_contentdata.newdata[j].summary[this.user_summary_contentdata.newdata[j].summary.length-1].violations.length != 0){
                    for(var k=0;k< this.user_summary_contentdata.newdata[j].summary[this.user_summary_contentdata.newdata[j].summary.length-1].violations.length;k++)
                    {
                      if(this.user_summary_contentdata.newdata[j].summary[this.user_summary_contentdata.newdata[j].summary.length-1].violations[k].type="minimum_hrs_of_week"){
                        console.log(this.user_summary_contentdata.newdata[j].summary[this.user_summary_contentdata.newdata[j].summary.length-1].violations[k].type);
                      }
                    }
                }
            }
          }
        }
        console.log(this.user_summary_contentdata.newdata.summary);
       
            if(this.user_summary_contentdata.newdata.length == undefined){
              this.view=1;
              console.log(this.user_summary_contentdata.newdata.summary.length);
              console.log(this.user_summary_contentdata.newdata.summary);
              this.datalength=this.user_summary_contentdata.newdata.summary.length;
              console.log(this.user_summary_contentdata.newdata.summary[this.datalength-1]);
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
                }
              }

          }
  }

  viewAllUsers(){
    console.log(this.date);
    let x =this.date;
     // this.view=0;

    let dateObject = {
          start: this.date
          // end: this.formatDate(dates.end)
        };
     this.events.publish("update:viewAllUsers", x);
  }
}

  