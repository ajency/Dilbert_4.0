import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditModalPage } from './edit-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditModalPage),
    TranslateModule.forChild()
  ],
  exports: [
    EditModalPage
  ]
})
export class EditModalPageModule {}
