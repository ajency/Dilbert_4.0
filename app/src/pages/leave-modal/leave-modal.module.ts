import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveModalPage } from './leave-modal';
import { MyDatePickerModule } from 'mydatepicker';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@NgModule({
  declarations: [
    LeaveModalPage,
  ],
  imports: [
      CommonModule,
      TagInputModule, 
      // NoopAnimationsModule,
      MyDatePickerModule,
    IonicPageModule.forChild(LeaveModalPage),
  ],
  exports: [
    LeaveModalPage

  ]
})
export class LeaveModalPageModule {}
