import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MySummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	// name: 'dashboard',
 //  segment: 'dashboard',
  // priority: 'off'
})
@Component({
  selector: 'page-my-summary',
  templateUrl: 'my-summary.html',
})
export class MySummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySummaryPage');
  }

}
