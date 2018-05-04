import { Component ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as $ from 'jquery';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
/**
 * Generated class for the UpdateLeavePopUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-leave-pop-up',
  templateUrl: 'update-leave-pop-up.html',
})
export class UpdateLeavePopUpPage {
  private nativeElement: any;
  private $: any;
  responseStatusParam:any;
  type:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public element: ElementRef,
  	 public authguard : AuthguardProvider,
     public events : Events,
  	 public appServiceProvider : AppServiceProvider,
     public appGlobalsProvider : AppGlobalsProvider,
  	 public viewCtrl : ViewController) {

  	 this.nativeElement = this.element.nativeElement;
  	 this.$ = this.appServiceProvider.jQuery;
  }

   ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-update-pop-up-popover2");
    this.responseStatusParam=this.appGlobalsProvider.leave_update_param.param1;
    this.type=this.appGlobalsProvider.leave_update_param.param2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateLeavePopUpPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
