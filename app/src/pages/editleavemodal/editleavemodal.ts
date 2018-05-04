import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events,PopoverController} from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import {IMyDpOptions} from 'mydatepicker';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, first, debounceTime } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
// import { IonicPage, NavController, NavParams, PopoverController, Events } from 'ionic-angular';

import * as $ from 'jquery';

import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';


import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditleavemodalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-editleavemodal',
  templateUrl: 'editleavemodal.html',
})
export class EditleavemodalPage {
	   data:any;
	  private nativeElement: any;
	  private $: any;
	  selectedDates: Array<Date> = [];
	  leave_note1:any;
	  leaveNote:any;
	  selectedUsers:Array<any> = [];
	  autocompleteItemsAsObjects:any;



	  private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      editableDateField:true,
      showClearDateBtn:true,
      disableUntil: {year: 2017, month: 1, day: 1},
    // disableDays:[this.disableDaysSelected]
    
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider,
              private http: Http,
              public appGlobalsProvider : AppGlobalsProvider,
              public storage : Storage,
              public popoverCtrl: PopoverController) {
  	  			this.nativeElement = this.element.nativeElement;
			    this.$ = this.appServiceProvider.jQuery;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditleavemodalPage');
  }
     ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("editleave-popover2");
}




  onDateChanged(event) {
    console.log(event.formatted);
        if(event.formatted !=""){
              if(this.selectedDates.length==0){
                   this.selectedDates.push(event.formatted);
              }
              if(this.selectedDates.length!=0){
                var x=1;
                for(var i=0; i<this.selectedDates.length;i++){
                   if(this.selectedDates[i] == event.formatted){
                           x=0;
                   }
                }
                console.log(x);
                if(x==1){
                   this.selectedDates.push(event.formatted);
                }
             }
            
              console.log(this.selectedDates);
               // this.checkIfData();
           }
    }
        deleteSetected(removeDate){
      // console.log(removeDate);
      this.selectedDates = this.selectedDates.filter((date: any) => {
          return removeDate !== date;
      })
      // console.log(this.selectedDates);
       // this.checkIfData();
       // this.model=null;
    }

      leaveNoteData(test){

        this.leaveNote=test;
        var newstr = this.leaveNote.replace(/[\r\n|\n|\r]/gm,'');
        this.leave_note1 = newstr.split(' ').join(''); 
        // this.checkIfData();
    }


updateLeave(){

}

}
