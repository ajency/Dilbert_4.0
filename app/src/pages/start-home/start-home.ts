// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
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
 * Generated class for the StartHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({
  name: 'dashboard',
  segment: 'dashboard',
  priority: 'off'
})
 @Component({
  selector: 'page-start-home',
  templateUrl: 'start-home.html',
  // providers: [SummarySidebarService]
})
 export class StartHomePage {
 // @ViewChild(SummaryContentComponent) sideContentObj: SummaryContentComponent;
 sideBarData: any;
 summaryContentData : any;
 currentDate : any;
 summaryDate : any;
 userId : any;
 key : any;
 apiURL : any;
 failed : boolean = false;
 public param1 : any;
 public param2 : any;
 period_unit : string ;
 cos_offset : string ;
 message : string;
 view_log_history_btn : boolean = true;
 changedLogs : any;

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

  // this.param1 = navParams.get("param1");
  // this.param2 = navParams.get("param2");

  // this.events.subscribe('dashboard:params' , (params) =>{
  //   this.param1 = params.param1;
  //   this.param2 = params.param2;
  //   console.log(this.param1,this.param2);
  // });
  // console.log(this.param1, this.param2);
  this.events.subscribe("start-home:changedLogs", (data) =>{
    console.log('inside publish changedLogs');
    this.view_log_history_btn = this.appGlobalsProvider.view_log_history_btn;
    this.changedLogs = data;

  });

  
}

ngOnInit(){

    this.events.publish('app:updatehistory','dashboard');

  
    this.param1 = this.appGlobalsProvider.dashboard_params.param1;
    this.param2 = this.appGlobalsProvider.dashboard_params.param2;

    console.log(this.param1, this.param2);

    this.userId = this.authguard.user_id;
    this.key = this.authguard.userData.x_api_key;

    if((this.param1 == '' && this.param2 == '') || (this.param1 == undefined && this.param2 == undefined) ){
    this.period_unit = this.appGlobalsProvider.period_unit;
    this.cos_offset = this.appGlobalsProvider.cos_offset;
    this.getUserDate();
    console.log('no params passed');
    }

    else {
      console.log('params passed');

      if(this.param1 && this.param2){
        this.currentDate = this.param1.start_date;
        this.period_unit = this.param1.period_unit;
        this.authguard.user_id = this.param1.user_id
        this.userId = this.authguard.user_id;
        // this.cos_offset = this.param2.cos_offset;
        // console.log(this.cos_offset);
        // console.log(this.currentDate);

        if(this.startAndEndOfWeek(this.currentDate, this.param2.summary_date)){
        this.summaryDate = this.param2.summary_date;
        this.getData();
        }

        else{

          this.summaryDate = this.currentDate;
           this.getData();
        }

      }

      // else if(this.param1){
      //   this.currentDate = this.param1.date_rangestart;
      //   this.summaryDate = this.param1.date_rangestart;
      //   this.getData();

      //  }

    }
  
}

 // openPopover(myEvent) {
 //    let popover = this.popoverCtrl.create(PopoverContentPage);
 //    popover.present({
 //      ev: myEvent
 //    });
 //  }


   getDayDate(date: string, option: number): string {
    var text: string = '';
    switch (option) {
      case 1:
        text = moment(date.split(" ")[0], "YYYY-MM-DD").format("DD MMM YYYY");
        break;
      case 2:
        text = moment(date.split(" ")[1], "kk:mm:ss").format("hh:mm a");
        break;
      case 3:
        text = moment(date, "kk:mm:ss").format("hh:mm a");
        break;
      case 4:
        text = moment(date, "kk:mm:ss").format("HH:mm");
        break;
    }
    return text;
  }


 openStyle(){

  var navOption = {
    animation: "ios-transition"
  }
  
  this.navCtrl.push('StyleGuidePage',{},navOption);
}


