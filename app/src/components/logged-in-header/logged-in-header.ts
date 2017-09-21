import { Component } from '@angular/core';
import {  PopoverController, Events } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { TranslateService } from '@ngx-translate/core';

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

  header : any;
  image : any;

  constructor(
              private translate: TranslateService,
              public popoverCtrl: PopoverController,
              private cookieservice: CookieService,
              public events : Events,
              public appservice : AppServiceProvider) {

   
  }

  ngOnInit(){
     if(this.cookieservice.get("keepLoggedIn")== 'yes'){
       this.header = "loggedin";
       if(this.appservice.image){
       this.image = this.appservice.image;
        }
       else{
        this.image = this.cookieservice.get("profileImage");
       }
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

  private lang;
  private setLocale(lang: string){
    console.log(this.lang)
    // this.translate.use(this.lang);
    this.events.publish("app:localize",this.lang);
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
