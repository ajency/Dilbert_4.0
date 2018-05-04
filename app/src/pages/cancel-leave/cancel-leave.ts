import { Component ,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as $ from 'jquery';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
/**
 * Generated class for the CancelLeavePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cancel-leave',
  templateUrl: 'cancel-leave.html',
})
export class CancelLeavePage {
	private nativeElement: any;
	private $: any;
  leaveData:any;
  userData:any;
  userleavedata:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 public element: ElementRef,
  	 public authguard : AuthguardProvider,
     public events : Events,
  	 public appServiceProvider : AppServiceProvider,
     public appGlobalsProvider : AppGlobalsProvider,
  	 public viewCtrl : ViewController) {

  	 this.nativeElement = this.element.nativeElement;
  	 this.$ = this.appServiceProvider.jQuery;
     this.leaveData = this.navParams.get('data');
     this.userData = this.navParams.get('userData');
     this.userleavedata=this.userData.data.leaves;
  }

    ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("cancel-leave-popover2");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelLeavePage');
  }

  cancelLeaveApiCall(){
    console.log("are you sure??");
    console.log(this.leaveData);
     let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };
     let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/cancelLeave`;
     let body ={
        user:this.leaveData.user,
        parent_id:this.leaveData.parent_id
        }
        console.log(body);

    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
            if(response.status == 'success'){
              console.log(this.userData.data);
              console.log(this.userData.data.leaves.length);
              if(this.userData.data.leaves.length !=0){
                console.log("leaves");

                 this.userData.data.leaves = this.userData.data.leaves.filter((data: any) => {
                    return response.data.parent_id !== data.parent_id;
                  })
                // for(var i=0;i<this.userleavedata.length;i++){

                // }
                console.log(this.userData.data.leaves);

              }
              this.close(); 
             
            }
            else{ 
                this.close(); 
                this.appServiceProvider.presentToast(response.message, 'error'); 
              }

          })


  }
    close() {
    this.viewCtrl.dismiss();
  }

}
