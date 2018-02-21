import { Component } from '@angular/core';

/**
 * Generated class for the UserSummaryContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-content',
  templateUrl: 'user-summary-content.html'
})
export class UserSummaryContentComponent {

  text: string;

  constructor() {
    console.log('Hello UserSummaryContentComponent Component');
    this.text = 'The Summary';
  }

}
