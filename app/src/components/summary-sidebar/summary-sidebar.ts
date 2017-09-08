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
    // let minutes = 0; 
    // for(var i = 0; i < sideBarData.data.periodData.length; i++ )
    // {
    //   if(sideBarData.data.periodData.Leave_status == 'Present')
    //   {
    //     minutes = 

    //   }

    // }

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
