import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditleavemodalPage } from './editleavemodal';
import { MyDatePickerModule } from 'mydatepicker';
import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@NgModule({
  declarations: [
    EditleavemodalPage,
  ],
  imports: [
    CommonModule,
    TagInputModule, 
    MyDatePickerModule,
    IonicPageModule.forChild(EditleavemodalPage),
  ],
  exports: [
    EditleavemodalPage
  ]
})
export class EditleavemodalPageModule {}
