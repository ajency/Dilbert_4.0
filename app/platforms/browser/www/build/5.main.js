webpackJsonp([5],{267:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u(0),e=u(440),o=u(10),a=u(27),i=u(111),r=u(73),_=u(276),c=u(48),s=u(47),d=u(49),g=u(46),p=u(19),f=u(166),h=u(167),b=u(168),v=u(169),m=u(170),y=u(171),k=u(172),I=u(173),T=u(277),w=u(441),x=u(79),H=u(410),C=u(30);u.d(n,"OrganizationPageModuleNgFactory",function(){return O});var L=this&&this.__extends||function(){var l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var u in n)n.hasOwnProperty(u)&&(l[u]=n[u])};return function(n,u){function t(){this.constructor=n}l(n,u),n.prototype=null===u?Object.create(u):(t.prototype=u.prototype,new t)}}(),P=function(l){function n(n){return l.call(this,n,[f.a,h.a,b.a,v.a,m.a,y.a,k.a,I.a,T.a,w.a],[])||this}return L(n,l),Object.defineProperty(n.prototype,"_NgLocalization_9",{get:function(){return null==this.__NgLocalization_9&&(this.__NgLocalization_9=new o.a(this.parent.get(t.c))),this.__NgLocalization_9},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_10",{get:function(){return null==this.__ɵi_10&&(this.__ɵi_10=new a.a),this.__ɵi_10},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_11",{get:function(){return null==this.__FormBuilder_11&&(this.__FormBuilder_11=new a.b),this.__FormBuilder_11},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateLoader_13",{get:function(){return null==this.__TranslateLoader_13&&(this.__TranslateLoader_13=new c.b),this.__TranslateLoader_13},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateCompiler_14",{get:function(){return null==this.__TranslateCompiler_14&&(this.__TranslateCompiler_14=new s.a),this.__TranslateCompiler_14},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateParser_15",{get:function(){return null==this.__TranslateParser_15&&(this.__TranslateParser_15=new d.a),this.__TranslateParser_15},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_MissingTranslationHandler_16",{get:function(){return null==this.__MissingTranslationHandler_16&&(this.__MissingTranslationHandler_16=new g.a),this.__MissingTranslationHandler_16},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_TranslateService_19",{get:function(){return null==this.__TranslateService_19&&(this.__TranslateService_19=new p.a(this.parent.get(x.a),this._TranslateLoader_13,this._TranslateCompiler_14,this._TranslateParser_15,this._MissingTranslationHandler_16,this._USE_DEFAULT_LANG_18,this._USE_STORE_17)),this.__TranslateService_19},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new a.c,this._FormsModule_2=new a.d,this._ReactiveFormsModule_3=new a.e,this._IonicModule_4=new i.b,this._IonicPageModule_5=new i.c,this._TranslateModule_6=new r.a,this._LoggedInHeaderComponentModule_7=new _.a,this._OrganizationPageModule_8=new e.a,this._LAZY_LOADED_TOKEN_12=H.a,this._USE_STORE_17=void 0,this._USE_DEFAULT_LANG_18=void 0,this._OrganizationPageModule_8},n.prototype.getInternal=function(l,n){return l===o.d?this._CommonModule_0:l===a.c?this._ɵba_1:l===a.d?this._FormsModule_2:l===a.e?this._ReactiveFormsModule_3:l===i.b?this._IonicModule_4:l===i.c?this._IonicPageModule_5:l===r.a?this._TranslateModule_6:l===_.a?this._LoggedInHeaderComponentModule_7:l===e.a?this._OrganizationPageModule_8:l===o.e?this._NgLocalization_9:l===a.a?this._ɵi_10:l===a.b?this._FormBuilder_11:l===C.d?this._LAZY_LOADED_TOKEN_12:l===c.a?this._TranslateLoader_13:l===s.b?this._TranslateCompiler_14:l===d.b?this._TranslateParser_15:l===g.b?this._MissingTranslationHandler_16:l===p.b?this._USE_STORE_17:l===p.c?this._USE_DEFAULT_LANG_18:l===p.a?this._TranslateService_19:n},n.prototype.destroyInternal=function(){},n}(t.x),O=new t.y(P,e.a)},274:function(l,n,u){"use strict";u(0),u(72),u(29),u(35),u(43),u(73);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,u,t,e,o,a){this.popoverCtrl=l,this.cookieservice=n,this.events=u,this.appservice=t,this.translate=e,this.appglobals=o,this.zone=a,this.langSelect=!0,this.param={value:"world"},"en"==this.appglobals.lang?this.langSelect=!0:this.langSelect=!1}return l.prototype.ngOnInit=function(){"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},l.prototype.ionViewDidLoad=function(){this.zone.run(function(){})},l.prototype.setLocale=function(){console.log(this.lang),this.events.publish("app:localize",this.lang)},l.prototype.openPopover=function(l){this.popoverCtrl.create("PopoverPage",{}).present({ev:l})},l.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},l.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},l}())},275:function(l,n,u){"use strict";function t(l){return o._17(2,[o._21(402653184,1,{_fixedContent:0}),o._21(402653184,2,{_scrollContent:0}),(l()(),o._19(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._24(null,0),(l()(),o._19(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._24(null,1),o._24(null,2)],null,null)}function e(l){return o._17(0,[(l()(),o._19(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,t,f)),o._20(4374528,null,0,a.a,[i.c,r.b,_.a,o.H,o.I,c.a,s.a,o.g,[2,d.a],[2,g.a]],null,null)],null,function(l,n){l(n,0,0,o._22(n,1).statusbarPadding)})}var o=u(0),a=u(74),i=u(1),r=u(5),_=u(11),c=u(8),s=u(16),d=u(3),g=u(22);u.d(n,"b",function(){return f}),n.a=t;var p=[],f=o._16({encapsulation:2,styles:p,data:{}});o._23("ion-content",a.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},276:function(l,n,u){"use strict";u(0),u(72),u(274),u(73);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},277:function(l,n,u){"use strict";function t(l){return s._17(0,[(l()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),s._18(null,["\n                      "])),(l()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),s._20(16384,null,0,d.a,[g.c,s.H,s.I],{color:[0,"color"]},null),(l()(),s._18(null,["\n                          Ajency.in\n                      "])),(l()(),s._18(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function e(l){return s._17(0,[(l()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),s._18(null,["\n                      "])),(l()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),s._20(16384,null,0,d.a,[g.c,s.H,s.I],{color:[0,"color"]},null),(l()(),s._18(null,["\n                          DILBERT\n                      "])),(l()(),s._18(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function o(l){return s._17(0,[(l()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToLogin()&&t}return t},p.a,p.b)),s._20(1097728,null,0,f.a,[[8,""],g.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),s._18(0,["\n                ","\n                    \n                "])),s._29(131072,h.a,[b.a,s.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,s._30(n,2,0,s._22(n,3).transform("login")))})}function a(l){return s._17(0,[(l()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToRegister()&&t}return t},p.a,p.b)),s._20(1097728,null,0,f.a,[[8,""],g.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,s._30(n,2,0,s._22(n,3).transform("register")))})}function i(l){return s._17(0,[(l()(),s._19(0,null,null,3,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,p.a,p.b)),s._20(1097728,null,0,f.a,[[8,""],g.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(l,n){l(n,1,0,"gray-link","")},function(l,n){l(n,2,0,s._30(n,2,0,s._22(n,3).transform("contact us")))})}function r(l){return s._17(0,[(l()(),s._19(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.openPopover(u)&&t}return t},p.a,p.b)),s._20(1097728,null,0,f.a,[[8,""],g.c,s.H,s.I],{clear:[0,"clear"]},null),(l()(),s._18(0,["\n                    "])),(l()(),s._19(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,v.a,v.b)),s._20(1097728,null,3,m.a,[y.a,g.c,s.H,s.I,[2,k.a]],null,null),s._21(335544320,2,{contentLabel:0}),s._21(603979776,3,{_buttons:1}),s._21(603979776,4,{_icons:1}),s._20(16384,null,0,I.a,[],null,null),(l()(),s._18(2,["\n                        "])),(l()(),s._19(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),s._20(16384,null,0,T.a,[],null,null),(l()(),s._18(null,["\n                            "])),(l()(),s._19(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),s._18(null,["\n                        "])),(l()(),s._18(2,["\n                        "])),(l()(),s._19(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),s._20(147456,[[4,4]],0,w.a,[g.c,s.H,s.I],{name:[0,"name"]},null),(l()(),s._18(null,["\n                        "])),(l()(),s._18(2,["\n                    "])),(l()(),s._18(0,["\n                "]))],function(l,n){l(n,1,0,"");l(n,17,0,"arrow-dropdown")},function(l,n){var u=n.component;l(n,13,0,s._31(1,"",u.image,"")),l(n,16,0,s._22(n,17)._hidden)})}function _(l){return s._17(0,[(l()(),s._18(null,["\n"])),(l()(),s._19(0,null,null,63,"div",[["class","main-header shadow-1"]],null,null,null,null,null)),(l()(),s._18(null,["\n    "])),(l()(),s._19(0,null,null,60,"div",[["class","container"]],null,null,null,null,null)),(l()(),s._18(null,["\n        "])),(l()(),s._18(null,["\n        "])),(l()(),s._19(0,null,null,55,"ion-navbar",[["class","dilbert-nav toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,x.a,x.b)),s._20(49152,null,0,H.a,[C.a,[2,L.a],[2,P.a],g.c,s.H,s.I],null,null),(l()(),s._18(3,["\n            "])),(l()(),s._19(0,null,3,32,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(l()(),s._18(null,["\n               "])),(l()(),s._18(null,["\n                \n                "])),(l()(),s._18(null,["\n                "])),(l()(),s._19(0,null,null,7,"div",[],null,null,null,null,null)),(l()(),s._18(null,["\n                  "])),(l()(),s._25(16777216,null,null,1,null,t)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n                  "])),(l()(),s._25(16777216,null,null,1,null,e)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n                "])),(l()(),s._18(null,["\n                "])),(l()(),s._19(0,null,null,18,"div",[["class","relative lang-container"]],null,null,null,null,null)),(l()(),s._18(null,["\n                    "])),(l()(),s._19(0,null,null,15,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==s._22(l,25)._click(u)&&t}if("keyup.space"===n){t=!1!==s._22(l,25)._keyup()&&t}if("ngModelChange"===n){t=!1!==(e.lang=u)&&t}if("ionChange"===n){t=!1!==e.setLocale()&&t}return t},z.a,z.b)),s._20(1228800,null,1,S.a,[C.a,y.a,g.c,s.H,s.I,[2,m.a],N.b],{color:[0,"color"],interface:[1,"interface"]},{ionChange:"ionChange"}),s._21(603979776,1,{options:1}),s._32(1024,null,E.f,function(l){return[l]},[S.a]),s._20(671744,null,0,E.g,[[8,null],[8,null],[8,null],[2,E.f]],{model:[0,"model"]},{update:"ngModelChange"}),s._32(2048,null,E.h,null,[E.g]),s._20(16384,null,0,E.i,[E.h],null,null),(l()(),s._18(null,["\n                        "])),(l()(),s._19(0,null,null,2,"ion-option",[["value","en"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,j.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(l()(),s._18(null,["\n                            English\n                        "])),(l()(),s._18(null,["\n                        "])),(l()(),s._19(0,null,null,2,"ion-option",[["value","fr"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,j.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(l()(),s._18(null,["\n                            French\n                        "])),(l()(),s._18(null,["\n                    "])),(l()(),s._18(null,["\n                "])),(l()(),s._18(null,["\n                 \n            "])),(l()(),s._18(3,["\n            "])),(l()(),s._19(0,null,3,17,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(l()(),s._18(null,["\n                "])),(l()(),s._18(null,["\n                "])),(l()(),s._25(16777216,null,null,1,null,o)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n                "])),(l()(),s._25(16777216,null,null,1,null,a)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n                "])),(l()(),s._25(16777216,null,null,1,null,i)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n               "])),(l()(),s._18(null,["\n                "])),(l()(),s._18(null,["\n                "])),(l()(),s._25(16777216,null,null,1,null,r)),s._20(16384,null,0,O.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(l()(),s._18(null,["\n                "])),(l()(),s._18(null,["\n            "])),(l()(),s._18(3,["\n        "])),(l()(),s._18(null,["\n        "])),(l()(),s._18(null,["\n    "])),(l()(),s._18(null,["\n"]))],function(l,n){var u=n.component;l(n,16,0,"loggedin"==u.header),l(n,19,0,"notloggedin"==u.header||"new"==u.header);l(n,25,0,"gray-link","popover"),l(n,28,0,u.lang);l(n,33,0,s._31(1,"",u.langSelect,""),"en");l(n,37,0,s._31(1,"",!u.langSelect,""),"fr"),l(n,47,0,"notloggedin"==u.header),l(n,50,0,"notloggedin"==u.header),l(n,53,0,"new"==u.header),l(n,58,0,"loggedin"==u.header)},function(l,n){l(n,6,0,s._22(n,7)._hidden,s._22(n,7)._sbPadding),l(n,24,0,s._22(n,25)._disabled,s._22(n,30).ngClassUntouched,s._22(n,30).ngClassTouched,s._22(n,30).ngClassPristine,s._22(n,30).ngClassDirty,s._22(n,30).ngClassValid,s._22(n,30).ngClassInvalid,s._22(n,30).ngClassPending)})}function c(l){return s._17(0,[(l()(),s._19(0,null,null,1,"logged-in-header",[],null,null,null,_,G)),s._20(114688,null,0,M.a,[F.a,D.a,A.a,B.a,b.a,U.a,s.g],null,null)],function(l,n){l(n,1,0)},null)}var s=u(0),d=u(110),g=u(1),p=u(44),f=u(20),h=u(109),b=u(19),v=u(174),m=u(23),y=u(17),k=u(37),I=u(77),T=u(116),w=u(36),x=u(278),H=u(75),C=u(8),L=u(3),P=u(22),O=u(10),M=u(274),z=u(279),S=u(108),N=u(14),E=u(27),j=u(78),F=u(76),D=u(28),A=u(45),B=u(35),U=u(43);u.d(n,"c",function(){return G}),n.b=_,u.d(n,"a",function(){return V});var R=[],G=s._16({encapsulation:2,styles:R,data:{}}),V=s._23("logged-in-header",M.a,c,{},{},[])},278:function(l,n,u){"use strict";function t(l){return o._17(0,[(l()(),o._19(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._20(278528,null,0,a.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._19(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.backButtonClick(u)&&t}return t},r.a,r.b)),o._20(278528,null,0,a.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(1097728,null,0,_.a,[[8,"bar-button"],c.c,o.H,o.I],null,null),(l()(),o._19(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._20(278528,null,0,a.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(147456,null,0,s.a,[c.c,o.H,o.I],{name:[0,"name"]},null),(l()(),o._19(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._20(278528,null,0,a.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._18(null,["",""])),o._24(null,0),o._24(null,1),o._24(null,2),(l()(),o._19(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._20(278528,null,0,a.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._24(null,3)],function(l,n){var u=n.component;l(n,1,0,"toolbar-background","toolbar-background-"+u._mode);l(n,3,0,"back-button","back-button-"+u._mode);l(n,6,0,"back-button-icon","back-button-icon-"+u._mode),l(n,7,0,u._bbIcon);l(n,9,0,"back-button-text","back-button-text-"+u._mode);l(n,15,0,"toolbar-content","toolbar-content-"+u._mode)},function(l,n){var u=n.component;l(n,2,0,u._hideBb),l(n,5,0,o._22(n,7)._hidden),l(n,10,0,u._backText)})}function e(l){return o._17(0,[(l()(),o._19(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,t,h)),o._20(49152,null,0,i.a,[d.a,[2,g.a],[2,p.a],c.c,o.H,o.I],null,null)],null,function(l,n){l(n,0,0,o._22(n,1)._hidden,o._22(n,1)._sbPadding)})}var o=u(0),a=u(10),i=u(75),r=u(44),_=u(20),c=u(1),s=u(36),d=u(8),g=u(3),p=u(22);u.d(n,"b",function(){return h}),n.a=t;var f=[],h=o._16({encapsulation:2,styles:f,data:{}});o._23("ion-navbar",i.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},279:function(l,n,u){"use strict";function t(l){return i._17(0,[(l()(),i._19(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(l()(),i._18(null,["",""]))],null,function(l,n){l(n,1,0,n.component.placeholder)})}function e(l){return i._17(0,[(l()(),i._19(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(l()(),i._18(null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,u.selectedText||u._text)})}function o(l){return i._17(0,[(l()(),i._25(16777216,null,null,1,null,t)),i._20(16384,null,0,r.k,[i.L,i.N],{ngIf:[0,"ngIf"]},null),(l()(),i._25(16777216,null,null,1,null,e)),i._20(16384,null,0,r.k,[i.L,i.N],{ngIf:[0,"ngIf"]},null),(l()(),i._19(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(l()(),i._19(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(l()(),i._19(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,_.a,_.b)),i._20(1097728,null,0,c.a,[[8,"item-cover"],s.c,i.H,i.I],null,null)],function(l,n){var u=n.component;l(n,1,0,!u._text),l(n,3,0,u._text)},function(l,n){var u=n.component;l(n,6,0,u.id,u._labelId,u._disabled)})}function a(l){return i._17(0,[(l()(),i._19(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==i._22(l,1)._click(u)&&t}if("keyup.space"===n){t=!1!==i._22(l,1)._keyup()&&t}return t},o,m)),i._20(1228800,null,1,d.a,[g.a,p.a,s.c,i.H,i.I,[2,f.a],h.b],null,null),i._21(603979776,1,{options:1}),i._32(5120,null,b.f,function(l){return[l]},[d.a])],null,function(l,n){l(n,0,0,i._22(n,1)._disabled)})}var i=u(0),r=u(10),_=u(44),c=u(20),s=u(1),d=u(108),g=u(8),p=u(17),f=u(23),h=u(14),b=u(27);u.d(n,"b",function(){return m}),n.a=o;var v=[],m=i._16({encapsulation:2,styles:v,data:{}});i._23("ion-select",d.a,a,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},410:function(l,n,u){"use strict";u(0),u(72);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n){this.navCtrl=l,this.navParams=n}return l.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad OrganizationPage")},l}())},440:function(l,n,u){"use strict";u(0),u(72),u(410),u(276);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},441:function(l,n,u){"use strict";function t(l){return o._17(0,[(l()(),o._18(null,["\n"])),(l()(),o._18(null,["\n\n"])),(l()(),o._19(0,null,null,6,"ion-header",[],null,null,null,null,null)),o._20(16384,null,0,a.a,[i.c,o.H,o.I,[2,r.a]],null,null),(l()(),o._18(null,["\n    "])),(l()(),o._19(0,null,null,2,"logged-in-header",[],null,null,null,_.b,_.c)),o._20(114688,null,0,c.a,[s.a,d.a,g.a,p.a,f.a,h.a,o.g],null,null),(l()(),o._18(null,[" "])),(l()(),o._18(null,["\n"])),(l()(),o._18(null,["\n\n"])),(l()(),o._18(null,["\n\n\n"])),(l()(),o._19(0,null,null,150,"ion-content",[["padding",""]],[[2,"statusbar-padding",null]],null,null,b.a,b.b)),o._20(4374528,null,0,v.a,[i.c,m.b,y.a,o.H,o.I,k.a,I.a,o.g,[2,r.a],[2,T.a]],null,null),(l()(),o._18(1,["\n\n "])),(l()(),o._19(0,null,1,146,"div",[["class","container organization"],["p-h-20",""]],null,null,null,null,null)),(l()(),o._18(null,["\n\n    "])),(l()(),o._19(0,null,null,143,"ion-grid",[["class","grid grid"],["m-t-15",""],["p-h-30",""]],null,null,null,null,null)),o._20(16384,null,0,w.a,[],null,null),(l()(),o._18(null,["\n        "])),(l()(),o._19(0,null,null,139,"ion-row",[["class","row dashboard__row row"]],null,null,null,null,null)),o._20(16384,null,0,x.a,[],null,null),(l()(),o._18(null,["\n            "])),(l()(),o._19(0,null,null,135,"ion-col",[["class","col col"],["col-12",""],["m-b-20",""]],null,null,null,null,null)),o._20(16384,null,0,H.a,[],null,null),(l()(),o._18(null,["\n                "])),(l()(),o._18(null,["\n                "])),(l()(),o._19(0,null,null,18,"ion-row",[["class","row"]],null,null,null,null,null)),o._20(16384,null,0,x.a,[],null,null),(l()(),o._18(null,["\n\t                "])),(l()(),o._19(0,null,null,14,"ion-col",[["class","col"]],null,null,null,null,null)),o._20(16384,null,0,H.a,[],null,null),(l()(),o._18(null,["\n\t                "])),(l()(),o._19(0,null,null,10,"div",[["class","organization__title"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t                \t"])),(l()(),o._19(0,null,null,3,"h5",[],null,null,null,null,null)),(l()(),o._18(null,["Join "])),(l()(),o._19(0,null,null,1,"b",[],null,null,null,null,null)),(l()(),o._18(null,["an Organisation"])),(l()(),o._18(null,["\n\t                \t"])),(l()(),o._19(0,null,null,2,"span",[["class","dis-block"],["color","text"],["font-weight-5",""],["ion-text",""],["m-t-5",""],["no-margin",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Here’s a match for you"])),(l()(),o._18(null,["\n\t                "])),(l()(),o._18(null,["\n\t                "])),(l()(),o._18(null,["\n                "])),(l()(),o._18(null,["\n                "])),(l()(),o._19(0,null,null,110,"ion-row",[["class","row"]],null,null,null,null,null)),o._20(16384,null,0,x.a,[],null,null),(l()(),o._18(null,["\n\t\t\t\t    "])),(l()(),o._19(0,null,null,76,"ion-col",[["class","col col"],["col-md-8",""]],null,null,null,null,null)),o._20(16384,null,0,H.a,[],null,null),(l()(),o._18(null,["\n\t\t\t\t    \t"])),(l()(),o._19(0,null,null,72,"div",[["class","organization__container"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._19(0,null,null,5,"div",[["class","organization__match"],["m-v-30",""]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,2,"p",[["color","gray"],["ion-text",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["We found an organisation that matches your domain name. Would you like to join?"])),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._19(0,null,null,51,"div",[["class","domain-name flex-row direction-col"],["p-t-10",""]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,9,"div",[["class","entries flex-row"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,2,"p",[["class","row-title"],["color","gray"],["ion-text",""],["m-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Name"])),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,2,"p",[["font-weight-5",""],["ion-text",""],["m-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],null,null),(l()(),o._18(null,["Ajency.in"])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,9,"div",[["class","entries flex-row"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,2,"p",[["class","row-title"],["color","gray"],["ion-text",""],["m-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Domain"])),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,2,"p",[["font-weight-5",""],["ion-text",""],["m-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],null,null),(l()(),o._18(null,["@ ajency.in"])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,26,"div",[["class","entries flex-row"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,2,"p",[["class","row-title"],["color","gray"],["ion-text",""],["m-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Time Zone"])),(l()(),o._18(null,["\n\t\t\t                \t\t"])),(l()(),o._19(0,null,null,19,"div",[["class","select-time"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t    "])),(l()(),o._19(0,null,null,16,"ion-select",[["interface","popover"]],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==o._22(l,94)._click(u)&&t}if("keyup.space"===n){t=!1!==o._22(l,94)._keyup()&&t}return t},L.a,L.b)),o._20(1228800,null,1,P.a,[k.a,O.a,i.c,o.H,o.I,[2,M.a],z.b],{interface:[0,"interface"]},null),o._21(603979776,1,{options:1}),o._32(5120,null,S.f,function(l){return[l]},[P.a]),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t      "])),(l()(),o._19(0,null,null,2,"ion-option",[["selected","true"],["value","i"]],null,null,null,null,null)),o._20(16384,[[1,4]],0,N.a,[o.H],{selected:[0,"selected"],value:[1,"value"]},null),(l()(),o._18(null,["India (GMT+05:30)"])),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t      "])),(l()(),o._19(0,null,null,2,"ion-option",[["value","u"]],null,null,null,null,null)),o._20(16384,[[1,4]],0,N.a,[o.H],{value:[0,"value"]},null),(l()(),o._18(null,["United Kingdom(GMT)"])),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t      "])),(l()(),o._19(0,null,null,2,"ion-option",[["value","us"]],null,null,null,null,null)),o._20(16384,[[1,4]],0,N.a,[o.H],{value:[0,"value"]},null),(l()(),o._18(null,["United States of America (GMT-05:00)"])),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t    "])),(l()(),o._18(null,["\n\t\t\t\t\t\t\t\t\t  "])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._19(0,null,null,9,"div",[["class","organization-change flex-row space-between"],["m-t-30",""]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,2,"button",[["class","no-organization"],["clear",""],["color","primary"],["ion-button",""],["p-l-0",""]],null,null,null,E.a,E.b)),o._20(1097728,null,0,j.a,[[8,""],i.c,o.H,o.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),o._18(0,["Not the organisation you were looking for?"])),(l()(),o._18(null,["\n\t\t\t                \t"])),(l()(),o._19(0,null,null,2,"button",[["color","primary"],["ion-button",""],["text-capitalize",""]],null,null,null,E.a,E.b)),o._20(1097728,null,0,j.a,[[8,""],i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(0,["Join Organisation"])),(l()(),o._18(null,["\n\t\t\t                "])),(l()(),o._18(null,["\n\t\t\t\t    \t"])),(l()(),o._18(null,["\n\t\t\t\t    "])),(l()(),o._18(null,["\n\t\t\t\t    "])),(l()(),o._19(0,null,null,28,"ion-col",[["class","col col"],["col-md-4",""]],null,null,null,null,null)),o._20(16384,null,0,H.a,[],null,null),(l()(),o._18(null,["\n\t\t\t\t\t    "])),(l()(),o._19(0,null,null,24,"div",[["class","organization__info-container"],["text-center",""]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t\t\t    \t"])),(l()(),o._19(0,null,null,6,"div",[["class","organization__info"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t\t\t    \t\t"])),(l()(),o._19(0,null,null,0,"img",[["src","../../assets/img/company-icon.png"]],null,null,null,null,null)),(l()(),o._18(null,["\t\t\n\t\t\t\t\t    \t\t"])),(l()(),o._19(0,null,null,1,"h6",[["p-v-10",""]],null,null,null,null,null)),(l()(),o._18(null,["Organisation"])),(l()(),o._18(null,["\n\t\t\t\t\t    \t"])),(l()(),o._18(null,["\n\t\t\t\t\t      \t"])),(l()(),o._19(0,null,null,13,"div",[["class","organization__points"]],null,null,null,null,null)),(l()(),o._18(null,["\n\t\t\t\t\t      \t\t"])),(l()(),o._19(0,null,null,2,"span",[["class","dis-block"],["color","text-lighter"],["ion-text",""],["p-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Create an organisation to manage your employees and projects in one place"])),(l()(),o._18(null,["\n\t\t\t\t\t    \t\t"])),(l()(),o._19(0,null,null,2,"span",[["class","dis-block"],["color","text-lighter"],["ion-text",""],["p-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Choose a unique domain name for each organisation you create"])),(l()(),o._18(null,["\n\t\t\t\t\t    \t\t"])),(l()(),o._19(0,null,null,2,"span",[["class","dis-block"],["color","text-lighter"],["ion-text",""],["p-v-10",""]],null,null,null,null,null)),o._20(16384,null,0,C.a,[i.c,o.H,o.I],{color:[0,"color"]},null),(l()(),o._18(null,["Generate reports for your entire organisation automatically"])),(l()(),o._18(null,["\n\t\t\t\t\t      \t"])),(l()(),o._18(null,["\n\t\t\t\t\t    "])),(l()(),o._18(null,["\n\t\t\t\t    "])),(l()(),o._18(null,["\n\t\t\t\t "])),(l()(),o._18(null,["\n                \n            "])),(l()(),o._18(null,["\n        "])),(l()(),o._18(null,["\n    "])),(l()(),o._18(null,["\n\n "])),(l()(),
o._18(1,["\n\n\n"])),(l()(),o._18(null,["\n\n\n\n\n\n\n\n\n\n\n\n"]))],function(l,n){l(n,6,0);l(n,40,0,"text");l(n,57,0,"gray");l(n,66,0,"gray");l(n,77,0,"gray");l(n,88,0,"gray");l(n,94,0,"popover");l(n,99,0,"true","i");l(n,103,0,"u");l(n,107,0,"us");l(n,117,0,"primary","");l(n,121,0,"primary");l(n,143,0,"text-lighter");l(n,147,0,"text-lighter");l(n,151,0,"text-lighter")},function(l,n){l(n,11,0,o._22(n,12).statusbarPadding),l(n,93,0,o._22(n,94)._disabled)})}function e(l){return o._17(0,[(l()(),o._19(0,null,null,1,"page-organization",[],null,null,null,t,B)),o._20(49152,null,0,F.a,[T.a,D.a],null,null)],null,null)}var o=u(0),a=u(113),i=u(1),r=u(3),_=u(277),c=u(274),s=u(76),d=u(28),g=u(45),p=u(35),f=u(19),h=u(43),b=u(275),v=u(74),m=u(5),y=u(11),k=u(8),I=u(16),T=u(22),w=u(123),x=u(124),H=u(122),C=u(110),L=u(279),P=u(108),O=u(17),M=u(23),z=u(14),S=u(27),N=u(78),E=u(44),j=u(20),F=u(410),D=u(9);u.d(n,"a",function(){return U});var A=[],B=o._16({encapsulation:2,styles:A,data:{}}),U=o._23("page-organization",F.a,e,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/5.main.js.map