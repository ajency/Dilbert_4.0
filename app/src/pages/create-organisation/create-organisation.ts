import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CookieService } from 'ngx-cookie';

/**
 * Generated class for the CreateOrganisationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'create-organisation',
  segment: 'createorganisation',
  priority: 'off'
})
@Component({
  selector: 'page-create-organisation',
  templateUrl: 'create-organisation.html',
})
export class CreateOrganisationPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cookieservice : CookieService) {
      this.cookieservice.remove("create");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateOrganisationPage');
  }

}
