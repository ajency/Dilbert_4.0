import { Component } from '@angular/core';
import { IonicPage, Events,  NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider) {
    this.data = this.navParams.get('data');
    this.start_time = this.data.start_time;
    this.end_time = this.data.end_time;

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
         end_time : this.end_time
      }
    }
   
    this.events.publish("changed:log", data);

  }



  close() {
    this.viewCtrl.dismiss();
  }



}