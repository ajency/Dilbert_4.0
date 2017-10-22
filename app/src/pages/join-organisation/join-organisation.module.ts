import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinOrganisationPage } from './join-organisation';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';

@NgModule({
  declarations: [
    JoinOrganisationPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinOrganisationPage),
    LoggedInHeaderComponentModule
  ],
  exports: [
    JoinOrganisationPage
  ]
})
export class JoinOrganisationPageModule {}
