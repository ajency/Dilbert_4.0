import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
// import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { SignInCardComponentModule } from '../../components/sign-in-card/sign-in-card.module';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    LoggedInHeaderComponentModule,
    SignInCardComponentModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
