import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Location, PlatformLocation } from '@angular/common';
import { ToastController, Events, LoadingController } from 'ionic-angular';
import { NgProgressService } from "ng2-progressbar";

import * as $ from 'jquery';

import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const gapi : any;
declare var jquery:any;
declare var $ :any;

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
  handleError : any;
  jQuery: any;

  

  constructor(
    public progress: NgProgressService,
    public http: Http,
   public events: Events,
   private cookieservice: CookieService,
   public platformlocation: PlatformLocation,
   private location: Location,
   private toastctrl : ToastController,
   private loadingctrl :LoadingController
   ) {
    this.jQuery = $;
    
    
    console.log('AppServiceProvider Provider');

    this.handleError = (error: any): Promise<any> => {
                      console.warn('error in request fetch',error)
                      this.hideLoader();
                      // let errMsg: string;
                      // if (error instanceof Response) {
                      //   const body: any = error.json() || '';
                      //   const err = body.error || JSON.stringify(body);
                      //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                      // } else {
                      //   errMsg = error.message ? error.message : error.toString();
                      // }
                      // console.error(errMsg);
                      // return Promise.reject(errMsg);
                      console.log(error.status);
                      if(error.status === 0 && !navigator.onLine){
                        if(window.offlineToast){
                          window.offlineToast.dismiss({backdrop: true});
                          window.offlineToast = null;
                        }
                        // else{
                          setTimeout(() => {
                            window.offlineToast = this.presentToast("Request couldn't be made as you are offline!",'error',0,true,'bottom','Refresh');

                            window.offlineToast.onDidDismiss((data) => {
                              if(data && data.backdrop){
                              // window.location.reload(true);
                            }
                            else{
                              window.location.reload(true);
                            }
                          });
                          },500);
                        // }
                      }

                      let prerror = this.parseRejectedError(error);
                      return Promise.reject(prerror);
                    }

                  }


   handleClientLoad(call : any): Promise<any> {

    return new Promise((resolve,reject) => {

      //Function to autheticate the user using google auth2
      let that = this;
      gapi.load('client:auth2',()=> {
        gapi.client.init({
      
          // client_id: '460485328187-u3um84ihtuq08aiu23er9d58e43269do.apps.googleusercontent.com',
          client_id: '460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com',
          
          cookiepolicy: 'single_host_origin',
          scope: 'profile'
        }).then( () => {

         console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
         console.log(call);

        if(!call){
         that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }

         if(gapi.auth2.getAuthInstance().isSignedIn.get()){
          resolve(true);
         }

         else{
          reject(false);
         }
         
            // console.log(gapi.auth2.getAuthInstance().currentUser.get());


          });
      });

    })


  }

    updateSigninStatus(isSignedIn) {

     if (isSignedIn) {

      console.log("Already signed in");
      this.image = gapi.auth2.getAuthInstance().currentUser.get().w3.Paa;
              // console.log(this.image);

		          // if(this.cookieservice.get("keepLoggedIn")== 'yes')
		          // {
            //       let path = this.location.path(true)
            //       let pathparts = path.split('/');
            //       pathparts.map((val) => {
            //         if(val === 'dashboard'){
            //           this.flag = true;
            //         }
            //       });
            //       if(!this.flag){

  		        //   	this.events.publish('app:navroot', 'dashboard');
            //     }
            //      // console.log(gapi.auth2.getAuthInstance().currentUser.get().w3.Paa);



		          // }
		          // else {
		          // 	this.events.publish('app:navroot', 'login');
		          // }
              this.events.publish('user:signedIn', 'navigateTo');
              console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')


            } 
            else{
              let path = this.location.path(true)
              let pathparts = path.split('/');
              pathparts.map((val) => {
                if(val === 'register'){
                  this.flag = true;
                }
              });
              if(this.flag){
               this.events.publish('app:navroot', 'register');
             }
             else{
              this.events.publish('app:navroot', 'login');
            }
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


  
  public request(url: string,type: string, body: object, optionalHeaders: object = {},overrideheaders: boolean = false, 
                  returntype: string = 'promise', disableurlupdate: string = '', updateurl: object, appendurl : boolean = false): any{
      let locationpath = this.location.path(true);

      let headers = new Headers({'Content-Type': 'application/json','Accept': 'application/json, text/plain, */*'});

      let opHeaderKeys = Object.keys(optionalHeaders);
      if(opHeaderKeys.length){
        if(overrideheaders){
          headers = new Headers(optionalHeaders);
        }
        else{
          for(let key of opHeaderKeys){
            headers.append(key,optionalHeaders[key]);
          }
        }

      }

    // let objToSearchParams = (obj) => {
    //     let params: URLSearchParams = new URLSearchParams();
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key))
    //             params.set(key, obj[key]);
    //     }
    //     return params;
    // }

    let httpEvent, serializedquery = '';
    if(Object.keys(updateurl).length){
      serializedquery =  `?${$.param(updateurl)}`;
    }
    // console.log(serializedquery);
    if(type == 'get'){
      //TBD construct query params

      // if(Object.keys(body).length){
      //   serializedquery =  `?${$.param(body)}`;
      //   url = url + serializedquery;
        // let params: URLSearchParams = objToSearchParams(body);

        // console.log("url search params =>", params)
        // httpEvent = this.http.get(url,{headers: headers, search: params})
      // }
      httpEvent = this.http.get(url,{headers: headers});
    }
    else if(type == 'post'){
      httpEvent = this.http.post(url,body,{headers: headers})
    }

    // setTimeout(() => {
    //    this.updateQueryParams(serializedquery,locationpath,disableurlupdate);
    // },250);

    this.presentLoader(url);
    if(returntype == 'promise'){
      return httpEvent
      .toPromise()
      .then((response) => {
       this.updateQueryParams(serializedquery,locationpath, disableurlupdate, appendurl);
       return response.json()
     })
      .catch(this.handleError);
    }
    else{
      return httpEvent
      .map((response) => {
       this.updateQueryParams(serializedquery,locationpath, disableurlupdate,appendurl);
       return response.json()
     })
      .catch(this.handleError);
    }


  }


  private updateQueryParams(query,locationpath, disableupdate,appendurl){
    this.hideLoader();
    // if(locationpath !== this.location.path(true)) return;
    if(disableupdate) return;

    let serializedquery = typeof query === 'string' ? query : typeof query === 'object' ? $.param(query) : '';

    if(serializedquery){
      this.events.publish('app:updatehistory',{page: serializedquery, state: {query: serializedquery}, replace: true, appendurl});
    }


  }

  public parseRejectedError(error: any): any{
    try{
      return JSON.parse(error._body);
    }
    catch(e){
      return error;
    }
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
      let containerbuttons;

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

  private loader: any = null;
  private pendingRequests: Array<any> = [];
  public presentLoader(url: string = ''): any{
    this.pendingRequests.push(url);

    console.log("@@@@@@@@@@@ presenting loader:", this.pendingRequests)
    if(this.loader === null){
      // this.loader = this.loadingctrl.create({
      //   spinner: "hide",
      //   content: "<div><img src='./assets/img/dilbert.jpg' /> <div>loading</div></div>",
      //   cssClass: "custom-loading-content",
      //   showBackdrop: true,
      //   dismissOnPageChange: true
      // });
  
      // this.loader.present();
      
      this.loader = true;
      this.progress.start();
    }
  }

  public hideLoader(){
    let url = this.pendingRequests.pop();

    setTimeout(() => {
      console.log("@@@@@@@@@@ pending requests", this.pendingRequests)
      if(this.pendingRequests.length === 0){
        if(this.loader){
          // this.loader.dismiss();
          this.loader = null;
          this.progress.done();
        }
      }
    },100);

  }
  
}
