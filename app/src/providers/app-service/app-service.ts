import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Location, PlatformLocation } from '@angular/common';
import { ToastController, Events, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';


declare const gapi : any;


interface Window {
  addEventListener: any;
  onlineToast: any;
  offlineToast: any;
  location: any;
  onfocus: any;
  onblur: any;
}

declare var window : Window;

@Injectable()
export class AppServiceProvider {

  image :any;
  status: any;
  token : any;
  userId :any;
  x_api_key : any;
  flag : boolean = false;
  private appFocused: boolean = true;
  private isOnline: boolean = true;
  

  constructor(public http: Http,
    			    public events: Events,
      			  private cookieservice: CookieService,
              public platformlocation: PlatformLocation,
              private location: Location,
              private toastctrl : ToastController,
              private loadingctrl :LoadingController
              ) {
    
    console.log('AppServiceProvider Provider');
  }


 handleClientLoad() {

      //Function to autheticate the user using google auth2
		let that = this;
		gapi.load('client:auth2',()=> {
		gapi.client.init({
          client_id: '460485328187-u3um84ihtuq08aiu23er9d58e43269do.apps.googleusercontent.com',
			    cookiepolicy: 'single_host_origin',
			    scope: 'profile'
	        }).then( () => {

	          console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
	          that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	          console.log(gapi.auth2.getAuthInstance().currentUser.get());


        });
        });

  }

  updateSigninStatus(isSignedIn) {

	        if (isSignedIn) {

		          console.log("Already signed in");
              this.image = gapi.auth2.getAuthInstance().currentUser.get().w3.Paa;
              console.log(this.image);

		          if(this.cookieservice.get("keepLoggedIn")== 'yes')
		          {
                  let path = this.location.path(true)
                  let pathparts = path.split('/');
                  pathparts.map((val) => {
                    if(val === 'dashboard'){
                      this.flag = true;
                    }
                  });
                  if(!this.flag){

  		          	this.events.publish('app:navroot', 'dashboard');
                }
                 // console.log(gapi.auth2.getAuthInstance().currentUser.get().w3.Paa);



		          }
		          else {
		          	this.events.publish('app:navroot', 'login');
		          }


        } 
        else{
        	this.events.publish('app:navroot', 'login');
        }
      }


   signIn(): any{

       //   Sign in the user upon button click.
       return new Promise((resolve,reject) => {

       	      gapi.auth2.getAuthInstance().signIn().then( () => {
    	        	console.log("signed in");
    	        	// console.log(gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token);
    	        	
    	        	 resolve(gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token);
                 this.image = gapi.auth2.getAuthInstance().currentUser.get().w3.Paa;
                 this.cookieservice.put("profileImage" , this.image);

              }, (error) => {
              	console.log('Network Error');
              	reject(error);
              });

             });


	     }


 public setAppFocus(focused: boolean): void{
    this.appFocused = focused;
  }

  public getAppFocus(): boolean{
    return this.appFocused;
  }

  public presentToast(message: string, type: string = 'success', duration: number = 3000, keepOpen: boolean = false, position: string = 'bottom',closeText: string = 'Got it'): any{

      //this.toastctrl.dismiss();

    let toastClass = '';
    if(type === 'success'){
      toastClass = 'toast-success online';
    }
    else if(type === 'warn'){
      toastClass = 'toast-warn offline';
    }
    else if(type === 'error'){
      toastClass = 'toast-fail'
    }

    let toastOptions:any = {
      message: message,
      cssClass: toastClass,
      position: position
    }

    if(keepOpen){
      toastOptions.showCloseButton = true;
      toastOptions.closeButtonText = closeText;
      toastOptions.dismissOnPageChange = false;
    }else{
      toastOptions.duration = duration;
    }

    let toast = this.toastctrl.create(toastOptions);

    // let toast = this.toastctrl.create({
    //   message: message,
    //   duration: duration,
    //   cssClass: toastClass,
    //   position: 'bottom',
    //   showCloseButton: true,
    //   closeButtonText: 'X'
    // });

    // toast.onDidDismiss(() => {
    //   console.log("toast dsimissed");
    // });

    toast.present();
    console.log("toasst presented")

    return toast;
  }

  public updateOnlineStatus(showtoast: boolean = false, updateui: boolean = true): boolean {
        if(!this.appFocused) return;

        if(updateui){
          showtoast = this.isOnline == navigator.onLine ? false : true;
          this.isOnline = navigator.onLine;
          

          let content = document.getElementsByTagName('ion-content')[0];
          let container = content.querySelector('div.container');
          let filtercontainer, filterinputs, filterbuttons, tabularcontainer, tabinputs, tabbuttons, containerinputs, containerbuttons;

          containerbuttons = container.getElementsByTagName('BUTTON');




          if (navigator.onLine) {
            // this.isOnline = true;
            if(showtoast){
              if(window.offlineToast != null){
                window.offlineToast.dismiss();
              }
              window.onlineToast = this.presentToast('You are online','success',5000);
            }

            Array.prototype.map.call(containerbuttons,(val) => {val['disabled'] = false;});
            content.classList.remove('app-is-offline');

          } else {
            // this.isOnline = false;
            if(showtoast){
              if(window.onlineToast != null){
                window.onlineToast.dismiss();
              }
              window.offlineToast = this.presentToast('Warning you are offline and may be viewing outdated info!','warn',0,true);
            }
             content.classList.add('app-is-offline');
             Array.prototype.map.call(containerbuttons,(val) => {val['disabled'] = true;});

        } //end if
      }
        console.log("updating online status .......................................... ")
        // this.events.publish('app:onlinestatus',navigator.onLine);
        return navigator.onLine;
  } //end updateOnlineStatus


	
}
