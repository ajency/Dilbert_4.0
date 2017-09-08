import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';

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

  @Input('test') sideBarData : any ;
  text: string;
  today : any;
  weekTotal :any;

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(public zone : NgZone) {
    
    console.log('Hello SummarySidebarComponent Component');
    this.text = 'Hello World';
    let dummy = new Date();
    this.today = {
      day : this.days[dummy.getDay()],
      date : dummy.getDate(),
      month : this.monthNames[dummy.getMonth()]
    };
  }

  ngOnInit(){
  	console.log(this.sideBarData);
  	this.zone.run(() => {});

    let minutes = 0
    for(var i = 0; i < this.sideBarData.data.periodData.length; i++ )
    {
      console.log(this.sideBarData.data.periodData[i].leave_status);
      if(this.sideBarData.data.periodData[i].leave_status == "Present")
      {
        let temp = this.sideBarData.data.periodData[i].total_time.split(":");
        console.log(temp);
        minutes +=  (parseInt(temp[0]) * 60) + (parseInt(temp[1])) ;

      }
      console.log(minutes);
    }

// console.log(this.sideBarData.data.periodData[0]);
  this.weekTotal = ((minutes / 60) < 10 ? "0" : "") + Math.floor(minutes / 60).toString() + ":" + ((minutes % 60) < 10 ? "0" : "") + Math.floor(minutes % 60).toString();
  console.log(this.weekTotal);
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

}
