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


  private historyStack: Array<any> = [];
	lang : any;
  period_unit: string = 'week';
  cos_offset : string = '10';

  private semVersion: any = {
    major: 1,
    minor: 1,
    patch: 1
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
    }
  };


  constructor( @Inject(EnvVariables) private environment) {
    console.log('Hello AppGlobalsProvider Provider');
    console.log(this.environment);

     for(let vpfix in this.semVersion){
      this.appVersion = this.appVersion + this.semVersion[vpfix] + '.';
      }

      this.appVersion = this.appVersion.substr(0, this.appVersion.length -1);
  }

  getApiUrl(){
  	return this.environment.dilbertApi;
  }

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
