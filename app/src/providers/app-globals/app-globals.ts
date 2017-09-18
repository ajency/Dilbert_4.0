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

  constructor( @Inject(EnvVariables) private environment) {
    console.log('Hello AppGlobalsProvider Provider');
  }

  getApiUrl(){
  	return this.environment.dilbertApi;
  }

}
