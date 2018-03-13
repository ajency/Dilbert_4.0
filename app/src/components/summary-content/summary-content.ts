import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';


import { TitleCasePipe } from '../../pipes/title-case/title-case';

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
  @ViewChild("markerEdit") markerEdit: ElementRef;

  private logListNative: any;
  private markerEditNative: any;
  private contentDimensions: any;
  // private contentLeftOffset: number;
  private allLogs: Array<any>;
  private slotTypes: Array<any>;
  private selectedSlotType: string = '';

  @Input('test') currentData : any ;
  @Input('logs') summaryContentData : any;
  @Input('is_current_user') allowSlotUpdate: boolean;

  private hasGlobalSlotPerm: boolean = false;
  // changedLogs : any;
  today : any;
  logs : any;
  day_data : any;
  leave_status_values;
  edit_btn_pd : boolean = true;
  view_log_history_btn : boolean = true;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  private naText: string;
  private toastMessages: any;
  private relaventWinHeight: number;
  private titleCasePipe: TitleCasePipe;
  private postSlotUpdateData: any = {};

  constructor(
              public translate: TranslateService, 
              public events : Events,
              public elementref: ElementRef,
              public zone : NgZone,
              public modalCtrl : ModalController,
              public popoverCtrl : PopoverController,
              public authguard : AuthguardProvider,
              public appServiceProvider : AppServiceProvider,
              public appGlobalsProvider : AppGlobalsProvider,
              public storage : Storage) {
    // console.log('SummaryContentComponent Component');
      this.translate.get("toast_messages").subscribe((res: any) => {
       // this.errorString = res;
       this.toastMessages = res;
      });
      this.naText = this.appGlobalsProvider.naText;
  
      this.titleCasePipe = new TitleCasePipe();

      this.updateContentCB = (data) => {
        $("#changelogview").html("View More");
        // this.currentData = data.date;
        this.undoSelection();
        console.log('inside update content');
        this.day_data = data.summaryContentData.data.day_data;
        this.logs = data.summaryContentData.data.logs;
        this.leave_status_values = data.summaryContentData.data.leave_status_values;
         
        this.summaryContentData = data.summaryContentData;
        this.allowSlotUpdate = this.hasGlobalSlotPerm || data.summaryContentData.data.user.self;
        
        console.log(this.leave_status_values);
        this.setToday();
  
        this.slotTypes = this.appServiceProvider.objectToArray(data.summaryContentData.data.slot_values);
        this.selectedSlotType = this.slotTypes[0]['slug'];
      }
   
      this.changelogCB = (data) => {
        
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
        
           }
      
      this.undoSelection = (toast: string = '') => {
        console.log("undonig selecetion")
        this.deselectAllMarkers();
        this.hideMarkerUpdate = true;
    
        if(toast)
          this.appServiceProvider.presentToast(toast);
          this.postSlotUpdateData.inprogess = false;
      }
      
      this.onMouseUp = (event) => {
        this.mouseKeyPressed = false;
        if(this.mouseDrag){
          this.getSelectedLogs();
        }
        this.mouseDrag = false;
        // console.log("start index: " + this.markerStartIndex + " end index: " + this.markerEndIndex);
      }
  
      this.removeAllListeners = () => {
        console.log("removing contnet listeners");
        this.events.unsubscribe('update:content',this.updateContentCB);
        this.events.unsubscribe("changed:log", this.changelogCB);
        this.events.unsubscribe("app:deselect_slot_selection",this.undoSelection);
        this.events.unsubscribe("app:slot_selection_mouse_up",this.onMouseUp);
        this.events.unsubscribe("app:removeContentCompListeners", this.removeAllListeners);  
      }
  
      this.events.subscribe('update:content',this.updateContentCB);
      this.events.subscribe("changed:log", this.changelogCB);
      this.events.subscribe("app:deselect_slot_selection",this.undoSelection);
      this.events.subscribe("app:slot_selection_mouse_up",this.onMouseUp);
      this.events.subscribe("app:removeContentCompListeners", this.removeAllListeners);  

  } // end contructor

  titleCase(val: string){
    return this.titleCasePipe.transform(val);
  }

  private updateContentCB: Function;
  private changelogCB: Function;
  private undoSelection: Function;
  private onMouseUp: Function;
  private removeAllListeners: Function;

  ngOnInit(){
    console.log("current user:", this.allowSlotUpdate)
    console.log("summary content", this.summaryContentData);
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
   
    // console.log("elementref width", this.elementref.nativeElement.clientWidth);
    // console.log("elementref get bound width", this.elementref.nativeElement.getBoundingClientRect());
    // this.contentDimensions = this.elementref.nativeElement.getBoundingClientRect()
    // this.contentLeftOffset = this.contentDimensions.left + this.contentDimensions.width;
    // console.log("content left offset", this.contentLeftOffset);
    
    this.logListNative = this.logList.nativeElement;
    this.markerEditNative = this.markerEdit.nativeElement;

    this.slotTypes = this.appServiceProvider.objectToArray(this.summaryContentData.data.slot_values);
    this.selectedSlotType = this.slotTypes[0]['slug'];
  
    this.relaventWinHeight = (window.innerHeight - 40); // 40 pixels for the footer
  } // end ngOnInit

  ngOnDestroy(){
    this.removeAllListeners();
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

    let permissions = this.authguard.userData.permissions;
    let slotclass = this.authguard.userData.class_permissions && this.authguard.userData.class_permissions.slot_marker ? this.authguard.userData.class_permissions.slot_marker : 'no_slot_permission';
    permissions.map((val) => {
      if(val === slotclass){
        this.hasGlobalSlotPerm = true;
      }
    })
    

    this.allowSlotUpdate = this.hasGlobalSlotPerm || this.summaryContentData.data.user.self;
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
    console.log(this.day_data);
     let d = new Date();
     let temp;
     if(this.day_data.length != 0 ){ 
     temp = this.day_data[0].work_date.split("-");
     d.setFullYear(temp[0], temp[1]-1, temp[2]);
     this.today = {
      day : this.days[d.getDay()],
      date : d.getDate(),
      month : this.monthNames[d.getMonth()],
      workdate: this.day_data[0].work_date
     }
   }

   console.log("today:", this.today);

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
  private mouseDrag: boolean = false;
  // @HostListener('document:click',['$event'])
  onMouseMove(event, index = null){
    if(this.mouseKeyPressed){
      this.mouseDrag = true;
      if(event.currentTarget && event.currentTarget.classList){
        this.highlightSelected(event,'',index);
      }
      this.mouseDragStart = false;
    }
  }

  onMouseDown(event){
    // this.selectedSlots = [];
    this.mouseKeyPressed = true;
    this.mouseDragStart = true;
  }

  private selectedSlots: Array<any> = [];

  // onMouseUp(event){
  //   this.mouseKeyPressed = false;
  //   if(this.mouseDrag){
  //     this.getSelectedLogs();
  //   }
  //   this.mouseDrag = false;
  //   // console.log("start index: " + this.markerStartIndex + " end index: " + this.markerEndIndex);
  // }

  getSelectedLogs(){
    let slogs = this.logListNative.querySelectorAll(".selected-log");
    console.log("slogs before update", slogs)
    if(slogs.length){
      this.allLogs = this.logListNative.querySelectorAll("div[data_index]");

      // compensate for missing highlights on fast drags
      let first_s_index = Number( slogs[0].getAttribute("data_index") );
      let last_s_index = Number( slogs[slogs.length - 1].getAttribute("data_index") );
  
      console.log("fs:" + first_s_index + " ls:" + last_s_index);
  
      for(let i = 0; i < this.allLogs.length; i++){
        let log = this.allLogs[i];
        let lindex = Number( log.getAttribute("data_index") );
      
        if(lindex >= first_s_index && lindex <= last_s_index){
          log.classList.add("selected-log");
        }
      
      }

      slogs = this.logListNative.querySelectorAll(".selected-log");


      // get the selected logs object
      this.selectedSlots = [];
      for(let i = 0; i < slogs.length; i++){
        // console.log(slogs[i].getAttribute("data_index"));
        let sindex = slogs[i].getAttribute("data_index") || -1;
        sindex = Number(sindex);
        // this.selectedSlots.push(sindex);
        let log = Object.assign({},this.logs[sindex]);
        log['index'] = sindex;
  
        this.selectedSlots.push(log);
      }
  
      console.log("selected logs: ", this.selectedSlots);
    }


  }

  updateMarkerRange(){
    if(this.hideMarkerUpdate) return;

    this.allLogs = this.logListNative.querySelectorAll("div[data_index]");

    let updated_lunch_markers = []
    for(let i = 0; i < this.allLogs.length; i++){
      let ulunch = this.allLogs[i].querySelector(".marker-lunch");
      
      if(ulunch){
        updated_lunch_markers.push( this.allLogs[i].getAttribute("data_index") );
        this.allLogs[i].classList.add("selected-log");
        console.log(i)
      }
    }
    console.log("prev lunches",updated_lunch_markers);



  }

  updateLogData(){
    let url  = `${this.appGlobalsProvider.getApiUrl()}/edit-slots`;
    this.postSlotUpdateData = this.appGlobalsProvider.requestDate;

    this.postSlotUpdateData.inprogess = true;
    console.log(url);
    let optionalHeaders = {
      'X-API-KEY' : this.authguard.userData.x_api_key,
      'From' : this.authguard.userData.user_id,
    };

    let body = {
      "user_id" : this.authguard.user_id,
      "work_date" : this.today.workdate,
      "slot_data" : [
        {
          "type" : this.selectedSlotType,        // lunch
          "logs" : this.selectedSlots
        }
      ]
    }

  let subscription = this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {
      
      if(response.status == 200){
        // this.undoSelection();
  
          // this.logs.map((val) => {
          //   delete val['slot'];
          // })

          // this.selectedSlots.map((slot,sindex) => {
          //   this.logs.map((log,lindex) => {
          //     if(slot['index'] == lindex){
          //       log['slot'] = this.selectedSlotType;
          //     }
          //   });
          // });
        
        this.events.publish("app:updatedata",this.postSlotUpdateData,this.toastMessages.slot_update_success);
          
        // this.appServiceProvider.presentToast(this.toastMessages.slot_update_success);

      }
      else{
        this.appServiceProvider.presentToast(response.message || this.toastMessages.slot_update_failure,'warn');
        this.postSlotUpdateData.inprogess = false;
      }

      subscription.unsubscribe();
    }, (err) => {
      console.warn(err);
      this.appServiceProvider.presentToast(this.toastMessages.slot_update_failure,"warn");
      this.postSlotUpdateData.inprogess = false;
      subscription.unsubscribe();
    });
  }

  private hideMarkerUpdate: boolean = true;
  private markerOffsetTop: number;

  // private markerStartIndex: number;
  // private markerEndIndex: number;

  highlightSelected(event,type: string = '',index = null){
    if( event.currentTarget.querySelector(".online.only-online") ) return;
    if(!this.allowSlotUpdate) return;
    event.stopPropagation();
    if(type === 'click'){
      console.log("selected click");
      this.getTopOffset(event);
      this.deselectAllMarkers(event.currentTarget);
      event.currentTarget.classList.toggle("selected-log");
      this.hideMarkerUpdate = event.currentTarget.classList.contains("selected-log") === true ? false : true;
      this.updateMarkerRange();
      this.getSelectedLogs();
      console.log("click toggle class");
    }
    else{
      if(this.mouseDragStart){
        this.deselectAllMarkers();
      }

      if(this.mouseDrag){
        this.getTopOffset(event);
      }

      event.currentTarget.classList.add("selected-log");
      this.hideMarkerUpdate = false;
      // console.log("drag toggle class")
    }
  }

  getTopOffset(event){
    this.markerOffsetTop = event.currentTarget.offsetTop; //relative to parent

    setTimeout(() => {
      let marker_edit_bottom = this.markerEditNative.getBoundingClientRect().bottom;
      // console.log("markeredit bottom:", marker_edit_bottom, " window height", (window.innerHeight - 40) );

      if( marker_edit_bottom > this.relaventWinHeight ){
        let newoffset = this.markerOffsetTop - (marker_edit_bottom -  this.relaventWinHeight);
        // console.log("newoffset:", newoffset);
        this.markerOffsetTop = newoffset > 0 ? newoffset : 0;
      }
    },50);

  }


  // undoSelection(toast: string = ''){
  //   console.log("undonig selecetion")
  //   this.deselectAllMarkers();
  //   this.hideMarkerUpdate = true;

  //   if(toast)
  //     this.appServiceProvider.presentToast(toast);
  //     this.postSlotUpdateData.inprogess = false;
  // }

  deselectAllMarkers(curtarget = null){
    let prev_selections = this.logListNative.querySelectorAll(".selected-log");
    
    if(prev_selections.length > 0){
      for(var i = 0; i < prev_selections.length; i++){
        if(curtarget === prev_selections[i]) continue;
        prev_selections[i].classList.remove("selected-log");
      }
    }
  }

  listClick(event): void{
    event.stopPropagation();
  }

  editBoxClick(event): void{
    event.stopPropagation();
  }


changelogview(){

        if ( $(".logbox").hasClass("hidden") ) {
             $(".logbox").removeClass("hidden");
             $(".logbox2").addClass("hidden");
             $("#changelogview").html("View More");
       }
       else{
        $(".logbox").addClass("hidden");
        $(".logbox2").removeClass("hidden");
        $("#changelogview").html("View Less");

       }

}




}
