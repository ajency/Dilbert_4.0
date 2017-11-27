import { Component, NgZone } from '@angular/core';
import {  PopoverController, Events } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';
import { AppServiceProvider } from '../../providers/app-service/app-service';
// import { TranslateService } from '@ngx-translate/core';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';

import { TranslateService, TranslatePipe } from '@ngx-translate/core';

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
  org_name : any;
  langSelect : boolean = true;
  image : any;
  param = {
    value : 'world'
  };

  constructor(
              // private translate: TranslateService,
              public popoverCtrl: PopoverController,
              private cookieservice: CookieService,
              public events : Events,
              public appservice : AppServiceProvider,
              public translate: TranslateService,
              public appglobals : AppGlobalsProvider,
              public zone : NgZone 
              ) {


    if(this.appglobals.lang == "en"){
      this.langSelect = true;
    }
    else{
      this.langSelect = false;
    }
     // this language will be used as a fallback when a translation isn't found in the current language
     // translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
     // translate.use('fr');

   
  }

  ngOnInit(){

    this.org_name = this.appglobals.org_name;
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

  ionViewDidLoad() {
    
   this.zone.run(() => {});

  }


  private lang = 'English';
  private setLocale(){
    console.log(this.lang);
    if(this.lang == "English"){
      this.events.publish("app:localize",'en');
      console.log('en')
    }
    else if( this.lang == "French"){
      this.events.publish("app:localize",'fr');
      console.log('fr')
    }
    else{
      this.events.publish("app:localize",'hi');
      console.log('hi')
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
