// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import * as moment from 'moment';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public popoverCtrl: PopoverController, 
              // public sideBarService: SummarySidebarService,
              private cookieservice: CookieService,
              public zone : NgZone,
              public userDataProvider : UserDataProvider) {
    // this.userId = this.userDataProvider.userData.user_id;
    this.getUserDate();
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
    console.log('ionViewDidLoad dashboard');
    this.zone.run(() => {});
  }


  ionViewDidEnter(){
    console.log('ionViewDidEnter dashboard');
  }

  ionViewCanEnter(){
    console.log('dashboard ionViewCanEnter');
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
    console.log('inside getData function');
    this.userDataProvider.getUserData(69, date).subscribe( (response) => {
      console.log(response, 'response');
      //  let dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
      this.sideBarData = response;
    });
  

  }

  getUserDate() {
          this.currentDate = this.formatDate(new Date());

          console.log(this.currentDate);
          this.getData(this.currentDate);
         
    }

  formatDate(date) {
    let temp = new Date(date);
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
  }


}
