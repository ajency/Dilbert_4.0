// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';


import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';

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
 period_unit : string = 'week';
 cos_offset : string = '15';

 constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public popoverCtrl: PopoverController, 
  private cookieservice: CookieService,
  public zone : NgZone,
  public userDataProvider : UserDataProvider,
  public appServiceProvider : AppServiceProvider,
  public storage : Storage,
  public appGlobalsProvider : AppGlobalsProvider) {
  this.apiURL = this.appGlobalsProvider.getApiUrl();

  this.param1 = navParams.get("param1");
  this.param2 = navParams.get("param2");

  console.log(this.param1, this.param2);
  
}

ngOnInit(){
  this.storage.get('userData').then((data) => {

    this.userId = data.user_id;
    this.key = data.x_api_key;

    if((this.param1 == '' && this.param2 == '') || (this.param1 == undefined && this.param2 == undefined) ){
    this.getUserDate();
    console.log('no params passed');
    }

    else {
      console.log('params passed');

      if(this.param1 && this.param2){
        this.currentDate = this.param1.date_rangestart;
        this.period_unit = this.param1.period_unit;
        console.log(this.currentDate);

        if(this.startAndEndOfWeek(this.currentDate, this.param2.date)){
        this.summaryDate = this.param2.date;
        this.cos_offset = this.param2.cos_offset;
        console.log(this.summaryDate);
        this.getData();
        }

        else{

          this.summaryDate = this.currentDate;
           this.getData();
        }

      }

      else if(this.param1){
        this.currentDate = this.param1.date_rangestart;
        this.summaryDate = this.param1.date_rangestart;
        this.getData();

       }

    }
  });
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

  ionViewCanEnter(){
    if(this.cookieservice.get("keepLoggedIn")== 'yes'){
      console.log('ionViewCanEnter dashboard');
      return true;
    }
    else{
      return false;
    }
  }

  ionViewWillEnter() {
    // this.sideBarService.getSideBarData("").then((data) => {
    //   this.sideBarData = data;
    //   console.log('data recieved', data);
    //   this.sideBarData.dates.forEach((date) => {
    //     if (moment(date.date, "DD-MM-YYYY").diff(moment("19-06-2017", "DD-MM-YYYY"))==0) {
    //       this.currentDay = date;
    //       console.log('currentDay', this.currentDay);
    //     }
    //   });
    // }).catch(error => console.log("error", error));
  }


  
  getData(){
    
    let date_range={
      start:this.currentDate,
    };

 
    let optionalHeaders = {
      'X-API-KEY' : this.key,
      'From' : this.userId
    };


    let url =  `${this.apiURL}/period-data/${this.appGlobalsProvider.lang}`;
    console.log(url);
    let filters = {
        date_range:date_range,
        period_unit: this.period_unit
      };

    let body = {
      user_id:this.userId,
      filters : filters
    };
    



    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','', filters, false).subscribe( (response) => {
      // console.log(response);
      this.sideBarData = response;
      this.failed = true;
      this.zone.run(() => {});


    url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;
    console.log(url);
    let body2 = {
      user_id : this.userId,
      date : this.summaryDate,
      cos_offset : this.cos_offset
    }

    let filter2 = {
      date : this.summaryDate,
      cos_offset : this.cos_offset
    }


      this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', '', filter2, true).subscribe( (response) => {
      // console.log(response);
      this.summaryContentData = response;
      this.zone.run(() => {});
    });




    });


    
  }

  getUserDate() {
    // this.currentDate = this.formatDate(new Date());
    this.currentDate = '2017-09-04';
    this.summaryDate = '2017-09-04';
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
  console.log(date1,date2);
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

  console.log(monday, dayDate, sunday);

  if(monday <= dayDate && dayDate <= sunday){
    return true;
  }

  else{
    return false;
  }
}



}
