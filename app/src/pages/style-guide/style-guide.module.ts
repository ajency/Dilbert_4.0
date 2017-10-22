import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StyleGuidePage } from './style-guide';

@NgModule({
  declarations: [
    StyleGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(StyleGuidePage),
  ],
  exports: [
    StyleGuidePage
  ]
})
export class StyleGuidePageModule {}
