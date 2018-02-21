import { Component } from '@angular/core';

/**
 * Generated class for the UserSummarySidebarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-summary-sidebar',
  templateUrl: 'user-summary-sidebar.html'
})
export class UserSummarySidebarComponent {

  text: string;

  constructor() {
    console.log('Hello UserSummarySidebarComponent Component');
    this.text = 'Hello user-summary-sidebar';
    function test(){
    	console.log("btn was clicked");
    }
  }

 mySearch() {
    // var input, filter, ul, li, a, i;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName("li");
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";

    //     }
    // }
    alert("hello");
    console.log("search works");
}





}
