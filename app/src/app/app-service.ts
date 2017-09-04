import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController, Events, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppService {
  jQuery: any;
  constructor(
    public http: Http,
    private toastctrl: ToastController,
    private events: Events,
    private loadingCtrl: LoadingController) {
    console.log('Hello AppService Provider');


  }

  public updateRootNav(page: string,setroot: boolean = false, params = {}): any{
    let data = {
      page: page
    }
    data['setroot'] = setroot
    data['params'] = params

    this.events.publish('app:navroot',data)
  }

  public showLoader(): any{
    let loaderInstance = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div #spinnerElement>
                <div>
                  <div>
                    <img src="./assets/img/loadingAngular.gif"/>
                  </div>
                </div>
              </div>`
    })

    loaderInstance.present();

    return loaderInstance;
  }

  public presentToast(message: string, type: string = 'success',duration: number = 3000,keepOpen: boolean = false): any{

      //this.toastctrl.dismiss();

    let toastClass = '';
    if(type === 'success'){
      toastClass = 'toast-success';
    }
    else if(type === 'warn'){
      toastClass = 'toast-warn';
    }
    else if(type === 'error'){
      toastClass = 'toast-fail'
    }

    let toastOptions:any = {
      message: message,
      cssClass: toastClass,
      position: 'bottom'
    }

    if(keepOpen){
      toastOptions.showCloseButton = true;
      toastOptions.closeButtonText = 'X';
      toastOptions.dismissOnPageChange = false;
    }else{
      toastOptions.duration = duration;
    }

    let toast = this.toastctrl.create(toastOptions);

    // let toast = this.toastctrl.create({
    //   message: message,
    //   duration: duration,
    //   cssClass: toastClass,
    //   position: 'bottom',
    //   showCloseButton: true,
    //   closeButtonText: 'X'
    // });

    toast.onDidDismiss(() => {
      console.log("toast dsimissed");
    });

    toast.present();
    console.log("toasst presented")

    return toast;
  }
}
