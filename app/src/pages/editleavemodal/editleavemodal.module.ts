import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditleavemodalPage } from './editleavemodal';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MyDatePickerModule } from 'mydatepicker';
import { TagInputModule } from 'ngx-chips';
import {RlTagInputModule} from 'angular2-tag-input';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EditleavemodalPage,
  ],
  imports: [
  	    CommonModule,
      TagInputModule, 
       RlTagInputModule,
        MyDatePickerModule,
    IonicPageModule.forChild(EditleavemodalPage),
  ],
  exports: [
    EditleavemodalPage
  ]
})
export class EditleavemodalPageModule {}
