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

}
