import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummarySidebarComponent } from './summary-sidebar';
import { MyDatePickerModule } from 'mydatepicker';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SummarySidebarComponent
  ],
  imports: [
    MyDatePickerModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(SummarySidebarComponent)
  ],
  exports: [
    SummarySidebarComponent
  ]
})
export class SummarySidebarComponentModule {}
