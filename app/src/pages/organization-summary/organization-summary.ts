import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';
import * as moment from 'moment';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


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

 		this.getUserDate(1, new Date());



  
 
  }

 getUserDate(dropdownValue, dateswnt) {

        let dates = this.getStartAndEndOfDate(new Date());
        
        let date = {
          start: this.formatDate(dates.start),
          end: this.formatDate(dates.end)
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
      console.log(i);
      let temp = new Date (firstDay);
      let nextD = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate() + 1 );// Get Next Date
      console.log(nextD);
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
        start_date:this.formatDate(new Date()),
        period_unit:this.appGlobalsProvider.period_unit
      };

     let filters = {
      date_range : date_range,
      period_unit : this.appGlobalsProvider.period_unit

      };

      let body = {
      	filters : filters
      }


    this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable','', filter1, false).subscribe( (response) => {
      // console.log(response);
      if(response.status == 200){

        this.summaryData = response.data;

        this.summaryData.forEach( (user) => {
        if(user.summary.length !== 0) { // Checks if summary has Length greater than 0, if so the week's data is present
          user.total_time = "00:00";
          for ( i = 0; i < user.summary.length; i++) {
            if(user.summary[i].leave_status == "Present" || user.summary[i].leave_status == "Worked" || user.summary[i].leave_status == "Worked on holiday" || 
            user.summary[i].leave_status == "Worked on weekend" || user.summary[i].leave_status == "Leave due to violation"  ) // Check the status before calculating
              user.total_time = this.getSumofTime(user.total_time, user.summary[i].total_time);
          }
        } else { // No summary data found related to that user
          user.total_time = "00:00";
        }
      });


        console.log(this.summaryData);

        this.zone.run(() => {});
 	   }
	})

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
    return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate();
  }

  sortBy(){

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


}