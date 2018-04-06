import { Component ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as $ from 'jquery';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
/**
 * Generated class for the LeaveAddedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-added',
  templateUrl: 'leave-added.html',
})
export class LeaveAddedPage {
	private nativeElement: any;
	private $: any;
  responseStatusParam:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public element: ElementRef,
  	 public authguard : AuthguardProvider,
     public events : Events,
  	 public appServiceProvider : AppServiceProvider,
     public appGlobalsProvider : AppGlobalsProvider,
  	 public viewCtrl : ViewController) {

  	 this.nativeElement = this.element.nativeElement;
  	 this.$ = this.appServiceProvider.jQuery;
     // this.appGlobalsProvider.leave_request_param.param1
  }

  ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-added-popover2");
    console.log(this.appGlobalsProvider.leave_request_param.param1);
    this.responseStatusParam=this.appGlobalsProvider.leave_request_param.param1;
    console.log( this.responseStatusParam);
    console.log( this.responseStatusParam.message.length);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveAddedPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
