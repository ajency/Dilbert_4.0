import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { Storage } from '@ionic/storage';
import { AppGlobalsProvider } from '../../providers/app-globals/app-globals';

/*
  Generated class for the AuthguardProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthguardProvider {
  public retrievedUserData: boolean = false;
  public userData : any;

  user_id : any;

  constructor(
    private cookieservice: CookieService,
    private storage: Storage,
    private location: Location,
    public appGlobalsProvider : AppGlobalsProvider
    ) {
    console.log('Hello AuthGuard Provider');
  }

  public verifyToken(page): Promise<any>{

    return new Promise((resolve,reject) => {
      if(this.retrievedUserData === false){
        console.log('initial auth...')
        let keepLoggedIn = this.cookieservice.get("keepLoggedIn");

        // add authentication logic here
        if(keepLoggedIn === 'yes'){
          
          this.storage.get("userData")
          .then((result) => {
            // console.log('result',result);
            this.retrievedUserData = true;
            this.userData = result;
            this.appGlobalsProvider.lang = this.userData.user_lang;
            this.appGlobalsProvider.period_unit = this.userData.default_period_unit;
            this.appGlobalsProvider.org_name = this.userData.org_name;
            // console.log(result);
            this.user_id = this.userData.user_id;

            // add token validation here
            if(result && result.x_api_key){

              resolve(true);
            }
            else{
              reject(false);

            }

          })
          .catch(() => {
            // this.retrievedUserData = false;
            console.log("WARNING: application storage error!")
            reject(false);
          });
        }
        else{
          // this.router.navigate(['/login']);
          reject(false);
        }
      }
      else{
        if(this.userData.x_api_key){
          this.user_id = this.userData.user_id;
          resolve(true);
        }
        else{
          reject(false);
        }
      }
    })
  }

}
