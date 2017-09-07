import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedInHeaderComponent } from './logged-in-header';

@NgModule({
  declarations: [
    LoggedInHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoggedInHeaderComponent),
  ],
  exports: [
    LoggedInHeaderComponent
  ]
})
export class LoggedInHeaderComponentModule {}
