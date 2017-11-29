import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { Storage } from '@ionic/storage';



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
  @ViewChild("logList") logList: ElementRef;
  private logListNative: any;


  @Input('test') currentData : any ;
  @Input('logs') summaryContentData : any;
  // changedLogs : any;
  today : any;
  logs : any;
  day_data : any;
  leave_status_values;
  edit_btn_pd : boolean = true;
  view_log_history_btn : boolean = true;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor( public events : Events,
               public zone : NgZone,
               public modalCtrl : ModalController,
               public popoverCtrl : PopoverController,
               public authguard : AuthguardProvider,
               public appServiceProvider : AppServiceProvider,
               public appGlobalsProvider : AppGlobalsProvider,
               public storage : Storage) {
    // console.log('SummaryContentComponent Component');

    this.events.subscribe('update:content',(data) => {
	   // this.currentData = data.date;
     console.log('inside update content');
     this.day_data = data.summaryContentData.data.day_data;
     this.logs = data.summaryContentData.data.logs;
     this.leave_status_values = data.summaryContentData.data.leave_status_values;

     this.summaryContentData = data.summaryContentData;
     console.log(this.leave_status_values);
     this.setToday();
    });

    
    this.events.subscribe("changed:log", (data) =>{

          let object = data;

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
            this.appGlobalsProvider.view_log_history_btn = true;
            this.logsChanged();
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
    this.leave_status_values = this.summaryContentData.data.leave_status_values;

    this.setToday();
    this.logs = this.summaryContentData.data.logs;
    this.checkPermissions();
   
    console.log("loglist", this.logList);
    this.logListNative = this.logList.nativeElement;
  }

  checkPermissions(){
    console.log('inside checkPermissions');


    if(!this.summaryContentData.data.user.self){

        
            let result = this.authguard.userData;
            // console.log('result',result);
            let perm_class =result.class_permissions.edit_btn_pd;

            if(result.permissions.includes(perm_class)){
              this.edit_btn_pd =true;
              console.log("user has permissions to edit logs");
            }
            else{
              this.edit_btn_pd = false;
              console.log("user does not have permissions to edit logs");

            }

            perm_class = result.class_permissions.view_log_history_btn;

            if(result.permissions.includes(perm_class)){
              this.view_log_history_btn = true;
              console.log("user has permissions to view log history");

            }

            else{
              this.view_log_history_btn = false;
              console.log("user does not have permissions to view log history");

            }

            
         
         
    }
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
        text = moment(date, "kk:mm:ss").format("HH:mm");
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
      let popover = this.popoverCtrl.create( 'EditModalPage',{data:this.day_data[0] , leave_status_values : this.leave_status_values});
      popover.present();

  }

  logsChanged(){


     console.log("inside logsChangedModal");

      let data = this.day_data[0];
      console.log(this.day_data[0]);

      if(data.changes > 0){
       let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id,
        };

      let object = {
          user_id : [this.authguard.user_id],   

          filters : {
            work_date_range : {
              start : this.day_data[0].work_date,
              end : ''  
            }
            
          }
       }

       let url  = `${this.appGlobalsProvider.getApiUrl()}/log-history/${this.appGlobalsProvider.lang}`;

       console.log(object);

       this.appServiceProvider.request(url, 'post', object, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {


          console.log(response);

          if(response.status == 200){
           
           this.events.publish("start-home:changedLogs",response.data[0].history);
           // this.changedLogs = response;
            // let popover = this.popoverCtrl.create( 'LogsChangedPage', {data1:response.data[0].history});
            // popover.present();
          }

          else{
            this.appServiceProvider.presentToast(response.message, 'error');
          }


      });
     }

      // let data = {
      //       "changes": [{
      //       "modified_by": "sujit",
      //       "modified_on": "2017-09-06",
      //       "work_date": "2017-08-09",
      //       "type": "Locked_data table",
      //       "name": "Start time",
      //       "from": "09:34",
      //       "to": "09:58",
      //       "self": "true"
      //     }]
      // }

      // console.log(data);

      //   let popover = this.popoverCtrl.create( 'LogsChangedPage', {data1:data});
      //   popover.present();


    // let popover = this.popoverCtrl.create('LogsChangedPage', {data1:data});
    
    // popover.present({
    //   ev: ev
    // });
      

  }

  private mouseKeyPressed: boolean = false;
  private mouseDragStart: boolean = false;
  // @HostListener('document:click',['$event'])
  onMouseMove(event){
    if(this.mouseKeyPressed){
      // console.log("vent",event.currentTarget)
      if(event.currentTarget && event.currentTarget.classList){
        this.highlightSelected(event);
      }
    }
    this.mouseDragStart = false;
  }

  onMouseDown(event){
    this.mouseKeyPressed = true;
    this.mouseDragStart = true;
  }

  onMouseUp(event){
    this.mouseKeyPressed = false;
  }

  private hideMarkerUpdate: boolean = true;
  highlightSelected(event,type: string = ''){
    // console.log("event",event.currentTarget)
    if(type === 'click' || this.mouseDragStart){
      // console.log(this.logListNative.querySelectorAll(".selected-log"));

      this.deselectAllMarkers();
    }

    event.currentTarget.classList.add("selected-log");
    this.hideMarkerUpdate = false;
  }

  undoSelection(){
    this.deselectAllMarkers();
    this.hideMarkerUpdate = true;
  }

  deselectAllMarkers(){
    let prev_selections = this.logListNative.querySelectorAll(".selected-log");
    
    if(prev_selections.length > 0){
      for(var i = 0; i < prev_selections.length; i++){
        prev_selections[i].classList.remove("selected-log");
      }
    }
  }


}
