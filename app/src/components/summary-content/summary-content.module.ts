import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryContentComponent } from './summary-content';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    SummaryContentComponent,
  ],
  imports: [
    TooltipsModule,
    IonicPageModule.forChild(SummaryContentComponent),
    TranslateModule.forChild()
  ],
  exports: [
    SummaryContentComponent
  ]
})
export class SummaryContentComponentModule {}
