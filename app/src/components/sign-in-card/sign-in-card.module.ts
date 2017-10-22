import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInCardComponent } from './sign-in-card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignInCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(SignInCardComponent),
    TranslateModule.forChild(),
    
  ],
  exports: [
    SignInCardComponent
  ]
})
export class SignInCardComponentModule {}
