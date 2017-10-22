import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySummaryPage } from './my-summary';

@NgModule({
  declarations: [
    MySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(MySummaryPage),
  ],
  exports: [
    MySummaryPage
  ]
})
export class MySummaryPageModule {}
