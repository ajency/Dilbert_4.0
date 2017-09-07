import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';

/**
 * Generated class for the JoinOrganisationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	 name: 'join-organisation',
  segment: 'joinorganisation',
  priority: 'off'
})
@Component({
  selector: 'page-join-organisation',
  templateUrl: 'join-organisation.html',
})
export class JoinOrganisationPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cookieservice : CookieService) {
      this.cookieservice.remove("join");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinOrganisationPage');
  }

}
