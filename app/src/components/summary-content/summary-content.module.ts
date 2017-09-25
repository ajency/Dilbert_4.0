import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryContentComponent } from './summary-content';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SummaryContentComponent,
  ],
  imports: [
    IonicPageModule.forChild(SummaryContentComponent),
    TranslateModule.forChild()
  ],
  exports: [
    SummaryContentComponent
  ]
})
export class SummaryContentComponentModule {}
