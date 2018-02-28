import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery';


import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the NewSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'user-summary',
  segment: 'user-summary',
  priority: 'off'
})

@Component({
  selector: 'page-new-summary',
  templateUrl: 'new-summary.html',
})
export class NewSummaryPage {

  userSideBarData: any;
  userSummaryContentData : any;
  user_id : any;
  apiURL : any;
  weekBucket: any [] = [];
  userSummaryData : any;
  saveData : any;
  date : any;
  text : any;
  dateSelected : any;
  param1 : any;
  org_id : any;
  period_unit : any;
  private flag : boolean;
  private flag2 : any;
  private flag3 : boolean;
  future_date : boolean = false;

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
     this.apiURL = this.appGlobalsProvider.getApiUrl();

      this.events.subscribe("update:summarydatausers",(data12) => {

  console.log("new summary page---------------");
  
  
  this.userSummaryContentData=data12;
  console.log("here");
  console.log(this.userSummaryContentData);

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewSummaryPage');
  }
     ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('new-summary')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{

           console.log('can enter user new summary page') 
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

//   ngOnInit(){
//      this.param1 = this.appGlobalsProvider.summary_params.param1;
//      console.log("param1");
//     console.log(this.param1);

//     if((this.param1 == '') || (this.param1 == undefined) ){
    
//     this.org_id = this.authguard.userData.org_id;
//     this.period_unit = this.appGlobalsProvider.period_unit ;
//     this.user_id=this.authguard.userData.user_id;
//     this.getUserDate(1, new Date());
//     console.log('no params passed');
//     console.log(this.user_id);
//     console.log(this.org_id);
//     console.log(this.period_unit);
//     }
//      else {
//       console.log('params passed');
//       this.user_id=this.param1.user_id;
//       this.org_id = this.param1.org_id;
//       this.period_unit = this.param1.period_unit;

//      let dateObject = {
//           start: this.param1.date
//           // end: this.formatDate(dates.end)
//         };
//       this.getData(dateObject);

//       }


//   }
//      ionViewCanEnter(): Promise<boolean>{

//     return new Promise((resolve,reject) => {
//       this.authguard.verifyToken('user-summary')
//       .then(() => {

//         this.appServiceProvider.handleClientLoad(true).then( () =>{

//            console.log('can enter user summary page') 
//           resolve(true);
            
          
//         })
//         .catch(() => {
//           reject(true)
//         });
       
//       })
//       .catch(() => {
//         reject(true)
//       })
//     });

//   }
//  getUserDate(dropdownValue, dateswnt) {

//         // let dates = this.getStartAndEndOfDate(new Date());
        
//         let date = {
//           start: this.formatDate(new Date()),
//           // end: this.formatDate(dates.end)
//         };

//         this.getData(date);
//   };



// getData(date){
//     let curr;
//   if(date.hasOwnProperty('start'))
//       curr = new Date(date.start);
//     else
//       curr = new Date(date);

//     console.log(curr);

//     let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
//     console.log(first);

//     let firstDay = new Date(curr.setDate(first));
//     console.log(firstDay);


//     this.weekBucket = [];
//     let i = 0;

//     while (i !== 7) {
//       // console.log(i);
//       let temp = new Date (firstDay);
//       let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
//       // console.log(nextD);
//       this.weekBucket.push(nextD);
//       firstDay = nextD;
//       i++;
//     }
   

//    let date_range = date;

//     console.log(date_range);
  

//     let optionalHeaders = {
//       'X-API-KEY' : this.authguard.userData.x_api_key,
//       'From' : this.authguard.userData.user_id
//     };


//     let url =  `${this.apiURL}/summary/${this.authguard.userData.org_id}/${this.appGlobalsProvider.lang}`;
//     console.log("this is the url");
//     console.log(url);
//     let filter1 = {
//         org_id : this.org_id,
//         date:date.start,
//         user_id : this.user_id,
//         period_unit:this.period_unit
//       };

//      let filters = {
//       date_range : date_range,
//       period_unit : this.period_unit

//       };

//       let body = {
//         filters : filters
//       }


//     this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', filter1, false).subscribe( (response) => {
//       // console.log(response);
//       if(response.status == 200){

//           console.log(date.start,'-----------',this.formatDate(new Date()));
//           if(date.start > this.formatDate(new Date())){
//             this.future_date = true;
//             console.log("?????????????????????????????")
//           }
//           else{
//             this.future_date = false;
//             console.log("+++++++++++++++++++++++++++++")

//           }

//         this.userSummaryData = response.data;


//         let serializedquery =  `?${$.param(filter1)}`;
//         this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
//         // this.saveData = response.data;

//         this.userSummaryData.forEach( (user) => {


//         if(user.summary.length !== 0) { // Checks if summary has Length greater than 0, if so the week's data is present

//           if(user.summary[user.summary.length-1].work_date < user.user.joining_date ){
//             user.summary = [];
//           }

//           else if(user.summary[0].work_date < user.user.joining_date && user.summary[user.summary.length -1].work_date > user.user.joining_date){
//             for(i = 0; i < user.summary.length; i++){
//               if(user.summary[i].work_date < user.user.joining_date && user.summary[i].leave_status == 'Leave'){
//                 user.summary[i].leave_status = 'Not joined';
//               }
//             }

//           }


//           user.total_time = "00:00";
//           for ( i = 0; i < user.summary.length; i++) {
//             if(user.summary[i].leave_status == "Present" || user.summary[i].leave_status == "Worked" || user.summary[i].leave_status == "Worked on holiday" || 
//             user.summary[i].leave_status == "Worked on weekend"  ) // Check the status before calculating
//               user.total_time = this.getSumofTime(user.total_time, user.summary[i].total_time);
//           }
//         } else { // No summary data found related to that user
//           user.total_time = "00:00";
//         }
//       });

//         this.saveData = this.userSummaryData;
//         console.log("summary data ----");
//         console.log(this.userSummaryData);

//         // Flags for sorting
//         this.flag2 = Array<number>(7);
//         for(var i = 0; i < this.flag2.length; i++)
//         {
//           this.flag2[i] = 0;
//         }
//         this.flag3 = true;
//         this.flag = false;

//         this.zone.run(() => {});
//      }
//   })
//         this.zone.run(() => {});

// }

// formatDate(date) {
//     let temp = new Date(date);
//     let month = (temp.getMonth() + 1) < 10 ? '0'+(temp.getMonth() + 1).toString()  : (temp.getMonth() + 1).toString();
//     let day = temp.getDate() < 10 ? '0' + temp.getDate().toString() : temp.getDate().toString();
//     return temp.getFullYear() + '-' + month + '-' + day;
//   }

//     getSumofTime(sumTime, newTime) { // Get 2 times, sum it up & return the summedUp value
//     var temp1 = newTime.split(":");
//     var temp2 = sumTime.split(":");
//     var time2Mins = (parseInt(temp2[0]) + parseInt(temp1[0])) * 60 + (parseInt(temp2[1]) + parseInt(temp1[1])); // Convert the Summed-Up time to Mins
//     sumTime = ((time2Mins / 60) < 10 ? "0" : "") + Math.floor(time2Mins / 60).toString() + ":" + ((time2Mins % 60) < 10 ? "0" : "") + Math.floor(time2Mins % 60).toString();

//     return sumTime;
//   }

}
