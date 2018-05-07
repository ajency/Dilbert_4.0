import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelLeavePage } from './cancel-leave';

@NgModule({
  declarations: [
    CancelLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(CancelLeavePage),
  ],
  exports: [
    CancelLeavePage
  ]
})
export class CancelLeavePageModule {}
