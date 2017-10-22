import { Component } from '@angular/core';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'footer-element',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  private version: string = "";

  constructor(public appglobals : AppGlobalsProvider ) {
    this.version = this.appglobals.getAppVersion();

  }

}
