import { SideBarData, WeekData } from './summary-sidbar.data';
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';


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
  data: SideBarData;
  weekData: WeekData;
  currentTotal: number;

  @Input()
  set sideBarData(passedData: SideBarData) {
    this.data = passedData;
    this.data.week.forEach((week) => {
      if (week.is_current) {
        this.weekData = week;
      }
    });

    this.data.dates.forEach((date) => {
      if (date.week_no == this.weekData.week_no) {
        var currenttime = moment(date.hours_completed, "hh:mm:ss")
      }

    });
  }

  get sideBarData(): SideBarData { return this.data; }

  constructor(public navCtrl: NavController) {
  }

  openSummary() {
    var navOption = {
      animation: "ios-transition"
    }
    this.navCtrl.push('MySummaryPage', {}, navOption);
  }

  getDayDate(date: string, option: number): string {
    var text: string;
    switch (option) {
      case 1:
        text = moment(date, "DD-MM-YYYY").format("ddd");
        break;
      case 2:
        text = moment(date, "DD-MM-YYYY").format("MMM D");
        break;
      case 3:
        text = moment(date, "kk:mm:ss").format("hh:mm a");
        break;
      case 4:
        if (date.length > 0) {
          text = moment(date, "kk:mm:ss").format("hh:mm a");
        } else {
          text = 'Online'
        }
        break;
      case 5:
        text = moment(date, "kk:mm:ss").format("hh:mm");
        break;
    }
    return text;
  }
  getStyle(style: string): string {
    var styleText: string;
    switch (style) {
      case "online":
        styleText = "success";
        break;
      case "none":
        styleText = "success";
        break;
      default:
        styleText = "";
        break;
    }
    return styleText;
  }
}
