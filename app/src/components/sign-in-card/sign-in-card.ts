import { Location } from '@angular/common';
import { Component, NgZone, Inject, Input } from '@angular/core';
import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { CookieService } from 'ngx-cookie';
import { UserDataProvider } from '../../providers/user-data/user-data';

import { Storage } from '@ionic/storage';
import { EnvVariables } from '../../config/env.token';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';
import { AuthguardProvider } from '../../providers/authguard/authguard';


/**
 * Generated class for the SignInCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'sign-in-card',
  templateUrl: 'sign-in-card.html'
})
export class SignInCardComponent {

	@Input('page') page : any;
  loginData : any;
  // showLoader : boolean;
	private login : any;
  token : any;
  status : any;
  code :any;
  domainError : boolean = false;
  logInProcess : boolean = false;
  disableBtn : boolean = false;
  loginResponse : any;
  error_msg : any;
  next_url : any;
  constructor(public navCtrl: NavController,
			   public navParams: NavParams, 
			   public http: Http,
			   public appglobals : AppGlobalsProvider,
			   public events: Events,
			   private appServiceProvider: AppServiceProvider,
			   private cookieservice: CookieService,
			   public toastCtrl : ToastController,
			   public zone : NgZone,
			   public storage : Storage,
			   public authguard : AuthguardProvider,
	           public userDataProvider : UserDataProvider,
		       private location : Location,
	          @Inject(EnvVariables) private environment) {

    console.log('Hello SignInCardComponent Component');

    // if(this.cookieservice.get("domainError")== 'yes'){
    //   this.domainError =true;    
    // }
    // this.cookieservice.remove("domainError");

	


   
  }

  ngOnInit(){
    console.log(this.page);
    	if(this.page == 'login'){
			this.login = true;

		}  
		else if(this.page == 'register'){
			this.page = false;
		}

				// let path = this.location.path(true)
    //     let pathparts = path.split('/');
    //     pathparts.map((val) => {
    //       if(val === 'login'){
    //         this.login = true;
    //       }
    //       else if(val === 'register'){
    //       	this.login = false;
    //       }
    //     });

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignInCardComponent")

 	 this.zone.run(() => {});
     // this.cookieservice.remove("domainError");
     

   
  }
  

  navigateTo(){
  	 if(this.login){
  	 	this.events.publish('app:navroot', 'register');
  	 }
  	 else{
  	 	this.events.publish('app:navroot', 'login');
  	 }
  }


  	signin(){
  		// this.showLoader = true;
 		this.logInProcess = true;
 		this.domainError = false;
 		

 		this.appServiceProvider.signIn().then( (token) =>{

		this.token = token;
 		this.disableBtn = true;
 		this.zone.run(() => {});

 		this.postRequest();


 		});



 	}


 	postRequest() {

		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		// let options = new RequestOptions({ headers: headers });

		let url = `${this.environment.dilbertApi}/login/google/${this.appglobals.lang}?token=${this.token}`;
		// let url = `${this.environment.dilbertApi}/login/google/fr?token=${this.token}`;
		
		console.log(url);
		// let postParams = {
		// token : this.token
		// }

		this.appServiceProvider.request(url,'get',{},{},false,'observable', '', {}, false ).subscribe(data =>{
			this.loginResponse = data;
			 console.log(this.loginResponse);
			this.status = this.loginResponse.status;
			this.next_url = this.loginResponse.next_url;
			this.authguard.userData = this.loginResponse.data;
			this.authguard.retrievedUserData = true;

			this.appglobals.lang = this.loginResponse.data.user_lang;
            this.appglobals.period_unit = this.loginResponse.data.default_period_unit;
            this.appglobals.org_name = this.loginResponse.data.org_name;
            this.events.publish("app:localize",this.loginResponse.data.user_lang);


			this.storage.set('userData', this.loginResponse.data).then( () => {
				console.log('User information stored');
		      });

		if(this.status == "200"){

			// this.code= JSON.parse(data['_body']).code;

		// this.navigateToSummary();
			if(this.next_url === "/dashboard"){
					this.cookieservice.put("keepLoggedIn","yes");
					this.events.publish('app:navroot', 'dashboard');
			       
					}
			else if( this.next_url === "/join_organisation" ){
				this.cookieservice.put("join","yes");
				this.events.publish('app:navroot', 'join-organisation');
			}
			else{
				this.cookieservice.put("create","yes");
				this.events.publish('app:navroot', 'create-organisation');
			}


		}

		else if(this.status =="400"){
			// this.events.publish('app:navroot', 'login');
			this.domainError = true;
			this.error_msg = this.loginResponse.message;
			console.log(this.error_msg);
	 		this.disableBtn = false;
 			this.zone.run(() => {});

			// this.cookieservice.put("domainError","yes");
			// this.errorToast();

		}

		}, error => {
		console.log(error.status);// Error getting the data
		});


		// this.http.get(url,options)
		// .subscribe(data => {
		// this.status = JSON.parse(data['_body']).status;
		// this.loginData = JSON.parse(data['_body']).data;
		
		// this.storage.set('userData', this.loginData).then( () => {
  //     });

		// console.log(this.status);
		// if(this.status =="success"){

		// 	// this.code= JSON.parse(data['_body']).code;

		// // this.navigateToSummary();
		// 	if(this.code === "dash"){
		// 			this.cookieservice.put("keepLoggedIn","yes");
		// 			this.events.publish('app:navroot', 'dashboard');
			       
		// 			}
		// 	else if( this.code === "join" ){
		// 		this.events.publish('app:navroot', 'join-organisation');
		// 		this.cookieservice.put("join","yes");
		// 	}
		// 	else{
		// 		this.events.publish('app:navroot', 'create-organisation');
		// 		this.cookieservice.put("create","yes");
		// 	}


		// }

		// else if(this.status =="failure"){
		// 	this.events.publish('app:navroot', 'login');
		// 	this.domainError = true;
		// 	this.cookieservice.put("domainError","yes");
		// 	// this.errorToast();

		// }
		// }, error => {
		// console.log(error.status);// Error getting the data
		// });

		// this.zone.run(() => {});
		// // console.log(this.status);

	}



}
