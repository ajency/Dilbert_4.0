webpackJsonp([12],{270:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e(0),o=e(451),i=e(10),u=e(27),a=e(111),r=e(166),s=e(167),_=e(168),c=e(169),p=e(170),h=e(171),d=e(172),g=e(173),m=e(452),f=e(419),v=e(30);e.d(t,"PopoverPageModuleNgFactory",function(){return y});var b=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])};return function(t,e){function l(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(l.prototype=e.prototype,new l)}}(),w=function(n){function t(t){return n.call(this,t,[r.a,s.a,_.a,c.a,p.a,h.a,d.a,g.a,m.a],[])||this}return b(t,n),Object.defineProperty(t.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.a(this.parent.get(l.c))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new u.a),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new u.b),this.__FormBuilder_9},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new i.d,this._ɵba_1=new u.c,this._FormsModule_2=new u.d,this._ReactiveFormsModule_3=new u.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._PopoverPageModule_6=new o.a,this._LAZY_LOADED_TOKEN_10=f.a,this._PopoverPageModule_6},t.prototype.getInternal=function(n,t){return n===i.d?this._CommonModule_0:n===u.c?this._ɵba_1:n===u.d?this._FormsModule_2:n===u.e?this._ReactiveFormsModule_3:n===a.b?this._IonicModule_4:n===a.c?this._IonicPageModule_5:n===o.a?this._PopoverPageModule_6:n===i.e?this._NgLocalization_7:n===u.a?this._ɵi_8:n===u.b?this._FormBuilder_9:n===v.d?this._LAZY_LOADED_TOKEN_10:t},t.prototype.destroyInternal=function(){},t}(l.x),y=new l.y(w,o.a)},419:function(n,t,e){"use strict";e(0),e(72),e(29);e.d(t,"a",function(){return l});var l=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,t,e,l,o){this.navCtrl=n,this.navParams=t,this.viewCtrl=e,this.cookieservice=l,this.events=o,this.handleClientLoad()}return n.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad PopoverPage")},n.prototype.close=function(){this.viewCtrl.dismiss()},n.prototype.navigateToChangedLogs=function(){this.events.publish("app:navroot","logs-changed"),this.viewCtrl.dismiss()},n.prototype.handleClientLoad=function(){gapi.load("client:auth2",function(){gapi.client.init({client_id:"460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com",cookiepolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets"}).then(function(){console.log(gapi.auth2.getAuthInstance().isSignedIn.get())})})},n.prototype.signOut=function(){var n=this;this.viewCtrl.dismiss(),gapi.auth2.getAuthInstance().signOut().then(function(){n.events.publish("app:navroot","login"),console.log(gapi.auth2.getAuthInstance().isSignedIn.get()),n.cookieservice.remove("keepLoggedIn")})},n.prototype.viewSummary=function(){this.viewCtrl.dismiss(),this.events.publish("app:navroot","summary"),console.log("navigating to summary page")},n.prototype.viewDashboard=function(){this.viewCtrl.dismiss(),this.events.publish("app:navroot","dashboard"),console.log("navigating to dashboard page")},n}())},451:function(n,t,e){"use strict";e(0),e(72),e(419);e.d(t,"a",function(){return l});var l=(this&&this.__decorate,function(){function n(){}return n}())},452:function(n,t,e){"use strict";function l(n){return i._17(0,[(n()(),i._18(null,["\n"])),(n()(),i._18(null,["\n\n"])),(n()(),i._19(0,null,null,34,"ion-list",[["class","profile-dropdown"],["m-v-0",""]],null,null,null,null,null)),i._20(16384,null,0,u.a,[a.c,i.H,i.I,r.b,s.a,_.a],null,null),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.viewDashboard()&&l}return l},p.a,p.b)),i._20(1097728,null,3,h.a,[d.a,a.c,i.H,i.I,[2,g.a]],null,null),i._21(335544320,1,{contentLabel:0}),i._21(603979776,2,{_buttons:1}),i._21(603979776,3,{_icons:1}),i._20(16384,null,0,m.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[3,4]],0,f.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" Dashboard"])),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.viewSummary()&&l}return l},p.a,p.b)),i._20(1097728,null,3,h.a,[d.a,a.c,i.H,i.I,[2,g.a]],null,null),i._21(335544320,4,{contentLabel:0}),i._21(603979776,5,{_buttons:1}),i._21(603979776,6,{_icons:1}),i._20(16384,null,0,m.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","star"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[6,4]],0,f.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" View Summary"])),(n()(),i._18(null,["\n\t"])),(n()(),i._18(null,["\n\t"])),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.signOut()&&l}return l},p.a,p.b)),i._20(1097728,null,3,h.a,[d.a,a.c,i.H,i.I,[2,g.a]],null,null),i._21(335544320,7,{contentLabel:0}),i._21(603979776,8,{_buttons:1}),i._21(603979776,9,{_icons:1}),i._20(16384,null,0,m.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","md-power"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[9,4]],0,f.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" Logout"])),(n()(),i._18(null,["\n"]))],function(n,t){n(t,12,0,"md-person");n(t,22,0,"star");n(t,34,0,"md-power")},function(n,t){n(t,11,0,i._22(t,12)._hidden),n(t,21,0,i._22(t,22)._hidden),n(t,33,0,i._22(t,34)._hidden)})}function o(n){return i._17(0,[(n()(),i._19(0,null,null,1,"page-popover",[],null,null,null,l,P)),i._20(49152,null,0,c.a,[v.a,b.a,w.a,y.a,I.a],null,null)],null,null)}var i=e(0),u=e(83),a=e(1),r=e(5),s=e(6),_=e(11),c=e(419),p=e(174),h=e(23),d=e(17),g=e(37),m=e(77),f=e(36),v=e(22),b=e(9),w=e(3),y=e(28),I=e(45);e.d(t,"a",function(){return k});var L=[],P=i._16({encapsulation:2,styles:L,data:{}}),k=i._23("page-popover",c.a,o,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/12.main.js.map