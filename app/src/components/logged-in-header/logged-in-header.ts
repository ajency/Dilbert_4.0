import { Component } from '@angular/core';
import {  PopoverController, Events } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';

/**
 * Generated class for the LoggedInHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'logged-in-header',
  templateUrl: 'logged-in-header.html'
})
export class LoggedInHeaderComponent {

  text: string;
  header : any;

  constructor(public popoverCtrl: PopoverController,
              private cookieservice: CookieService,
              public events : Events) {
    console.log('Hello LoggedInHeaderComponent Component');
    this.text = 'Hello World';

    if(this.cookieservice.get("keepLoggedIn")== 'yes'){
      this.header = "loggedin";
    }
    else{
          if(this.cookieservice.get("join")== 'yes' || this.cookieservice.get("create")== 'yes'){
            this.header = "new";
          }

          else {
            this.header = "notloggedin";
          }
       
    }
  }

  openPopover(ev) {
    let popover = this.popoverCtrl.create('PopoverPage', {
    });
    popover.present({
      ev: ev
    });
  }

  navigateToRegister(){
     this.events.publish('app:navroot', 'register');
    console.log('Navigating to another module');
  }

  navigateToLogin(){
     this.events.publish('app:navroot', 'login');
    console.log('Navigating to another module');
  }




}
