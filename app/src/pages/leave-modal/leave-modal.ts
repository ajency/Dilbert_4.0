import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,Events} from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import {IMyDpOptions} from 'mydatepicker';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, first, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// import { TagInputModule } from 'ngx-chips';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


/**
 * Generated class for the LeaveModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave-modal',
  templateUrl: 'leave-modal.html',
})
export class LeaveModalPage {

    users:any;
    text:any;
    leaveNote:any;
    private nativeElement: any;
    selectedUsers:Array<Date> = [];
    autocompleteItemsAsObjects:any;
    // requestAutocompleteItems:any;
    data:any;
    private $: any;
    model: any = null;
   
    selectedDates: Array<Date> = [];
      dataurl: string = `http://www.mocky.io/v2/5ac252c33300006d0087301e`;  // URL to web API
      jsonData: any;
      private myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'yyyy-mm-dd',
      inline:false,
      showClearDateBtn:false,
      disableUntil: {year: 2017, month: 1, day: 1},
    
  };

    // autocompleteItemsAsObjects = [
    //     {name: 'Item1', userid: 0},
    //     {name: 'item2', userid: 1},
    //      {name: 'item3', userid: 2},
    //       {name: 'item4', userid: 3}
    // ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl : ViewController,
              public events : Events,
              public authguard : AuthguardProvider,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider,
              private http: Http) {


              this.nativeElement = this.element.nativeElement;
              this.$ = this.appServiceProvider.jQuery;
  }

  // public transform(name: any): Observable<object> {
  //   console.log(name);
  //       const item = {display: `@${name.name}`, value: name};
  //       return of(item);
  //       // console.log(item);
  //   }


    public onItemAdded(item) {
        console.log('tag added: value is ' + item.name);
         this.selectedUsers.push(item);
        console.log(this.selectedUsers);
        
    }
      public onItemRemoved(item) {
        console.log('tag removed: value is ' + item.name);
          this.selectedUsers = this.selectedUsers.filter((data: any) => {
        return item.name !== data.name;
    })


    }
   readData () {

    this.http.get(this.dataurl)
    .subscribe(
      data => this.extractData(data),
       err => this.handleError(err)
    );
  }
    private extractData(res: Response) {


  this.jsonData= res.json();
  let num = this.jsonData.length;
  let dat =this.jsonData;
  this.users=this.jsonData;
  this.data=this.jsonData;
  console.log(this.users);
  console.log(num);
  this.autocompleteItemsAsObjects = this.jsonData;

}

  handleError (error: any) {
  console.log("error !")
  
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg); 
    return errMsg;
  }

  ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("leave-popover2");
    this.readData();
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveModalPage');
  }

    close() {
    this.viewCtrl.dismiss();
  }

   onDateChanged(event) {
        // date selected
        this.selectedDates.push(event);
        console.log(this.selectedDates);
    }
    deleteSetected(removeDate){
      console.log(removeDate);
    this.selectedDates = this.selectedDates.filter((date: any) => {
        return removeDate !== date;
    })
    }
leaveNoteData(test){
  console.log(test);
    this.leaveNote=test;

}

sendData(){
  console.log("Data to be sent in api request");
  // let x = document.getElementById('leaveNoteData').value;
  console.log(this.selectedDates);
  console.log(this.selectedUsers);
    console.log( this.leaveNote);
  
}
}
