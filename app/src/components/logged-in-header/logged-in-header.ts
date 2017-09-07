import { Component } from '@angular/core';
import {  PopoverController } from 'ionic-angular';

/**
 * Generated class for the LoggedInHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'logged-in-header',
  templateUrl: 'logged-in-header.html'
})
export class LoggedInHeaderComponent {

  text: string;

  constructor(public popoverCtrl: PopoverController) {
    console.log('Hello LoggedInHeaderComponent Component');
    this.text = 'Hello World';
  }

  openPopover(ev) {
    let popover = this.popoverCtrl.create('PopoverPage', {
    });
    popover.present({
      ev: ev
    });
  }


}
