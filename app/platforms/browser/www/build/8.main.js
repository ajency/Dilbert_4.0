webpackJsonp([8],{260:function(n,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var e=t(0),o=t(424),i=t(9),u=t(27),a=t(110),_=t(162),r=t(163),c=t(164),s=t(166),p=t(167),d=t(168),h=t(169),m=t(425),f=t(285),g=t(44);t.d(l,"PopoverPageModuleNgFactory",function(){return w});var b=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,l){n.__proto__=l}||function(n,l){for(var t in l)l.hasOwnProperty(t)&&(n[t]=l[t])};return function(l,t){function e(){this.constructor=l}n(l,t),l.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}}(),v=function(n){function l(l){return n.call(this,l,[_.a,r.a,c.a,s.a,p.a,d.a,h.a,m.a],[])||this}return b(l,n),Object.defineProperty(l.prototype,"_NgLocalization_7",{get:function(){return null==this.__NgLocalization_7&&(this.__NgLocalization_7=new i.a(this.parent.get(e.c))),this.__NgLocalization_7},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_ɵi_8",{get:function(){return null==this.__ɵi_8&&(this.__ɵi_8=new u.a),this.__ɵi_8},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_FormBuilder_9",{get:function(){return null==this.__FormBuilder_9&&(this.__FormBuilder_9=new u.b),this.__FormBuilder_9},enumerable:!0,configurable:!0}),l.prototype.createInternal=function(){return this._CommonModule_0=new i.d,this._ɵba_1=new u.c,this._FormsModule_2=new u.d,this._ReactiveFormsModule_3=new u.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._PopoverPageModule_6=new o.a,this._LAZY_LOADED_TOKEN_10=f.a,this._PopoverPageModule_6},l.prototype.getInternal=function(n,l){return n===i.d?this._CommonModule_0:n===u.c?this._ɵba_1:n===u.d?this._FormsModule_2:n===u.e?this._ReactiveFormsModule_3:n===a.b?this._IonicModule_4:n===a.c?this._IonicPageModule_5:n===o.a?this._PopoverPageModule_6:n===i.e?this._NgLocalization_7:n===u.a?this._ɵi_8:n===u.b?this._FormBuilder_9:n===g.d?this._LAZY_LOADED_TOKEN_10:l},l.prototype.destroyInternal=function(){},l}(e.x),w=new e.y(v,o.a)},285:function(n,l,t){"use strict";t(0),t(70),t(34);t.d(l,"a",function(){return e});var e=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,l,t,e,o){this.navCtrl=n,this.navParams=l,this.viewCtrl=t,this.cookieservice=e,this.events=o,this.handleClientLoad()}return n.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad PopoverPage")},n.prototype.close=function(){this.viewCtrl.dismiss()},n.prototype.handleClientLoad=function(){gapi.load("client:auth2",function(){gapi.client.init({client_id:"676621258132-6q9s2j1hc8343jj3nn75k0is4s1nb893.apps.googleusercontent.com",cookiepolicy:"single_host_origin",scope:"https://www.googleapis.com/auth/spreadsheets"}).then(function(){console.log(gapi.auth2.getAuthInstance().isSignedIn.get())})})},n.prototype.signOut=function(){var n=this;this.viewCtrl.dismiss(),gapi.auth2.getAuthInstance().signOut().then(function(){n.events.publish("app:navroot","login"),console.log(gapi.auth2.getAuthInstance().isSignedIn.get()),n.cookieservice.remove("keepLoggedIn")})},n}())},424:function(n,l,t){"use strict";t(0),t(70),t(285);t.d(l,"a",function(){return e});var e=(this&&this.__decorate,function(){function n(){}return n}())},425:function(n,l,t){"use strict";function e(n){return i._17(0,[(n()(),i._18(null,["\n"])),(n()(),i._18(null,["\n\n"])),(n()(),i._19(0,null,null,42,"ion-list",[["class","profile-dropdown"],["m-v-0",""]],null,null,null,null,null)),i._20(16384,null,0,u.a,[a.c,i.H,i.I,_.b,r.a,c.a],null,null),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,l,t){var e=!0,o=n.component;if("click"===l){e=!1!==o.close()&&e}return e},p.a,p.b)),i._20(1097728,null,3,d.a,[h.a,a.c,i.H,i.I,[2,m.a]],null,null),i._21(335544320,1,{contentLabel:0}),i._21(603979776,2,{_buttons:1}),i._21(603979776,3,{_icons:1}),i._20(16384,null,0,f.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[3,4]],0,g.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" Profile Information"])),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,l,t){var e=!0,o=n.component;if("click"===l){e=!1!==o.close()&&e}return e},p.a,p.b)),i._20(1097728,null,3,d.a,[h.a,a.c,i.H,i.I,[2,m.a]],null,null),i._21(335544320,4,{contentLabel:0}),i._21(603979776,5,{_buttons:1}),i._21(603979776,6,{_icons:1}),i._20(16384,null,0,f.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","star"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[6,4]],0,g.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" View Summary"])),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,l,t){var e=!0,o=n.component;if("click"===l){e=!1!==o.close()&&e}return e},p.a,p.b)),i._20(1097728,null,3,d.a,[h.a,a.c,i.H,i.I,[2,m.a]],null,null),i._21(335544320,7,{contentLabel:0}),i._21(603979776,8,{_buttons:1}),i._21(603979776,9,{_icons:1}),i._20(16384,null,0,f.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","md-person"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[9,4]],0,g.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" Edit Profile"])),(n()(),i._18(null,["\n\t"])),(n()(),i._19(0,null,null,8,"button",[["class","item item-block"],["ion-item",""]],null,[[null,"click"]],function(n,l,t){var e=!0,o=n.component;if("click"===l){e=!1!==o.signOut()&&e}return e},p.a,p.b)),i._20(1097728,null,3,d.a,[h.a,a.c,i.H,i.I,[2,m.a]],null,null),i._21(335544320,10,{contentLabel:0}),i._21(603979776,11,{_buttons:1}),i._21(603979776,12,{_icons:1}),i._20(16384,null,0,f.a,[],null,null),(n()(),i._19(0,null,2,1,"ion-icon",[["name","md-power"],["p-r-5",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),i._20(147456,[[12,4]],0,g.a,[a.c,i.H,i.I],{name:[0,"name"]},null),(n()(),i._18(2,[" Logout"])),(n()(),i._18(null,["\n"]))],function(n,l){n(l,12,0,"md-person");n(l,22,0,"star");n(l,32,0,"md-person");n(l,42,0,"md-power")},function(n,l){n(l,11,0,i._22(l,12)._hidden),n(l,21,0,i._22(l,22)._hidden),n(l,31,0,i._22(l,32)._hidden),n(l,41,0,i._22(l,42)._hidden)})}function o(n){return i._17(0,[(n()(),i._19(0,null,null,1,"page-popover",[],null,null,null,e,L)),i._20(49152,null,0,s.a,[b.a,v.a,w.a,y.a,I.a],null,null)],null,null)}var i=t(0),u=t(81),a=t(1),_=t(4),r=t(7),c=t(10),s=t(285),p=t(165),d=t(23),h=t(17),m=t(35),f=t(75),g=t(33),b=t(22),v=t(11),w=t(5),y=t(28),I=t(43);t.d(l,"a",function(){return k});var P=[],L=i._16({encapsulation:2,styles:P,data:{}}),k=i._23("page-popover",s.a,o,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/8.main.js.map