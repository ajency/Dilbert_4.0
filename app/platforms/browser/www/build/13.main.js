webpackJsonp([13],{418:function(n,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=l(0),o=l(503),i=l(10),a=l(21),u=l(123),r=l(302),s=l(303),_=l(304),c=l(305),p=l(306),h=l(307),m=l(308),d=l(309),g=l(504),f=l(454),b=l(32);l.d(t,"PopoverPageModuleNgFactory",function(){return y});var v=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var l in t)t.hasOwnProperty(l)&&(n[l]=t[l])};return function(t,l){function e(){this.constructor=t}n(t,l),t.prototype=null===l?Object.create(l):(e.prototype=l.prototype,new e)}}(),w=function(n){function t(t){return n.call(this,t,[r.a,s.a,_.a,c.a,p.a,h.a,m.a,d.a,g.a],[])||this}return v(t,n),Object.defineProperty(t.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.a(this.parent.get(e.c))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new a.a),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new a.b),this.__FormBuilder_9},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new i.d,this._ɵba_1=new a.c,this._FormsModule_2=new a.d,this._ReactiveFormsModule_3=new a.e,this._IonicModule_4=new u.b,this._IonicPageModule_5=new u.c,this._PopoverPageModule_6=new o.a,this._LAZY_LOADED_TOKEN_10=f.a,this._PopoverPageModule_6},t.prototype.getInternal=function(n,t){return n===i.d?this._CommonModule_0:n===a.c?this._ɵba_1:n===a.d?this._FormsModule_2:n===a.e?this._ReactiveFormsModule_3:n===u.b?this._IonicModule_4:n===u.c?this._IonicPageModule_5:n===o.a?this._PopoverPageModule_6:n===i.e?this._NgLocalization_7:n===a.a?this._ɵi_8:n===a.b?this._FormBuilder_9:n===b.d?this._LAZY_LOADED_TOKEN_10:t},t.prototype.destroyInternal=function(){},t}(e.x),y=new e.y(w,o.a)},454:function(n,t,l){"use strict";l(0),l(79),l(31),l(118),l(38);l.d(t,"a",function(){return e});var e=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,t,l,e,o,i,a){this.navCtrl=n,this.navParams=t,this.viewCtrl=l,this.cookieservice=e,this.authguard=o,this.appglobals=i,this.events=a,this.handleClientLoad()}return n.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad PopoverPage")},n.prototype.close=function(){this.viewCtrl.dismiss()},n.prototype.navigateToChangedLogs=function(){this.events.publish("app:navroot","logs-changed"),this.viewCtrl.dismiss()},n.prototype.handleClientLoad=function(){gapi.load("client:auth2",function(){gapi.client.init({client_id:"460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com",cookiepolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets"}).then(function(){console.log(gapi.auth2.getAuthInstance().isSignedIn.get())})})},n.prototype.signOut=function(){var n=this;this.viewCtrl.dismiss(),gapi.auth2.getAuthInstance().signOut().then(function(){n.events.publish("app:navroot","login"),console.log(gapi.auth2.getAuthInstance().isSignedIn.get()),n.cookieservice.remove("keepLoggedIn")})},n.prototype.viewSummary=function(){this.viewCtrl.dismiss(),this.appglobals.summary_params.param1="",this.events.publish("app:navroot","summary"),console.log("navigating to summary page")},n.prototype.viewNewSummary=function(){this.viewCtrl.dismiss(),this.appglobals.newsummary_params.param1="",this.events.publish("app:navroot","user-summary"),console.log("navigating to new summary page")},n.prototype.viewDashboard=function(){this.viewCtrl.dismiss(),this.authguard.user_id=this.authguard.userData.user_id,this.appglobals.dashboard_params.param1="",this.appglobals.dashboard_params.param2="",this.events.publish("app:navroot","dashboard"),console.log("navigating to dashboard page")},n}())},503:function(n,t,l){"use strict";l(0),l(79),l(454);l.d(t,"a",function(){return e});var e=(this&&this.__decorate,function(){function n(){}return n}())},504:function(n,t,l){"use strict";function e(n){return i._19(0,[(n()(),i._20(null,["\n"])),(n()(),i._20(null,["\n\n"])),(n()(),i._21(0,null,null,44,"ion-list",[["class","profile-dropdown"],["m-v-0",""]],null,null,null,null,null)),i._22(16384,null,0,a.a,[u.c,i.H,i.I,r.b,s.a,_.a],null,null),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,l){var e=!0,o=n.component;if("click"===t){e=!1!==o.viewDashboard()&&e}return e},p.a,p.b)),i._22(1097728,null,3,h.a,[m.a,u.c,i.H,i.I,[2,d.a]],null,null),i._23(335544320,1,{contentLabel:0}),i._23(603979776,2,{_buttons:1}),i._23(603979776,3,{_icons:1}),i._22(16384,null,0,g.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[3,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" Dashboard"])),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,l){var e=!0,o=n.component;if("click"===t){e=!1!==o.viewSummary()&&e}return e},p.a,p.b)),i._22(1097728,null,3,h.a,[m.a,u.c,i.H,i.I,[2,d.a]],null,null),i._23(335544320,4,{contentLabel:0}),i._23(603979776,5,{_buttons:1}),i._23(603979776,6,{_icons:1}),i._22(16384,null,0,g.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","star"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[6,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" View Summary"])),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,l){var e=!0,o=n.component;if("click"===t){e=!1!==o.viewNewSummary()&&e}return e},p.a,p.b)),i._22(1097728,null,3,h.a,[m.a,u.c,i.H,i.I,[2,d.a]],null,null),i._23(335544320,7,{contentLabel:0}),i._23(603979776,8,{_buttons:1}),i._23(603979776,9,{_icons:1}),i._22(16384,null,0,g.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","list-box"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[9,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" New Summary"])),(n()(),i._20(null,["\n\t"])),(n()(),i._20(null,["\n\t"])),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,l){var e=!0,o=n.component;if("click"===t){e=!1!==o.signOut()&&e}return e},p.a,p.b)),i._22(1097728,null,3,h.a,[m.a,u.c,i.H,i.I,[2,d.a]],null,null),i._23(335544320,10,{contentLabel:0}),i._23(603979776,11,{_buttons:1}),i._23(603979776,12,{_icons:1}),i._22(16384,null,0,g.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","md-power"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[12,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" Logout"])),(n()(),i._20(null,["\n"]))],function(n,t){n(t,12,0,"md-person");n(t,22,0,"star");n(t,32,0,"list-box");n(t,44,0,"md-power")},function(n,t){n(t,11,0,i._24(t,12)._hidden),n(t,21,0,i._24(t,22)._hidden),n(t,31,0,i._24(t,32)._hidden),n(t,43,0,i._24(t,44)._hidden)})}function o(n){return i._19(0,[(n()(),i._21(0,null,null,1,"page-popover",[],null,null,null,e,M)),i._22(49152,null,0,c.a,[b.a,v.a,w.a,y.a,I.a,L.a,k.a],null,null)],null,null)}var i=l(0),a=l(86),u=l(2),r=l(5),s=l(8),_=l(12),c=l(454),p=l(301),h=l(24),m=l(17),d=l(41),g=l(83),f=l(40),b=l(20),v=l(11),w=l(6),y=l(30),I=l(118),L=l(38),k=l(51);l.d(t,"a",function(){return O});var P=[],M=i._18({encapsulation:2,styles:P,data:{}}),O=i._25("page-popover",c.a,o,{},{},[])}});
//# sourceMappingURL=d:\work\dilb_combo\Dilbert_4.0\app\www\build\13.main.js.map