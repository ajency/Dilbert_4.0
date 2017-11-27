import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
// import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

import { SignInCardComponentModule } from '../../components/sign-in-card/sign-in-card.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild(),
    LoggedInHeaderComponentModule,
    SignInCardComponentModule,
    FooterComponentModule
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
