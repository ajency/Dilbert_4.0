import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import {IMyDpOptions} from 'mydatepicker';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';

/**
 * Generated class for the SummarySidebarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'summary-sidebar',
  templateUrl: 'summary-sidebar.html'
})
export class SummarySidebarComponent {

  apiURL :any;
  userId : any;
  // summaryContentData : any;
  btnActive : boolean = false;
  private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        disableUntil: {year: 2017, month: 1, day: 1},
        disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:  new Date().getDate() } 
        // disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:new Date().getDate }
    };

  private model: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };


  @Input('test') sideBarData : any ;
  @Input('day_data') summaryContentData : any ;
  today : any;
  weekTotal :any;
  minHours : any;
  loader_percentage : any;

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(public zone : NgZone,
              public userDataProvider : UserDataProvider,
              public events: Events,
              public appServiceProvider : AppServiceProvider,
              public storage : Storage,
              public appGlobalsProvider : AppGlobalsProvider,
              public authguard : AuthguardProvider
              ) {
    
    this.apiURL = this.appGlobalsProvider.getApiUrl(); 
    // console.log(this.apiURL);
    let dummy = new Date();
    this.today = {
      day : this.days[dummy.getDay()],
      date : dummy.getDate(),
      month : this.monthNames[dummy.getMonth()]
    };

    this.events.subscribe("summary-sidebar:log", (data) =>{
       for(var i = 0; i < this.sideBarData.data.periodData.length; i++ )
        {
          if(this.sideBarData.data.periodData[i].btnActive == true){
             
            this.sideBarData.data.periodData[i] = data;
            this.sideBarData.data.periodData[i].btnActive = true;
          }
        
        }
        this.calculateWeekTotal();
    })

      
  }

  ngOnInit(){
  	this.zone.run(() => {});
    // console.log(this.summaryContentData);
    this.calculateWeekTotal();
 
  }


  ionViewDidLoad() {
  
   this.zone.run(() => {});   
   
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
        text = moment(date, "kk:mm:ss").format("hh:mm");
        break;
      case 6:
        text = moment(date, "YYYY-MM-DD").format("D");
        break;
    }
    return text;
  }

   requestData(ev){


    if(ev.date.year != 0 && ev.date.month != 0){
    
      let date_range = {
      // start : date;
      start : ev.formatted
      };
      this.storage.get('userData').then((data) => {
        
    //   this.userDataProvider.getUserData(data.user_id, date_range, data.x_api_key).subscribe( (response) => {
    //   console.log(response, 'response');
    //   this.sideBarData = response;
    //   this.calculateWeekTotal()
    // });
    let url =  `${this.apiURL}/period-data/${this.appGlobalsProvider.lang}`;
    console.log(url);


    let filter1 = {
        user_id:this.authguard.user_id,
        start_date:ev.formatted,
        period_unit:this.appGlobalsProvider.period_unit
      };


    let filters = {
      date_range : date_range,
      period_unit : this.appGlobalsProvider.period_unit
    }
    
    let body = {
    user_id : this.authguard.user_id,
    filters : filters
    };
 
    let optionalHeaders = {
      'X-API-KEY' : data.x_api_key,
      'From' : data.user_id,
    };

      this.appServiceProvider.request(url, 'post', body, optionalHeaders, false, 'observable', '' , filter1,  false).subscribe( (response) => {
      // console.log(response);
      this.sideBarData = response;


      url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;
      console.log(url);
      let body2 = {
      user_id : this.authguard.user_id,
      date : ev.formatted,
      cos_offset : this.appGlobalsProvider.cos_offset
    }

    let filter2 = {
      summary_date : ev.formatted,
      // cos_offset : this.appGlobalsProvider.cos_offset
    }

      this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', '', filter2, true).subscribe( (response) => {
      // console.log(response);
      this.summaryContentData = response;
      this.calculateWeekTotal();

      let data = {
        date : ev.formatted,
        summaryContentData : this.summaryContentData
      }

       this.events.publish('update:content', data);

    });


    });


    });

   


    }
  }

    calculateWeekTotal(){
      // console.log('calculateWeekTotal');
      let minutes = 0;
      let no_of_days = 0;
      // let current_date = new Date('2017-09-06');
      // let length = ;
      // let j=0;
      for(var i = 0; i < this.sideBarData.data.periodData.length; i++ )
      {
        this.sideBarData.data.periodData[i].btnActive = false;
        // console.log(this.sideBarData.data.periodData[i]);
        if(this.sideBarData.data.periodData[i].work_date == this.summaryContentData.data.day_data[0].work_date){
           this.sideBarData.data.periodData[i].btnActive = true;
           // console.log('inside if ', this.sideBarData.data.periodData[i]);

        }
        if(this.sideBarData.data.periodData[i].leave_status == "Present")
        {
          let temp = this.sideBarData.data.periodData[i].total_time.split(":");
          minutes +=  (parseInt(temp[0]) * 60) + (parseInt(temp[1])) ;
          no_of_days+=1;
        }



        // if(new Date(this.sideBarData.data.periodData[i].work_date) > current_date ){
        //    this.sideBarData.data.periodData.splice(0,1);
        //   console.log(this.sideBarData.data.periodData);
        // }
      
      }
      this.zone.run(() => {});

      this.minHours = no_of_days * 9;

      this.loader_percentage =  minutes/(this.minHours*60)*100;
      if(this.loader_percentage>100){
        this.loader_percentage = 100;
      }

      console.log(this.minHours);

      this.weekTotal = ((minutes / 60) < 10 ? "0" : "") + Math.floor(minutes / 60).toString() + ":" + ((minutes % 60) < 10 ? "0" : "") + Math.floor(minutes % 60).toString();
    }



    updateSummaryContent(date : any, key : any){

    // this.sideBarData.data.periodData.btnActive = true;
    // console.log(date,key);
    
    this.sideBarData.data.periodData[key].btnActive = true;

    for(var i = 0; i < this.sideBarData.data.periodData.length; i++ )
      {
        if(i != key)
        {

        this.sideBarData.data.periodData[i].btnActive = false;

        }
      
      }

    this.zone.run(() => {});
    let url = `${this.apiURL}/day-summary/${this.appGlobalsProvider.lang}`;
     
     


      this.storage.get('userData').then((data) => {
      
      let body2 = {
        user_id : this.authguard.user_id,
        date : date.work_date,
        cos_offset : this.appGlobalsProvider.cos_offset
      }

      let filters = {
        summary_date : date.work_date,
        // cos_offset : this.appGlobalsProvider.cos_offset
      }

      let optionalHeaders = {
      'X-API-KEY' : data.x_api_key,
      'From' : data.user_id
      };

    this.appServiceProvider.request(url, 'post', body2, optionalHeaders, false, 'observable', '' , filters, true).subscribe( (response) => {
      // console.log(response);
      this.summaryContentData = response;
      this.zone.run(() => {});

      let data = {
        date : date,
        summaryContentData : this.summaryContentData
      }

      // console.log(data);

      this.events.publish('update:content', data);

    });
  });
    


    }



}
