import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSummaryContentComponent } from './user-summary-content';

@NgModule({
  declarations: [
    UserSummaryContentComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserSummaryContentComponent),
  ],
  exports: [
    UserSummaryContentComponent
  ]
})
export class UserSummaryContentComponentModule {}
