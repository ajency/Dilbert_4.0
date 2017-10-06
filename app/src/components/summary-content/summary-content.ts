import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';



/**
 * Generated class for the SummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'summary-content',
  templateUrl: 'summary-content.html'
})
export class SummaryContentComponent {

  
  @Input('test') currentData : any ;
  @Input('logs') summaryContentData : any;
  today : any;
  logs : any;
  day_data : any;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor( public events : Events,
               public zone : NgZone,
               public modalCtrl : ModalController,
               public popoverCtrl : PopoverController,
               public authguard : AuthguardProvider,
               public appServiceProvider : AppServiceProvider,
               public appGlobalsProvider : AppGlobalsProvider) {
    // console.log('SummaryContentComponent Component');

       this.events.subscribe('update:content',(data) => {
	   // this.currentData = data.date;
     this.day_data = data.summaryContentData.data.day_data;
     this.logs = data.summaryContentData.data.logs;
     this.summaryContentData = data.summaryContentData;

     this.setToday();
    });

       this.events.subscribe("changed:log", (data) =>{

          let object = {
          // user_id : this.authguard.user_id,
          work_date : data.work_date,
          // modified_by : this.authguard.userData.user_id,
          // modified_on : moment(new Date()).format("YYYY-MM-DD"),
          // old_value : this.summaryContentData.data.day_data[0],
          changes : data.changes
       }

        // this.day_data[0] = data;
       console.log(object);

       let url  = `${this.appGlobalsProvider.getApiUrl()}/period-data/edit/${this.authguard.user_id}/${this.appGlobalsProvider.lang}`;

       console.log(url);
       let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id,
        };

      this.appServiceProvider.request(url, 'post', object, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {


          console.log(response);

          if(response.status == 200){
            this.day_data[0] = response.data[0];
            this.events.publish("summary-sidebar:log", response.data[0]);
          }

          else{
            this.appServiceProvider.presentToast(response.message, 'error');
          }


       });

      })
  

  }

  ngOnInit(){
  	// let dummy = new Date();
   //  this.today = {
   //    day : this.days[dummy.getDay()],
   //    date : dummy.getDate(),
   //    month : this.monthNames[dummy.getMonth()]
   //  };

    // console.log(this.summaryContentData);

    this.day_data = this.summaryContentData.data.day_data;
    // console.log(this.day_data);
    this.setToday();
    this.logs = this.summaryContentData.data.logs;
  }

 ionViewDidLoad() {
    
   this.zone.run(() => {});

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


  setToday(){

     let d = new Date();
     let temp;
     if(this.day_data.length != 0 ){ 
     temp = this.day_data[0].work_date.split("-");
     d.setFullYear(temp[0], temp[1]-1, temp[2]);
     this.today = {
      day : this.days[d.getDay()],
      date : d.getDate(),
      month : this.monthNames[d.getMonth()]
     }
   }

  }


  editModal(ev){
    console.log("inside editModal");

      // let data = this.day_data[0];
      // console.log(this.day_data[0]);
      let popover = this.popoverCtrl.create( 'EditModalPage',{data:this.day_data[0]});
      popover.present();

  }


}
