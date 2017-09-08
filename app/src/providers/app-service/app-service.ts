import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare const gapi : any;

@Injectable()
export class AppServiceProvider {

  image :any;
  status: any;
  token : any;
  constructor(public http: Http,
			   public events: Events,
			   private cookieservice: CookieService) {
    console.log('Hello AppServiceProvider Provider');

  }


 handleClientLoad() {

      //Function to autheticate the user using google auth2
		let that = this;
		gapi.load('client:auth2',()=> {
    	console.log(this);
		gapi.client.init({
			// client_id: '676621258132-6q9s2j1hc8343jj3nn75k0is4s1nb893.apps.googleusercontent.com',
	        client_id: '460485328187-u3um84ihtuq08aiu23er9d58e43269do.apps.googleusercontent.com',

			cookiepolicy: 'single_host_origin',
			scope: 'profile'
	        }).then( () => {


          // gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);

	          console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
	          console.log(that);
          // this.test(true);
	          that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	          console.log(gapi.auth2.getAuthInstance().currentUser.get());
          // authorizeButton.onclick = handleAuthClick;
          // signoutButton.onclick = handleSignoutClick;
        });
        });

  }

  updateSigninStatus(isSignedIn) {
	          console.log(this);
        // this.zone.run(() => {});
	        if (isSignedIn) {

		          console.log(this,"Already signed in");
		          console.log(this.cookieservice.get("keepLoggedIn"));
		          if(this.cookieservice.get("keepLoggedIn")== 'yes')
		          {
		          	this.events.publish('app:navroot', 'dashboard');
                 console.log(gapi.auth2.getAuthInstance().currentUser.get().w3.Paa);
                 this.image = gapi.auth2.getAuthInstance().currentUser.get().w3.Paa;



		          }
		          else {
		          	this.events.publish('app:navroot', 'login');
		          }
		          // this.postRequest();

          // If the user is already signed in navigate the user to search page
	          // this.navigateToSearch();

        } 
        else{
        	this.events.publish('app:navroot', 'login');
        }
      }


   signIn(): any{

       //   Sign in the user upon button click.
       return new Promise((resolve,reject) => {

       	      gapi.auth2.getAuthInstance().signIn().then( () => {
    	        	console.log(this,"signed in");
    	        	console.log(gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token);
    	        	
    	        	 // this.navigateToSummary();
    	        	 // this.postRequest();
    	        	 // return gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
    	        	 resolve(gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token);
                 console.log(gapi.auth2.getAuthInstance().currentUser.get().w3.Paa);
                 this.image = gapi.auth2.getAuthInstance().currentUser.get().w3.Paa;
    	        	 // this.token = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;

              }, (error) => {
              	console.log('Network Error');
              	reject(error);
              });

       });


      	     }


	
}
