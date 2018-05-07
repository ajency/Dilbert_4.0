import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveAddedPage } from './leave-added';

@NgModule({
  declarations: [
    LeaveAddedPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveAddedPage),
  ],
  exports: [
    LeaveAddedPage
  ]
})
export class LeaveAddedPageModule {}
