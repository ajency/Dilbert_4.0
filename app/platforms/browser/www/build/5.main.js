webpackJsonp([5],{285:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u(0),e=u(462),o=u(9),i=u(20),a=u(120),r=u(79),_=u(297),s=u(302),c=u(53),d=u(52),g=u(54),h=u(51),f=u(21),p=u(176),b=u(177),m=u(178),v=u(180),k=u(181),y=u(182),I=u(183),T=u(184),C=u(298),L=u(303),w=u(463),P=u(84),x=u(434),H=u(30);u.d(n,"LogsChangedPageModuleNgFactory",function(){return N});var M=this&&this.__extends||function(){var l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var u in n)n.hasOwnProperty(u)&&(l[u]=n[u])};return function(n,u){function t(){this.constructor=n}l(n,u),n.prototype=null===u?Object.create(u):(t.prototype=u.prototype,new t)}}(),O=function(l){function n(n){return l.call(this,n,[p.a,b.a,m.a,v.a,k.a,y.a,I.a,T.a,C.a,L.a,w.a],[])||this}return M(n,l),Object.defineProperty(n.prototype,"_NgLocalization_10",{get:function(){return null==this.__NgLocalization_10&&(this.__NgLocalization_10=new o.a(this.parent.get(t.c))),this.__NgLocalization_10},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_11",{get:function(){return null==this.__ɵi_11&&(this.__ɵi_11=new i.a),this.__ɵi_11},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_12",{get:function(){return null==this.__FormBuilder_12&&(this.__FormBuilder_12=new i.b),this.__FormBuilder_12},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateLoader_14",{get:function(){return null==this.__TranslateLoader_14&&(this.__TranslateLoader_14=new c.b),this.__TranslateLoader_14},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateCompiler_15",{get:function(){return null==this.__TranslateCompiler_15&&(this.__TranslateCompiler_15=new d.a),this.__TranslateCompiler_15},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateParser_16",{get:function(){return null==this.__TranslateParser_16&&(this.__TranslateParser_16=new g.a),this.__TranslateParser_16},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_MissingTranslationHandler_17",{get:function(){return null==this.__MissingTranslationHandler_17&&(this.__MissingTranslationHandler_17=new h.a),this.__MissingTranslationHandler_17},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateService_20",{get:function(){return null==this.__TranslateService_20&&(this.__TranslateService_20=new f.a(this.parent.get(P.a),this._TranslateLoader_14,this._TranslateCompiler_15,this._TranslateParser_16,this._MissingTranslationHandler_17,this._USE_DEFAULT_LANG_19,this._USE_STORE_18)),this.__TranslateService_20},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new i.c,this._FormsModule_2=new i.d,this._ReactiveFormsModule_3=new i.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._TranslateModule_6=new r.a,this._LoggedInHeaderComponentModule_7=new _.a,this._FooterComponentModule_8=new s.a,this._LogsChangedPageModule_9=new e.a,this._LAZY_LOADED_TOKEN_13=x.a,this._USE_STORE_18=void 0,this._USE_DEFAULT_LANG_19=void 0,this._LogsChangedPageModule_9},n.prototype.getInternal=function(l,n){return l===o.d?this._CommonModule_0:l===i.c?this._ɵba_1:l===i.d?this._FormsModule_2:l===i.e?this._ReactiveFormsModule_3:l===a.b?this._IonicModule_4:l===a.c?this._IonicPageModule_5:l===r.a?this._TranslateModule_6:l===_.a?this._LoggedInHeaderComponentModule_7:l===s.a?this._FooterComponentModule_8:l===e.a?this._LogsChangedPageModule_9:l===o.e?this._NgLocalization_10:l===i.a?this._ɵi_11:l===i.b?this._FormBuilder_12:l===H.d?this._LAZY_LOADED_TOKEN_13:l===c.a?this._TranslateLoader_14:l===d.b?this._TranslateCompiler_15:l===g.b?this._TranslateParser_16:l===h.b?this._MissingTranslationHandler_17:l===f.b?this._USE_STORE_18:l===f.c?this._USE_DEFAULT_LANG_19:l===f.a?this._TranslateService_20:n},n.prototype.destroyInternal=function(){},n}(t.x),N=new t.y(O,e.a)},295:function(l,n,u){"use strict";u(0),u(78),u(29),u(37),u(36),u(79);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,u,t,e,o,i){this.popoverCtrl=l,this.cookieservice=n,this.events=u,this.appservice=t,this.translate=e,this.appglobals=o,this.zone=i,this.langSelect=!0,this.param={value:"world"},this.lang="English","en"==this.appglobals.lang?this.langSelect=!0:this.langSelect=!1}return l.prototype.ngOnInit=function(){this.org_name=this.appglobals.org_name,"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},l.prototype.ionViewDidLoad=function(){this.zone.run(function(){})},l.prototype.setLocale=function(){console.log(this.lang),"English"==this.lang?(this.events.publish("app:localize","en"),console.log("en")):"French"==this.lang?(this.events.publish("app:localize","fr"),console.log("fr")):(this.events.publish("app:localize","hi"),console.log("hi"))},l.prototype.openPopover=function(l){this.popoverCtrl.create("PopoverPage",{}).present({ev:l})},l.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},l.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},l}())},296:function(l,n,u){"use strict";function t(l){return o._19(2,[o._23(402653184,1,{_fixedContent:0}),o._23(402653184,2,{_scrollContent:0}),(l()(),o._21(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._26(null,0),(l()(),o._21(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._26(null,1),o._26(null,2)],null,null)}function e(l){return o._19(0,[(l()(),o._21(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,t,f)),o._22(4374528,null,0,i.a,[a.c,r.b,_.a,o.H,o.I,s.a,c.a,o.g,[2,d.a],[2,g.a]],null,null)],null,function(l,n){l(n,0,0,o._24(n,1).statusbarPadding)})}var o=u(0),i=u(49),a=u(1),r=u(4),_=u(11),s=u(8),c=u(17),d=u(5),g=u(19);u.d(n,"b",function(){return f}),n.a=t;var h=[],f=o._18({encapsulation:2,styles:h,data:{}});o._25("ion-content",i.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},297:function(l,n,u){"use strict";u(0),u(78),u(295),u(79);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},298:function(l,n,u){"use strict";function t(l){return d._19(0,[(l()(),d._21(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),d._20(null,["\n                      "])),(l()(),d._21(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),d._22(16384,null,0,g.a,[h.c,d.H,d.I],{color:[0,"color"]},null),(l()(),d._20(null,["\n                          ","\n                      "])),(l()(),d._20(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},function(l,n){l(n,4,0,n.component.org_name)})}function e(l){return d._19(0,[(l()(),d._21(0,null,null,6,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),d._20(null,["\n                      "])),(l()(),d._21(0,null,null,3,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),d._22(16384,null,0,g.a,[h.c,d.H,d.I],{color:[0,"color"]},null),(l()(),d._20(null,["\n                         ","\n                      "])),d._30(131072,f.a,[p.a,d.T]),(l()(),d._20(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},function(l,n){l(n,4,0,d._31(n,4,0,d._24(n,5).transform("DILBERT")))})}function o(l){return d._19(0,[(l()(),d._21(0,null,null,22,"div",[["class","relative lang-container"]],null,null,null,null,null)),(l()(),d._20(null,["\n                    "])),(l()(),d._21(0,null,null,19,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==d._24(l,3)._click(u)&&t}if("keyup.space"===n){t=!1!==d._24(l,3)._keyup()&&t}if("ngModelChange"===n){t=!1!==(e.lang=u)&&t}if("ionChange"===n){t=!1!==e.setLocale()&&t}return t},b.a,b.b)),d._22(1228800,null,1,m.a,[v.a,k.a,h.c,d.H,d.I,[2,y.a],I.b],{color:[0,"color"],interface:[1,"interface"]},{ionChange:"ionChange"}),d._23(603979776,1,{options:1}),d._32(1024,null,T.f,function(l){return[l]},[m.a]),d._22(671744,null,0,T.g,[[8,null],[8,null],[8,null],[2,T.f]],{model:[0,"model"]},{update:"ngModelChange"}),d._32(2048,null,T.h,null,[T.g]),d._22(16384,null,0,T.i,[T.h],null,null),(l()(),d._20(null,["\n                        "])),(l()(),d._21(0,null,null,2,"ion-option",[],null,null,null,null,null)),d._22(16384,[[1,4]],0,C.a,[d.H],null,null),(l()(),d._20(null,["English"])),(l()(),d._20(null,["\n                        "])),(l()(),d._21(0,null,null,2,"ion-option",[],null,null,null,null,null)),d._22(16384,[[1,4]],0,C.a,[d.H],null,null),(l()(),d._20(null,["French"])),(l()(),d._20(null,["\n                         "])),(l()(),d._21(0,null,null,2,"ion-option",[],null,null,null,null,null)),d._22(16384,[[1,4]],0,C.a,[d.H],null,null),(l()(),d._20(null,["Hindi"])),(l()(),d._20(null,["\n                    "])),(l()(),d._20(null,["\n                "]))],function(l,n){var u=n.component;l(n,3,0,"gray-link","popover"),l(n,6,0,u.lang)},function(l,n){l(n,2,0,d._24(n,3)._disabled,d._24(n,8).ngClassUntouched,d._24(n,8).ngClassTouched,d._24(n,8).ngClassPristine,d._24(n,8).ngClassDirty,d._24(n,8).ngClassValid,d._24(n,8).ngClassInvalid,d._24(n,8).ngClassPending)})}function i(l){return d._19(0,[(l()(),d._21(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToLogin()&&t}return t},L.a,L.b)),d._22(1097728,null,0,w.a,[[8,""],h.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._20(0,["\n                ","\n                    \n                "])),d._30(131072,f.a,[p.a,d.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,d._31(n,2,0,d._24(n,3).transform("login")))})}function a(l){return d._19(0,[(l()(),d._21(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToRegister()&&t}return t},L.a,L.b)),d._22(1097728,null,0,w.a,[[8,""],h.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._20(0,["\n                    ","\n                "])),d._30(131072,f.a,[p.a,d.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,d._31(n,2,0,d._24(n,3).transform("register")))})}function r(l){return d._19(0,[(l()(),d._21(0,null,null,3,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,L.a,L.b)),d._22(1097728,null,0,w.a,[[8,""],h.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._20(0,["\n                    ","\n                "])),d._30(131072,f.a,[p.a,d.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,d._31(n,2,0,d._24(n,3).transform("contact us")))})}function _(l){return d._19(0,[(l()(),d._21(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.openPopover(u)&&t}return t},L.a,L.b)),d._22(1097728,null,0,w.a,[[8,""],h.c,d.H,d.I],{clear:[0,"clear"]},null),(l()(),d._20(0,["\n                    "])),(l()(),d._21(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,P.a,P.b)),d._22(1097728,null,3,y.a,[k.a,h.c,d.H,d.I,[2,x.a]],null,null),d._23(335544320,2,{contentLabel:0}),d._23(603979776,3,{_buttons:1}),d._23(603979776,4,{_icons:1}),d._22(16384,null,0,H.a,[],null,null),(l()(),d._20(2,["\n                        "])),(l()(),d._21(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),d._22(16384,null,0,M.a,[],null,null),(l()(),d._20(null,["\n                            "])),(l()(),d._21(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),d._20(null,["\n                        "])),(l()(),d._20(2,["\n                        "])),(l()(),d._21(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),d._22(147456,[[4,4]],0,O.a,[h.c,d.H,d.I],{name:[0,"name"]},null),(l()(),d._20(null,["\n                        "])),(l()(),d._20(2,["\n                    "])),(l()(),d._20(0,["\n                "]))],function(l,n){l(n,1,0,"");l(n,17,0,"arrow-dropdown")},function(l,n){var u=n.component;l(n,13,0,d._33(1,"",u.image,"")),l(n,16,0,d._24(n,17)._hidden)})}function s(l){return d._19(0,[(l()(),d._20(null,["\n"])),(l()(),d._21(0,null,null,46,"div",[["class","main-header shadow-1 white"]],null,null,null,null,null)),(l()(),d._20(null,["\n    "])),(l()(),d._21(0,null,null,43,"div",[["class","container"]],null,null,null,null,null)),(l()(),d._20(null,["\n        "])),(l()(),d._20(null,["\n        "])),(l()(),d._21(0,null,null,38,"ion-navbar",[["class","dilbert-nav toolbar"],["hideBackButton",""]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,N.a,N.b)),d._22(49152,null,0,S.a,[v.a,[2,E.a],[2,F.a],h.c,d.H,d.I],{hideBackButton:[0,"hideBackButton"]},null),(l()(),d._20(3,["\n            "])),(l()(),d._21(0,null,3,15,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(l()(),d._20(null,["\n               "])),(l()(),d._20(null,["\n                \n                "])),(l()(),d._20(null,["\n                "])),(l()(),d._21(0,null,null,7,"div",[],null,null,null,null,null)),(l()(),d._20(null,["\n                  "])),(l()(),d._27(16777216,null,null,1,null,t)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                  "])),(l()(),d._27(16777216,null,null,1,null,e)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                "])),(l()(),d._20(null,["\n                "])),(l()(),d._27(16777216,null,null,1,null,o)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                 \n            "])),(l()(),d._20(3,["\n            "])),(l()(),d._21(0,null,3,17,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(l()(),d._20(null,["\n                "])),(l()(),d._20(null,["\n                "])),(l()(),d._27(16777216,null,null,1,null,i)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                "])),(l()(),d._27(16777216,null,null,1,null,a)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                "])),(l()(),d._27(16777216,null,null,1,null,r)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n               "])),(l()(),d._20(null,["\n                "])),(l()(),d._20(null,["\n                "])),(l()(),d._27(16777216,null,null,1,null,_)),d._22(16384,null,0,B.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._20(null,["\n                "])),(l()(),d._20(null,["\n            "])),(l()(),d._20(3,["\n        "])),(l()(),d._20(null,["\n        "])),(l()(),d._20(null,["\n    "])),(l()(),d._20(null,["\n"]))],function(l,n){var u=n.component;l(n,7,0,""),l(n,16,0,"loggedin"==u.header),l(n,19,0,"notloggedin"==u.header||"new"==u.header),l(n,23,0,"notloggedin"==u.header||"new"==u.header),l(n,30,0,"notloggedin"==u.header),l(n,33,0,"notloggedin"==u.header),l(n,36,0,"new"==u.header),l(n,41,0,"loggedin"==u.header)},function(l,n){l(n,6,0,d._24(n,7)._hidden,d._24(n,7)._sbPadding)})}function c(l){return d._19(0,[(l()(),d._21(0,null,null,1,"logged-in-header",[],null,null,null,s,V)),d._22(114688,null,0,D.a,[j.a,z.a,A.a,$.a,p.a,U.a,d.g],null,null)],function(l,n){l(n,1,0)},null)}var d=u(0),g=u(119),h=u(1),f=u(116),p=u(21),b=u(300),m=u(117),v=u(8),k=u(16),y=u(23),I=u(15),T=u(20),C=u(83),L=u(48),w=u(22),P=u(179),x=u(39),H=u(82),M=u(124),O=u(38),N=u(299),S=u(80),E=u(5),F=u(19),B=u(9),D=u(295),j=u(81),z=u(28),A=u(50),$=u(37),U=u(36);u.d(n,"c",function(){return V}),n.b=s,u.d(n,"a",function(){return G});var R=[],V=d._18({encapsulation:2,styles:R,data:{}}),G=d._25("logged-in-header",D.a,c,{},{},[])},299:function(l,n,u){"use strict";function t(l){return o._19(0,[(l()(),o._21(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._22(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._21(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.backButtonClick(u)&&t}return t},r.a,r.b)),o._22(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._22(1097728,null,0,_.a,[[8,"bar-button"],s.c,o.H,o.I],null,null),(l()(),o._21(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._22(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._22(147456,null,0,c.a,[s.c,o.H,o.I],{name:[0,"name"]},null),(l()(),o._21(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._22(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._20(null,["",""])),o._26(null,0),o._26(null,1),o._26(null,2),(l()(),o._21(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._22(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._26(null,3)],function(l,n){var u=n.component;l(n,1,0,"toolbar-background","toolbar-background-"+u._mode);l(n,3,0,"back-button","back-button-"+u._mode);l(n,6,0,"back-button-icon","back-button-icon-"+u._mode),l(n,7,0,u._bbIcon);l(n,9,0,"back-button-text","back-button-text-"+u._mode);l(n,15,0,"toolbar-content","toolbar-content-"+u._mode)},function(l,n){var u=n.component;l(n,2,0,u._hideBb),l(n,5,0,o._24(n,7)._hidden),l(n,10,0,u._backText)})}function e(l){return o._19(0,[(l()(),o._21(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,t,p)),o._22(49152,null,0,a.a,[d.a,[2,g.a],[2,h.a],s.c,o.H,o.I],null,null)],null,function(l,n){l(n,0,0,o._24(n,1)._hidden,o._24(n,1)._sbPadding)})}var o=u(0),i=u(9),a=u(80),r=u(48),_=u(22),s=u(1),c=u(38),d=u(8),g=u(5),h=u(19);u.d(n,"b",function(){return p}),n.a=t;var f=[],p=o._18({encapsulation:2,styles:f,data:{}});o._25("ion-navbar",a.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},300:function(l,n,u){"use strict";function t(l){return a._19(0,[(l()(),a._21(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(l()(),a._20(null,["",""]))],null,function(l,n){l(n,1,0,n.component.placeholder)})}function e(l){return a._19(0,[(l()(),a._21(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(l()(),a._20(null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,u.selectedText||u._text)})}function o(l){return a._19(0,[(l()(),a._27(16777216,null,null,1,null,t)),a._22(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._27(16777216,null,null,1,null,e)),a._22(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._21(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(l()(),a._21(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(l()(),a._21(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,_.a,_.b)),a._22(1097728,null,0,s.a,[[8,"item-cover"],c.c,a.H,a.I],null,null)],function(l,n){var u=n.component;l(n,1,0,!u._text),l(n,3,0,u._text)},function(l,n){var u=n.component;l(n,6,0,u.id,u._labelId,u._disabled)})}function i(l){return a._19(0,[(l()(),a._21(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==a._24(l,1)._click(u)&&t}if("keyup.space"===n){t=!1!==a._24(l,1)._keyup()&&t}return t},o,v)),a._22(1228800,null,1,d.a,[g.a,h.a,c.c,a.H,a.I,[2,f.a],p.b],null,null),a._23(603979776,1,{options:1}),a._32(5120,null,b.f,function(l){return[l]},[d.a])],null,function(l,n){l(n,0,0,a._24(n,1)._disabled)})}var a=u(0),r=u(9),_=u(48),s=u(22),c=u(1),d=u(117),g=u(8),h=u(16),f=u(23),p=u(15),b=u(20);u.d(n,"b",function(){return v}),n.a=o;var m=[],v=a._18({encapsulation:2,styles:m,data:{}});a._25("ion-select",d.a,i,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},301:function(l,n,u){"use strict";u(0),u(36);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l){this.appglobals=l,this.version="",this.version=this.appglobals.getAppVersion(),console.log(this.version)}return l}())},302:function(l,n,u){"use strict";u(0),u(78),u(301),u(79);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},303:function(l,n,u){"use strict";function t(l){return o._19(0,[(l()(),o._20(null,["\n"])),(l()(),o._21(0,null,null,10,"div",[],null,null,null,null,null)),(l()(),o._20(null,["\n  "])),(l()(),o._21(0,null,null,7,"div",[["align","center"],["p-b-5",""],["p-t-5",""]],null,null,null,null,null)),(l()(),o._20(null,[" "," "])),o._30(131072,i.a,[a.a,o.T]),(l()(),o._21(0,null,null,1,"a",[["href","https://ajency.in/"]],null,null,null,null,null)),(l()(),o._20(null,["Ajency.in"])),(l()(),o._20(null,[" "])),(l()(),o._21(0,null,null,1,"span",[["class","version-string"]],null,null,null,null,null)),(l()(),o._20(null,[" V",""])),(l()(),o._20(null,["\n"])),(l()(),o._20(null,["\n"]))],null,function(l,n){var u=n.component;l(n,4,0,o._31(n,4,0,o._24(n,5).transform("by"))),l(n,10,0,u.version)})}function e(l){return o._19(0,[(l()(),o._21(0,null,null,1,"footer-element",[],null,null,null,t,c)),o._22(49152,null,0,r.a,[_.a],null,null)],null,null)}var o=u(0),i=u(116),a=u(21),r=u(301),_=u(36);u.d(n,"c",function(){return c}),n.b=t,u.d(n,"a",function(){return d});var s=[],c=o._18({encapsulation:2,styles:s,data:{}}),d=o._25("footer-element",r.a,e,{},{},[])},434:function(l,n,u){"use strict";u(0),u(78),u(37);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,u,t){this.navCtrl=l,this.navParams=n,this.element=u,this.appServiceProvider=t,this.nativeElement=this.element.nativeElement,this.$=this.appServiceProvider.jQuery,this.changed_logs=this.navParams.get("data1"),console.log(this.changed_logs)}return l.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad LogsChangedPage")},l.prototype.ngOnInit=function(){this.$(this.nativeElement).parents().find(".popover-content").addClass("logs-changed-popover")},l.prototype.splitDay_Date=function(l,n){var u="-";if(null!=l)switch(n){case 1:u=l.split(" ")[0];break;case 2:u=l.split(" ")[1]}return u},l}())},462:function(l,n,u){"use strict";u(0),u(78),u(434),u(297),u(302),u(79);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},463:function(l,n,u){"use strict";function t(l){return s._19(0,[(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,["",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.from)})}function e(l){return s._19(0,[(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,[" - "]))],null,null)}function o(l){return s._19(0,[(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,["",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.to)})}function i(l){return s._19(0,[(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,[" - "]))],null,null)}function a(l){return s._19(0,[(l()(),s._21(0,null,null,22,"tr",[],null,null,null,null,null)),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,["",""])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,["",""])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"td",[],null,null,null,null,null)),(l()(),s._20(null,["",""])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._27(16777216,null,null,1,null,t)),s._22(16384,null,0,c.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._27(16777216,null,null,1,null,e)),s._22(16384,null,0,c.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._20(null,["\n\n\t\t\t\t"])),(l()(),s._27(16777216,null,null,1,null,o)),s._22(16384,null,0,c.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._27(16777216,null,null,1,null,i)),s._22(16384,null,0,c.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._20(null,["\n\n\t\t\t"]))],function(l,n){l(n,12,0,null!=n.context.$implicit.from),l(n,15,0,null==n.context.$implicit.from),l(n,18,0,null!=n.context.$implicit.to),l(n,21,0,null==n.context.$implicit.to)},function(l,n){var u=n.component;l(n,3,0,n.context.$implicit.modified_by),l(n,6,0,u.splitDay_Date(n.context.$implicit.modified_on,1)),l(n,9,0,n.context.$implicit.name)})}function r(l){return s._19(0,[(l()(),s._20(null,["\n\n\n"])),(l()(),s._21(0,null,null,41,"ion-content",[],[[2,"statusbar-padding",null]],null,null,d.a,d.b)),s._22(4374528,null,0,g.a,[h.c,f.b,p.a,s.H,s.I,b.a,m.a,s.g,[2,v.a],[2,k.a]],null,null),(l()(),s._20(1,["\n\n"])),(l()(),s._21(0,null,1,37,"div",[["padding",""]],null,null,null,null,null)),(l()(),s._20(null,["\n\n\t"])),(l()(),s._21(0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),s._20(null,[" Changed-logs "])),(l()(),s._20(null,["\n\n"])),(l()(),s._21(0,null,null,31,"div",[],null,null,null,null,null)),(l()(),s._20(null,["\n\t"])),(l()(),s._21(0,null,null,28,"table",[["padding",""],["style","text-align: center;"],["width","100%"]],null,null,null,null,null)),(l()(),s._20(null,["\n\t\t"])),(l()(),s._21(0,null,null,19,"thead",[],null,null,null,null,null)),(l()(),s._20(null,["\n\t\t\t"])),(l()(),s._21(0,null,null,16,"tr",[],null,null,null,null,null)),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"th",[],null,null,null,null,null)),(l()(),s._20(null,["Modified by"])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"th",[],null,null,null,null,null)),(l()(),s._20(null,["Modified On"])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"th",[],null,null,null,null,null)),(l()(),s._20(null,["Modified"])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"th",[],null,null,null,null,null)),(l()(),s._20(null,["From"])),(l()(),s._20(null,["\n\t\t\t\t"])),(l()(),s._21(0,null,null,1,"th",[],null,null,null,null,null)),(l()(),s._20(null,["To"])),(l()(),s._20(null,["\n\t\t\t"])),(l()(),s._20(null,["\n\t\t"])),(l()(),s._20(null,["\n\n\t\t"])),(l()(),s._21(0,null,null,4,"tbody",[],null,null,null,null,null)),(l()(),s._20(null,["\n\t\t\t"])),(l()(),s._27(16777216,null,null,1,null,a)),s._22(802816,null,0,c.m,[s.L,s.N,s.t],{ngForOf:[0,"ngForOf"]},null),(l()(),s._20(null,["\n\t\t"])),(l()(),s._20(null,["\n\n\t"])),(l()(),s._20(null,["\n"])),(l()(),s._20(null,["\n\n"])),(l()(),s._20(1,["\n\n"]))],function(l,n){l(n,37,0,n.component.changed_logs)},function(l,n){l(n,1,0,s._24(n,2).statusbarPadding)})}function _(l){return s._19(0,[(l()(),s._21(0,null,null,1,"page-logs-changed",[],null,null,null,r,L)),s._22(114688,null,0,y.a,[k.a,I.a,s.H,T.a],null,null)],function(l,n){l(n,1,0)},null)}var s=u(0),c=u(9),d=u(296),g=u(49),h=u(1),f=u(4),p=u(11),b=u(8),m=u(17),v=u(5),k=u(19),y=u(434),I=u(10),T=u(37);u.d(n,"a",function(){return w});var C=[],L=s._18({encapsulation:2,styles:C,data:{}}),w=s._25("page-logs-changed",y.a,_,{},{},[])}});
//# sourceMappingURL=/Users/cyrusAjency/Documents/Dilbert_4.0/app/www/build/5.main.js.map