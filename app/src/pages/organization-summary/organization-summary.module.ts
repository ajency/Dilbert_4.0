import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationSummaryPage } from './organization-summary';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrganizationSummaryPage,
  ],
  imports: [
    LoggedInHeaderComponentModule,
    FooterComponentModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(OrganizationSummaryPage),
  ],
  exports: [
    OrganizationSummaryPage
  ]
})
export class OrganizationSummaryPageModule {}
