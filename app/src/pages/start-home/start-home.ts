// import { PopoverContentPage } from './../popover/popover';
// import { SideBarData, Dates } from './../../components/summary-sidebar/summary-sidbar.data';
// import { SummaryContentComponent } from '../../components/summary-content/summary-content';
// import { SummarySidebarService } from './../../components/summary-sidebar/summary-sidebar.service';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery';


import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the StartHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage({
  name: 'dashboard',
  segment: 'dashboard',
  priority: 'off'
})
 @Component({
  selector: 'page-start-home',
  templateUrl: 'start-home.html',
  // providers: [SummarySidebarService]
})
 export class StartHomePage {
 // @ViewChild(SummaryContentComponent) sideContentObj: SummaryContentComponent;
 sideBarData: any;
 show :any = 3;
 leaveShow:any=2;
 teamLeaveShow:any=2;
 summaryContentData : any;
 currentDate : any;
 summaryDate : any;
 userId : any;
 key : any;
 apiURL : any;
 failed : boolean = false;
 public param1 : any;
 public param2 : any;
 period_unit : string ;
 cos_offset : string ;
 message : string;
 view_log_history_btn : boolean = true;
 changedLogs : any;
 userLeaveData:any;
 teamLeaveData:any;
 leave_param1 :any;
 dummyData:any;
 user_id1:any;
 newparam1:any;
 teamCommentShow:any=1;
 todayDate:any;
 myTodayDate:any;
 dataToBeEdited:any;
 autocompleteItemsAsObjects:any;
 allUser_ids:Array<any> = [];
 my_user_id:Array<any> = [];
 commentNote:any;
 commentNote1:any;
 commentButton: boolean = false;
 commentDetails:any;
 userDetails:any;
 myLeaveCount:any;
 teamLeaveCount:any;
 all_users:any;
 loggedInUser:any;
 dummmy:any;
 currentTime:any;
 originalObject:any;
 myLeaveOptions:any;
 teamLeaveOptions:any;
 selectedOption:any;
 teamSelectedOption:any;
 top:any;
 leave_feature_enable : boolean =false;
 edit_others_leaves : boolean =false;

 private chageLogCB: Function;

 constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public popoverCtrl: PopoverController, 
  private cookieservice: CookieService,
  public zone : NgZone,
  public events : Events,
  public userDataProvider : UserDataProvider,
  public authguard : AuthguardProvider,
  public appServiceProvider : AppServiceProvider,
  public storage : Storage,
  public appGlobalsProvider : AppGlobalsProvider) {
  this.apiURL = this.appGlobalsProvider.getApiUrl();

  // this.param1 = navParams.get("param1");
  // this.param2 = navParams.get("param2");

  // this.events.subscribe('dashboard:params' , (params) =>{
  //   this.param1 = params.param1;
  //   this.param2 = params.param2;
  //   console.log(this.param1,this.param2);
  // });
  // console.log(this.param1, this.param2);
  this.chageLogCB = (data) =>{
    console.log('inside publish changedLogs');
    this.view_log_history_btn = this.appGlobalsProvider.view_log_history_btn;
    this.changedLogs = data;

  }

  this.events.subscribe("start-home:changedLogs", this.chageLogCB);

  
}

