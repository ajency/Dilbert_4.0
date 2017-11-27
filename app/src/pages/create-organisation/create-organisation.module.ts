import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrganisationPage } from './create-organisation';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';


@NgModule({
  declarations: [
    CreateOrganisationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrganisationPage),
    LoggedInHeaderComponentModule
  ],
  exports: [
    CreateOrganisationPage
  ]
})
export class CreateOrganisationPageModule {}
