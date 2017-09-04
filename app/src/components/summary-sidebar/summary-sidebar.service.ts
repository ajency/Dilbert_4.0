import { SideBarData } from './summary-sidbar.data';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SummarySidebarService {
    //private sidebarDataURL = "bin/70044450-5e85-4f25-b16c-dd71603ca203?foo=bar&foo=baz";

    constructor(private http: Http) { }

    getSideBarData(currentDate: String): Promise<any> {
        return this.http.get('assets/data/side_menu_data.json')
            .toPromise()
            .then((response) => {
                 return response.json() as SideBarData
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}  