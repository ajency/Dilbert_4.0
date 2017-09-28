// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';


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
  
}

ngOnInit(){
  
    this.param1 = this.appGlobalsProvider.dashboard_params.param1;
    this.param2 = this.appGlobalsProvider.dashboard_params.param2;

    console.log(this.param1, this.param2);

    this.userId = this.authguard.userData.user_id;
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
        this.userId = this.param1.user_id;
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


  ionViewDidEnter(){
  }



  ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('dashboard')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{
          console.log('can enter dashboard')
           resolve(true)
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
        user_id:this.userId,
        start_date:this.currentDate,
        period_unit:this.period_unit
      };

     let filters = {
      date_range : date_range,
      period_unit : this.period_unit

      };


    let body = {
      user_id:this.userId,
      filters : filters
    };
    



    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

        this.sideBarData = response;
        this.zone.run(() => {});
        url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;


          // console.log(url);
        let body2 = {
          user_id : this.userId,
          date : this.summaryDate,
          cos_offset : this.cos_offset
        }

       let filter2 = {
        summary_date:this.summaryDate,
        // cos_offset : this.cos_offset
       }


        this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', '', filter2, true).subscribe( (response) => {
        // console.log(response);
        this.summaryContentData = response;
        this.zone.run(() => {});
      });

    }

    else{
        this.failed = true;
        this.message = response.message;
        this.zone.run(() => {});
        
    }


    });


    
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
