import { Dates } from './../summary-sidebar/summary-sidbar.data';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';
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
  day: string;
  date: Dates;


  @Input()
  set currentDay(passedDate: Dates) {
    this.date = passedDate;
    console.log("current date",this.date);
    this.day= moment(this.date.date, "DD-MM-YYYY").format("dddd");
  }

  get currentDay(): Dates { return this.date; }

  constructor() { }
}
