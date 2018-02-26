// import { SummarySidebarService } from './../components/summary-sidebar/summary-sidebar.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
// import { HttpModule, Http, BrowserXhr } from '@angular/http';
import { HttpModule, Http } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AppServiceProvider } from '../providers/app-service/app-service';


import { CookieModule } from 'ngx-cookie';
import { UserDataProvider } from '../providers/user-data/user-data';
import { IonicStorageModule } from '@ionic/storage';
import { AuthguardProvider } from '../providers/authguard/authguard';

import { EnvironmentsModule } from '../config/env.module';
import { TitleCasePipe } from '../pipes/title-case/title-case';
import { AppGlobalsProvider } from '../providers/app-globals/app-globals';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SummarydataProvider } from '../providers/summarydata/summarydata';
// import { UserSummarySidebarComponent } from '../components/user-summary-sidebar/user-summary-sidebar';
// import { UserSummaryContentComponent } from '../components/user-summary-content/user-summary-content';
// import { TimePickerComponent } from '../components/time-picker/time-picker';
// import { NgProgressModule, NgProgressCustomBrowserXhr } from 'ng2-progressbar';
import { NgProgressModule } from 'ng2-progressbar';
import { KeysPipe } from '../pipes/keys/keys';

// import { TranslateModule} from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpModule, Http } from '@angular/http';
// import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslatePipe} from 'ng2-translate';
// import { SummaryContentComponent } from '../components/summary-content/summary-content';
// import { TestComponent } from '../components/test/test';
// import { SummarySidebarComponent } from '../components/summary-sidebar/summary-sidebar';
// import { PipesModule } from '../pipes/pipes.module';


export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [
    MyApp,
    TitleCasePipe,
    KeysPipe,
    // TimePickerComponent,
    // FooterComponent,
    // SignInCardComponent,
    // SummaryContentComponent,
    // LoggedInHeaderComponent,
    // TestComponent,
    // SummarySidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EnvironmentsModule,
    HttpModule,
    // PipesModule,
    CookieModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    NgProgressModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      mode: 'md',
      preloadModules : false,
      locationStrategy: window.location.hostname == 'localhost' ? 'hash' : 'path' 
      // locationStrategy : 'path'
    }),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    // {provide: BrowserXhr, useClass: NgProgressCustomBrowserXhr},
    StatusBar,
    SplashScreen,
    TitleCasePipe,
    KeysPipe,
    // SummarySidebarService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppServiceProvider,
    UserDataProvider,
    AuthguardProvider,
    AppGlobalsProvider,
    SummarydataProvider,
    
  ]
})
export class AppModule { }
