import { AppServiceProvider } from '../providers/app-service/app-service';
import { AppGlobalsProvider } from '../providers/app-globals/app-globals';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, NavController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Location, PlatformLocation } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

// import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';
// import { TranslateService, TranslatePipe } from '@ngx-translate/core';


import { Inject } from '@angular/core';

interface Window {
  location: any
  addEventListener: any;
  onlineToast: any;
  offlineToast: any;
  onfocus: any;
  onblur: any;
  unescape: any;
}

declare var self : any;
declare var window : Window;
declare var document : any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainContent') nav: NavController;


  rootPage: any ;

  flag : boolean;
  flag2 : boolean = true;
  loc : any;
  private currentPage : string;
  private appName : string = "Dilbert";
  url : any;


  pages: Array<{ title: string, component: any }>;

  constructor(
              public translate: TranslateService,
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private appServiceProvider: AppServiceProvider,
              private location: Location,
              public events:Events,
              private platformlocation: PlatformLocation,
              public cookieService : CookieService,
              private titlecasepipe : TitleCasePipe,
              private appglobals : AppGlobalsProvider,
              public zone : NgZone ) {


     
            
    
     this.initializeApp();
    
    // this language will be used as a fallback when a translation isn't found in the current language
     translate.setDefaultLang('en');
     this.appglobals.lang = 'en';

    // the lang to use, if the lang isn't available, it will use the current loader to get them
     // translate.use('fr');

    this.loc = platformlocation;


    this.appServiceProvider.handleClientLoad(false).then( () =>{
      console.log('Logged in');
    })
    .catch( () => {
      console.log('Not logged in')
    })


    this.events.subscribe("app:localize",(lang) => {
      this.translate.use(lang);
      this.appglobals.lang = lang;
      this.zone.run(() => {});
    });



    this.events.subscribe('app:navroot',(data) => {
      this.updateNav(data);
    });



    this.events.subscribe('user:signedIn', (data) =>{
      this.navigateTo();
    });



    this.events.subscribe('app:updatehistory',(data) => {

    console.log(data);
    
    if(data.state){
      let currentlocation = data.frompath ? data.frompath : this.location.path(true);

      console.log(currentlocation);
    
      if(currentlocation.indexOf('?') !== -1){
        let locationparts = currentlocation.split('?');
        currentlocation = locationparts[0];
        // console.log('inside if');
      }
     


      if(data.appendurl){
      console.log('inside appendurl')
      // console.log(this.appglobals.getHistory());


      
      let length = this.appglobals.getHistory().length;
      // console.log(length);

      if(length!= 0){
      let parts = this.appglobals.getHistory()[length-1].split('?');
      currentlocation =  parts[0] + '?' + parts[1];
      console.log(currentlocation);
      }

      }

      // else{
      //   currentlocation = '/dashboard'
      // }

     

      let page = data.state['query'] ? currentlocation + data.state['query'] : currentlocation + data.page;
      console.log(page);
      // let page = window.location.pathname + data.page;
      if(data.replace){
        console.log("pressed replacing url history => ", page)
        this.platformlocation.replaceState(data.state,"",page);
        this.appglobals.updateCurrentHistory(page);
      }
      else{
        console.log("pressed pushing url history => ")
        this.platformlocation.pushState(data.state,"",page);
        this.appglobals.pushToHistory(page);
      }
    }
    else{ // just update the history stack
      this.appglobals.pushToHistory(data);
      // this.platformlocation.pushState({page: data},"",data);
    }
     console.log("app:updatehistory",this.appglobals.getHistory());
  });

     platformlocation.onPopState((event: any) => {
      console.warn('pressed back location ' + document.location + ", state: " + JSON.stringify(event.state));
      let history = this.appglobals.getHistory();
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.log(event);
      console.log(history);
      // this.events.publish('app:popstate',event.state);

      // this.updateNav({page: 'competitors', setroot: true});
      // if(event.state && event.state.id === 'prices'){
      //   this.events.publish('app:updatehistory',{page: "test-state", state: {test: "123"}})
      // }
    });





  }

  ngOnInit(){
    console.log(this.location.path(true));
    this.url =this.location.path(true);
    console.log("################ check ##################");
    // this.nav.viewDidEnter
    //         .subscribe((res) => {
    //           console.log('view did enter =>' + this.currentPage + " %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    //           // setTimeout(() => {
    //             // this.app.setTitle(`${this.appName} - ${this.titlecasepipe.transform(this.currentPage)}`);
    //             this.updateTitle(this.currentPage);
    //           // },250);
    //         },(err) => {
    //           console.warn('view enter error', err);
    //         })
     
  }


  navigateTo(){
    console.log('%c url location on app entry ... location: [' + this.location.path(true) + ']','color:orange')

    // let path = this.location.path(true);

    let pathparts = this.url.split('/');
    console.log(pathparts);


    if(this.cookieService.get("keepLoggedIn") !== 'yes'){

      this.updateNav('login');
      
    }

    else{
      if(this.url == ''){
        console.log('navigating to dashboard');
        this.rootPage = 'dashboard';
         this.updateTitle('dashboard');
      }

      else{

        let pathparts2 = pathparts[1].split('?')
          console.log(pathparts2);

          if(pathparts2.length == 1 ){
            
            if(pathparts2[0] == 'dashboard'){
              console.log('updating title to dashboard');
              this.updateTitle('dashboard')
            }
            else if(pathparts2[0] == 'summary'){
              console.log('updating title to summary');
              this.updateTitle('summary');
            }
             else if(pathparts2[0] == 'user-summary'){
              console.log('updating title to user-summary');
              this.updateTitle('user-summary');
            }

            else if(pathparts2[0] == 'login' || pathparts2[0] == 'register'){
              console.log('navigating to dashboard')
              this.updateNav('dashboard');
            }

            else{
              console.log('navigating to not-found page');
              this.updateNav('not-found');
            }
          }

          else{

            if(pathparts2[0] == 'dashboard'){

                let obj1 = JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}');
                let obj2 = JSON.parse('{"' + decodeURI(pathparts2[2]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                   console.log(obj1);
                    console.log(obj2);
                  if(obj1 != undefined && obj2 != undefined && obj1.start_date && obj1.period_unit && obj1.user_id && obj2.summary_date && ( obj1.period_unit == 'week' || obj1.period_unit == 'month' )){
                    this.updateTitle('dashboard');
                    this.appglobals.dashboard_params.param1 = obj1;
                    this.appglobals.dashboard_params.param2 = obj2;
                  }
                  else{
                    this.updateTitle('dashboard');
                    this.appglobals.dashboard_params.param1 = '';
                    this.appglobals.dashboard_params.param2 = '';
                  }
            }

            else if(pathparts2[0] == 'summary'){
              let obj3 = JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}');
              console.log("obj3");
              console.log(obj3);
              if(obj3 != undefined && obj3.date && obj3.period_unit && obj3.period_unit == 'week' && obj3.org_id){
                this.updateTitle('summary');
                this.appglobals.summary_params.param1 = obj3;


              }
              else{
                this.appglobals.summary_params.param1 = '';

              }
            }
            else if(pathparts2[0] == 'user-summary'){
            let obj4 = JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}');
            console.log("obj4");
            console.log(obj4);
             console.log("this date is: "+moment(obj4.start_date).isValid());
            //  (moment(obj4.start_date).isValid())
            if(obj4.period_unit !='month'){
              obj4.period_unit='week';
            }
              if(obj4 != undefined && (moment(obj4.start_date).isValid()) && obj4.period_unit && obj4.period_unit && obj4.org_id && obj4.user_id){
                this.updateTitle('user-summary');
                this.appglobals.newsummary_params.param1 = obj4;
                  console.log(" defined ");
                   console.log(this.appglobals.newsummary_params.param1);


              }
              else{
                console.log("not defined ");
                this.appglobals.newsummary_params.param1 = '';

              }
           }


            else{
              console.log('navigating to not-found page');
              this.updateNav('not-found');

            }

          }


      }


    }

    // else{

    //   let obj1,obj2;

    //   pathparts.map((val) => {
    //   if(val.includes('dashboard')){
    //       this.flag = true;
    //       let pathparts2 = val.split('?');
    //       console.log(pathparts2);


    //       if(pathparts2.length == 1){
    //         this.flag = false;
    //         this.flag2 = false;
    //         return;
    //       }

    //       else if(pathparts2.length == 2){
    //        // console.log(decodeURI(pathparts2[1]));
    //        // console.log(JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}'));
    //       obj1 = JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}');

    //     }
    //     else if(pathparts2.length == 3){
    //       obj1 = JSON.parse('{"' + decodeURI(pathparts2[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace('[', '').replace(']', '') + '"}');
    //       obj2 = JSON.parse('{"' + decodeURI(pathparts2[2]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    //       // console.log(obj1,obj2);
    //       }

    //     }
    //   });
    

    //     if(!this.flag){

    //          if(this.flag2){
    //            this.updateNav('dashboard');
    //          }
    //          else{
    //           this.updateTitle('dashboard');          
    //          }


    //      }
        
    //     else{
        
    //       if(obj1 != undefined && obj2 != undefined && obj1.start_date && obj1.period_unit && obj1.user_id && obj2.summary_date && ( obj1.period_unit == 'week' || obj1.period_unit == 'month' )){
    //         // this.updateNav('dashboard', obj1, obj2)
    //       // this.updateTitle('dashboard');
    //       this.updateTitle('dashboard');
    //       console.log('publish event');
    //       this.appglobals.dashboard_params.param1 = obj1;
    //       this.appglobals.dashboard_params.param2 = obj2;

    //       // this.events.publish('dashboard:params', params);
    //       }


    //       else{
    //         // console.log('navigate to not found page')
    //         // this.updateNav('not-found');
    //       }
    //     }

    // }
  

  }









