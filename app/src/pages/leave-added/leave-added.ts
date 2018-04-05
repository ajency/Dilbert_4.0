import { Component ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as $ from 'jquery';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public element: ElementRef,
  	 public authguard : AuthguardProvider,
  	 public appServiceProvider : AppServiceProvider,
  	 public viewCtrl : ViewController) {

  	 this.nativeElement = this.element.nativeElement;
  	 this.$ = this.appServiceProvider.jQuery;
  }

  ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-added-popover2");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveAddedPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
