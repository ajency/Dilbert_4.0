import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryContentComponent } from './summary-content';
import { TranslateModule } from '@ngx-translate/core';

// import { TitleCasePipe } from '../../pipes/title-case/title-case';

@NgModule({
  declarations: [
    SummaryContentComponent,
    // TitleCasePipe
  ],
  imports: [
    IonicPageModule.forChild(SummaryContentComponent),
    TranslateModule.forChild()
  ],
  exports: [
    SummaryContentComponent
  ],
  providers: [
    // TitleCasePipe
  ]
})
export class SummaryContentComponentModule {}
