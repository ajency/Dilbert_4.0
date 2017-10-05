import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LogsChangedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'logs-changed',
  segment: 'logs-changed',
  priority: 'off'
})
@Component({
  selector: 'page-logs-changed',
  templateUrl: 'logs-changed.html',
})
export class LogsChangedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsChangedPage');
  }

}
