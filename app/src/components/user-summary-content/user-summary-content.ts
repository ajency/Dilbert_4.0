
import { Events, ModalController, PopoverController } from 'ionic-angular';
import { Component, NgZone, Input } from '@angular/core';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the UserSummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-content',
  templateUrl: 'user-summary-content.html'
})
export class UserSummaryContentComponent {

  text: string;
  user_summary_contentdata:any;
    weekBucketdata:any;
    userdata:any;
    param1:any;
    user_id:any;
    temp:any;
    datalength:any;
    datalength1:any;
    dummyarray:any;

  constructor( public events : Events,
               public zone : NgZone,
               public modalCtrl : ModalController,
               public popoverCtrl : PopoverController,
               public authguard : AuthguardProvider,
               public appServiceProvider : AppServiceProvider,
               public appGlobalsProvider : AppGlobalsProvider,
               public storage : Storage) {
    console.log('Hello UserSummaryContentComponent Component');
    this.text = 'Summary';
	this.events.subscribe("update:summarydatanew",(data12) => {

	console.log("user-summary-content inside subscribe data---------------");
	
	
	this.user_summary_contentdata=data12;
  console.log("here------------------");
  console.log(this.user_summary_contentdata);
  console.log(this.user_summary_contentdata.newdata.summary.length);
  this.datalength=this.user_summary_contentdata.newdata.summary.length;

//   this.datalength1=this.user_summary_contentdata.newdata.summary.length;
// let i = 0;
//   this.dummyarray = [];
//   while (this.datalength1 !==7) {
//       console.log(i);
//       this.dummyarray.push(i);
//       i++;
//       this.datalength1++;

//     }
//     console.log(this.dummyarray.length);


 

	  });


  this.events.subscribe("update:weekBucketdata",(weekBucketdata) => {

  console.log(" week inside subscribe data---------------");
  this.weekBucketdata=weekBucketdata;
  console.log("this is  weekbucketdata");
  console.log(this.weekBucketdata);
 // console.log(this.user_summary_contentdata.newdata.user.name);
    });




  }

timeconvert(time,date){

var tempdate=date+" "+time;
var x= moment(tempdate).format('LT');

return x;
}
}
