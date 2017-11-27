import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedInHeaderComponent } from './logged-in-header';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoggedInHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoggedInHeaderComponent),
    TranslateModule.forChild(),

  ],
  exports: [
    LoggedInHeaderComponent
  ]
})
export class LoggedInHeaderComponentModule {}
