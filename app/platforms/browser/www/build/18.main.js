webpackJsonp([18],{459:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=t(0),o=t(610),i=t(10),u=t(20),a=t(124),r=t(318),s=t(319),d=t(320),c=t(321),p=t(322),_=t(323),m=t(324),h=t(325),g=t(611),f=t(521),v=t(32);t.d(e,"PopoverPageModuleNgFactory",function(){return y});var b=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])};return function(e,t){function l(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(l.prototype=t.prototype,new l)}}(),w=function(n){function e(e){return n.call(this,e,[r.a,s.a,d.a,c.a,p.a,_.a,m.a,h.a,g.a],[])||this}return b(e,n),Object.defineProperty(e.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.NgLocaleLocalization(this.parent.get(l.LOCALE_ID))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new u["ɵi"]),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new u.FormBuilder),this.__FormBuilder_9},enumerable:!0,configurable:!0}),e.prototype.createInternal=function(){return this._CommonModule_0=new i.CommonModule,this._ɵba_1=new u["ɵba"],this._FormsModule_2=new u.FormsModule,this._ReactiveFormsModule_3=new u.ReactiveFormsModule,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._PopoverPageModule_6=new o.a,this._LAZY_LOADED_TOKEN_10=f.a,this._PopoverPageModule_6},e.prototype.getInternal=function(n,e){return n===i.CommonModule?this._CommonModule_0:n===u["ɵba"]?this._ɵba_1:n===u.FormsModule?this._FormsModule_2:n===u.ReactiveFormsModule?this._ReactiveFormsModule_3:n===a.b?this._IonicModule_4:n===a.c?this._IonicPageModule_5:n===o.a?this._PopoverPageModule_6:n===i.NgLocalization?this._NgLocalization_7:n===u["ɵi"]?this._ɵi_8:n===u.FormBuilder?this._FormBuilder_9:n===v.d?this._LAZY_LOADED_TOKEN_10:e},e.prototype.destroyInternal=function(){},e}(l["ɵNgModuleInjector"]),y=new l.NgModuleFactory(w,o.a)},521:function(n,e,t){"use strict";t(0),t(80),t(31),t(121),t(38);t.d(e,"a",function(){return l});var l=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,e,t,l,o,i,u){this.navCtrl=n,this.navParams=e,this.viewCtrl=t,this.cookieservice=l,this.authguard=o,this.appglobals=i,this.events=u,this.handleClientLoad()}return n.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad PopoverPage")},n.prototype.close=function(){this.viewCtrl.dismiss()},n.prototype.navigateToChangedLogs=function(){this.events.publish("app:navroot","logs-changed"),this.viewCtrl.dismiss()},n.prototype.handleClientLoad=function(){gapi.load("client:auth2",function(){gapi.client.init({client_id:"460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com",cookiepolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets"}).then(function(){console.log(gapi.auth2.getAuthInstance().isSignedIn.get())})})},n.prototype.signOut=function(){var n=this;this.viewCtrl.dismiss(),gapi.auth2.getAuthInstance().signOut().then(function(){n.events.publish("app:navroot","login"),console.log(gapi.auth2.getAuthInstance().isSignedIn.get()),n.cookieservice.remove("keepLoggedIn")})},n.prototype.viewSummary=function(){this.viewCtrl.dismiss(),this.appglobals.summary_params.param1="",this.events.publish("app:navroot","summary"),console.log("navigating to summary page")},n.prototype.viewNewSummary=function(){this.viewCtrl.dismiss(),this.appglobals.newsummary_params.param1="",this.events.publish("app:navroot","user-summary"),console.log("navigating to new summary page")},n.prototype.viewDashboard=function(){this.viewCtrl.dismiss(),this.authguard.user_id=this.authguard.userData.user_id,this.appglobals.dashboard_params.param1="",this.appglobals.dashboard_params.param2="",this.events.publish("app:navroot","dashboard"),console.log("navigating to dashboard page")},n}())},610:function(n,e,t){"use strict";t(0),t(80),t(521);t.d(e,"a",function(){return l});var l=(this&&this.__decorate,function(){function n(){}return n}())},611:function(n,e,t){"use strict";function l(n){return i["ɵvid"](0,[(n()(),i["ɵted"](null,["\n"])),(n()(),i["ɵted"](null,["\n\n"])),(n()(),i["ɵeld"](0,null,null,44,"ion-list",[["class","profile-dropdown"],["m-v-0",""]],null,null,null,null,null)),i["ɵdid"](16384,null,0,u.a,[a.c,i.ElementRef,i.Renderer,r.b,s.a,d.a],null,null),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵeld"](0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,e,t){var l=!0,o=n.component;if("click"===e){l=!1!==o.viewDashboard()&&l}return l},p.a,p.b)),i["ɵdid"](1097728,null,3,_.a,[m.a,a.c,i.ElementRef,i.Renderer,[2,h.a]],null,null),i["ɵqud"](335544320,1,{contentLabel:0}),i["ɵqud"](603979776,2,{_buttons:1}),i["ɵqud"](603979776,3,{_icons:1}),i["ɵdid"](16384,null,0,g.a,[],null,null),(n()(),i["ɵeld"](0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i["ɵdid"](147456,[[3,4]],0,f.a,[a.c,i.ElementRef,i.Renderer],{name:[0,"name"]},null),(n()(),i["ɵted"](2,[" Dashboard"])),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵeld"](0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,e,t){var l=!0,o=n.component;if("click"===e){l=!1!==o.viewSummary()&&l}return l},p.a,p.b)),i["ɵdid"](1097728,null,3,_.a,[m.a,a.c,i.ElementRef,i.Renderer,[2,h.a]],null,null),i["ɵqud"](335544320,4,{contentLabel:0}),i["ɵqud"](603979776,5,{_buttons:1}),i["ɵqud"](603979776,6,{_icons:1}),i["ɵdid"](16384,null,0,g.a,[],null,null),(n()(),i["ɵeld"](0,null,2,1,"ion-icon",[["name","star"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i["ɵdid"](147456,[[6,4]],0,f.a,[a.c,i.ElementRef,i.Renderer],{name:[0,"name"]},null),(n()(),i["ɵted"](2,[" View Summary"])),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵeld"](0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,e,t){var l=!0,o=n.component;if("click"===e){l=!1!==o.viewNewSummary()&&l}return l},p.a,p.b)),i["ɵdid"](1097728,null,3,_.a,[m.a,a.c,i.ElementRef,i.Renderer,[2,h.a]],null,null),i["ɵqud"](335544320,7,{contentLabel:0}),i["ɵqud"](603979776,8,{_buttons:1}),i["ɵqud"](603979776,9,{_icons:1}),i["ɵdid"](16384,null,0,g.a,[],null,null),(n()(),i["ɵeld"](0,null,2,1,"ion-icon",[["name","list-box"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i["ɵdid"](147456,[[9,4]],0,f.a,[a.c,i.ElementRef,i.Renderer],{name:[0,"name"]},null),(n()(),i["ɵted"](2,[" New Summary"])),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵted"](null,["\n\t"])),(n()(),i["ɵeld"](0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,e,t){var l=!0,o=n.component;if("click"===e){l=!1!==o.signOut()&&l}return l},p.a,p.b)),i["ɵdid"](1097728,null,3,_.a,[m.a,a.c,i.ElementRef,i.Renderer,[2,h.a]],null,null),i["ɵqud"](335544320,10,{contentLabel:0}),i["ɵqud"](603979776,11,{_buttons:1}),i["ɵqud"](603979776,12,{_icons:1}),i["ɵdid"](16384,null,0,g.a,[],null,null),(n()(),i["ɵeld"](0,null,2,1,"ion-icon",[["name","md-power"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i["ɵdid"](147456,[[12,4]],0,f.a,[a.c,i.ElementRef,i.Renderer],{name:[0,"name"]},null),(n()(),i["ɵted"](2,[" Logout"])),(n()(),i["ɵted"](null,["\n"]))],function(n,e){n(e,12,0,"md-person");n(e,22,0,"star");n(e,32,0,"list-box");n(e,44,0,"md-power")},function(n,e){n(e,11,0,i["ɵnov"](e,12)._hidden),n(e,21,0,i["ɵnov"](e,22)._hidden),n(e,31,0,i["ɵnov"](e,32)._hidden),n(e,43,0,i["ɵnov"](e,44)._hidden)})}function o(n){return i["ɵvid"](0,[(n()(),i["ɵeld"](0,null,null,1,"page-popover",[],null,null,null,l,P)),i["ɵdid"](49152,null,0,c.a,[v.a,b.a,w.a,y.a,L.a,M.a,R.a],null,null)],null,null)}var i=t(0),u=t(87),a=t(2),r=t(5),s=t(8),d=t(12),c=t(521),p=t(326),_=t(24),m=t(17),h=t(41),g=t(84),f=t(40),v=t(21),b=t(11),w=t(6),y=t(30),L=t(121),M=t(38),R=t(52);t.d(e,"a",function(){return F});var k=[],P=i["ɵcrt"]({encapsulation:2,styles:k,data:{}}),F=i["ɵccf"]("page-popover",c.a,o,{},{},[])}});
//# sourceMappingURL=/Users/aj-sujit/Documents/Ajency/Dilbert_4.0/app/www/build/18.main.js.map