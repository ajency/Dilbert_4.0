import { Component, NgZone } from '@angular/core';

/**
 * Generated class for the SummarySidebarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'summary-sidebar',
  templateUrl: 'summary-sidebar.html'
})
export class SummarySidebarComponent {

  text: string;

  constructor(public zone : NgZone) {
    this.zone.run(() => {});
  	
    console.log('Hello SummarySidebarComponent Component');
    this.text = 'Hello World';
  }

}
