import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import {IMyDpOptions} from 'mydatepicker';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppServiceProvider } from '../../providers/app-service/app-service';

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

  userId : any;
  private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        disableUntil: {year: 2017, month: 1, day: 1},
        disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:  new Date().getDate() } 
        // disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:new Date().getDate }
    };

  private model: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() } };


  @Input('test') sideBarData : any ;
  today : any;
  weekTotal :any;
  loader_percentage : any;

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(public zone : NgZone,
              public userDataProvider : UserDataProvider,
              public events: Events,
              public appServiceProvider : AppServiceProvider,
              public storage : Storage) {
    

    let dummy = new Date();
    this.today = {
      day : this.days[dummy.getDay()],
      date : dummy.getDate(),
      month : this.monthNames[dummy.getMonth()]
    };

      
  }

  ngOnInit(){
  	this.zone.run(() => {});
    this.calculateWeekTotal();
 
  }


  getDayDate(date: string, option: number): string {
    var text: string;
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

   requestData(ev){


    if(ev.date.year != 0 && ev.date.month != 0){
    
      let date_range = {
      // start : date;
      start : ev.formatted
      };
      this.storage.get('userData').then((data) => {
        
      this.userDataProvider.getUserData(data.user_id, date_range, data.x_api_key).subscribe( (response) => {
      console.log(response, 'response');
      this.sideBarData = response;
      this.calculateWeekTotal()
    });

    });

   


      }
    }

    calculateWeekTotal(){
      let minutes = 0
    for(var i = 0; i < this.sideBarData.data.periodData.length; i++ )
    {
      if(this.sideBarData.data.periodData[i].leave_status == "Present")
      {
        let temp = this.sideBarData.data.periodData[i].total_time.split(":");
        minutes +=  (parseInt(temp[0]) * 60) + (parseInt(temp[1])) ;

      }
      this.loader_percentage =  minutes/2700*100;
      if(this.loader_percentage>100){
        this.loader_percentage = 100;
      }
    }

  this.weekTotal = ((minutes / 60) < 10 ? "0" : "") + Math.floor(minutes / 60).toString() + ":" + ((minutes % 60) < 10 ? "0" : "") + Math.floor(minutes % 60).toString();
    }

    updateSummaryContent(date : any){
      this.events.publish('update:content', date);

    }



}
