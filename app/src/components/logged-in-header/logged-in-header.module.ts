import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedInHeaderComponent } from './logged-in-header';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoggedInHeaderComponent,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(LoggedInHeaderComponent),
  ],
  exports: [
    LoggedInHeaderComponent
  ]
})
export class LoggedInHeaderComponentModule {}
