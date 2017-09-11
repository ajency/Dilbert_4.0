import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';

import { CookieService } from 'ngx-cookie';
import { AppServiceProvider } from '../../providers/app-service/app-service';


/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const apiURL = 'http://localhost:8000/api/periodData';

@Injectable()
export class UserDataProvider {

	headers : any;
	userData : any;

  constructor(public http: Http,
  			  public storage : Storage,
          public cookieservice : CookieService,
          public appServiceProvider : AppServiceProvider) {
    console.log('Hello UserDataProvider Provider');
    
    this.headers = new Headers();
	this.headers.append('Content-Type', 'application/json');
	this.headers.append('X-API-KEY', "wLFnEXuo9j52B5Ylf3JVAA1fAeDMfeVHUpJFTM569YhyyspVrqK4GLCAIeUn");
  // this.headers.append('X-API-KEY', this.appServiceProvider.x_api_key);

  }



  getUserData(userId, date): Observable<any> {
  	console.log('inside getUserData of provider');

    this.storage.get('userData').then((data) => {
  
        this.userData = data;
        console.log(this.userData);
        
    });

    let postParams = {
    user_id : userId,
    date_range : date
   
    };
    console.log(postParams);
    console.log(userId, date);


    return this.http.post(apiURL, postParams, { headers: this.headers })
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    return res.json();
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
