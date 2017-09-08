import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { Storage } from '@ionic/storage';



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
  			  public storage : Storage) {
    console.log('Hello UserDataProvider Provider');
    this.storage.get('userData').then((data) => {
  
        this.userData = data;
        console.log(this.userData);
        
    });
    this.headers = new Headers();
	this.headers.append('Content-Type', 'application/json');
	this.headers.append('X-API-KEY', "wLFnEXuo9j52B5Ylf3JVAA1fAeDMfeVHUpJFTM569YhyyspVrqK4GLCAIeUn");
  }



  getUserData(): Observable<any> {
  	console.log('inside getUserData of provider');

    let postParams = {
    user_id : 69,
    date_range : {
      start : '2017-09-06',
    
    }
    
    };

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
