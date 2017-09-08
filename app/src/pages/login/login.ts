import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 // declare const gapi : any;

@IonicPage({
  name: 'login',
  segment: 'login',
  priority: 'off'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 showLoader : boolean;
  token : any;
  status : any;
  code :any;
  domainError : boolean = false;
  constructor(public navCtrl: NavController,
			   public navParams: NavParams, 
			   public http: Http,
			   public events: Events,
			   private appServiceProvider: AppServiceProvider,
			   private cookieservice: CookieService,
			   public toastCtrl : ToastController,
			   public zone : NgZone,
			   public storage : Storage) {
  	if(this.cookieservice.get("domainError")== 'yes'){
      this.domainError =true;    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.ready().then(() => {
      console.log("ionic storage is avilable");
      });

     this.cookieservice.remove("domainError");

   
  }

  ionViewCanEnter(){
    console.log('ionViewCanEnter LoginPage');
    if(this.cookieservice.get("keepLoggedIn") !== 'yes'){
      console.log('yes');
      return true;
      
    }
    else{
	    console.log('no');
    	return false;
    }
  }

  


  navigateToRegister(){
  	 this.events.publish('app:navroot', 'register');
    console.log('Navigating to another module');
  }

 //  handleClientLoad() {

 //      //Function to autheticate the user using google auth2
	// 	let that = this;
	// 	gapi.load('client:auth2',()=> {
 //    	console.log(this);
	// 	gapi.client.init({
	// 		// client_id: '676621258132-6q9s2j1hc8343jj3nn75k0is4s1nb893.apps.googleusercontent.com',
	//         client_id: '460485328187-u3um84ihtuq08aiu23er9d58e43269do.apps.googleusercontent.com',

	// 		cookiepolicy: 'single_host_origin',
	// 		scope: 'profile'
	//         }).then( () => {


 //          // gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);

	//           console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
	//           console.log(that);
 //          // this.test(true);
	//           that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	//           console.log(gapi.auth2.getAuthInstance().currentUser.get());
 //          // authorizeButton.onclick = handleAuthClick;
 //          // signoutButton.onclick = handleSignoutClick;
 //        });
 //        });

 //  }
	// updateSigninStatus(isSignedIn) {
	//           console.log(this);
 //        // this.zone.run(() => {});
	//         if (isSignedIn) {

	// 	          console.log(this,"Already signed in");
	// 	          // this.postRequest();

 //          // If the user is already signed in navigate the user to search page
	//           // this.navigateToSearch();

 //        } 
 //      }


 //   signIn(){

 //       //   Sign in the user upon button click.

 //      	        gapi.auth2.getAuthInstance().signIn().then( () => {
 //    	        	console.log(this,"signed in");
 //    	        	console.log(gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token);
    	        	
 //    	        	 // this.navigateToSummary();
 //    	        	 this.postRequest();

 //              }, (error) => {
 //              	console.log('Network Error');
 //              });

 //      	     }

  	signin(){
  		this.showLoader = true;
 		this.appServiceProvider.signIn().then( (token) =>{

		this.token = token;
 		console.log(this.token);
 		this.postRequest();
 		});
 		
 		this.zone.run(() => {});


 	}


 	postRequest() {
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		// headers.append('Access-Control-Allow-Origin: *');
		let options = new RequestOptions({ headers: headers });

		// let token = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
		let url = 'http://localhost:8000/api/login';
		// url += `/login?token=${token}`;
		let postParams = {
		token : this.token
		}

		console.log(url);
		this.http.post(url,postParams,options)
		.subscribe(data => {
		// console.log(JSON.parse(data['_body']));
		this.status = JSON.parse(data['_body']).status;


		console.log(JSON.parse(data['_body']));

		
		this.storage.set('userData', JSON.parse(data['_body']).data).then( () => {
        console.log("storage set function");
      });

		if(this.status =="success"){

			this.code= JSON.parse(data['_body']).code;
			console.log(this.code);

		// this.navigateToSummary();
			if(this.code === "dash"){
					this.cookieservice.put("keepLoggedIn","yes");
					this.events.publish('app:navroot', 'dashboard');
					}
			else if( this.code === "join" ){
				this.events.publish('app:navroot', 'join-organisation');
				this.cookieservice.put("join","yes");
			}
			else{
				this.events.publish('app:navroot', 'create-organisation');
				this.cookieservice.put("create","yes");
			}


		}

		else if(this.status =="failure"){
			console.log(' failure popup ');
			this.events.publish('app:navroot', 'login');
			this.domainError = true;
			this.cookieservice.put("domainError","yes");
			// this.errorToast();

		}
		}, error => {
		console.log(error.status);// Error getting the data
		});

		this.zone.run(() => {});
		// console.log(this.status);

	}


	errorToast() {
      console.log('errorToast function');

	    let toast = this.toastCtrl.create({
	      message: 'Domain does not exist',
	      showCloseButton: true,
	      closeButtonText: "OK",
	      position: 'bottom'
	    });
	    toast.present();
	    this.zone.run(() => {});
	}
      	     
   //   postRequest() {
	  //   var headers = new Headers();
	  //   headers.append("Accept", 'application/json');
	  //   headers.append('Content-Type', 'application/json' );
	  //   // headers.append('Access-Control-Allow-Origin: *');
	  //   let options = new RequestOptions({ headers: headers });

	  //   // let token = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
	  //   let url = 'http://localhost:8000/api/login';
	  //   // url += `/login?token=${token}`;
	  //   let postParams = {
			// 	      token : this.appServiceProvider.gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token
			// 	    }

	  //   console.log(url);
	  //   this.http.post(url,postParams,options)
	  //     .subscribe(data => {
	  //       // console.log(JSON.parse(data['_body']));
	  //       this.message = JSON.parse(data['_body']).message;
	  //       console.log(this.message);
	  //       if(this.message =="success"){

	  //     	// this.navigateToSummary();
	  //     	this.events.publish('app:navroot', 'dashboard')
	  //     	}
	  //      }, error => {
	  //       console.log(error.status);// Error getting the data
	  //     });
	  //     console.log(this.message);
	      
	  // }
}
