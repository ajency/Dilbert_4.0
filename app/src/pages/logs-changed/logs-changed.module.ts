import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogsChangedPage } from './logs-changed';

import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogsChangedPage,
  ],
  imports: [
	LoggedInHeaderComponentModule,
    FooterComponentModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(LogsChangedPage),
  ],
  exports: [
    LogsChangedPage
  ]
})
export class LogsChangedPageModule {}
