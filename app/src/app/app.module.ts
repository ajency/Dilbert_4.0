// import { SummarySidebarService } from './../components/summary-sidebar/summary-sidebar.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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


// import { TranslateModule} from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpModule, Http } from '@angular/http';
// import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslatePipe} from 'ng2-translate';
// import { SummaryContentComponent } from '../components/summary-content/summary-content';
// import { TestComponent } from '../components/test/test';
// import { SummarySidebarComponent } from '../components/summary-sidebar/summary-sidebar';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [
    MyApp,
    TitleCasePipe,
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
    CookieModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      mode: 'md',
      preloadModules : false,
      locationStrategy: window.location.hostname == 'localhost' ? 'path' : 'path' 
    }),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TitleCasePipe,
    // SummarySidebarService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppServiceProvider,
    UserDataProvider,
    AuthguardProvider,
    AppGlobalsProvider,
    
  ]
})
export class AppModule { }