ngOnInit(){
    console.log("-------------------------------testing----------------------------------");
    this.checkPermissionsLeave();
    this.selectedOption="Upcoming";
    this.teamSelectedOption="Upcoming";
    this.myLeaveOptions=['Upcoming','All'];
    this.teamLeaveOptions=['Upcoming','All'];
    this.currentTime =moment().format('MMMM Do YYYY, h:mm:ss a');
    this.userDetails=this.authguard.userData;
    console.log(this.userDetails);
    this.readUserData();
    this.todayDate=moment().format("YYYY-MM-DD");
    this.myTodayDate=moment().format("YYYY-MM-DD");

    this.events.publish("app:localize",this.appGlobalsProvider.lang);
    this.events.publish('app:updatehistory','dashboard');
    this.leave_param1=this.appGlobalsProvider.leave_param.param1;

  
    this.param1 = this.appGlobalsProvider.dashboard_params.param1;
    this.param2 = this.appGlobalsProvider.dashboard_params.param2;

    console.log(this.param1, this.param2);
    console.log(this.leave_feature_enable);

    this.userId = this.authguard.user_id;
    this.key = this.authguard.userData.x_api_key;

    // if((this.param1 == '' && this.param2 == '') || (this.param1 == undefined && this.param2 == undefined) ){
    if(!this.param1){
      this.period_unit = this.appGlobalsProvider.period_unit;
      this.cos_offset = this.appGlobalsProvider.cos_offset;
      this.getUserDate();
      console.log('no params passed');
    }

    else {
      console.log('params passed');

      if(this.param1 && this.param2){
        this.currentDate = this.param1.start_date;
        this.period_unit = this.param1.period_unit;
        this.authguard.user_id = this.param1.user_id
        this.userId = this.authguard.user_id;
        this.cos_offset = this.appGlobalsProvider.cos_offset;;
        // console.log(this.cos_offset);
        // console.log(this.currentDate);

        if(this.startAndEndOfWeek(this.currentDate, this.param2.summary_date)){
        this.summaryDate = this.param2.summary_date;
        this.getData();
        }

        else{

          this.summaryDate = this.currentDate;
           this.getData();
        }

      }

    }
      //dummy data for leave view 
      this.events.subscribe("update:leave_info",(dummy) => {
        // console.log(dummy);
        // console.log(this.userLeaveData);
        // console.log(this.teamLeaveData);
        // // if(this.userLeaveData.data.leaves){
        // //   this.userLeaveData.data.leaves.push(dummy);
        // // }
        //   console.log(this.userLeaveData);
        //   this.myLeaveCount=this.userLeaveData.data.leaves.length;
        //   this.dummmy=dummy;

        //   // this.zone.run(() => {});
          this.checkleaves();

     });
  
}

   getDayDate(date: string, option: number): string {
    var text: string = '';
    switch (option) {
      case 1:
        text = moment(date.split(" ")[0], "YYYY-MM-DD").format("DD MMM YYYY");
        break;
      case 2:
        text = moment(date.split(" ")[1], "kk:mm:ss").format("hh:mm a");
        break;
      case 3:
        text = moment(date, "kk:mm:ss").format("hh:mm a");
        break;
      case 4:
        text = moment(date, "kk:mm:ss").format("HH:mm");
        break;
      case 5:
        text = moment(date.split(" ")[0], "YYYY-MM-DD").format("DD MMM");
        break;

    }
    return text;
  }

//   getDateFormated(date:string,option:number): string{
//     var text: string = '';
//         switch (option) {
//       case 1:
//         text = moment(date.split(" ")[0], "YYYY-MM-DD").format("DD MMM");
//         break;
//       case 2:
//         text = moment(date.split(" ")[1], "kk:mm:ss").format("hh:mm a");
//         break;
//       case 3:
//         text = moment(date, "kk:mm:ss").format("hh:mm a");
//         break;
//       case 4:
//         text = moment(date, "kk:mm:ss").format("HH:mm");
//         break;
//     }
//     return text;
// }


 openStyle(){

  // var navOption = {
  //   animation: "ios-transition"
  // }
  
  // this.navCtrl.push('StyleGuidePage',{},navOption);
}


