import { Component, ElementRef } from '@angular/core';
import { IonicPage, Events,  NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
import { AppServiceProvider } from '../../providers/app-service/app-service';

/**
 * Generated class for the LogsChangedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logs-changed',
  templateUrl: 'logs-changed.html',
})
export class LogsChangedPage {

  changed_logs : any;
  private nativeElement: any;
  private $: any;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public element: ElementRef,
              public appServiceProvider : AppServiceProvider    
              ) {

      this.nativeElement = this.element.nativeElement;
      this.$ = this.appServiceProvider.jQuery;
      this.changed_logs = this.navParams.get('data1');
      console.log(this.changed_logs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsChangedPage');
  }

  ngOnInit(){
    this.$(this.nativeElement).parents().find('.popover-content').addClass("logs-changed-popover");

  }

  

  splitDay_Date(date: string, option : number): string{
    var text: string = '-';
    if(date != null){
      switch (option) {
        case 1:
          text = date.split(" ")[0]
          break;
        case 2:
          text = date.split(" ")[1]
          break;
      }
    
    }
      return text;

  }



}
