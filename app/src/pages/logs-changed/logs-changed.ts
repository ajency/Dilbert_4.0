import { Component } from '@angular/core';
import { IonicPage, Events,  NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AuthguardProvider } from '../../providers/authguard/authguard';
/**
 * Generated class for the LogsChangedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logs-changed',
  templateUrl: 'logs-changed.html',
})
export class LogsChangedPage {

  changed_logs

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.changed_logs = this.navParams.get('data1');
      console.log(this.changed_logs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogsChangedPage');
  }

}
