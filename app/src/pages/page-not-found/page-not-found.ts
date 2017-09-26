import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PageNotFoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'not-found',
  segment: 'not-found',
  priority: 'off'
})
@Component({
  selector: 'page-page-not-found',
  templateUrl: 'page-not-found.html',
})
export class PageNotFoundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageNotFoundPage');
  }

}
