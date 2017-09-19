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
	
  constructor( @Inject(EnvVariables) private environment) {
    console.log('Hello AppGlobalsProvider Provider');
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


}
