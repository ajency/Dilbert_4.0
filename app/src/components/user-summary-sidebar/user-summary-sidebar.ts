import { Component, NgZone,Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {IMyDpOptions} from 'mydatepicker';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { Storage } from '@ionic/storage';
import { AfterViewInit } from '@angular/core';
/**
 * Generated class for the UserSummarySidebarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-sidebar',
  templateUrl: 'user-summary-sidebar.html'
})
export class UserSummarySidebarComponent {
  private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      showClearDateBtn:false,
      disableUntil: {year: 2017, month: 1, day: 1},
      disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:  new Date().getDate()+1 } 
  };
  newdata :any;
  newdate:any;
  newdate2:any;
  show = 7;
  nodata : any;
  maindata :any;
  user_id : any;
  new_user_id : any;
  apiURL : any;
  weekBucket: any [] = [];
  userSummaryData : any;
  saveData1 : any;
  date : any;
  text : any;
  dateSelected : any;
  param1 : any;
  org_id : any;
  period_unit : any;
  private flag : boolean;
  private flag2 : any;
  private flag3 : boolean;
  future_date : boolean = false;
  counter:number;
  newuser_id:any;
  totaldays : any;
  datalength:number;
  monthdays :any;
  month:any;
  year:any;
  newsummarydata:any;
  key:any;
  newuserdata:any;


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
    console.log('Hello UserSummarySidebarComponent Component');
    this.text = 'Hello user-summary-sidebar';
    this.apiURL = this.appGlobalsProvider.getApiUrl();
    this.counter=0;
    this.param1 = this.appGlobalsProvider.newsummary_params.param1;
  }

  ngOnInit(){


     console.log(this.appGlobalsProvider.newsummary_params.param1);
     this.param1 = this.appGlobalsProvider.newsummary_params.param1;
     console.log("this is the ngOninit ");
     console.log(this.param1);

    if((this.param1 == '') || (this.param1 == undefined) ){
      console.log("empty");
      this.org_id =this.authguard.userData.org_id;
      this.period_unit = this.appGlobalsProvider.period_unit ;
      this.user_id=this.authguard.userData.user_id;
      this.newdate= this.formatDate(new Date());
      this.getUserDate(1, new Date());
    }
     else {
      console.log('params passed');
      this.user_id=this.param1.user_id;
      this.org_id = this.param1.org_id;
      this.period_unit = this.param1.period_unit;
      this.newdate=this.param1.start_date;

     let dateObject = {
          start: this.param1.start_date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);

      }


  }

  ionViewCanEnter(): Promise<boolean>{
    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('user-summary')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{

           console.log('can enter user summary page') 
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



  requestData1(date1){
    console.log(this.newuserdata);
    if(this.newuserdata !='' && this.newuserdata != undefined ){
     this.new_user_id=this.newuserdata.user.user_id;
    }

    console.log("inside requestData function", date1);
    var date =date1.formatted; 
     if (date) {
      this.dateSelected = new Date(date);
      let dateObject = {
          start: date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);
     }
    console.log(date);
    this.newdate=date;
    let newsummarydate=date;
    this.events.publish("update:summarydate", date);

     
  }

  highlightSelectedUserData(){
    for(var i=0;i<this.userSummaryData.length;i++){
      if(this.userSummaryData[i].user.user_id==this.maindata.user.user_id){
        this.userSummaryData[i].btnActive=true;
      }
      else{
        this.userSummaryData[i].btnActive=false;
      }
    }
  }

  viewmoredetails(item,key){
    console.log("clicked on sidebar data to view users summary ");
    this.param1 = this.appGlobalsProvider.newsummary_params.param1;
    console.log(this.param1);
    if(this.param1 !='' && item =='')
    {
      this.newuserdata=item;
      console.log("the data is as per the url params");
      this.user_id=this.param1.user_id;
      if(this.new_user_id !='' && this.new_user_id !=undefined){
         this.user_id=this.new_user_id;
        }
      console.log(this.user_id);
      let found =0;
      for(var i=0;i<this.userSummaryData.length;i++)
      {
        if(this.userSummaryData[i].user.user_id==this.user_id)
          {
            this.newuserdata=item;
            this.userSummaryData[i].btnActive=true;
            this.maindata=this.userSummaryData[i];
            console.log("match userid");
            let data12={
                newdata:this.maindata
              }
            let new_summary_param ={
               org_id :this.param1.org_id,
               start_date : this.param1.start_date, 
               user_id : this.param1.user_id,
               period_unit : this.param1.period_unit
              }
            let period_unit_data=this.param1.period_unit;
            this.events.publish("update:period_unit_info", period_unit_data);
            this.events.publish("update:summarydatanew", data12);
            let serializedquery =  `?${$.param(new_summary_param)}`;
            this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
            found=1;
          }
      }
        console.log("match not found "+found);
        if (found == 0)
        {
          this.newuserdata=item;
          this.userSummaryData[0].btnActive=true;
          this.param1.user_id=this.userSummaryData[0].user.user_id;
          let new_summary_param = {
             org_id :this.param1.org_id,
             start_date : this.param1.start_date,
             user_id : this.userSummaryData[0].user.user_id,
             period_unit : this.param1.period_unit
            }
          this.maindata=this.userSummaryData[0];
          let data12={
             newdata : this.maindata
            }

          let period_unit_data=this.param1.period_unit;
          this.events.publish("update:period_unit_info", period_unit_data);
          this.events.publish("update:summarydatanew", data12);
          let serializedquery =  `?${$.param(new_summary_param)}`;
          this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });

        }
        if(this.param1 !='' && item !='')
        {
          this.newuserdata=item;
          this.userSummaryData[key].btnActive = true;
          for(var i = 0; i < this.userSummaryData.length; i++ )
            {
              if(i != key)
              {
                this.userSummaryData[i].btnActive = false;
              }
              
            }
          console.log(this.newdate+"this is the date----------");
          if(this.newdate=="" ||this.newdate== undefined){
              this.newdate=this.param1.start_date;
            }
          let new_summary_param = {
             org_id :this.param1.org_id,
             start_date : this.newdate, 
             user_id : item.user.user_id,
             period_unit : this.param1.period_unit
            }
          this.maindata=item;
          let data12={
            newdata : this.maindata
           } 
          let period_unit_data=this.param1.period_unit;
          this.events.publish("update:period_unit_info", period_unit_data);
          this.events.publish("update:summarydatanew", data12);
          let serializedquery =  `?${$.param(new_summary_param)}`;
          this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
        }

    }
//if ends here 
    else
    {
      if(item !='')
      {
        console.log("11");
        console.log(this.param1);
        if(this.param1 !='' && this.param1 !=undefined){
          this.period_unit=this.param1.period_unit;
        }
        else{
          this.period_unit=this.appGlobalsProvider.period_unit;
        }
         console.log(item);
         this.newuserdata=item;
         console.log("no param and date is changed")
         this.userSummaryData[key].btnActive = true;
         for(var i = 0; i < this.userSummaryData.length; i++ )
              {
                if(i != key)
                {
                this.userSummaryData[i].btnActive = false;
                }
              }

          let new_summary_param = {
                 org_id :this.authguard.userData.org_id,
                 start_date :this.newdate, 
                 user_id : item.user.user_id,
                 period_unit : this.period_unit
             }
   
          console.log(new_summary_param);
          this.maindata=item;
          let data12={
             newdata : this.maindata
          } 
          console.log(item);
          let period_unit_data=this.period_unit;
          this.events.publish("update:period_unit_info", period_unit_data);
          this.events.publish("update:summarydatanew", data12);
          let serializedquery =  `?${$.param(new_summary_param)}`;
          this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
      }


    else{
      if(this.new_user_id !='' && this.new_user_id !=undefined){
          console.log("12");
        console.log(this.new_user_id); 
        if(this.newdate=="" || this.newdate== undefined){
           this.newdate=this.newdate2.start;
          }
           let new_summary_param = {
               org_id :this.authguard.userData.org_id,
               start_date : this.newdate,
               user_id : this.new_user_id,
               period_unit : this.appGlobalsProvider.period_unit
            }
         for(var j=0;j<this.userSummaryData.length;j++){
           if(this.userSummaryData[j].user.user_id==this.new_user_id)
            {
              this.userSummaryData[j].btnActive=true;
              this.maindata=this.userSummaryData[j];
              let data12={
                           newdata : this.maindata
                          }
              let period_unit_data=this.appGlobalsProvider.period_unit;
              this.events.publish("update:period_unit_info", period_unit_data);
              this.events.publish("update:summarydatanew", data12);
              let serializedquery =  `?${$.param(new_summary_param)}`;
              this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
            }
         } 
      }
      else{
          console.log("13");
           this.userSummaryData[key].btnActive = true;
           for(var i = 0; i < this.userSummaryData.length; i++ )
              {
                if(i != key)
                {
                this.userSummaryData[i].btnActive = false;
                }
              }
         
           let new_summary_param = {
               org_id :this.authguard.userData.org_id,
               start_date : this.newdate,
               user_id : this.userSummaryData[0].user.user_id,
               period_unit : this.appGlobalsProvider.period_unit
           }
            
            this.maindata=this.userSummaryData[0];
            let data12={
                newdata : this.maindata
            }
          let period_unit_data=this.appGlobalsProvider.period_unit;
          this.events.publish("update:period_unit_info", period_unit_data);
          this.events.publish("update:summarydatanew", data12);
          let serializedquery =  `?${$.param(new_summary_param)}`;
          this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
        }
      }  
   }
    
     
}



  
 getUserDate(dropdownValue, dateswnt) {
        let date = {
          start: this.formatDate(new Date()),
          // end: this.formatDate(dates.end)
        };

        this.getData(date);
        this.newdate2=date;
  };



getData(date){
    let curr;
    if(date.hasOwnProperty('start'))
      curr = new Date(date.start);
    else
      curr = new Date(date);
    let datemonth=curr;
    console.log(datemonth); var n = datemonth.getMonth();
    var firstDay1 = new Date(datemonth.getFullYear(), datemonth.getMonth(), 0);
    let monthnum = moment(datemonth).format('YYYY MM');

    this.monthdays = moment(monthnum).daysInMonth();

    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week


    let firstDay = new Date(curr.setDate(first));

/**/    

    this.weekBucket = [];
    let i = 0;
    console.log(this.monthdays);
    this.totaldays=7;
    console.log(this.param1);

    if(this.param1 != '' || this.param1 != undefined){
      if(this.param1.period_unit == 'week'){
         this.totaldays=7;
           while (i !== this.totaldays) 
           {
              let temp = new Date (firstDay);
              let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
              console.log(temp);
              this.weekBucket.push(nextD);
              firstDay = nextD;
              i++;
           }
      }
      if(this.param1.period_unit == 'month')
       {
         this.totaldays=this.monthdays;
          while (i !== this.totaldays) 
          {
            let temp = new Date (firstDay1);
            let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
            // console.log(temp);
            this.weekBucket.push(nextD);
            firstDay1 = nextD;
            i++;
          }
       } 
       else 
       {
        this.totaldays=7;
        while (i !== this.totaldays) 
         {
          let temp = new Date (firstDay);
          let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
          this.weekBucket.push(nextD);
          firstDay = nextD;
          i++;
        }
       }
    }
    this.events.publish("update:weekBucketdata", this.weekBucket);


   let date_range = date;

   console.log(date_range);
   console.log(this.user_id);
  

   let optionalHeaders = {
      'X-API-KEY' : this.authguard.userData.x_api_key,
      'From' : this.authguard.userData.user_id
    };


    let url =  `${this.apiURL}/summary/${this.authguard.userData.org_id}/${this.appGlobalsProvider.lang}`;
    console.log("this is the url");
    console.log(url);
      let filter1 = {
        org_id : this.org_id,
        start_date: date.start,
        user_id : this.user_id,
        period_unit:this.period_unit
      };

      let filters = {
      date_range : date_range,
      period_unit : this.period_unit

      };

      let body = {
        filters : filters
      }


    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','disable', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

          console.log(date.start,'-----------',this.formatDate(new Date()));
          if(date.start > this.formatDate(new Date())){
            this.future_date = true;
            console.log("?????????????????????????????")
          }
          else{
            this.future_date = false;
            console.log("+++++++++++++++++++++++++++++")

          }

        this.userSummaryData = response.data;
        console.log(this.userSummaryData);
        // this.showmoredata();
        let key=0;
        this.nodata='';

       this.viewmoredetails(this.nodata,key);
       this.events.publish("update:summarydatausers", this.userSummaryData);
       // console.log("param are here");
       // console.log(this.param1);
       console.log(this.newuserdata);

       if(this.param1==''){
        this.newuser_id=this.userSummaryData[0].user.user_id;
         // console.log(this.newuser_id+"new user id");
       }
       else
       {
         this.newuser_id=this.param1.user_id;
         // console.log(this.newuser_id+"new user id");
       }
        // console.log(this.newuser_id+"new user id-----");

      if(this.new_user_id !='' && this.new_user_id !=undefined){
        this.newuser_id=this.new_user_id;
      }
      console.log(this.newuser_id);

        let urlparam1 = {
        org_id : this.org_id,
        start_date: date.start,
        user_id :this.newuser_id,
        period_unit:this.period_unit
      };

         let period_unit_data=this.period_unit;
         this.events.publish("update:period_unit_info", period_unit_data);
         let serializedquery =  `?${$.param(urlparam1)}`;
         this.events.publish('app:updatehistory',{page: 'user-summary', state: {query: serializedquery},  frompath: `/user-summary` , replace : true });
         this.saveData1 = response.data;
         this.newsummarydata=response.data;
         this.saveData1 = this.userSummaryData;
         console.log("summary data ----");
         console.log(this.userSummaryData.length);
         this.datalength=this.userSummaryData.length;

        // Flags for sorting
        this.flag2 = Array<number>(7);
        for(var i = 0; i < this.flag2.length; i++)
        {
          this.flag2[i] = 0;
        }
        this.flag3 = true;
        this.flag = false;

        this.zone.run(() => {});
     }
  })
        this.zone.run(() => {});


         console.log("show"+this.show);

}


