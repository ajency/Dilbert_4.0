import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSummarySidebarComponent } from './user-summary-sidebar';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    UserSummarySidebarComponent,
  ],
  imports: [
   MyDatePickerModule,
    IonicPageModule.forChild(UserSummarySidebarComponent),
  ],
  exports: [
    UserSummarySidebarComponent
  ]
})
export class UserSummarySidebarComponentModule {}
