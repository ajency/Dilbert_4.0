// import { SummarySidebarService } from './../components/summary-sidebar/summary-sidebar.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AppServiceProvider } from '../providers/app-service/app-service';


import { CookieModule } from 'ngx-cookie';
import { UserDataProvider } from '../providers/user-data/user-data';
import { IonicStorageModule } from '@ionic/storage';
// import { TestComponent } from '../components/test/test';
// import { SummarySidebarComponent } from '../components/summary-sidebar/summary-sidebar';

@NgModule({
  declarations: [
    MyApp,
    // LoggedInHeaderComponent,
    // TestComponent,
    // SummarySidebarComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      mode: 'md',
      preloadModules : false,
      locationStrategy: window.location.hostname == 'localhost' ? 'hash' : 'path' 
    }),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // SummarySidebarService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppServiceProvider,
    UserDataProvider
  ]
})
export class AppModule { }
