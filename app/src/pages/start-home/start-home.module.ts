import { PopoverContentPage } from './../popover/popover';
import { SummaryContentComponent } from './../../components/summary-content/summary-content';
import { SummarySidebarComponent } from './../../components/summary-sidebar/summary-sidebar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartHomePage } from './start-home';

@NgModule({
  declarations: [
    StartHomePage,
    SummarySidebarComponent,
    SummaryContentComponent,
    PopoverContentPage,
  ],
  imports: [
    IonicPageModule.forChild(StartHomePage),
  ],
  exports: [
    StartHomePage
  ]
})
export class StartHomePageModule {}
