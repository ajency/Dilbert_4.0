import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryContentComponent } from './summary-content';

@NgModule({
  declarations: [
    SummaryContentComponent,
  ],
  imports: [
    IonicPageModule.forChild(SummaryContentComponent),
  ],
  exports: [
    SummaryContentComponent
  ]
})
export class SummaryContentComponentModule {}
