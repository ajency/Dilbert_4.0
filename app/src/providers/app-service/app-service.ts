import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Location, PlatformLocation } from '@angular/common';

import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';


declare const gapi : any;

@Injectable()
export class AppServiceProvider {

  image :any;
  status: any;
  token : any;
  userId :any;
  x_api_key : any;
  flag : boolean = false;
  constructor(public http: Http,
    			    public events: Events,
      			  private cookieservice: CookieService,
              public platformlocation: PlatformLocation,
              private location: Location,
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


	
}
