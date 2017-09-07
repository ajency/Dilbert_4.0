import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

import { CookieService } from 'ngx-cookie';
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 declare const gapi : any;


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private viewCtrl: ViewController,
			  public cookieservice : CookieService,
			  public events : Events) {
  	this.handleClientLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  handleClientLoad() {

      // let that = this;
        gapi.load('client:auth2', function () {
        gapi.client.init({
           client_id: '676621258132-6q9s2j1hc8343jj3nn75k0is4s1nb893.apps.googleusercontent.com',
              // client_id: '164623832984-ivug8glc6tgtu0sgjbm51oigp27u0033.apps.googleusercontent.com',

        cookiepolicy: 'single_host_origin',
        scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(function () {



          console.log(gapi.auth2.getAuthInstance().isSignedIn.get());

        });
        });

        // this.user =  gapi.auth2.getAuthInstance().currentUser.get().w3.ig;
        // console.log(this.user);

      }


  signOut(){
  	this.viewCtrl.dismiss();
  	 gapi.auth2.getAuthInstance().signOut().then( ()=> {
  	 	this.events.publish('app:navroot', 'login');   
  	 	console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
  	 	this.cookieservice.remove("keepLoggedIn");
  	 	
  	 });

  	 

  }



}
