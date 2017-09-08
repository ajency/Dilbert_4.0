import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationPage } from './organization';
import { LoggedInHeaderComponentModule } from '../../components/logged-in-header/logged-in-header.module';

@NgModule({
  declarations: [
    OrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationPage),
    LoggedInHeaderComponentModule
  ],
  exports: [
    OrganizationPage
  ]
})
export class OrganizationPageModule {}
