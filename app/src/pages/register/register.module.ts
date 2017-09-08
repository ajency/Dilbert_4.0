import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    LoggedInHeaderComponentModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
