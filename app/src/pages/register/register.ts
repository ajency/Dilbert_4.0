import { Component} from '@angular/core';
import { IonicPage } from 'ionic-angular';
// import { Http, Headers, RequestOptions } from '@angular/http';
// import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';

// import { Storage } from '@ionic/storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'register',
  segment: 'register',
  priority: 'off'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

 //  showLoader : boolean = false;
 //  token : any;
 //  status : any;
 //  code :any;
  constructor(public cookieservice : CookieService ) {
  }

 //  ionViewDidLoad() {
 //    console.log('ionViewDidLoad RegisterPage');
 //    this.storage.ready().then(() => {
 //      console.log("ionic storage is avilable");
 //      });
 //  }

  ionViewCanEnter(){
    if(this.cookieservice.get("keepLoggedIn") !== 'yes'){
      return true;
      
    }
    else{
    	return false;
    }
  }

 //  navigateToLogin(){
 //  	 this.events.publish('app:navroot', 'login');
 //    console.log('Navigating to another module');
 //  }

 //  signin(){
  		
 //  		this.showLoader =true;
 // 		this.appServiceProvider.signIn().then( (token) =>{

	// 	this.token = token;
 // 		console.log(this.token);
 // 		this.postRequest();
 // 		});
 		
 // 		this.zone.run(() => {});


 // 	}


 // 	postRequest() {
	// 	var headers = new Headers();
	// 	headers.append("Accept", 'application/json');
	// 	headers.append('Content-Type', 'application/json' );
	// 	// headers.append('Access-Control-Allow-Origin: *');
	// 	let options = new RequestOptions({ headers: headers });

	// 	// let token = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
	// 	let url = 'http://localhost:8000/api/login';
	// 	// url += `/login?token=${token}`;
	// 	let postParams = {
	// 	token : this.token
	// 	}

	// 	console.log(url);
	// 	this.http.post(url,postParams,options)
	// 	.subscribe(data => {
	// 	// console.log(JSON.parse(data['_body']));
	// 	this.status = JSON.parse(data['_body']).status;


	// 	console.log(JSON.parse(data['_body']));

		
	// 	this.storage.set('userData', JSON.parse(data['_body']).data).then( () => {
 //        console.log("storage set function");
 //      });

	// 	if(this.status =="success"){

	// 		this.code= JSON.parse(data['_body']).code;
	// 		console.log(this.code);

	// 	// this.navigateToSummary();
	// 		if(this.code === "dash"){
	// 				this.cookieservice.put("keepLoggedIn","yes");
	// 				this.events.publish('app:navroot', 'dashboard');
	// 				}
	// 		else if( this.code === "join" ){
	// 			this.events.publish('app:navroot', 'join-organisation');
	// 		}
	// 		else{
	// 			this.events.publish('app:navroot', 'create-organisation');

	// 		}


	// 	}

	// 	else if(this.status =="failure"){
	// 		console.log(' failure popup ');
	// 		this.events.publish('app:navroot', 'register');

			
	// 		this.errorToast();

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
