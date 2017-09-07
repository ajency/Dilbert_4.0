import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummarySidebarComponent } from './summary-sidebar';

@NgModule({
  declarations: [
    SummarySidebarComponent
  ],
  imports: [
    IonicPageModule.forChild(SummarySidebarComponent)
  ],
  exports: [
    SummarySidebarComponent
  ]
})
export class SummarySidebarComponentModule {}
