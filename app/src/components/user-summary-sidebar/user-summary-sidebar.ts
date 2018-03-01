import { Component, NgZone,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {IMyDpOptions} from 'mydatepicker';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { Storage } from '@ionic/storage';
import { AfterViewInit } from '@angular/core';
/**
 * Generated class for the UserSummarySidebarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-sidebar',
  templateUrl: 'user-summary-sidebar.html'
})
export class UserSummarySidebarComponent {
  private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      showClearDateBtn:false,
      disableUntil: {year: 2017, month: 1, day: 1},
      disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:  new Date().getDate()+1 } 
  };
  newdata :any;
  show = 7;
  nodata : any;
  maindata :any;
  userSideBarData: any;
  userSummaryContentData : any;
  user_id : any;
  apiURL : any;
  weekBucket: any [] = [];
  userSummaryData : any;
  saveData1 : any;
  date : any;
  text : any;
  dateSelected : any;
  para :any;
  param1 : any;
   param20 : any;
  org_id : any;
  period_unit : any;
  private flag : boolean;
  private flag2 : any;
  private flag3 : boolean;
  future_date : boolean = false;
 counter:number;
 datalength:number;
   content:any[]=new Array();
   username :any;
   // @Input('test') userSummaryData : any ;


  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public popoverCtrl: PopoverController, 
  private cookieservice: CookieService,
  public zone : NgZone,
  public events : Events,
  public userDataProvider : UserDataProvider,
  public authguard : AuthguardProvider,
  public appServiceProvider : AppServiceProvider,
  public storage : Storage,
  public appGlobalsProvider : AppGlobalsProvider) {
    console.log('Hello UserSummarySidebarComponent Component');
    this.text = 'Hello user-summary-sidebar';
    this.apiURL = this.appGlobalsProvider.getApiUrl();
    this.counter=0;
     this.param1 = this.appGlobalsProvider.newsummary_params.param1;
  }

  ngOnInit(){


    console.log(this.appGlobalsProvider.newsummary_params.param1);
     this.param1 = this.appGlobalsProvider.newsummary_params.param1;
     console.log("this is the ngOninit ");
    console.log(this.param1);

    if((this.param1 == '') || (this.param1 == undefined) ){
      console.log("empty");
      this.org_id =this.authguard.userData.org_id;
      this.period_unit = this.appGlobalsProvider.period_unit ;
      this.user_id=this.authguard.userData.user_id;
      this.getUserDate(1, new Date());
    }
     else {
      console.log('params passed');
      this.user_id=this.param1.user_id;
      this.org_id = this.param1.org_id;
      this.period_unit = this.param1.period_unit;

     let dateObject = {
          start: this.param1.start_date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);

      }


  }
     ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('user-summary')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{

           console.log('can enter user summary page') 
          resolve(true);
            
          
        })
        .catch(() => {
          reject(true)
        });
       
      })
      .catch(() => {
        reject(true)
      })
    });

  }



  requestData1(date1){

    console.log("inside requestData function", date1);
    var date =date1.formatted; 
     if (date) {
      this.dateSelected = new Date(date);
      let dateObject = {
          start: date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);
    }
    console.log(date);
}


viewmoredetails(item,key){

    console.log(item);
    console.log("clicked on sidebar data to view users summary ");
    this.param1 = this.appGlobalsProvider.newsummary_params.param1;
    console.log(this.param1);

    if(this.param1 !=''){
      console.log("the data is as per the url params");
      this.user_id=this.param1.user_id;
      console.log(this.user_id);
      let found =0;
        for(var i=0;i<this.userSummaryData.length;i++){
                if(this.userSummaryData[i].user.user_id==this.user_id){
                  this.userSummaryData[i].btnActive=true;
                  this.maindata=this.userSummaryData[i];
                  console.log("match userid");
                  console.log(this.maindata);
                  let data12={
                      newdata:this.maindata
                  }
                  let new_summary_param ={
                     org_id :this.param1.org_id,
                     start_date : this.param1.start_date, 
                     user_id : this.param1.user_id,
                     period_unit : this.param1.period_unit
                  }
               this.events.publish("update:summarydatanew", data12);
               let serializedquery =  `?${$.param(new_summary_param)}`;
               this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
              found=1;
            }
        } 
        console.log("match found "+found);
        if (found == 0) {
          this.user_id= this.userSummaryData[0].user.user_id;
          this.userSummaryData[0].btnActive=true;
          let new_summary_param = {
             org_id :this.authguard.userData.org_id,
             start_date : this.userSummaryData[0].summary[this.userSummaryData[0].summary.length-1].work_date,
             user_id : this.userSummaryData[0].user.user_id,
             period_unit : this.appGlobalsProvider.period_unit
            }
          
          this.maindata=this.userSummaryData[0];
          let data12={
              newdata : this.maindata
             } 
        this.events.publish("update:summarydatanew", data12);
        let serializedquery =  `?${$.param(new_summary_param)}`;
        this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
        }


          if(item !=''){
              this.userSummaryData[key].btnActive = true;
              for(var i = 0; i < this.userSummaryData.length; i++ )
                {
                  if(i != key)
                  {
                  this.userSummaryData[i].btnActive = false;
                  }
                }


         let new_summary_param = {
             org_id :this.authguard.userData.org_id,
             start_date : item.summary[item.summary.length-1].work_date, 
             user_id : item.user.user_id,
             period_unit : this.appGlobalsProvider.period_unit
           }
        
          this.maindata=item;
          let data12={
            newdata : this.maindata
           } 
          this.events.publish("update:summarydatanew", data12);
          let serializedquery =  `?${$.param(new_summary_param)}`;
          this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
      }

    }


    else{
        this.userSummaryData[key].btnActive = true;
           for(var i = 0; i < this.userSummaryData.length; i++ )
              {
                if(i != key)
                {

                this.userSummaryData[i].btnActive = false;

                }
              
              }

        if(item !=''){
             let new_summary_param = {
                 org_id :this.authguard.userData.org_id,
                 start_date : item.summary[item.summary.length-1].work_date, 
                 user_id : item.user.user_id,
                 period_unit : this.appGlobalsProvider.period_unit
               }
   
            console.log(new_summary_param);
            this.maindata=item;
            let data12={
              newdata : this.maindata
            } 
            this.events.publish("update:summarydatanew", data12);
            let serializedquery =  `?${$.param(new_summary_param)}`;
            this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
        }


        else{
             let new_summary_param = {
               org_id :this.authguard.userData.org_id,
               start_date : this.userSummaryData[0].summary[this.userSummaryData[0].summary.length-1].work_date,
               user_id : this.userSummaryData[0].user.user_id,
               period_unit : this.appGlobalsProvider.period_unit
             }
              
              this.maindata=this.userSummaryData[0];
              let data12={
              newdata : this.maindata
            } 
            this.events.publish("update:summarydatanew", data12);
            let serializedquery =  `?${$.param(new_summary_param)}`;
            this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });

          }
       
   }
    
     
}



  
 getUserDate(dropdownValue, dateswnt) {

        // let dates = this.getStartAndEndOfDate(new Date());
        
        let date = {
          start: this.formatDate(new Date()),
          // end: this.formatDate(dates.end)
        };

        this.getData(date);
  };



getData(date){
    let curr;
  if(date.hasOwnProperty('start'))
      curr = new Date(date.start);
    else
      curr = new Date(date);

    console.log(curr);

    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    console.log(first);

    let firstDay = new Date(curr.setDate(first));
    console.log(firstDay);


    this.weekBucket = [];
    let i = 0;

    while (i !== 7) {
      // console.log(i);
      let temp = new Date (firstDay);
      let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
      // console.log(nextD);
      this.weekBucket.push(nextD);
      firstDay = nextD;
      i++;
    }
    console.log("weekBucket");
   console.log(this.weekBucket);
   this.events.publish("update:weekBucketdata", this.weekBucket);


   let date_range = date;

    console.log(date_range);
  

    let optionalHeaders = {
      'X-API-KEY' : this.authguard.userData.x_api_key,
      'From' : this.authguard.userData.user_id
    };


    let url =  `${this.apiURL}/summary/${this.authguard.userData.org_id}/${this.appGlobalsProvider.lang}`;
    console.log("this is the url");
    console.log(url);
    let filter1 = {
        org_id : this.org_id,
        start_date: date.start,
        user_id : this.user_id,
        period_unit:this.period_unit
      };

     let filters = {
      date_range : date_range,
      period_unit : this.period_unit

      };

      let body = {
        filters : filters
      }


    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

          console.log(date.start,'-----------',this.formatDate(new Date()));
          if(date.start > this.formatDate(new Date())){
            this.future_date = true;
            console.log("?????????????????????????????")
          }
          else{
            this.future_date = false;
            console.log("+++++++++++++++++++++++++++++")

          }

        this.userSummaryData = response.data;
        // this.showmoredata();
        let key=0;
        this.nodata='';

       this.viewmoredetails(this.nodata,key);
       this.events.publish("update:summarydatausers", this.userSummaryData);


         // let serializedquery =  `?${$.param(filter1)}`;
         // this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
         this.saveData1 = response.data;

      //   this.userSummaryData.forEach( (user) => {


      //   if(user.summary.length !== 0) { // Checks if summary has Length greater than 0, if so the week's data is present

      //     if(user.summary[user.summary.length-1].work_date < user.user.joining_date ){
      //       user.summary = [];
      //     }

      //     else if(user.summary[0].work_date < user.user.joining_date && user.summary[user.summary.length -1].work_date > user.user.joining_date){
      //       for(i = 0; i < user.summary.length; i++){
      //         if(user.summary[i].work_date < user.user.joining_date && user.summary[i].leave_status == 'Leave'){
      //           user.summary[i].leave_status = 'Not joined';
      //         }
      //       }

      //     }


      //     user.total_time = "00:00";
      //     for ( i = 0; i < user.summary.length; i++) {
      //       if(user.summary[i].leave_status == "Present" || user.summary[i].leave_status == "Worked" || user.summary[i].leave_status == "Worked on holiday" || 
      //       user.summary[i].leave_status == "Worked on weekend"  ) // Check the status before calculating
      //         user.total_time = this.getSumofTime(user.total_time, user.summary[i].total_time);
      //     }
      //   } else { // No summary data found related to that user
      //     user.total_time = "00:00";
      //   }
      // });

        this.saveData1 = this.userSummaryData;
        console.log("summary data ----");
        console.log(this.userSummaryData.length);
        this.datalength=this.userSummaryData.length;

        // Flags for sorting
        this.flag2 = Array<number>(7);
        for(var i = 0; i < this.flag2.length; i++)
        {
          this.flag2[i] = 0;
        }
        this.flag3 = true;
        this.flag = false;

        this.zone.run(() => {});
     }
  })
        this.zone.run(() => {});


         console.log("show"+this.show);

}


formatDate(date) {
    let temp = new Date(date);
    let month = (temp.getMonth() + 1) < 10 ? '0'+(temp.getMonth() + 1).toString()  : (temp.getMonth() + 1).toString();
    let day = temp.getDate() < 10 ? '0' + temp.getDate().toString() : temp.getDate().toString();
    return temp.getFullYear() + '-' + month + '-' + day;
  }

    getSumofTime(sumTime, newTime) { // Get 2 times, sum it up & return the summedUp value
    var temp1 = newTime.split(":");
    var temp2 = sumTime.split(":");
    var time2Mins = (parseInt(temp2[0]) + parseInt(temp1[0])) * 60 + (parseInt(temp2[1]) + parseInt(temp1[1])); // Convert the Summed-Up time to Mins
    sumTime = ((time2Mins / 60) < 10 ? "0" : "") + Math.floor(time2Mins / 60).toString() + ":" + ((time2Mins % 60) < 10 ? "0" : "") + Math.floor(time2Mins % 60).toString();

    return sumTime;
  }

 onTextChange(text) {
    console.log(text, this.saveData1);
    this.userSummaryData = this.saveData1.filter(item => item.user.name.toLowerCase().indexOf(text.toLowerCase()) !== -1); // LowerCase all the names & keyword so that it cover all the possibilities
     this.zone.run(() => {}); 
  }
}
