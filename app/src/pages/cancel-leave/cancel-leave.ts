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
  selectedValue:any;
  cancelled_by_user_data:any;
  teamleaveData:any;

  constructor(
     public popoverCtrl: PopoverController,
     public navCtrl: NavController, public navParams: NavParams,
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
     this.teamleaveData=this.navParams.get('teamLeaves');
     this.userleavedata=this.userData.data.leaves;
  }

    ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("cancel-leave-popover2");
    this.selectedValue="ignored";
    this.cancelled_by_user_data=this.authguard.userData;
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
     let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/updateLeaveStatus`;
     //this.leaveData.parent_id
     let invalidated_by ={
            user_id :this.cancelled_by_user_data.user_id ,
            email : this.cancelled_by_user_data.userEmail,
            name :this.cancelled_by_user_data.name
        }
     let body ={
        status:this.selectedValue,
        user:this.leaveData.user,
        parent_id:this.leaveData.parent_id,
        invalidated_by:invalidated_by
        }
        console.log(body);

    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
            this.appGlobalsProvider.leave_update_param.param1=response;
            this.appGlobalsProvider.leave_update_param.param2="cancelLeave";
            if(response.status == 'success'){
              console.log(this.userData.data);
              console.log(this.userData.data.leaves.length);
              if(this.userData.data.leaves.length !=0){
                console.log("leaves");
                 this.userData.data.leaves = this.userData.data.leaves.filter((data: any) => {
                    return response.data.parent_id !== data.parent_id;
                  })
                console.log(this.userData.data.leaves);
              }
              // if(this.teamleaveData.data.leaves =)
              if(this.teamleaveData.data.leaves.length !=0){
                console.log("leaves");
                 this.teamleaveData.data.leaves = this.teamleaveData.data.leaves.filter((data: any) => {
                    return response.data.parent_id !== data.parent_id;
                  })
                console.log(this.teamleaveData.data.leaves);
              }
             
              this.close(); 
              this.leaveUpdateModal();
            }
            else{ 
                this.close();
                this.leaveUpdateModal();
                // this.appServiceProvider.presentToast(response.message, 'error'); 
              }
          })
  }

  close() {
    this.viewCtrl.dismiss();
  }
    
 leaveUpdateModal(){
      console.log("inside leaveUpdateModal");
      let popover = this.popoverCtrl.create( 'UpdateLeavePopUpPage');
      popover.present();
  }
  ChangeValue(event){
    console.log(event.target.value);
    this.selectedValue=event.target.value;
  }

} 
