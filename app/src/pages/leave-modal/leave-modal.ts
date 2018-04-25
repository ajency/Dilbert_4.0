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
    userInfo:any;
    leave_param1:any;
    createdByUserData:any;
    // requestAutocompleteItems:any;
    data:any;
    private $: any;
    model: any = null;
    disableDaysSelected: Array<Date> = [];
    selectedDates: Array<Date> = [];
    editSelectedDates: Array<Date> = [];
    editSelectedUsers:Array<any> = [];
    dataurl: string = `http://www.mocky.io/v2/5ac6ffa84a00004f007e0898`;  // URL to web API
    jsonData: any;
    private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      editableDateField:true,
      showClearDateBtn:true,
      disableUntil: {year: 2017, month: 1, day: 1},
    // disableDays:[this.disableDaysSelected]
    
  };
  // public model: any = { date: { year: 2018, month: 10, day: 9 } };

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



    // this.editLeaveData = this.navParams.get('data');
    // this.modalType = this.navParams.get('type');
    this.autocompleteItemsAsObjects=this.navParams.get('users');

    console.log(this.autocompleteItemsAsObjects);
    console.log(this.modalType);
    // console.log(this.selectedUsers);
    // console.log(this.selectedDates);
    // console.log(this.leaveNote);
    
    // if(this.editLeaveData  != undefined){
    //    this.editSelectedDates=this.editLeaveData.leave_date;
    //    this.editSelectedUsers=this.editLeaveData.tagged_users;
    //    // this.items=this.editLeaveData.tagged_users;
    //    this.leaveNote=this.editLeaveData.leave_note;
    //    this.leave_note1=this.leaveNote;
    //     console.log(this.editLeaveData.leave_note);
    //     console.log(this.selectedDates);
    //     console.log(this.leaveNote);
    //     console.log(this.items);
    //     console.log(this.selectedUsers);
    // }


   

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


//Api call to get all users
readData(){

// console.log(this.autocompleteItemsAsObjects);
// console.log(this.apiURL);

//     let url =  `${this.apiURL}/organisation-users/${this.authguard.userData.org_id}/`;

//     console.log(url);
//     let filter1 = {
//         // org_id : this.org_id,
//         // date:date.start,
//         // period_unit:this.period_unit
//       };

//      let filters = {
//       // date_range : date_range,
//       // period_unit : this.period_unit

//       };

//       let body = {
//         // filters : filters
//       }

//     let optionalHeaders = {
//           'X-API-KEY' : this.authguard.userData.x_api_key,
//           'From' : this.authguard.userData.user_id
//         };
//             this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {

//             console.log(response);

//                 if(response.status == 'success'){
//                      this.users = response.data;
//                      this.autocompleteItemsAsObjects = this.users;
//                      console.log(this.autocompleteItemsAsObjects);
//                 }
//                 else{
//                 this.appServiceProvider.presentToast(response.message, 'error');
//               }
              
//           })

}


// 
  ngOnInit(){
        if(this.editLeaveData  != undefined){
       this.editSelectedDates=this.editLeaveData.leave_date;
       this.editSelectedUsers=this.editLeaveData.tagged_users;
       // this.items=this.editLeaveData.tagged_users;
       this.leaveNote=this.editLeaveData.leave_note;
       this.leave_note1=this.leaveNote;
        console.log(this.editLeaveData.leave_note);
        console.log(this.selectedDates);
        console.log(this.leaveNote);
        console.log(this.items);
        console.log(this.selectedUsers);
    }
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-popover2");
    this.$(this.nativeElement).parents().find('.ng2-dropdown').addClass("customdrop");
     $("ng2-dropdown-menu").addClass("customdrop");

    // this.events.subscribe("update:leave_data",(leave_data) => {
    // this.leave_data=leave_data;
    // this.modalType="editLeave";

    //   console.log(this.leave_data);
    //   this.selectedUsers=this.leave_data.tagged_users;
    //   this.selectedDates=this.leave_data.leave_date;
    //    console.log(this.selectedUsers);
    //    console.log(this.selectedDates);

    //  });
    console.log(this.selectedUsers);
    console.log(this.selectedDates);

     
    this.readData();
    this.leave_param1=this.appGlobalsProvider.leave_param.param1;
    this.createdByUserData=this.authguard.userData;
    console.log(this.createdByUserData);
    console.log(this.leave_param1);






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

    leaveNoteData(test){

        this.leaveNote=test;
        var newstr = this.leaveNote.replace(/[\r\n|\n|\r]/gm,'');
        this.leave_note1 = newstr.split(' ').join(''); 
        this.checkIfData();
    }

    checkIfData(){
        if(this.leaveNote ==""|| this.leaveNote==null || this.leaveNote==undefined || this.selectedDates.length ==0 || this.selectedUsers.length==0 ||this.leave_note1=="" ){
     // console.log("error");
      this.buttonRequestApi=false;
    }else{
        this.buttonRequestApi=true;
    }
         console.log(this.selectedDates);
         console.log(this.selectedUsers);
         console.log( this.leaveNote);

    }
  sendData(){
    console.log("Data to be sent in api request");
    if(this.leaveNote ==""|| this.leaveNote==null || this.leaveNote==undefined || this.selectedDates.length ==0 || this.selectedUsers.length==0){
      console.log("error");
    }
    else{

         console.log(this.selectedDates);
         console.log(this.selectedUsers);
         console.log( this.leaveNote);
         console.log(this.apiURL);


        let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };


        let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/cloudAddLeave`;

        let user ={
            user_id :this.leave_param1.user_id ,
            email : this.leave_param1.email,
            name :this.leave_param1.name,
            avatar:this.leave_param1.avatar
        }
        let leave_date =this.selectedDates;

        let leave_note=this.leaveNote;
   

        let date_of_application='';

        

        // let tagged_users_filter ={
        //   tagged_users:this.selectedUsers
        // }

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
        

        let leave_type ='leave_taken';
        



        let body ={
          user:user,
          created_by:createdByUser,
          leave_date:leave_date,
          leave_note:leave_note,
          leave_type:leave_type,
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
                     // console.log(this.summaryData);
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
  

updateData(){
  console.log("data to be edited");
  if(this.leaveNote ==""|| this.leaveNote==null || this.leaveNote==undefined || this.selectedDates.length ==0 || this.selectedUsers.length==0){
      console.log("error");
    }
    console.log(this.leaveNote);
    console.log(this.selectedDates);
    console.log(this.selectedUsers);
    // console.log(this.leaveNote);

}

editDateChanged(event){
  console.log(event.formatted);
  console.log(this.editSelectedDates);
   if(event.formatted !=""){
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
               // this.checkIfData();
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
       // this.checkIfData();
       this.model=null;
        console.log(this.editLeaveData);

}
editOnItemAdded(item){
     console.log('tag added: value is ' + item.name);
     console.log(item);
       let data1={
            user_id:item.user_id,
            name :item.name,
            email:item.email
        }
         console.log(data1);
         this.editSelectedUsers.push(data1);
        console.log(this.editSelectedUsers);
         console.log(this.editLeaveData);

}
editOnItemRemoved(item){
    console.log(item);
    console.log('tag removed: value is ' + item.name);
      this.editSelectedUsers = this.editSelectedUsers.filter((data: any) => {
          return item.name !== data.name;
    })

 console.log(this.editSelectedUsers);
}


}

//   editOnItemAdded
// editOnItemRemoved

