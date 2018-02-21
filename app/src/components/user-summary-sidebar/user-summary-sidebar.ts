import { Component } from '@angular/core';
import * as $ from 'jquery';
import {IMyDpOptions} from 'mydatepicker';
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
    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        inline:false,
        // height:'5px;',
        // width:'10px',
        // showInputField : false,
        showClearDateBtn:false,
        disableUntil: {year: 2017, month: 1, day: 1},
        disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:  new Date().getDate()+1 } 
        // disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day:new Date().getDate }
    };

  constructor() {
    console.log('Hello UserSummarySidebarComponent Component');
    this.text = 'Hello user-summary-sidebar';

    $(document).ready(function(){
    let addclass = 'selecteddataitem';
    let $cols = $('.btnclicked').click(function(e) {
    console.log("check");
    $cols.removeClass(addclass);
    $(this).addClass(addclass);
    });


    $('#showMore').click(function(){
        let hidden1 = 'hidden';
        console.log("showMore");
        if($('.dbt').hasClass(hidden1)){
             $('.dbt').removeClass(hidden1);
        }
       else{
         $('.dbt').addClass(hidden1);
       }
       
    });

 // $('#datalist .btnclicked1:lt(4)').removeClass('hidden');
 //    // $('#showLess').hide();
 //    var items =  20;
 //    var shown =  4;
 //    $('#showMore').click(function () {
 //        console.log("show more");
 //        // $('#showLess').show();
 //        shown = 4+5;
 //        console.log(shown);
 //        if(shown< items) {$('#datalist .btnclicked:lt('+shown+')').removeClass('hidden');}
 //        else {$('#datalist .btnclicked:lt('+items+')').show();
 //             $('#showMore').hide();
 //             }
 //    });



   });

  }


   searchByName(){
           var input, filter, ul, li, a, i;
        input = document.getElementById("searchemployee");
        filter = input.value.toUpperCase();
        ul = document.getElementById("datalist");
        li = ul.getElementsByTagName("ion-item");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("h2")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";

            }
         }
    }

    // showmore(){
    //     document.getElementsByClassName("dataitem").style.display = "block";
    // }

// onDateChanged(event: IMyDateModel) {
//   console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
// }

  requestData1(ev){

    console.log("inside requestData function", ev);
}



}