private updateNav(data) : any{
    console.log(data);
    console.log("############################## updating nav ##############", data);
    this.currentPage = data;
    // this.nav.setRoot(data);
    this.nav.push(data);
    this.updateTitle(data);

     


 }

private updateTitle(title: string = ''): void{
  console.log(title);
  this.currentPage = title ? title : this.currentPage;
  console.log(this.currentPage);
  setTimeout( () =>{
  document.title = `${this.appName} - ${this.titlecasepipe.transform(this.currentPage)}`;    
  },100);

  console.log(this.titlecasepipe.transform(this.currentPage));
  
  

}


initializeApp() {

  this.checkNetwork();

 
}


checkNetwork() {
  let self = this;
  let networktimeout = null;
  window.addEventListener('online',  function(e) {
    if(self.appServiceProvider.getAppFocus() === false) return;

    clearTimeout(networktimeout);
    networktimeout = setTimeout(() => {
        // self.updateOnlineStatus(self.appservice);
        self.appServiceProvider.updateOnlineStatus(true);
      },10000);
  });


  window.addEventListener('offline', function(e) {
    if(self.appServiceProvider.getAppFocus() === false) return;

    clearTimeout(networktimeout);
    networktimeout = setTimeout(() => {
        // self.updateOnlineStatus(self.appservice);
        self.appServiceProvider.updateOnlineStatus(true);
      },10000);
  });

    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
      console.warn("addeventlistener required for page visibility api to work!");
    } else {
      // Handle page visibility change   
      document.addEventListener(visibilityChange, () => {
        if(document[hidden]){
            // console.warn("### window hidden ###");
            this.appServiceProvider.setAppFocus(false);
          }
          else{
            // console.warn("@@@ window visible @@@");
            this.appServiceProvider.setAppFocus(true);
            this.appServiceProvider.updateOnlineStatus(true);
          }
        }, false);
    }   

  }

  deselectSlotSelection(): void{
    this.events.publish("app:deselect_slot_selection");
  }

  fireUpEvent(event){
    this.events.publish("app:slot_selection_mouse_up");
  }

}
