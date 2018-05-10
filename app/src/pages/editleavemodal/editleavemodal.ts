import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
// import {IMyDpOptions} from 'mydatepicker';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { map, filter, first, debounceTime } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
// import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';

import * as $ from 'jquery';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';


import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditleavemodalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editleavemodal',
  templateUrl: 'editleavemodal.html',
})
export class EditleavemodalPage {
	  private nativeElement: any;
	  private $: any;
    data:any;
    data2:any;
    userLeaveData:any;
    allusers:any;
    top:any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider,
              private http: Http,
              public appGlobalsProvider : AppGlobalsProvider,
              public storage : Storage,
              public popoverCtrl: PopoverController) {

  	  			    this.nativeElement = this.element.nativeElement;
			          this.$ = this.appServiceProvider.jQuery;
                this.data = this.navParams.get('data');
                this.data2 = this.navParams.get('userData');
                this.allusers=this.navParams.get('users');
                this.top=this.navParams.get('top');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditleavemodalPage');
  }
     ngOnInit(){
      console.log(this.data);
    this.$(this.nativeElement).parents().find('.popover-content').addClass("editleave-popover2");
}

cancelLeavecheck(){
  this.close();
  console.log("cancel leave");
  console.log(this.userLeaveData);
  this.userLeaveData=this.data2;
  let popover = this.popoverCtrl.create( 'CancelLeavePage',{data:this.data,userData:this.userLeaveData});
  popover.present();
}

editLeavecheck(){
    this.close();
  console.log("update leave");
   console.log(this.data);
   let popover = this.popoverCtrl.create( 'LeaveModalPage',{users:this.allusers,data:this.data,type:"editLeave"});
    popover.present();
}
  close() {
    this.viewCtrl.dismiss();
  }
}