ionViewDidLoad() {
  console.log("################## entering start home page ###################", this.firstPageLoad);
   console.log("-------------------------------testing----------------------------------");
  this.zone.run(() => {});
    // console.log('ionViewDidLoad dashboard')
  }

  private firstPageLoad: boolean = true;
  ionViewWillLeave(){
    this.firstPageLoad = false;
    console.log("################## leaving start home page #####################", this.firstPageLoad);
    console.log('ion view will leave dashboard');
    this.appGlobalsProvider.dashboard_params.param1 = '';
    this.appGlobalsProvider.dashboard_params.param2 = '';
    this.authguard.user_id = this.authguard.userData.user_id;

    this.events.unsubscribe("start-home:changedLogs", this.chageLogCB);
    this.events.publish("app:removeSidebarCompListeners");
    this.events.publish("app:removeContentCompListeners");
  }



  ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('dashboard')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{
          // if(this.appGlobalsProvider.dashboard_params.param1 && this.appGlobalsProvider.dashboard_params.param2 ){
          //  console.log('can enter dashboard')   
          //  resolve(true)
          // }

          // else{
          //   console.log('cannot enter dashboard')
          //   reject(false)
           console.log('can enter dashboard') 
          resolve(true);
            
          
        })
        .catch(() => {
          reject(true)
        });
       
      })
      .catch(() => {
        reject(true)
      })
    });

  }


  
  getData(){
    
    let date_range={
      start:this.currentDate,
    };

 
    let optionalHeaders = {
      'X-API-KEY' : this.key,
      'From' : this.authguard.userData.user_id
    };


    let url =  `${this.apiURL}/period-data/${this.appGlobalsProvider.lang}`;
    // console.log(url);
    let filter1 = {
        user_id:this.authguard.user_id,
        start_date:this.currentDate,
        period_unit:this.period_unit
      };

     let filters = {
      date_range : date_range,
      period_unit : this.period_unit

      };


    let body = {
      user_id:this.authguard.user_id,
      filters : filters
    };
    

    if(this.authguard.user_id == this.authguard.userData.user_id){
      console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!! REQUESTING USER DATA OF CURRENT USER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    } 

    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

        this.sideBarData = response;
        if(this.sideBarData.data.periodData.length != 0){
            console.log(this.sideBarData.data.periodData[this.sideBarData.data.periodData.length - 1].work_date)
            if(this.sideBarData.data.periodData[0].work_date < this.sideBarData.data.user.joining_date){
              this.sideBarData.data.periodData = [];
              console.log(this.sideBarData);
            }

            else if(this.sideBarData.data.periodData[0].work_date > this.sideBarData.data.user.joining_date && 
                      this.sideBarData.data.periodData[this.sideBarData.data.periodData.length - 1].work_date < this.sideBarData.data.user.joining_date ){

                  for(var i = 0; i < this.sideBarData.data.periodData.length; i++ ){
                    if(this.sideBarData.data.periodData[i].work_date < this.sideBarData.data.user.joining_date && this.sideBarData.data.periodData[i].leave_status == 'Leave')
                        this.sideBarData.data.periodData[i].leave_status = 'Not joined';
                  }

            }
        }

         let data123=this.sideBarData;
          this.events.publish("update:userDataForLeave", data123);



        this.zone.run(() => {});
        // this.events.publish('app:updatehistory','dashboard');

        // let serializedquery =  `?${$.param(filter1)}`;
        // this.events.publish('app:updatehistory',{page: 'dashboard', state: {query: serializedquery},  frompath: `/dashboard` , replace : true});
        

        // Call for day summary (RHS or logs data) 
        url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;


        
        let body2 = {
          user_id : this.userId,
          date : this.summaryDate,
          cos_offset : this.cos_offset
        }

       let filter2 = {
        summary_date:this.summaryDate,
        // cos_offset : this.cos_offset
       }

        // this.appServiceProvider.presentLoader();

        this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', 'disable', filter2, true).subscribe( (response) => {
        // console.log(response);
        this.summaryContentData = response;
        this.zone.run(() => {});

        // Object.assign(filter1,filter2);
        let serializedquery = `?${$.param(filter1)}?${$.param(filter2)}`;
        
        // serializedquery = `?${$.param(filter2)}`;
        // this.events.publish('app:updatehistory',{page: 'dashboard', state: {query: serializedquery},  frompath: `/dashboard`, appendurl : true, replace : true });
        this.events.publish('app:updatehistory',{page: 'dashboard', state: {query: serializedquery},  frompath: `/dashboard`, replace : true });

        this.checkPermissions();

        // Call for changed logs
        
       let data = this.summaryContentData.data.day_data[0];
       console.log(data);
      
      if(data.changes>0 && this.view_log_history_btn){

        let object = {
            user_id : [this.authguard.user_id],   

            filters : {
              work_date_range : {
                start : data.work_date,
                end : ''  
              }
              
            }
         }
         console.log(object);

         url  = `${this.apiURL}/log-history/${this.appGlobalsProvider.lang}`;


         this.appServiceProvider.request(url, 'post', object, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {


            console.log(response);

            if(response.status == 200){
             
              // let popover = this.popoverCtrl.create( 'LogsChangedPage', {data1:response.data[0].history});
              // popover.present();
              this.changedLogs = response.data[0].history;
              this.view_log_history_btn =true;
            }

            else{
              this.appServiceProvider.presentToast(response.message, 'error');
              this.view_log_history_btn = false;
            }


        });


     }
     else{
      this.view_log_history_btn =false;
     }

      });

    }

    else{
        this.failed = true;
        this.message = response.message;
        this.zone.run(() => {});
        
    }


    });


    
  }


   checkPermissions(){
    console.log('inside checkPermissions');


    if(!this.summaryContentData.data.user.self){

        
            let result = this.authguard.userData;
            // console.log('result',result);

            let perm_class = result.class_permissions.view_log_history_btn;

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

  getUserDate() {
    this.currentDate = this.formatDate(new Date());
    // this.currentDate = '2017-09-04';
    this.summaryDate = this.currentDate;
    // this.getData(this.currentDate);
    this.getData();
    
  }

  formatDate(date) {
    let temp = new Date(date);
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
  }


  startAndEndOfWeek(date1, date2) : any {

  // If no date object supplied, use current date
  // Copy date so don't modify supplied date
  // console.log(date1,date2);
  var now = new Date(date1);

  // set time to some convenient value
  now.setHours(0,0,0,0);

  // Get the previous Monday
  var monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  // Get next Sunday
  var sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

  // Return array of date objects
  var dayDate = new Date(date2);

  // console.log(monday, dayDate, sunday);

  if(monday <= dayDate && dayDate <= sunday){
    return true;
  }

  else{
    return false;
  }
}

leaveModal(){
   console.log("inside leaveModal");
      let popover = this.popoverCtrl.create( 'LeaveModalPage',{users:this.autocompleteItemsAsObjects});
      popover.present();
}
checkleavesTeam(){
  console.log("Team leaves");
    let url = `https://us-central1-dilbert-34d6c.cloudfunctions.net/viewLeave`;
    console.log(this.leave_param1.user_id);
    console.log(this.allUser_ids);
    let leave_date ={
                start:this.todayDate,
                 end:''
           }
    let  filters ={
      users:this.allUser_ids,
      leave_date:leave_date
    };
    let filter1={
        filters:filters
    }
    console.warn(filter1);
    let optionalHeaders={
       'X-API-KEY' : this.key,
       'From' : this.authguard.userData.user_id
    };
     this.appServiceProvider.request(url, 'post', filter1, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {
         if(response.status == 'success'){
        this.teamLeaveData=response;
        this.teamLeaveCount=this.teamLeaveData.data.leaves.length;
        // if(response.data.leaves.length ==0){
        //     this.allTeamLeave();

        // }
      }
      else{
         this.appServiceProvider.presentToast(response.message, 'error');
      }
    });

}
allTeamLeave(){
    console.log("Team leaves");
    this.teamSelectedOption="All";
    let url = `https://us-central1-dilbert-34d6c.cloudfunctions.net/viewLeave`;
    console.log(this.leave_param1.user_id);
    console.log(this.allUser_ids);
    let leave_date ={
                start:'',
                 end:''
           }
    let  filters ={
      users:this.allUser_ids,
      leave_date:leave_date
    };
    let filter1={
        filters:filters
    }
    console.warn(filter1);
    let optionalHeaders={
       'X-API-KEY' : this.key,
       'From' : this.authguard.userData.user_id
    };
     this.appServiceProvider.request(url, 'post', filter1, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {
         if(response.status == 'success'){
        this.teamLeaveData=response;
        this.teamLeaveCount=this.teamLeaveData.data.leaves.length;
      }
      else{
         this.appServiceProvider.presentToast(response.message, 'error');
      }
    });

}

checkleaves(){
  console.log("My leaves");
  console.log(this.allUser_ids);
    // this.todayDate=moment().format("YYYY-MM-DD");
      this.leave_param1=this.appGlobalsProvider.leave_param.param1;
      console.log(this.leave_param1);
      
       let  url  = `https://us-central1-dilbert-34d6c.cloudfunctions.net/viewLeave`;
       let leave_date ={
            start:this.myTodayDate,
            end:''
       }
        this.newparam1 = this.appGlobalsProvider.dashboard_params.param1;
        console.log(this.newparam1.user_id,"from appGlobalsProvider");
        console.log(this.authguard.user_id,"from authguard");
        console.log(this.user_id1);

        let  filters ={
          users:this.my_user_id,
          leave_date:leave_date

        };
       let filter1={
            filters:filters
        }
        
        let optionalHeaders={
           'X-API-KEY' : this.key,
           'From' : this.authguard.userData.user_id
        };

         this.appServiceProvider.request(url, 'post', filter1, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {
          if(response.status == 'success'){
            console.log(response);
             this.userLeaveData=response;
             // if(response.data.leaves.length == 0){
             //  //if no upcoming leave request all leaves
             //    this.allLeaves();
             // }
              
             //  console.log("dummy dadta");
              console.log(this.userLeaveData);
             //  console.log(this.userLeaveData.data);
              console.log(this.userLeaveData.data.leaves.length);
              this.myLeaveCount=this.userLeaveData.data.leaves.length;
              if(this.userLeaveData.comments){
                console.log("yes");
              }
              else
              {
                console.log("no");
              }
          }
          else{
            this.appServiceProvider.presentToast(response.message, 'error');
          }
        });
}
  allLeaves(){
     console.log("----------------all leaves-----------");
     this.selectedOption="All";
     console.log(this.selectedOption);
      this.leave_param1=this.appGlobalsProvider.leave_param.param1;
      console.log(this.leave_param1);
      
       let  url  = `https://us-central1-dilbert-34d6c.cloudfunctions.net/viewLeave`;
       let leave_date ={
            start:'',
            end:''
       }
        this.newparam1 = this.appGlobalsProvider.dashboard_params.param1;
        console.log(this.user_id1);
        let  filters ={
          users:this.my_user_id,
          leave_date:leave_date

        };
       let filter1={
            filters:filters
        }
        
        let optionalHeaders={
           'X-API-KEY' : this.key,
           'From' : this.authguard.userData.user_id
        };
         this.appServiceProvider.request(url, 'post', filter1, optionalHeaders, false, 'observable', 'disable', {}, false).subscribe( (response) => {
          if(response.status == 'success'){
            console.log(response);
             this.userLeaveData=response;
             //  console.log("dummy dadta");
              console.log(this.userLeaveData);
             //  console.log(this.userLeaveData.data);
              console.log(this.userLeaveData.data.leaves.length);
              this.myLeaveCount=this.userLeaveData.data.leaves.length;
              if(this.userLeaveData.comments){
                console.log("yes");
              }
              else
              {
                console.log("no");
              }
          }
          else{
            this.appServiceProvider.presentToast(response.message, 'error');
          }
        });

  }
  showAllTags(data){

 // $(".morebtn").click(function(){
 //         $(this).addClass("hide");
 //         $(this).parent().addClass("hide");
 //         $(this).parent().next().removeClass("hide");
 //    });

  $(".moreComments").click(function(){
         // $(this).addClass("hide");
         $(this).parent().parent().addClass("hide");
         $(this).parent().parent().next().removeClass("hide");
    });

  $(".lessComments").click(function(){
         // $(this).addClass("hide");
         $(this).parent().addClass("hide");
         $(this).parent().prev().removeClass("hide");
    });
  }

  testLeave(leaveShow){
    console.log(leaveShow);
  }



  LeaveType(val){
    console.log("----- selected Team value---");
    // console.log(val.target.value);
    if(val.target.value=="All"){
      this.todayDate='';
    }
    else{
       this.todayDate=moment().format("YYYY-MM-DD");;
    }
       this.checkleavesTeam();
  }



  MyLeaveType(val){
    console.log("----- selected My value---");
      // console.log(val.target.value);
    if(val.target.value=="All"){
      this.myTodayDate='';
    }
    else{
       this.myTodayDate=moment().format("YYYY-MM-DD");;
    }
       this.checkleaves();
  }

  editLeave(item1){
    // console.log(item1);
    this.dataToBeEdited=item1;
    this.events.publish("update:leave_data", item1);
    let popover = this.popoverCtrl.create( 'LeaveModalPage',{users:this.autocompleteItemsAsObjects,data:item1,type:"editLeave"});
    popover.present();
  }

  readUserData(){
    console.log("users loading");
    // console.log(this.apiURL);

    let url =  `${this.apiURL}/organisation-users/${this.authguard.userData.org_id}/`;
    // let url =`http://www.mocky.io/v2/5af1287d310000580096c809`;
    // console.log(url);
    let filter1 = {
        // org_id : this.org_id,
        // date:date.start,
        // period_unit:this.period_unit
      };

     let filters = {
      // date_range : date_range,
      // period_unit : this.period_unit

      };

      let body = {
        // filters : filters
      }

    let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };
            this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
            // console.log(response);
                if(response.status == 'success'){
                     // this.users = response.data;
                     this.autocompleteItemsAsObjects = response.data;
                     this.all_users=response.data;
                     console.log(this.autocompleteItemsAsObjects);
                     this.leave_param1=this.appGlobalsProvider.leave_param.param1;
                     if(this.leave_param1.user_id == undefined){
                              this.user_id1= this.authguard.user_id;
                            }
                            else{
                               this.user_id1= this.authguard.user_id;
                            }

                             for( let i =0 ;i<=this.autocompleteItemsAsObjects.length-1;i++){
                                if(this.autocompleteItemsAsObjects[i].user_id !=this.user_id1){
                                   this.allUser_ids.push(this.autocompleteItemsAsObjects[i].user_id);
                                }else{
                                  console.log("dont add");
                                }
                                // this.allUser_ids
                              }
                               this.newparam1 = this.appGlobalsProvider.dashboard_params.param1;
                       if(this.newparam1.user_id != undefined){
                            this.user_id1= this.newparam1.user_id;
                          }
                          else{
                             this.user_id1= this.authguard.user_id;
                          }     
                     this.my_user_id.push(this.user_id1);   
                     this.checkleaves();
                     this.checkleavesTeam();
                }
                else{
                this.appServiceProvider.presentToast(response.message, 'error');
              }  
          })
  }
  addComment(item){
      this.commentNote="";
      this.commentNote1 ="";
      $(".commentAdded").click(function(){
         // $(this).addClass("hide"); replyBlock
         $(".addComment").addClass("hide");
         $(".replyBlock").removeClass("hide");

         $(this).parent().parent().addClass("hide");
         $(this).parent().parent().next().removeClass("hide");

      });

    console.log("enter comment");
    console.log(item);
    this.commentDetails=item;

  }

  cancelComment(){

      this.commentNote="";
      this.commentNote1 ="";
      $(".cancelComment").click(function(){
         // $(this).addClass("hide");

         $(this).parent().parent().addClass("hide");
         $(this).parent().parent().prev().removeClass("hide");
       });

  }



  comment(){
    console.log("comment Added Api Call");
    // console.log(item);
    if(this.commentNote1 ==""||this.commentNote1 ==undefined||this.commentNote ==""||this.commentNote ==undefined){
      console.log("enter comment")
    }
    else{

      for(var x=0; x < this.all_users.length;x++){
        if(this.all_users[x].user_id==this.userDetails.user_id){
         
          this.loggedInUser=this.all_users[x]; 
          // console.warn(this.loggedInUser);
        }
        else{
          // console.log("no user found");
        }
      }



    let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/addComment`;
      //user id , parent id, key,comment Note and commented user

    // console.log(url);
    let parent_id=this.commentDetails.parent_id;
    let user_id1=this.commentDetails.user.user_id;
    let user={
            user_id :this.userDetails.user_id ,
            email : this.userDetails.userEmail,
            name :this.userDetails.name,
            avatar:this.userDetails.avatar
    }
    let comments ={
      message: this.commentNote

    }

     let body = {
      user_id : this.commentDetails.user.user_id,
      parent_id :this.commentDetails.parent_id,
      user:this.loggedInUser,
      message: this.commentNote

      };
      // console.log(body);

    let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };
            this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {
            // console.log(response);
                if(response.status == 'success'){
                   console.log("Comment Added");
                    console.log("comment data",response.data);
                   for(var i=0;i<this.userLeaveData.data.leaves.length;i++){

                      if(this.userLeaveData.data.leaves[i].parent_id==this.commentDetails.parent_id){
                        
                        if(!this.userLeaveData.data.leaves[i].comments){
                          this.userLeaveData.data.leaves[i].comments=[];
                        }
                        this.userLeaveData.data.leaves[i].comments.unshift(response.data);
                      }
                   }
                    for(var i=0;i<this.teamLeaveData.data.leaves.length;i++){

                      if(this.teamLeaveData.data.leaves[i].parent_id==this.commentDetails.parent_id){
                        
                        if(!this.teamLeaveData.data.leaves[i].comments){
                          this.teamLeaveData.data.leaves[i].comments=[];
                        }
                        this.teamLeaveData.data.leaves[i].comments.unshift(response.data);
                      }
                   }
                   this.commentNote="";
                }
                else{
                  
                this.appServiceProvider.presentToast(response.message, 'error');
              }
              
          })
    }
  }
   teamComment(){
    console.log("comment team Added Api Call");
    // console.log(item);
    if(this.commentNote1 ==""||this.commentNote1 ==undefined||this.commentNote ==""||this.commentNote ==undefined){
      console.log("enter comment")
    }
    else{
      // console.log(this.all_users);
      // console.log(this.commentNote);
      // console.log(this.commentDetails);
      // console.warn(this.userDetails.user_id);
      // console.warn(this.all_users);
      for(var x=0; x < this.all_users.length;x++){
        if(this.all_users[x].user_id==this.userDetails.user_id){
         
          this.loggedInUser=this.all_users[x]; 
          console.warn(this.loggedInUser);
        }
        else{
          console.log("no user found");
        }
      }

    let url =  `https://us-central1-dilbert-34d6c.cloudfunctions.net/addComment`;
    console.log(url);
    let parent_id=this.commentDetails.parent_id;
    let user_id1=this.commentDetails.user.user_id;
    let user={
            user_id :this.userDetails.user_id ,
            email : this.userDetails.userEmail,
            name :this.userDetails.name,
            avatar:this.userDetails.avatar
    }
    let comments ={
      message: this.commentNote
    }

     let body = {
      user_id : this.commentDetails.user.user_id,
      parent_id :this.commentDetails.parent_id,
      user:this.loggedInUser,
      message: this.commentNote

      };
      console.log("body add comment");
      console.log(body);
    let optionalHeaders = {
          'X-API-KEY' : this.authguard.userData.x_api_key,
          'From' : this.authguard.userData.user_id
        };
        this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', {}, false).subscribe( (response) => {

        console.log(response);

            if(response.status == 'success'){
               console.log("Comment Added");
               // this.checkleaves();
               // this.checkleavesTeam();
            }
            else{
              
            this.appServiceProvider.presentToast(response.message, 'error');
          }
          
      })
    }
  }

  commentnote(val){
    // console.log(val);
    this.commentNote=val;
    var newstr = this.commentNote.replace(/[\r\n|\n|\r]/gm,'');
    this.commentNote1 = newstr.split(' ').join(''); 
    this.checkIfEmpty();

  }
  checkIfEmpty(){
    if(this.commentNote1==""){
      console.log("Enter Comment");
      this.commentButton=false;
    }
    else{
      console.log("done");
      this.commentButton=true;
    }
  }

  mytoggle(){
    console.log("inside toggle");
       $("#myLeaveToggle").click(function(){
         $(".myLeaveToggleBox").slideUp(500);
         $("#myLeaveToggle").hide();
         $("#myLeaveToggle1").show();
       });

      $("#myLeaveToggle1").click(function(){
         $(".myLeaveToggleBox").slideDown(500);
         $("#myLeaveToggle1").hide();
         $("#myLeaveToggle").show();
       });

  }

   teamtoggle(){
    console.log("inside toggle");
       $("#teamLeaveToggle").click(function(){
         $(".teamLeaveToggleBox").slideUp(500);
         $("#teamLeaveToggle").hide();
         $("#teamLeaveToggle1").show();
       });

      $("#teamLeaveToggle1").click(function(){
         $(".teamLeaveToggleBox").slideDown(500);
         $("#teamLeaveToggle1").hide();
         $("#teamLeaveToggle").show();
       });

  }

  commentEnter(event){
    console.log(event);
    if (event.keyCode == 13)
    {
       this.comment();
    }

  }
    teamcommentEnter(event){
    console.log(event);
    if (event.keyCode == 13)
    {
       this.teamComment();
    }

  }
  cancelLeave(item){
    console.log("cancel leave");
    // console.log(item);
    // console.log(this.userLeaveData);

    let popover = this.popoverCtrl.create( 'CancelLeavePage',{data:item,userData:this.userLeaveData});
    popover.present();

  }
   getTimeDiff(date: string): string {
    var tempDate=moment(date).format('MMMM Do YYYY, h:mm:ss a');
    // console.log(this.currentTime);
    var text: string = '';
    text =moment(tempDate, "MMMM Do YYYY, h:mm:ss a").fromNow();
    // console.log(text);
    return text;
  }
  popUpOptions(item,ev){
    console.log(item);
    let popover = this.popoverCtrl.create( 'EditleavemodalPage',{data:item,users:this.autocompleteItemsAsObjects,userData:this.userLeaveData,sideBarData:this.sideBarData,teamLeaves:this.teamLeaveData});
    popover.present({
      ev: ev
    });

  }


  checkPermissionsLeave(){
    console.log('inside check Leave Permissions');
    let result = this.authguard.userData;
    console.log('result',result);
    let perm_class =result.permissions.leave_feature_enable;
    console.log(result);
    for(var i=0; i< result.permissions.length;i++){
      if(result.permissions[i]=="leave_feature_enable"){
      this.leave_feature_enable =true;
      console.log("user has permissions to add leave");
      }
      if(result.permissions[i]=="edit_others_leaves"){
      this.edit_others_leaves =true;
      console.log("user has permissions to edit_others_leaves");
      }
    }
            
  }

}