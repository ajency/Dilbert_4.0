import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import {IMyDpOptions} from 'mydatepicker';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, first, debounceTime } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
// import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';

import * as $ from 'jquery';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';


import { Storage } from '@ionic/storage';

// import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


/**
 * Generated class for the LeaveModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-modal',
  templateUrl: 'leave-modal.html',
})

export class LeaveModalPage {
    leave_data:any;
    items:any;
    editedItems:Array<any> = [];
    editLeaveData : any;
    modalType:any;
    buttonRequestApi: boolean = false;
    users:any;
    leave_note1:any;
    text:any;
    summaryData:any;
    leaveNote:any;
    private nativeElement: any;
    selectedUsers:Array<any> = [];
    apiURL : any;
    userData:any;
    autocompleteItemsAsObjects:any;
    autocompleteItemsAsObjects2:any;
    userInfo:any;
    leave_param1:any;
    createdByUserData:any;
    data:any;
    private $: any;
    model: any = null;
    disableDaysSelected: Array<Date> = [];
    selectedDates: Array<Date> = [];
    editSelectedDates: Array<Date> = [];
    editSelectedUsers:Array<any> = [];
    editLeaveNote:any;
    editLeaveNote2:any;
    leaveUpdateStatus:any;
    holidays:Array<any> = [];
    holidayWeekDay:Array<any> = [];


    tempUsers:Array<any> = [];

    private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      editableDateField:true,
      showClearDateBtn:true,
      disableUntil: {year: 2017, month: 1, day: 1},
      disableWeekdays:this.holidayWeekDay,
      disableDays:this.holidays
   }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider,
              private http: Http,
              public appGlobalsProvider : AppGlobalsProvider,
              public storage : Storage,
              public popoverCtrl: PopoverController) {
                this.apiURL = this.appGlobalsProvider.getApiUrl();
                this.nativeElement = this.element.nativeElement;
                this.$ = this.appServiceProvider.jQuery;
                 // const oldData1=this.navParams.get('data');
                this.editLeaveData = this.navParams.get('data');
                this.modalType = this.navParams.get('type');
                this.autocompleteItemsAsObjects=this.navParams.get('users');
                this.autocompleteItemsAsObjects2=this.navParams.get('users');
                console.log(this.autocompleteItemsAsObjects);
                console.log(this.modalType);
                
                if(this.editLeaveData  != undefined)
                {
                  console.log("its here");

                   this.editSelectedDates=this.editLeaveData.leave_date;
                   this.editSelectedUsers=this.editLeaveData.tagged_users;
                   this.editLeaveNote=this.editLeaveData.leave_note;
                   this.editLeaveNote2=this.editLeaveData.leave_note;

                   for(var i=0; i<this.editSelectedUsers.length;i++){

                    var temp_tag=this.editSelectedUsers[i].name;
                    var tagUser=temp_tag.split(' ');
                    var temUserTag= "@"+tagUser[0];
                    this.editedItems.push(this.editSelectedUsers[i]);
                    console.log(this.editedItems);
                    console.log(this.editedItems.length);
                     }
                    for (var j = 0; j < this.editedItems.length; j++) {
                      if(!this.editedItems[j].display){
                      this.editedItems[j].display='';
                      }
                      if(this.editedItems[j].display==''){
                        var temp_tag=this.editSelectedUsers[j].name;
                        var tagUser=temp_tag.split(' ');
                        var temUserTag= "@"+tagUser[0];
                        this.editedItems[j].display=temUserTag;
                      }
                      //user_tag
                       if(!this.editedItems[j].user_tag){
                      this.editedItems[j].user_tag='';
                      }
                      if(this.editedItems[j].user_tag==''){
                        var temp_tag=this.editSelectedUsers[j].name;
                        var tagUser=temp_tag.split(' ');
                        var temUserTag= "@"+tagUser[0];
                        this.editedItems[j].user_tag=temUserTag;
                      }
                    }
                      console.log(this.editedItems);
                      console.log(this.autocompleteItemsAsObjects2);

                      for(var i=0;i<this.editedItems.length;i++){
                        this.upadtetaguser(this.editedItems[i]);
                      }
                      console.log(this.autocompleteItemsAsObjects2);
                }
  }
     upadtetaguser(item){
       this.autocompleteItemsAsObjects2 = this.autocompleteItemsAsObjects2.filter((data: any) => {
        return item.user_id !== data.user_id;
      })
       console.log("after remove");
       console.log(this.autocompleteItemsAsObjects2);
     }
    public onItemAdded(item) {

        console.log('tag added: value is ' + item.name);
        console.log(item);
        let data={
            user_id:item.user_id,
            name :item.name,
            email:item.email
        }
        console.log(data);
         this.selectedUsers.push(data);
        console.log(this.selectedUsers);
         this.checkIfData();
        
    }

    public onItemRemoved(item) {
          console.log('tag removed: value is ' + item.name);
          this.selectedUsers = this.selectedUsers.filter((data: any) => {
          return item.name !== data.name;
    })

 this.checkIfData();
    }

  ngOnInit(){
    this.publicholidays();
    if(this.editLeaveData  != undefined){
       this.editSelectedDates=this.editLeaveData.leave_date;
       this.editSelectedUsers=this.editLeaveData.tagged_users;
       // this.items=this.editLeaveData.tagged_users;
       this.leaveNote=this.editLeaveData.leave_note;
       this.leave_note1=this.leaveNote;
       // this.editLeaveNote2 = this.leaveNote;

    }
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-popover2");
    this.$(this.nativeElement).parents().find('.ng2-dropdown').addClass("customdrop");
     $("ng2-dropdown-menu").addClass("customdrop");
    console.log(this.selectedUsers);
    console.log(this.selectedDates);
    this.leave_param1=this.appGlobalsProvider.leave_param.param1;
    this.createdByUserData=this.authguard.userData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveModalPage');
      console.log(this.userInfo);
      console.log("yes");
  }
  close() {
  this.viewCtrl.dismiss();
  }

  close1() {
    console.log(this.editLeaveData);
    this.viewCtrl.dismiss();
  }

   onDateChanged(event) {
    console.log(event.formatted);
        if(event.formatted !=""){
              if(this.selectedDates.length==0){
                   this.selectedDates.push(event.formatted);
              }
              if(this.selectedDates.length!=0){
                var x=1;
                for(var i=0; i<this.selectedDates.length;i++){
                   if(this.selectedDates[i] == event.formatted){
                           x=0;
                   }
                }
                console.log(x);
                if(x==1){
                   this.selectedDates.push(event.formatted);
                }
             }
              console.log(this.selectedDates);
               this.checkIfData();
           }
    }

    deleteSetected(removeDate){
      // console.log(removeDate);
      this.selectedDates = this.selectedDates.filter((date: any) => {
          return removeDate !== date;
      })
      // console.log(this.selectedDates);
       this.checkIfData();
       this.model=null;
    }

    leaveNoteData(data){
        this.leaveNote=data;
        var newstr = this.leaveNote.replace(/[\r\n|\n|\r]/gm,'');
        this.leave_note1 = newstr.split(' ').join(''); 
        this.checkIfData();
        console.log(this.leaveNote);
        console.log(this.leaveNote.length);
    }

    checkIfData(){
        if(this.leaveNote ==""|| this.leaveNote==null || this.leaveNote==undefined || this.selectedDates.length ==0 || this.selectedUsers.length==0 ||this.leave_note1=="" ){
          this.buttonRequestApi=false;
        }else{
          this.buttonRequestApi=true;
        }
    }
    sendData(){
      console.log("Data to be sent in api request");
      if(this.leaveNote ==""|| this.leaveNote==null || this.leaveNote==undefined || this.selectedDates.length ==0 || this.selectedUsers.length==0){
        console.log("error");
      }
     else{
        let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };
        let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/addLeave`;
        let user ={
            user_id :this.leave_param1.user_id ,
            email : this.leave_param1.email,
            name :this.leave_param1.name,
            avatar:this.leave_param1.avatar
        }
        let leave_date =this.selectedDates;
        let leave_note=this.leaveNote;
        let date_of_application='';
        let  tagged_users=this.selectedUsers;
        let createdByUser ={
            user_id :this.createdByUserData.user_id ,
            email : this.createdByUserData.userEmail,
            name :this.createdByUserData.name
        }
        let modified_by ={
            user_id :'',
            email : '',
            name :''
        }
        let leave_status='';
        let type ='leave_taken';
        let body ={
          user:user,
          created_by:createdByUser,
          leave_date:leave_date,
          leave_note:leave_note,
          type:type,
          tagged_users:tagged_users
        }
        console.log(body);

       this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
            this.summaryData = response.data;
            console.log(this.summaryData);
            console.log(response);
            this.appGlobalsProvider.leave_request_param.param1=response;

                if(response.status == 'success'){
                     this.summaryData = response.data;
                     console.log(this.summaryData);
                     this.events.publish("update:leave_info", this.summaryData);
                     this.leaveAddedModal();
                     this.close(); 
                }
                   else{
            // this.appServiceProvider.presentToast(response.message, 'error');
            this.leaveAddedModal();
            this.close(); 
          }
          })
    }
  }
  leaveAddedModal(){
      console.log("inside leaveAddedModal");
      let popover = this.popoverCtrl.create( 'LeaveAddedPage');
      popover.present();
  }
  
//edit leave

editDateChanged(event){
  this.editDeleteSetected("s");
  console.log(event.formatted);
  console.log(this.editSelectedDates);
   if(event.formatted !="")
   {
      if(this.editSelectedDates.length==0){
           this.editSelectedDates.push(event.formatted);
      }
      if(this.editSelectedDates.length!=0){
        var x=1;
        for(var i=0; i<this.editSelectedDates.length;i++){
           if(this.editSelectedDates[i] == event.formatted){
                   x=0;
           }
        }
        console.log(x);
        if(x==1){
           this.editSelectedDates.push(event.formatted);
        }
     }
    
      console.log(this.editSelectedDates);
       this.checkIfEditData();
  }
   console.log(this.editSelectedDates);
   console.log(this.editLeaveData);
}
editDeleteSetected(removeDate){
    // console.log(removeDate);
      this.editSelectedDates = this.editSelectedDates.filter((date: any) => {
          return removeDate !== date;
      })
      console.log(this.editSelectedDates);
        this.checkIfEditData();
       this.model=null;
        // console.log(this.editLeaveData);
        console.log(this.editSelectedUsers);

}
editOnItemAdded(item){
     this.editOnItemRemoved("oh");
     console.log('tag added: value is ' + item.name);
      let data1={
            user_id:item.user_id,
            name :item.name,
            email:item.email
        }

      if(this.editSelectedUsers.length==0){
                   this.editSelectedUsers.push(data1);
       }
      if(this.editSelectedUsers.length!=0){
        var x=1;
        for(var i=0; i<this.editSelectedUsers.length;i++){
           if(this.editSelectedUsers[i].user_id == data1.user_id){
                   x=0;
           }
        }
        console.log(x);
        if(x==1){
           this.editSelectedUsers.push(data1);
        }
     }

     console.log(item);
      
        console.log(data1);
        // this.editSelectedUsers.push(data1);
        console.log(this.editSelectedUsers);
        console.log(this.editLeaveData);
         this.checkIfEditData();

}
editOnItemRemoved(item){
    console.log(item);
    console.log('tag removed: value is ' + item.name);
      this.editSelectedUsers = this.editSelectedUsers.filter((data: any) => {
          return item.user_id !== data.user_id;
    })
  console.log(this.editSelectedUsers);
  this.checkIfEditData();
  console.log(item);
  if(item.user_id){
    if(this.autocompleteItemsAsObjects2.length==0){
                   this.autocompleteItemsAsObjects2.push(item);
       }
      if(this.autocompleteItemsAsObjects2.length!=0){
        var x=1;
        for(var i=0; i<this.autocompleteItemsAsObjects2.length;i++){
           if(this.autocompleteItemsAsObjects2[i].user_id == item.user_id){
                   x=0;
           }
        }
        console.log(x);
        if(x==1){
           this.autocompleteItemsAsObjects2.push(item);
        }
     }

    // this.autocompleteItemsAsObjects2.push(item);
  }
  
  console.log(this.autocompleteItemsAsObjects2);
}

editLeaveNoteData(test){

    this.editLeaveNote=test;
    var newstr = this.editLeaveNote.replace(/[\r\n|\n|\r]/gm,'');
    this.editLeaveNote2 = newstr.split(' ').join(''); 
    this.checkIfEditData();
}
checkIfEditData(){
    console.log("data to be edited");
  if(this.editLeaveNote ==""|| this.editLeaveNote==null || this.editLeaveNote2 ==""|| this.editLeaveNote==undefined || this.editSelectedUsers.length ==0 || this.editSelectedDates.length==0){
      console.log("error");
      console.log(this.editLeaveNote);
      console.log(this.editSelectedDates);
      console.log(this.editSelectedUsers);
      this.buttonRequestApi=false;

    }
    else{
    console.log(this.editLeaveNote);
    console.log(this.editSelectedDates);
    console.log(this.editSelectedUsers);
    // console.log(this.leaveNote);
    this.buttonRequestApi=true;
    }
}

updateData(){
  console.log("update data api call");
  let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };

  let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/updateLeave`;

  console.log(this.editLeaveData);
  let modified_by ={
            user_id :this.createdByUserData.user_id ,
            email : this.createdByUserData.userEmail,
            name :this.createdByUserData.name
        }
  if(!this.editLeaveData.modified_by){
    this.editLeaveData.modified_by=[];
  }
  console.log("after update data");
  console.log(this.editLeaveData);
  let user ={
      user_id :this.leave_param1.user_id ,
      email : this.leave_param1.email,
      name :this.leave_param1.name,
      avatar:this.leave_param1.avatar
  }
  let leave_date =this.editSelectedDates;
  let leave_note=this.editLeaveNote;
  let tagged_users=this.editSelectedUsers;

  let type ='leave_taken';

  var data_leave={
    user:this.editLeaveData.user,
    modified_by:modified_by,
    leave_date:leave_date,
    leave_note:leave_note,
    tagged_users:tagged_users,
    type:type,
    date_of_application:this.editLeaveData.date_of_application,
    valid:this.editLeaveData.valid
  }

//this.editLeaveData.user.user_id
  let body ={
   user_id:this.editLeaveData.user.user_id,
   parent_id:this.editLeaveData.parent_id,
   leave_data:data_leave

  }
  console.log(body);

  this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
    this.appGlobalsProvider.leave_update_param.param1=response;
    this.appGlobalsProvider.leave_update_param.param2="updateLeave";
      if(response.status == 'success'){
       console.log(response.data);
       this.editLeaveData.modified_by=modified_by;
       this.editLeaveData.leave_date=this.editSelectedDates;
       this.editLeaveData.tagged_users=this.editSelectedUsers;
       this.editLeaveData.leave_note=this.editLeaveNote;
       // this.leaveAddedModal();
       this.close(); 
       this.leaveUpdateModal();
      }
      else{ 
        this.close(); 
        this.leaveUpdateModal();
      }

    })


}

  leaveUpdateModal(){
      console.log("inside leaveUpdateModal");
      let popover = this.popoverCtrl.create( 'UpdateLeavePopUpPage');
      popover.present();
  }

  funclose(){
    // this.editLeaveData = oldData1;
    this.viewCtrl.dismiss();
  }

  publicholidays(){
    console.log(this.appGlobalsProvider.leave_param.param2.holidayWeekDay);
    console.log(this.appGlobalsProvider.leave_param.param2.holidays);
    var day=this.appGlobalsProvider.leave_param.param2.holidayWeekDay;
    for( var i =0 ; i<day.length;i++){
      this.holidayWeekDay.push(day[i]);
    }
    var holidayDates=this.appGlobalsProvider.leave_param.param2.holidays;
    for(var i=0; i<holidayDates.length;i++){
      this.holidays.push(holidayDates[i]);
    }
    console.log(this.holidays);
    console.log(this.holidayWeekDay);
    console.log("------------holidays----------");
    // for( var i=0 ; i< 10;i++){
    // var temp={year: new Date().getFullYear()+i, month:  5, day:  1} ;
    // var temp2={year: new Date().getFullYear()+i, month:  4, day:  14} ;
    // var temp3={year: new Date().getFullYear()+i, month:  1, day:  26} ;
    // var temp3={year: new Date().getFullYear()+i, month:  12, day:  25} ;
    // var temp4={year: new Date().getFullYear()+i, month:  12, day:  19} ;
    // console.log(temp);
    //  this.holidays.push(temp);
    //  this.holidays.push(temp2);
    //  this.holidays.push(temp3);
    //  this.holidays.push(temp4);
    // }
    // console.log(this.holidays);
    // console.log(this.holidayWeekDay);
  }

}
