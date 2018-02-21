import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSummarySidebarComponent } from './user-summary-sidebar';

@NgModule({
  declarations: [
    UserSummarySidebarComponent,
  ],
  imports: [
    IonicPageModule.forChild(UserSummarySidebarComponent),
  ],
  exports: [
    UserSummarySidebarComponent
  ]
})
export class UserSummarySidebarComponentModule {}
