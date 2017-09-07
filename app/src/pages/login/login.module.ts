import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LoggedInHeaderComponentModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
