import { Component } from '@angular/core';

/**
 * Generated class for the SummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'summary-content',
  templateUrl: 'summary-content.html'
})
export class SummaryContentComponent {

  text: string;

  constructor() {
    console.log('Hello SummaryContentComponent Component');
    this.text = 'Hello World';
  }

}
