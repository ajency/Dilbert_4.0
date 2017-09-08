// import { StartHomePage } from './../pages/start-home/start-home';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { LoginPage } from './../pages/login/login';
import { OrganizationPage } from './../pages/organization/organization';
import { Location, PlatformLocation } from '@angular/common';


interface Window {
  addEventListener: any;
  onlineToast: any;
  offlineToast: any;
}

declare var window: Window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;


  rootPage: any ;

  flag : boolean;
  loc : any;


  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private appServiceProvider: AppServiceProvider,
              private location: Location,
              public events:Events,
              platformlocation: PlatformLocation) {
    this.initializeApp();
    this.loc = platformlocation;

    this.events.subscribe('app:navroot',(data) => {
      this.updateNav(data)
    });


    // used for an example of ngFor and navigation
  //   this.pages = [
  //     { title: 'Home', component: LoginPage }
  //   ];
  }



   ngOnInit(){

    this.appServiceProvider.handleClientLoad();
    console.log('%c url location on app entry ... location: [' + this.location.path(true) + ']','color:orange')

    let path = this.location.path(true)
    let pathparts = path.split('/');
    console.log(pathparts);
    pathparts.map((val) => {
      if(val === 'test'){
        this.flag = true;
        console.log(val);
      }
    });
    if(this.flag){
    this.rootPage = 'StartHomePage';

    }
}




  
  private updateNav(data) : any{
    console.log('events working fine');
    console.log(data);
    this.nav.setRoot(data);
    // var stateObj = [];
    // this.loc.pushState(stateObj, "dashboard", "/dashboard");
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.checkNetwork();
    });
  }

  // checkNetwork() {
  //   this.platform.ready().then(() => {
  //     window['isUpdateAvailable']
  //       .then(isAvailable => {
  //         if (isAvailable) {
  //           this.appservice.presentToast(`New Update available! Reload the webapp to see the latest juicy changes.`, 'warn');
  //         }
  //       });

  //     var self = this;
  //     window.addEventListener('online', function (e) {
  //       self.updateOnlineStatus(self.appservice);
  //     });
  //     window.addEventListener('offline', function (e) {
  //       self.updateOnlineStatus(self.appservice);
  //     });
  //   });
  // }


  // updateOnlineStatus(service) {
  //   let body = document.getElementsByTagName('body')[0];
  //   if (navigator.onLine) {
  //     window.onlineToast = service.presentToast('You are online!', 'success');
  //     if (window.offlineToast != null) {
  //       window.offlineToast.dismiss();
  //     }
  //     body.classList.remove("app-is-offline");
  //   } else {
  //     window.offlineToast = service.presentToast('You are offline!', 'warn');
  //     body.classList.add("app-is-offline");
  //   }
  // }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
