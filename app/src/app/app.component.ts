import { AppServiceProvider } from '../providers/app-service/app-service';
import { AppGlobalsProvider } from '../providers/app-globals/app-globals';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Location, PlatformLocation } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { TitleCasePipe } from '../pipes/title-case/title-case';


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
  @ViewChild(Nav) nav: NavController;


  rootPage: any ;

  flag : boolean;
  loc : any;
  private currentPage : string;
  private appName : string = "Dilbert";


  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private appServiceProvider: AppServiceProvider,
              private location: Location,
              public events:Events,
              private platformlocation: PlatformLocation,
              public cookieService : CookieService,
              private titlecasepipe : TitleCasePipe,
              private appglobals : AppGlobalsProvider ) {
    this.initializeApp();
    this.loc = platformlocation;

    this.events.subscribe('app:navroot',(data) => {
    this.updateNav(data)
    });
    this.appServiceProvider.handleClientLoad();

    this.events.subscribe('user:signedIn', (data) =>{
      this.navigateTo();
    });


    this.events.subscribe('app:updatehistory',(data) => {

      // this.showVerificationModal();

      // if(this.appglobals.getEnv().ionicEnvName === 'dev') return;
      // console.log("pushstate data =>" , data)
      if(data.state){
        // console.log(data.frompath);
        let currentlocation = data.frompath ? data.frompath : this.location.path(true);
        console.log(this.location.path(true));
        if(currentlocation.indexOf('?') !== -1){
          let locationparts = currentlocation.split('?');
          currentlocation = locationparts[0];
          console.log('inside if');
        }
        console.log(currentlocation);

        let page = data.state['query'] ? currentlocation + data.state['query'] : currentlocation + data.page;
        console.log(page);
        // let page = window.location.pathname + data.page;
        if(data.replace){
          // console.log("pressed replacing url history => ", page)
          this.platformlocation.replaceState(data.state,"",page);
          this.appglobals.updateCurrentHistory(page);
        }
        else{
          console.log("pressed pushing url history => ", page)
          this.platformlocation.pushState(data.state,"",page);
          this.appglobals.pushToHistory(page);
        }
      }
      else{ // just update the history stack
        this.appglobals.pushToHistory(data);
        // this.platformlocation.pushState({page: data},"",data);
      }
      // console.log("app:updatehistory",this.appglobals.getHistory());
    });

     platformlocation.onPopState((event: any) => {
      // console.warn('pressed back location ' + document.location + ", state: " + JSON.stringify(event.state));
      // let history = this.appglobals.getHistory();
      this.events.publish('app:popstate',event.state);

      // this.updateNav({page: 'competitors', setroot: true});
      // if(event.state && event.state.id === 'prices'){
      //   this.events.publish('app:updatehistory',{page: "test-state", state: {test: "123"}})
      // }
    });


  }



   navigateTo(){


        console.log('%c url location on app entry ... location: [' + this.location.path(true) + ']','color:orange')

        let path = this.location.path(true);

        let pathparts = path.split('/');
        
        pathparts.map((val) => {
          if(val === 'login'){
            this.flag = true;
          }
        });

        if(this.cookieService.get("keepLoggedIn") == 'yes'){

          let path = this.location.path(true)
                  let pathparts = path.split('/');
                  pathparts.map((val) => {
                    if(val === 'dashboard'){
                      this.flag = true;
                    }
                  });
                  if(!this.flag){

                 this.updateNav('dashboard');
                }
                else{
                  this.updateTitle('dashboard');
                 // console.log(gapi.auth2.getAuthInstance().currentUser.get().w3.Paa);
                }



          }
        else{
            this.updateNav('login');
          }








        }
    
    




  
  private updateNav(data) : any{
    this.nav.setRoot(data);
    this.updateTitle(data);
    
  }

  private updateTitle(title: string = ''): void{
    this.currentPage = title ? title : this.currentPage;
    document.title = `${this.appName} - ${this.titlecasepipe.transform(this.currentPage)}`;
  }


  initializeApp() {
    // this.platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    //   //this.checkNetwork();
    // });

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

  
}
