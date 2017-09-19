import { Component} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';

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

 //  loginData : any;
 //  // showLoader : boolean;
 //  token : any;
 //  status : any;
 //  code :any;
 //  domainError : boolean = false;
 //  logInProcess : boolean = false;
 //  disableBtn : boolean = false;
  constructor(public cookieservice : CookieService) {
  	}

 //  ionViewDidLoad() {
 //    this.storage.ready().then(() => {
 //      });

 //     this.cookieservice.remove("domainError");
     

   
 //  }

  ionViewCanEnter( ){
    if(this.cookieservice.get("keepLoggedIn") !== 'yes'){
      return true;
      
    }
    else{
    	return false;
    }
  }

  


 //  navigateToRegister(){
 //  	 this.events.publish('app:navroot', 'register');
 //  }


 //  	signin(){
 //  		// this.showLoader = true;
 // 		this.logInProcess = true;
 // 		this.disableBtn = true;
 		

 // 		this.appServiceProvider.signIn().then( (token) =>{

	// 	this.token = token;
 // 		this.postRequest();
 // 		});

 // 		this.zone.run(() => {});


 // 	}


 // 	postRequest() {
	// 	var headers = new Headers();
	// 	headers.append("Accept", 'application/json');
	// 	headers.append('Content-Type', 'application/json' );
	// 	let options = new RequestOptions({ headers: headers });

	// 	let url = `${this.environment.dilbertApi}/login`;
	// 	let postParams = {
	// 	token : this.token
	// 	}

	// 	this.http.post(url,postParams,options)
	// 	.subscribe(data => {
	// 	this.status = JSON.parse(data['_body']).status;
	// 	this.loginData = JSON.parse(data['_body']).data;
		
	// 	this.storage.set('userData', this.loginData).then( () => {
 //      });

	// 	console.log(this.status);
	// 	if(this.status =="success"){

	// 		this.code= JSON.parse(data['_body']).code;

	// 	// this.navigateToSummary();
	// 		if(this.code === "dash"){
	// 				this.cookieservice.put("keepLoggedIn","yes");
	// 				this.events.publish('app:navroot', 'dashboard');
			       
	// 				}
	// 		else if( this.code === "join" ){
	// 			this.events.publish('app:navroot', 'join-organisation');
	// 			this.cookieservice.put("join","yes");
	// 		}
	// 		else{
	// 			this.events.publish('app:navroot', 'create-organisation');
	// 			this.cookieservice.put("create","yes");
	// 		}


	// 	}

	// 	else if(this.status =="failure"){
	// 		this.events.publish('app:navroot', 'login');
	// 		this.domainError = true;
	// 		this.cookieservice.put("domainError","yes");
	// 		// this.errorToast();

	// 	}
	// 	}, error => {
	// 	console.log(error.status);// Error getting the data
	// 	});

	// 	this.zone.run(() => {});
	// 	// console.log(this.status);

	// }


	// errorToast() {
 //      console.log('errorToast function');

	//     let toast = this.toastCtrl.create({
	//       message: 'Domain does not exist',
	//       showCloseButton: true,
	//       closeButtonText: "OK",
	//       position: 'bottom'
	//     });
	//     toast.present();
	//     this.zone.run(() => {});
	// }
      	     
   
}