formatDate(date) {
    let temp = new Date(date);
    let month = (temp.getMonth() + 1) < 10 ? '0'+(temp.getMonth() + 1).toString()  : (temp.getMonth() + 1).toString();
    let day = temp.getDate() < 10 ? '0' + temp.getDate().toString() : temp.getDate().toString();
    return temp.getFullYear() + '-' + month + '-' + day;
  }

    getSumofTime(sumTime, newTime) { // Get 2 times, sum it up & return the summedUp value
    var temp1 = newTime.split(":");
    var temp2 = sumTime.split(":");
    var time2Mins = (parseInt(temp2[0]) + parseInt(temp1[0])) * 60 + (parseInt(temp2[1]) + parseInt(temp1[1])); // Convert the Summed-Up time to Mins
    sumTime = ((time2Mins / 60) < 10 ? "0" : "") + Math.floor(time2Mins / 60).toString() + ":" + ((time2Mins % 60) < 10 ? "0" : "") + Math.floor(time2Mins % 60).toString();

    return sumTime;
  }

 onTextChange(text) {
    console.log(text, this.saveData1);

    this.userSummaryData = this.saveData1.filter(item => item.user.name.toLowerCase().indexOf(text.toLowerCase()) !== -1); // LowerCase all the names & keyword so that it cover all the possibilities
    this.zone.run(() => {}); 
    this.highlightSelectedUserData();
  }
}
