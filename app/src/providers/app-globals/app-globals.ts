import { Injectable, Inject } from '@angular/core';
import { EnvVariables } from '../../config/env.token';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppGlobalsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppGlobalsProvider {

  public requestDate: any;
  public naText: string = '--';

  private historyStack: Array<any> = [];
	lang : any ;
  period_unit: string = 'week';
  org_name : any;
  cos_offset : string = '0';
  view_log_history_btn : boolean = true;

  

  dashboard_params : any = {
    param1 : '',
    param2 : ''
  };

  summary_params : any = {
    param1 : ''
  }
  newsummary_params : any = {
    param1 : ''
  }
  private semVersion: any = {
    major: 2,
    minor: 2,
    patch: 6
  };
  appVersion : string = '' ;

private activeTabsList: any = {
    
    dashboard:{
      component: 'StartHomePage',
      deeplink: 'dashboard',
      placeholder: 'Dashboard',
      active: true
    },
    createorganisation:{
      component: 'CreateOrganisationPage',
      deeplink: 'create-organisation',
      placeholder: 'CreateOrganisation',
      active: true
    },
    joinorganisation:{
      component: 'JoinOrganisationPage',
      deeplink: 'join-organisation',
      placeholder: 'JoinOrganisation',
      active: false
    },
    summary:{
      component: 'OrganizationSummaryPage',
      deeplink: 'summary',
      placeholder: 'Summary',
      active: true
    },
     usersummary:{
      component: 'NewSummaryPage',
      deeplink: 'user-summary',
      placeholder: 'user-summary',
      active: true
    },
  };


  constructor( @Inject(EnvVariables) private environment) {
    console.log('Hello AppGlobalsProvider Provider');
    console.log(this.environment);

     for(let vpfix in this.semVersion){
      this.appVersion = this.appVersion + this.semVersion[vpfix] + '.';
      }

      this.appVersion = this.appVersion.substr(0, this.appVersion.length -1);
      console.log(this.appVersion);
  }

  getApiUrl(){
  	return this.environment.dilbertApi;
  }

  // public validateParams() : Promise<any>{

  //   return new Promise((resolve,reject) => {
  //     if(this.dashboard_params.param1 != '' && this.dashboard_params.param2 != ''){
  //       resolve(true)
  //     }

  //     else{
  //       reject{true}
  //     }
  //   })

  // }

   public updateCurrentHistory(page){
    if(this.historyStack.length){
      this.historyStack[this.historyStack.length - 1] = page;
    }
    else{
      this.historyStack.push(page);
    }
  }


  public pushToHistory(page){
    this.historyStack.push(page);
  }

    public getHistory(): Array<any>{
     let history = this.historyStack.map((page) => {
       return page;
     })

     return history;
  }

   public getAppVersion(){
    return this.appVersion;
  }


}
