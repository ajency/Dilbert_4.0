import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInCardComponent } from './sign-in-card';

@NgModule({
  declarations: [
    SignInCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(SignInCardComponent),
  ],
  exports: [
    SignInCardComponent
  ]
})
export class SignInCardComponentModule {}
