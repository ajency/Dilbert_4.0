import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummarySidebarComponent } from './summary-sidebar';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    SummarySidebarComponent
  ],
  imports: [
    MyDatePickerModule,
    IonicPageModule.forChild(SummarySidebarComponent)
  ],
  exports: [
    SummarySidebarComponent
  ]
})
export class SummarySidebarComponentModule {}
