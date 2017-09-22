// import { PopoverContentPage } from './../popover/popover';
// import { SummaryContentComponent } from './../../components/summary-content/summary-content';
import { SummarySidebarComponentModule } from '../../components/summary-sidebar/summary-sidebar.module';
import { SummaryContentComponentModule } from '../../components/summary-content/summary-content.module';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartHomePage } from './start-home';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    StartHomePage,
    // SummarySidebarComponent,
    // SummaryContentComponent,
    // PopoverContentPage,
  ],
  imports: [
    SummarySidebarComponentModule,
    SummaryContentComponentModule,
    LoggedInHeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(StartHomePage)
    
  ],
  exports: [
    StartHomePage
  ]
})
export class StartHomePageModule {}