ionViewDidLoad() {
  this.zone.run(() => {});
    // console.log('ionViewDidLoad dashboard')
  }


  ionViewWillLeave(){
    console.log('ion view will leave dashboard');
    this.appGlobalsProvider.dashboard_params.param1 = '';
    this.appGlobalsProvider.dashboard_params.param2 = '';
    this.authguard.user_id = this.authguard.userData.user_id;

  }



  ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('dashboard')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{
          // if(this.appGlobalsProvider.dashboard_params.param1 && this.appGlobalsProvider.dashboard_params.param2 ){
          //  console.log('can enter dashboard')   
          //  resolve(true)
          // }

          // else{
          //   console.log('cannot enter dashboard')
          //   reject(false)
           console.log('can enter dashboard') 
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


  
  getData(){
    
    let date_range={
      start:this.currentDate,
    };

 
    let optionalHeaders = {
      'X-API-KEY' : this.key,
      'From' : this.authguard.userData.user_id
    };


    let url =  `${this.apiURL}/period-data/${this.appGlobalsProvider.lang}`;
    // console.log(url);
    let filter1 = {
        user_id:this.authguard.user_id,
        start_date:this.currentDate,
        period_unit:this.period_unit
      };

     let filters = {
      date_range : date_range,
      period_unit : this.period_unit

      };


    let body = {
      user_id:this.authguard.user_id,
      filters : filters
    };
    



    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

        this.sideBarData = response;
        if(this.sideBarData.data.periodData.length != 0){
            console.log(this.sideBarData.data.periodData[this.sideBarData.data.periodData.length - 1].work_date)
            if(this.sideBarData.data.periodData[0].work_date < this.sideBarData.data.user.joining_date){
              this.sideBarData.data.periodData = [];
              console.log(this.sideBarData);
            }

            else if(this.sideBarData.data.periodData[0].work_date > this.sideBarData.data.user.joining_date && 
                      this.sideBarData.data.periodData[this.sideBarData.data.periodData.length - 1].work_date < this.sideBarData.data.user.joining_date ){

                  for(var i = 0; i < this.sideBarData.data.periodData.length; i++ ){
                    if(this.sideBarData.data.periodData[i].work_date < this.sideBarData.data.user.joining_date && this.sideBarData.data.periodData[i].leave_status == 'Leave')
                        this.sideBarData.data.periodData[i].leave_status = 'Not joined';
                  }

            }
        }

        



        this.zone.run(() => {});
        // this.events.publish('app:updatehistory','dashboard');
      
        let serializedquery =  `?${$.param(filter1)}`;
        this.events.publish('app:updatehistory',{page: 'dashboard', state: {query: serializedquery},  frompath: `/dashboard` , replace : true});
        

        // Call for day summary (RHS or logs data) 
        url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;


        
        let body2 = {
          user_id : this.userId,
          date : this.summaryDate,
          cos_offset : this.cos_offset
        }

       let filter2 = {
        summary_date:this.summaryDate,
        // cos_offset : this.cos_offset
       }


        this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', 'disable', filter2, true).subscribe( (response) => {
        // console.log(response);
        this.summaryContentData = response;
        this.zone.run(() => {});

        serializedquery = `?${$.param(filter2)}`;
        this.events.publish('app:updatehistory',{page: 'dashboard', state: {query: serializedquery},  frompath: `/dashboard`, appendurl : true });

        this.checkPermissions();

        // Call for changed logs
        
       let data = this.summaryContentData.data.day_data[0];
       console.log(data);
      
      if(data.changes>0 && this.view_log_history_btn){

        let object = {
            user_id : [this.authguard.user_id],   

            filters : {
              work_date_range : {
                start : data.work_date,
                end : ''  
              }
              
            }
         }
         console.log(object);

         url  = `${this.apiURL}/log-history/${this.appGlobalsProvider.lang}`;


         this.appServiceProvider.request(url, 'post', object, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {


            console.log(response);

            if(response.status == 200){
             
              // let popover = this.popoverCtrl.create( 'LogsChangedPage', {data1:response.data[0].history});
              // popover.present();
              this.changedLogs = response.data[0].history;
              this.view_log_history_btn =true;
            }

            else{
              this.appServiceProvider.presentToast(response.message, 'error');
              this.view_log_history_btn = false;
            }


        });


     }
     else{
      this.view_log_history_btn =false;
     }

      });

    }

    else{
        this.failed = true;
        this.message = response.message;
        this.zone.run(() => {});
        
    }


    });


    
  }


   checkPermissions(){
    console.log('inside checkPermissions');


    if(!this.summaryContentData.data.user.self){

        
            let result = this.authguard.userData;
            // console.log('result',result);

            let perm_class = result.class_permissions.view_log_history_btn;

            if(result.permissions.includes(perm_class)){
              this.view_log_history_btn = true;
              console.log("user has permissions to view log history");

            }

            else{
              this.view_log_history_btn = false;
              console.log("user does not have permissions to view log history");

            }

            
         
         
    }
  }

  getUserDate() {
    this.currentDate = this.formatDate(new Date());
    // this.currentDate = '2017-09-04';
    this.summaryDate = this.currentDate;
    // this.getData(this.currentDate);
    this.getData();
    
  }

  formatDate(date) {
    let temp = new Date(date);
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
  }


  startAndEndOfWeek(date1, date2) : any {

  // If no date object supplied, use current date
  // Copy date so don't modify supplied date
  // console.log(date1,date2);
  var now = new Date(date1);

  // set time to some convenient value
  now.setHours(0,0,0,0);

  // Get the previous Monday
  var monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  // Get next Sunday
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  // Return array of date objects
  var dayDate = new Date(date2);

  // console.log(monday, dayDate, sunday);

  if(monday <= dayDate && dayDate <= sunday){
    return true;
  }

  else{
    return false;
  }
}



}
