import { Component, ElementRef } from '@angular/core';
import { IonicPage, Events,  NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the EditModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {

	data : any;
  total_time : any;
  start_time : any;
  end_time : any;
  leave_status : boolean;
  status : any;
  private nativeElement: any;
  private $: any;
  leave_marking_dropdown : boolean =true;
  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider) {
    
    this.nativeElement = this.element.nativeElement;
    this.$ = this.appServiceProvider.jQuery;

    this.data = this.navParams.get('data');
    this.start_time = this.data.start_time;
    this.end_time = this.data.end_time;
    if(this.data.leave_status == 'Present'){
      this.leave_status = true;
      this.status = 'Present';
    }
    else{
      this.leave_status = false;
      this.status = 'Leave'
    }
  }

  ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("logs-changed-popover2");
    this.checkPermissions();
  }

   checkPermissions(){
            console.log('inside checkPermissions');

            let result = this.authguard.userData;
            // console.log('result',result);
            let perm_class =result.class_permissions.leave_marking_dropdown;

            if(result.permissions.includes(perm_class)){
              this.leave_marking_dropdown =true;
              console.log("user has permissions to mark leave");
            }
            else{
              this.leave_marking_dropdown = false;
              console.log("user does not have permissions mark leave");

            }
  }

  ionViewDidLoad() {
    
  }

  getDayDate(date: string, option: number): string {
    var text: string = '';
    switch (option) {
      case 1:
        text = moment(date, "YYYY-MM-DD").format("ddd");
        break;
      case 2:
        text = moment(date, "YYYY-MM-DD").format("MMM D");
        break;
      case 3:
        text = moment(date, "kk:mm:ss").format("hh:mm a");
        break;
      case 4:
        if (date.length > 0) {
          text = moment(date, "kk:mm:ss").format("hh:mm a");
        } else {
          text = 'Online'
        }
        break;
      case 5:
        text = moment(date, "kk:mm:ss").format("hh:mm");
        break;
    }
    return text;
  }

  changeLogs(){
    this.viewCtrl.dismiss();

    let start = moment(this.start_time, "hh:mm");
    let end = moment(this.end_time, "hh:mm");

    let dur = moment.duration(end.diff(start));

    var minutes = dur.asMinutes()

    this.total_time = ((minutes / 60) < 10 ? "0" : "") + Math.floor(minutes / 60).toString() + ":" + ((minutes % 60) < 10 ? "0" : "") + Math.floor(minutes % 60).toString();

    console.log(this.total_time);

    // let new_value = {
    //   end_time : this.end_time,
    //   leave_status : this.data.leave_status,
    //   start_time : this.start_time,
    //   status : this.data.status,
    //   total_time : this.total_time,
    //   violation_count : this.data.violation_count,
    //   work_date : this.data.work_date
    // }


    let data = {
      work_date : this.data.work_date,
      changes : {
         start_time : this.start_time,
         end_time : this.end_time,
         status : this.status

      },

      mark_as_leave : false

    }

    if(this.status == 'Present'){
      data.mark_as_leave = false;
    }
    else{
      data.mark_as_leave = true;
    }
   
    this.events.publish("changed:log", data);

  }



  close() {
    this.viewCtrl.dismiss();
  }



}
