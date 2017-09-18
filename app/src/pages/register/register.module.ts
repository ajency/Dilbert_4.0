import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { SignInCardComponentModule } from '../../components/sign-in-card/sign-in-card.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    LoggedInHeaderComponentModule,
    SignInCardComponentModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
