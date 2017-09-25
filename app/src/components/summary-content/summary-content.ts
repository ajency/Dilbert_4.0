import { Events } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the SummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'summary-content',
  templateUrl: 'summary-content.html'
})
export class SummaryContentComponent {

  
  @Input('test') currentData : any ;
  @Input('logs') summaryContentData : any;
  today : any;
  logs : any;
  day_data : any;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor( public events : Events) {
    // console.log('SummaryContentComponent Component');
       this.events.subscribe('update:content',(data) => {
	   // this.currentData = data.date;
     this.day_data = data.summaryContentData.data.day_data;
     this.logs = data.summaryContentData.data.logs;

     this.setToday();
    });
  }

  ngOnInit(){
  	// let dummy = new Date();
   //  this.today = {
   //    day : this.days[dummy.getDay()],
   //    date : dummy.getDate(),
   //    month : this.monthNames[dummy.getMonth()]
   //  };

    // console.log(this.summaryContentData);

    this.day_data = this.summaryContentData.data.day_data;
    console.log(this.day_data);
    this.setToday();
    this.logs = this.summaryContentData.data.logs;
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


  setToday(){

      let d = new Date();
     let temp;
        
     temp = this.day_data[0].work_date.split("-");
     
     

     d.setFullYear(temp[0], temp[1]-1, temp[2]);

     this.today = {
      day : this.days[d.getDay()],
      date : d.getDate(),
      month : this.monthNames[d.getMonth()]
     }

  }




}
