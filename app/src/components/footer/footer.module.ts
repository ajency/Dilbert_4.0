import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterComponent } from './footer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    IonicPageModule.forChild(FooterComponent),
    TranslateModule.forChild()
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterComponentModule {}
