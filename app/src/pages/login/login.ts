import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';



declare const gapi : any;

@IonicPage({
	 name : 'LoginPage',
  segment : 'login' ,
  
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


	public auth2: any;

	constructor(public navCtrl: NavController) {

	  }


	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');

          //Once the view loads call handle client function to authenticate the user
		  this.handleClientLoad();

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

          // If the user is already signed in navigate the user to search page
	          // this.navigateToSearch();

        } 
      }


   signIn(){

       //   Sign in the user upon button click.

      	        gapi.auth2.getAuthInstance().signIn().then( () => {
    	        	console.log("signed in");
    	        	console.log(gapi.auth2.getAuthInstance().currentUser.get());
    	        	// this.navigateToSearch();

              });

        }

}
