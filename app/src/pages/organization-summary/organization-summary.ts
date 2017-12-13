import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as $ from 'jquery';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the OrganizationSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'summary',
  segment: 'summary',
  priority: 'off'
})
@Component({
  selector: 'page-organization-summary',
  templateUrl: 'organization-summary.html',
})
 

export class OrganizationSummaryPage {

  apiURL : any;
  weekBucket: any [] = [];
  summaryData : any;
  saveData : any;
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
  private naText: string = "n/a";

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

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationSummaryPage');
  }

  ngOnInit(){
 //  	// using old api
 //  	console.log('inside ngOnInit');
	// const apiURL = 'http://dilbertapp.ajency.in/api/data';
	// let date = {
	// 	start_date:"2017-10-23",
	// 	end_date:"2017-10-28"
	// }

 //  	var fetchurl = `${apiURL}/employees?user_id=69`;
 //    if (date) {
 //      fetchurl += `&start_date=${date.start_date}&end_date=${date.end_date}`;
 //      console.log(fetchurl);
 //    }
 //    let data = this.http.get(fetchurl, { headers: this.headers }).subscribe( (response) => {
 //    	console.log(response.json());
 //    	this.weekBucket = response.json();
 //    })
    this.events.publish("app:localize",this.appGlobalsProvider.lang);
 
    this.events.publish('app:updatehistory','summary');

    this.param1 = this.appGlobalsProvider.summary_params.param1;
    console.log(this.param1);

	  if((this.param1 == '') || (this.param1 == undefined) ){
    
    this.org_id = this.authguard.userData.org_id;
    this.period_unit = this.appGlobalsProvider.period_unit ;
 		this.getUserDate(1, new Date());
    console.log('no params passed');
    }

    else {
      console.log('params passed');
   	 this.org_id = this.param1.org_id;
   	 this.period_unit = this.param1.period_unit;
   	 let dateObject = {
          start: this.param1.date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);

      }

   


  
 
  }

   ionViewCanEnter(): Promise<boolean>{

    return new Promise((resolve,reject) => {
      this.authguard.verifyToken('summary')
      .then(() => {

        this.appServiceProvider.handleClientLoad(true).then( () =>{
          // if(this.appGlobalsProvider.dashboard_params.param1 && this.appGlobalsProvider.dashboard_params.param2 ){
          //  console.log('can enter dashboard')   
          //  resolve(true)
          // }

          // else{
          //   console.log('cannot enter dashboard')
          //   reject(false)
           console.log('can enter summary page') 
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

 getUserDate(dropdownValue, dateswnt) {

        // let dates = this.getStartAndEndOfDate(new Date());
        
        let date = {
          start: this.formatDate(new Date()),
          // end: this.formatDate(dates.end)
        };

        this.getData(date);
  };

  getData(date){
    
   // let date = {
	// 	start_date:"2017-10-23",
	// 	end_date:"2017-10-28"
	// }
    let curr;


	if(date.hasOwnProperty('start'))
      curr = new Date(date.start);
    else
      curr = new Date(date);

    console.log(curr);

    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    console.log(first);

		let firstDay = new Date(curr.setDate(first));
		console.log(firstDay);


    this.weekBucket = [];
    let i = 0;

    while (i !== 7) {
      // console.log(i);
      let temp = new Date (firstDay);
      let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
      // console.log(nextD);
      this.weekBucket.push(nextD);
      firstDay = nextD;
      i++;
    }
   







   let date_range = date;

	 	console.log(date_range);
  

    let optionalHeaders = {
      'X-API-KEY' : this.authguard.userData.x_api_key,
      'From' : this.authguard.userData.user_id
    };


    let url =  `${this.apiURL}/summary/${this.authguard.userData.org_id}/${this.appGlobalsProvider.lang}`;

    // console.log(url);
    let filter1 = {
    		org_id : this.org_id,
        date:date.start,
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

        this.summaryData = response.data;


        let serializedquery =  `?${$.param(filter1)}`;
        this.events.publish('app:updatehistory',{page: 'summary', state: {query: serializedquery},  frompath: `/summary` , replace : true });
        // this.saveData = response.data;

        this.summaryData.forEach( (user) => {


        if(user.summary.length !== 0) { // Checks if summary has Length greater than 0, if so the week's data is present

          if(user.summary[user.summary.length-1].work_date < user.user.joining_date ){
            user.summary = [];
          }

          else if(user.summary[0].work_date < user.user.joining_date && user.summary[user.summary.length -1].work_date > user.user.joining_date){
            for(i = 0; i < user.summary.length; i++){
              if(user.summary[i].work_date < user.user.joining_date && user.summary[i].leave_status == 'Leave'){
                user.summary[i].leave_status = 'Not joined';
              }
            }

          }


          user.total_time = "00:00";
          for ( i = 0; i < user.summary.length; i++) {
            if(user.summary[i].leave_status == "Present" || user.summary[i].leave_status == "Worked" || user.summary[i].leave_status == "Worked on holiday" || 
            user.summary[i].leave_status == "Worked on weekend"  ) // Check the status before calculating
              user.total_time = this.getSumofTime(user.total_time, user.summary[i].total_time);
          }
        } else { // No summary data found related to that user
          user.total_time = "00:00";
        }
      });

        this.saveData = this.summaryData;
        console.log(this.summaryData);

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

}

 onTextChange(text) {
    console.log(text, this.saveData);
    this.summaryData = this.saveData.filter(item => item.user.name.toLowerCase().indexOf(text.toLowerCase()) !== -1); // LowerCase all the names & keyword so that it cover all the possibilities
     this.zone.run(() => {}); 
  }

  getSumofTime(sumTime, newTime) { // Get 2 times, sum it up & return the summedUp value
    var temp1 = newTime.split(":");
    var temp2 = sumTime.split(":");
    var time2Mins = (parseInt(temp2[0]) + parseInt(temp1[0])) * 60 + (parseInt(temp2[1]) + parseInt(temp1[1])); // Convert the Summed-Up time to Mins
    sumTime = ((time2Mins / 60) < 10 ? "0" : "") + Math.floor(time2Mins / 60).toString() + ":" + ((time2Mins % 60) < 10 ? "0" : "") + Math.floor(time2Mins % 60).toString();

    return sumTime;
  }

  getStartAndEndOfDate(date) { // Get the start & end date for the API
    var curr = new Date(date);
    var firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
    var lastDay = new Date (curr.setDate(curr.getDate() - curr.getDay() + 7 ));

    return {
      start : firstDay,
      end : lastDay
    };
  }

   formatDate(date) {
    let temp = new Date(date);
    let month = (temp.getMonth() + 1) < 10 ? '0'+(temp.getMonth() + 1).toString()  : (temp.getMonth() + 1).toString();
    let day = temp.getDate() < 10 ? '0' + temp.getDate().toString() : temp.getDate().toString();
    return temp.getFullYear() + '-' + month + '-' + day;
  }



  fetchData(next){

  }

   onDateChange(date) {
    if (date) {
      this.dateSelected = new Date(date);
      let dateObject = {
          start: date
          // end: this.formatDate(dates.end)
        };
      this.getData(dateObject);
    }
    console.log(date);
  }

  onFormatDate(dateValue) { // Format any form Date to 'yyyy-mm-dd'
    var date = new Date(dateValue);

    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    var day = (date.getDate()) < 10 ? '0' + (date.getDate()).toString() : (date.getDate()).toString();

    return date.getFullYear() + '-' + month + '-' + day;
  }


    getDayDate(date: string, option: number): string {
    var text: string;
    switch (option) {
      case 1:
        text = moment(date, "YYYY-MM-DD").format("ddd");
        break;
      case 2:
        text = moment(date, "YYYY-MM-DD").format("MMM");
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
      case 6:
        text = moment(date, "YYYY-MM-DD").format("D");
        break;
    }
    return text;
  }

  navigateToDashboard(data){
    console.log(data);
    let dash_param1 = {
      user_id : data.user.user_id,
      start_date : this.formatDate(new Date()),
      period_unit : this.appGlobalsProvider.period_unit
    }

    let dash_param2 = {
      summary_date : this.formatDate(new Date())
    }
    this.appGlobalsProvider.dashboard_params.param1 = dash_param1;
    this.appGlobalsProvider.dashboard_params.param2 = dash_param2;
    this.events.publish('app:navroot', 'dashboard');
  }


  sortBy(property, date, index) {
    if (property === 'name') {

      this.flag = !this.flag;
      this.flag3 = true;
      if(this.flag){
       this.summaryData = this.summaryData.sort((obj1,obj2) => {

          if(obj1.user.name > obj2.user.name)
            return -1;
          if(obj1.user.name < obj2.user.name)
            return 1;
         });
      }
      else{
        this.summaryData = this.summaryData.sort((obj1,obj2) => {

            if(obj1.user.name > obj2.user.name)
              return 1;
            if(obj1.user.name < obj2.user.name)
              return -1;
        });

      }
         // this.userSummary = this.userSummary.reverse();
         // console.log(this.userSummary);
         // console.log(this.myDate);
         // console.log(typeof(this.myDate));
         for(var i= 0; i<this.flag2.length; i++)
         {
          this.flag2[i] = 0;
         }
    }


    else if (property === 'date') {
      // this.sorting.date.date = new Date(date);
      console.log(index);


      if(this.summaryData[0].summary[index] != undefined){

        this.flag = true;
        this.flag3 = true;

        for(var j= 0; j < 7; j++)
             {
              if(index!=j)
              this.flag2[j] = 0;
             }

        this.flag2[index] +=1;

        if(this.flag2[index]%2){

           this.summaryData.sort( ( a, b) => {
            // console.log(a,b);
            if(this.getDayDate(a.summary[index].total_time,5) > this.getDayDate(b.summary[index].total_time,5))
              return -1;
            if(this.getDayDate(a.summary[index].total_time,5) <= this.getDayDate(b.summary[index].total_time,5))
              return 1;
           });

        }

        else{
             this.summaryData.sort( ( a, b) => {
            // console.log(a,b);
            if(this.getDayDate(a.summary[index].total_time,5) > this.getDayDate(b.summary[index].total_time,5))
              return 1;
            if(this.getDayDate(a.summary[index].total_time,5) <= this.getDayDate(b.summary[index].total_time,5))
              return -1;
           });
        }

       

      }
    
    }
    else if (property === 'total') {
      this.flag=true;
      this.flag3 = !this.flag3;

      for(var i= 0; i<this.flag2.length; i++){
        this.flag2[i] = 0;
      }

      if(!this.flag3){
       this.summaryData = this.summaryData.sort((obj1,obj2) => {

          if(obj1.total_time > obj2.total_time)
            return -1;
          if(obj1.total_time < obj2.total_time)
            return 1;
         });
      }
      else{
        this.summaryData = this.summaryData.sort((obj1,obj2) => {

            if(obj1.total_time > obj2.total_time)
              return 1;
            if(obj1.total_time < obj2.total_time)
              return -1;
        });

      }

    }
  
  }


 


}