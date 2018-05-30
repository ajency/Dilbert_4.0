import { UserSummarySidebarComponentModule } from '../../components/user-summary-sidebar/user-summary-sidebar.module';
import { UserSummaryContentComponentModule } from '../../components/user-summary-content/user-summary-content.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSummaryPage } from './new-summary';



import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    NewSummaryPage,
  ],
  imports: [
  
    UserSummarySidebarComponentModule,
    UserSummaryContentComponentModule,
    LoggedInHeaderComponentModule,
    FooterComponentModule,  
    IonicPageModule.forChild(NewSummaryPage)
  ],
  exports: [
    NewSummaryPage
  ]
})
export class NewSummaryPageModule {}
