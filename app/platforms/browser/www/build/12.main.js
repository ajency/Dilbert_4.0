webpackJsonp([12],{290:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e(0),o=e(472),i=e(9),a=e(20),u=e(120),r=e(176),s=e(177),_=e(178),c=e(180),p=e(181),h=e(182),d=e(183),g=e(184),m=e(473),f=e(439),b=e(30);e.d(t,"PopoverPageModuleNgFactory",function(){return w});var v=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])};return function(t,e){function l(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(l.prototype=e.prototype,new l)}}(),y=function(n){function t(t){return n.call(this,t,[r.a,s.a,_.a,c.a,p.a,h.a,d.a,g.a,m.a],[])||this}return v(t,n),Object.defineProperty(t.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.a(this.parent.get(l.c))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new a.a),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new a.b),this.__FormBuilder_9},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new i.d,this._ɵba_1=new a.c,this._FormsModule_2=new a.d,this._ReactiveFormsModule_3=new a.e,this._IonicModule_4=new u.b,this._IonicPageModule_5=new u.c,this._PopoverPageModule_6=new o.a,this._LAZY_LOADED_TOKEN_10=f.a,this._PopoverPageModule_6},t.prototype.getInternal=function(n,t){return n===i.d?this._CommonModule_0:n===a.c?this._ɵba_1:n===a.d?this._FormsModule_2:n===a.e?this._ReactiveFormsModule_3:n===u.b?this._IonicModule_4:n===u.c?this._IonicPageModule_5:n===o.a?this._PopoverPageModule_6:n===i.e?this._NgLocalization_7:n===a.a?this._ɵi_8:n===a.b?this._FormBuilder_9:n===b.d?this._LAZY_LOADED_TOKEN_10:t},t.prototype.destroyInternal=function(){},t}(l.x),w=new l.y(y,o.a)},439:function(n,t,e){"use strict";e(0),e(78),e(29),e(118),e(36);e.d(t,"a",function(){return l});var l=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,t,e,l,o,i,a){this.navCtrl=n,this.navParams=t,this.viewCtrl=e,this.cookieservice=l,this.authguard=o,this.appglobals=i,this.events=a,this.handleClientLoad()}return n.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad PopoverPage")},n.prototype.close=function(){this.viewCtrl.dismiss()},n.prototype.navigateToChangedLogs=function(){this.events.publish("app:navroot","logs-changed"),this.viewCtrl.dismiss()},n.prototype.handleClientLoad=function(){gapi.load("client:auth2",function(){gapi.client.init({client_id:"460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com",cookiepolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets"}).then(function(){console.log(gapi.auth2.getAuthInstance().isSignedIn.get())})})},n.prototype.signOut=function(){var n=this;this.viewCtrl.dismiss(),gapi.auth2.getAuthInstance().signOut().then(function(){n.events.publish("app:navroot","login"),console.log(gapi.auth2.getAuthInstance().isSignedIn.get()),n.cookieservice.remove("keepLoggedIn")})},n.prototype.viewSummary=function(){this.viewCtrl.dismiss(),this.appglobals.summary_params.param1="",this.events.publish("app:navroot","summary"),console.log("navigating to summary page")},n.prototype.viewDashboard=function(){this.viewCtrl.dismiss(),this.authguard.user_id=this.authguard.userData.user_id,this.appglobals.dashboard_params.param1="",this.appglobals.dashboard_params.param2="",this.events.publish("app:navroot","dashboard"),console.log("navigating to dashboard page")},n}())},472:function(n,t,e){"use strict";e(0),e(78),e(439);e.d(t,"a",function(){return l});var l=(this&&this.__decorate,function(){function n(){}return n}())},473:function(n,t,e){"use strict";function l(n){return i._19(0,[(n()(),i._20(null,["\n"])),(n()(),i._20(null,["\n\n"])),(n()(),i._21(0,null,null,34,"ion-list",[["class","profile-dropdown"],["m-v-0",""]],null,null,null,null,null)),i._22(16384,null,0,a.a,[u.c,i.H,i.I,r.b,s.a,_.a],null,null),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.viewDashboard()&&l}return l},p.a,p.b)),i._22(1097728,null,3,h.a,[d.a,u.c,i.H,i.I,[2,g.a]],null,null),i._23(335544320,1,{contentLabel:0}),i._23(603979776,2,{_buttons:1}),i._23(603979776,3,{_icons:1}),i._22(16384,null,0,m.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[3,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" Dashboard"])),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.viewSummary()&&l}return l},p.a,p.b)),i._22(1097728,null,3,h.a,[d.a,u.c,i.H,i.I,[2,g.a]],null,null),i._23(335544320,4,{contentLabel:0}),i._23(603979776,5,{_buttons:1}),i._23(603979776,6,{_icons:1}),i._22(16384,null,0,m.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","star"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[6,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" View Summary"])),(n()(),i._20(null,["\n\t"])),(n()(),i._20(null,["\n\t"])),(n()(),i._20(null,["\n\t"])),(n()(),i._21(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,t,e){var l=!0,o=n.component;if("click"===t){l=!1!==o.signOut()&&l}return l},p.a,p.b)),i._22(1097728,null,3,h.a,[d.a,u.c,i.H,i.I,[2,g.a]],null,null),i._23(335544320,7,{contentLabel:0}),i._23(603979776,8,{_buttons:1}),i._23(603979776,9,{_icons:1}),i._22(16384,null,0,m.a,[],null,null),(n()(),i._21(0,null,2,1,"ion-icon",[["name","md-power"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._22(147456,[[9,4]],0,f.a,[u.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._20(2,[" Logout"])),(n()(),i._20(null,["\n"]))],function(n,t){n(t,12,0,"md-person");n(t,22,0,"star");n(t,34,0,"md-power")},function(n,t){n(t,11,0,i._24(t,12)._hidden),n(t,21,0,i._24(t,22)._hidden),n(t,33,0,i._24(t,34)._hidden)})}function o(n){return i._19(0,[(n()(),i._21(0,null,null,1,"page-popover",[],null,null,null,l,M)),i._22(49152,null,0,c.a,[b.a,v.a,y.a,w.a,I.a,L.a,P.a],null,null)],null,null)}var i=e(0),a=e(86),u=e(1),r=e(4),s=e(7),_=e(11),c=e(439),p=e(179),h=e(23),d=e(16),g=e(39),m=e(82),f=e(38),b=e(19),v=e(10),y=e(5),w=e(28),I=e(118),L=e(36),P=e(50);e.d(t,"a",function(){return O});var k=[],M=i._18({encapsulation:2,styles:k,data:{}}),O=i._25("page-popover",c.a,o,{},{},[])}});
//# sourceMappingURL=/Users/cyrusAjency/Documents/Dilbert_4.0/app/www/build/12.main.js.map