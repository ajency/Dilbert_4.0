// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import * as moment from 'moment';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
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
  currentDate : any;
  userId : any;
  key : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController, 
              private cookieservice: CookieService,
              public zone : NgZone,
              public userDataProvider : UserDataProvider,
              public appServiceProvider : AppServiceProvider,
              public storage : Storage) {
     
  }

  ngOnInit(){
    this.storage.get('userData').then((data) => {

      this.userId = data.user_id;
      this.key = data.x_api_key;
      this.getUserDate();
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
    console.log('ionViewDidLoad dashboard')
  }


  ionViewDidEnter(){
  }

  ionViewCanEnter(){
    if(this.cookieservice.get("keepLoggedIn")== 'yes')
      return true;
    else
      return false;
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


   
  getData(date){
    
    let date_range = {
      // start : date;
      start : '2017-09-12',
    };
    this.userDataProvider.getUserData(this.userId, date_range, this.key).subscribe( (response) => {
      console.log(response, 'response');
      this.sideBarData = response;
       this.zone.run(() => {});
    });
  

  }

  getUserDate() {
          this.currentDate = this.formatDate(new Date());

          this.getData(this.currentDate);
         
    }

  formatDate(date) {
    let temp = new Date(date);
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
  }


}
