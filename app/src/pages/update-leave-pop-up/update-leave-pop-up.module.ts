import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateLeavePopUpPage } from './update-leave-pop-up';

@NgModule({
  declarations: [
    UpdateLeavePopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateLeavePopUpPage),
  ],
  exports: [
    UpdateLeavePopUpPage
  ]
})
export class UpdateLeavePopUpPageModule {}
