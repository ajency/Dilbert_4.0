webpackJsonp([3],{264:function(n,l,u){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var t=u(0),e=u(432),o=u(10),i=u(27),a=u(111),r=u(73),_=u(275),c=u(283),s=u(280),g=u(50),d=u(49),f=u(51),p=u(48),h=u(19),b=u(166),v=u(167),m=u(168),k=u(169),y=u(170),I=u(171),T=u(172),C=u(173),L=u(276),H=u(284),w=u(281),x=u(433),O=u(79),P=u(406),j=u(30);u.d(l,"LoginPageModuleNgFactory",function(){return N});var S=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,l){n.__proto__=l}||function(n,l){for(var u in l)l.hasOwnProperty(u)&&(n[u]=l[u])};return function(l,u){function t(){this.constructor=l}n(l,u),l.prototype=null===u?Object.create(u):(t.prototype=u.prototype,new t)}}(),M=function(n){function l(l){return n.call(this,l,[b.a,v.a,m.a,k.a,y.a,I.a,T.a,C.a,L.a,H.a,w.a,x.a],[])||this}return S(l,n),Object.defineProperty(l.prototype,"_NgLocalization_11",{get:function(){return null==this.__NgLocalization_11&&(this.__NgLocalization_11=new o.a(this.parent.get(t.c))),this.__NgLocalization_11},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_ɵi_12",{get:function(){return null==this.__ɵi_12&&(this.__ɵi_12=new i.a),this.__ɵi_12},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_FormBuilder_13",{get:function(){return null==this.__FormBuilder_13&&(this.__FormBuilder_13=new i.b),this.__FormBuilder_13},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateLoader_15",{get:function(){return null==this.__TranslateLoader_15&&(this.__TranslateLoader_15=new g.b),this.__TranslateLoader_15},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateCompiler_16",{get:function(){return null==this.__TranslateCompiler_16&&(this.__TranslateCompiler_16=new d.a),this.__TranslateCompiler_16},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateParser_17",{get:function(){return null==this.__TranslateParser_17&&(this.__TranslateParser_17=new f.a),this.__TranslateParser_17},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_MissingTranslationHandler_18",{get:function(){return null==this.__MissingTranslationHandler_18&&(this.__MissingTranslationHandler_18=new p.a),this.__MissingTranslationHandler_18},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateService_21",{get:function(){return null==this.__TranslateService_21&&(this.__TranslateService_21=new h.a(this.parent.get(O.a),this._TranslateLoader_15,this._TranslateCompiler_16,this._TranslateParser_17,this._MissingTranslationHandler_18,this._USE_DEFAULT_LANG_20,this._USE_STORE_19)),this.__TranslateService_21},enumerable:!0,configurable:!0}),l.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new i.c,this._FormsModule_2=new i.d,this._ReactiveFormsModule_3=new i.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._TranslateModule_6=new r.a,this._LoggedInHeaderComponentModule_7=new _.a,this._SignInCardComponentModule_8=new c.a,this._FooterComponentModule_9=new s.a,this._LoginPageModule_10=new e.a,this._LAZY_LOADED_TOKEN_14=P.a,this._USE_STORE_19=void 0,this._USE_DEFAULT_LANG_20=void 0,this._LoginPageModule_10},l.prototype.getInternal=function(n,l){return n===o.d?this._CommonModule_0:n===i.c?this._ɵba_1:n===i.d?this._FormsModule_2:n===i.e?this._ReactiveFormsModule_3:n===a.b?this._IonicModule_4:n===a.c?this._IonicPageModule_5:n===r.a?this._TranslateModule_6:n===_.a?this._LoggedInHeaderComponentModule_7:n===c.a?this._SignInCardComponentModule_8:n===s.a?this._FooterComponentModule_9:n===e.a?this._LoginPageModule_10:n===o.e?this._NgLocalization_11:n===i.a?this._ɵi_12:n===i.b?this._FormBuilder_13:n===j.d?this._LAZY_LOADED_TOKEN_14:n===g.a?this._TranslateLoader_15:n===d.b?this._TranslateCompiler_16:n===f.b?this._TranslateParser_17:n===p.b?this._MissingTranslationHandler_18:n===h.b?this._USE_STORE_19:n===h.c?this._USE_DEFAULT_LANG_20:n===h.a?this._TranslateService_21:l},l.prototype.destroyInternal=function(){},l}(t.x),N=new t.y(M,e.a)},273:function(n,l,u){"use strict";u(0),u(72),u(29),u(35),u(43),u(73);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,l,u,t,e,o,i){this.popoverCtrl=n,this.cookieservice=l,this.events=u,this.appservice=t,this.translate=e,this.appglobals=o,this.zone=i,this.langSelect=!0,this.param={value:"world"},"en"==this.appglobals.lang?this.langSelect=!0:this.langSelect=!1}return n.prototype.ngOnInit=function(){"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},n.prototype.ionViewDidLoad=function(){this.zone.run(function(){})},n.prototype.setLocale=function(){console.log(this.lang),this.events.publish("app:localize",this.lang)},n.prototype.openPopover=function(n){this.popoverCtrl.create("PopoverPage",{}).present({ev:n})},n.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},n.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},n}())},274:function(n,l,u){"use strict";function t(n){return o._17(2,[o._21(402653184,1,{_fixedContent:0}),o._21(402653184,2,{_scrollContent:0}),(n()(),o._19(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._24(null,0),(n()(),o._19(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._24(null,1),o._24(null,2)],null,null)}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,t,p)),o._20(4374528,null,0,i.a,[a.c,r.b,_.a,o.H,o.I,c.a,s.a,o.g,[2,g.a],[2,d.a]],null,null)],null,function(n,l){n(l,0,0,o._22(l,1).statusbarPadding)})}var o=u(0),i=u(74),a=u(1),r=u(5),_=u(11),c=u(8),s=u(16),g=u(3),d=u(22);u.d(l,"b",function(){return p}),l.a=t;var f=[],p=o._16({encapsulation:2,styles:f,data:{}});o._23("ion-content",i.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},275:function(n,l,u){"use strict";u(0),u(72),u(273),u(73);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,function(){function n(){}return n}())},276:function(n,l,u){"use strict";function t(n){return s._17(0,[(n()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(n()(),s._18(null,["\n                      "])),(n()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),s._20(16384,null,0,g.a,[d.c,s.H,s.I],{color:[0,"color"]},null),(n()(),s._18(null,["\n                          Ajency.in\n                      "])),(n()(),s._18(null,["\n                  "]))],function(n,l){n(l,3,0,"secondary")},null)}function e(n){return s._17(0,[(n()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(n()(),s._18(null,["\n                      "])),(n()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),s._20(16384,null,0,g.a,[d.c,s.H,s.I],{color:[0,"color"]},null),(n()(),s._18(null,["\n                          DILBERT\n                      "])),(n()(),s._18(null,["\n                  "]))],function(n,l){n(l,3,0,"secondary")},null)}function o(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.navigateToLogin()&&t}return t},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                ","\n                    \n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("login")))})}function i(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.navigateToRegister()&&t}return t},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("register")))})}function a(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("contact us")))})}function r(n){return s._17(0,[(n()(),s._19(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.openPopover(u)&&t}return t},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{clear:[0,"clear"]},null),(n()(),s._18(0,["\n                    "])),(n()(),s._19(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,v.a,v.b)),s._20(1097728,null,3,m.a,[k.a,d.c,s.H,s.I,[2,y.a]],null,null),s._21(335544320,2,{contentLabel:0}),s._21(603979776,3,{_buttons:1}),s._21(603979776,4,{_icons:1}),s._20(16384,null,0,I.a,[],null,null),(n()(),s._18(2,["\n                        "])),(n()(),s._19(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),s._20(16384,null,0,T.a,[],null,null),(n()(),s._18(null,["\n                            "])),(n()(),s._19(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),s._18(null,["\n                        "])),(n()(),s._18(2,["\n                        "])),(n()(),s._19(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),s._20(147456,[[4,4]],0,C.a,[d.c,s.H,s.I],{name:[0,"name"]},null),(n()(),s._18(null,["\n                        "])),(n()(),s._18(2,["\n                    "])),(n()(),s._18(0,["\n                "]))],function(n,l){n(l,1,0,"");n(l,17,0,"arrow-dropdown")},function(n,l){var u=l.component;n(l,13,0,s._31(1,"",u.image,"")),n(l,16,0,s._22(l,17)._hidden)})}function _(n){return s._17(0,[(n()(),s._18(null,["\n"])),(n()(),s._19(0,null,null,73,"div",[["class","main-header shadow-1"]],null,null,null,null,null)),(n()(),s._18(null,["\n    "])),(n()(),s._19(0,null,null,70,"div",[["class","container"]],null,null,null,null,null)),(n()(),s._18(null,["\n        "])),(n()(),s._18(null,["\n        "])),(n()(),s._19(0,null,null,65,"ion-navbar",[["class","dilbert-nav toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,L.a,L.b)),s._20(49152,null,0,H.a,[w.a,[2,x.a],[2,O.a],d.c,s.H,s.I],null,null),(n()(),s._18(3,["\n            "])),(n()(),s._19(0,null,3,42,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,9,"div",[],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,6,"button",[["class","ham"],["clear",""],["color","text"],["icon-only",""],["ion-button",""],["m-h-0",""],["menutoggle",""]],null,null,null,f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                  "])),(n()(),s._19(0,null,0,2,"ion-icon",[["name","menu"],["role","img"]],[[2,"hide",null]],null,null,null,null)),s._20(147456,null,0,C.a,[d.c,s.H,s.I],{name:[0,"name"]},null),(n()(),s._18(null,["\n                  "])),(n()(),s._18(0,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,7,"div",[],null,null,null,null,null)),(n()(),s._18(null,["\n                  "])),(n()(),s._25(16777216,null,null,1,null,t)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                  "])),(n()(),s._25(16777216,null,null,1,null,e)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,18,"div",[["class","relative lang-container"]],null,null,null,null,null)),(n()(),s._18(null,["\n                    "])),(n()(),s._19(0,null,null,15,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"click"],[null,"keyup.space"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==s._22(n,35)._click(u)&&t}if("keyup.space"===l){t=!1!==s._22(n,35)._keyup()&&t}if("ngModelChange"===l){t=!1!==(e.lang=u)&&t}if("ionChange"===l){t=!1!==e.setLocale()&&t}return t},S.a,S.b)),s._20(1228800,null,1,M.a,[w.a,k.a,d.c,s.H,s.I,[2,m.a],N.b],{color:[0,"color"],interface:[1,"interface"]},{ionChange:"ionChange"}),s._21(603979776,1,{options:1}),s._32(1024,null,E.f,function(n){return[n]},[M.a]),s._20(671744,null,0,E.g,[[8,null],[8,null],[8,null],[2,E.f]],{model:[0,"model"]},{update:"ngModelChange"}),s._32(2048,null,E.h,null,[E.g]),s._20(16384,null,0,E.i,[E.h],null,null),(n()(),s._18(null,["\n                        "])),(n()(),s._19(0,null,null,2,"ion-option",[["value","en"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,B.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(n()(),s._18(null,["\n                            English\n                        "])),(n()(),s._18(null,["\n                        "])),(n()(),s._19(0,null,null,2,"ion-option",[["value","fr"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,B.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(n()(),s._18(null,["\n                            French\n                        "])),(n()(),s._18(null,["\n                    "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                 \n            "])),(n()(),s._18(3,["\n            "])),(n()(),s._19(0,null,3,17,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,o)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,i)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,a)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n               "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,r)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n            "])),(n()(),s._18(3,["\n        "])),(n()(),s._18(null,["\n        "])),(n()(),s._18(null,["\n    "])),(n()(),s._18(null,["\n"]))],function(n,l){var u=l.component;n(l,14,0,"text","");n(l,17,0,"menu"),n(l,26,0,"loggedin"==u.header),n(l,29,0,"notloggedin"==u.header||"new"==u.header);n(l,35,0,"gray-link","popover"),n(l,38,0,u.lang);n(l,43,0,s._31(1,"",u.langSelect,""),"en");n(l,47,0,s._31(1,"",!u.langSelect,""),"fr"),n(l,57,0,"notloggedin"==u.header),n(l,60,0,"notloggedin"==u.header),n(l,63,0,"new"==u.header),n(l,68,0,"loggedin"==u.header)},function(n,l){n(l,6,0,s._22(l,7)._hidden,s._22(l,7)._sbPadding),n(l,16,0,s._22(l,17)._hidden),n(l,34,0,s._22(l,35)._disabled,s._22(l,40).ngClassUntouched,s._22(l,40).ngClassTouched,s._22(l,40).ngClassPristine,s._22(l,40).ngClassDirty,s._22(l,40).ngClassValid,s._22(l,40).ngClassInvalid,s._22(l,40).ngClassPending)})}function c(n){return s._17(0,[(n()(),s._19(0,null,null,1,"logged-in-header",[],null,null,null,_,V)),s._20(114688,null,0,j.a,[R.a,F.a,D.a,A.a,b.a,z.a,s.g],null,null)],function(n,l){n(l,1,0)},null)}var s=u(0),g=u(110),d=u(1),f=u(44),p=u(20),h=u(108),b=u(19),v=u(174),m=u(23),k=u(17),y=u(37),I=u(77),T=u(116),C=u(36),L=u(277),H=u(75),w=u(8),x=u(3),O=u(22),P=u(10),j=u(273),S=u(278),M=u(109),N=u(14),E=u(27),B=u(78),R=u(76),F=u(28),D=u(45),A=u(35),z=u(43);u.d(l,"c",function(){return V}),l.b=_,u.d(l,"a",function(){return q});var U=[],V=s._16({encapsulation:2,styles:U,data:{}}),q=s._23("logged-in-header",j.a,c,{},{},[])},277:function(n,l,u){"use strict";function t(n){return o._17(0,[(n()(),o._19(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),o._19(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.backButtonClick(u)&&t}return t},r.a,r.b)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(1097728,null,0,_.a,[[8,"bar-button"],c.c,o.H,o.I],null,null),(n()(),o._19(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(147456,null,0,s.a,[c.c,o.H,o.I],{name:[0,"name"]},null),(n()(),o._19(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),o._18(null,["",""])),o._24(null,0),o._24(null,1),o._24(null,2),(n()(),o._19(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._24(null,3)],function(n,l){var u=l.component;n(l,1,0,"toolbar-background","toolbar-background-"+u._mode);n(l,3,0,"back-button","back-button-"+u._mode);n(l,6,0,"back-button-icon","back-button-icon-"+u._mode),n(l,7,0,u._bbIcon);n(l,9,0,"back-button-text","back-button-text-"+u._mode);n(l,15,0,"toolbar-content","toolbar-content-"+u._mode)},function(n,l){var u=l.component;n(l,2,0,u._hideBb),n(l,5,0,o._22(l,7)._hidden),n(l,10,0,u._backText)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,t,h)),o._20(49152,null,0,a.a,[g.a,[2,d.a],[2,f.a],c.c,o.H,o.I],null,null)],null,function(n,l){n(l,0,0,o._22(l,1)._hidden,o._22(l,1)._sbPadding)})}var o=u(0),i=u(10),a=u(75),r=u(44),_=u(20),c=u(1),s=u(36),g=u(8),d=u(3),f=u(22);u.d(l,"b",function(){return h}),l.a=t;var p=[],h=o._16({encapsulation:2,styles:p,data:{}});o._23("ion-navbar",a.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},278:function(n,l,u){"use strict";function t(n){return a._17(0,[(n()(),a._19(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(n()(),a._18(null,["",""]))],null,function(n,l){n(l,1,0,l.component.placeholder)})}function e(n){return a._17(0,[(n()(),a._19(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(n()(),a._18(null,["",""]))],null,function(n,l){var u=l.component;n(l,1,0,u.selectedText||u._text)})}function o(n){return a._17(0,[(n()(),a._25(16777216,null,null,1,null,t)),a._20(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(n()(),a._25(16777216,null,null,1,null,e)),a._20(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(n()(),a._19(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(n()(),a._19(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(n()(),a._19(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,_.a,_.b)),a._20(1097728,null,0,c.a,[[8,"item-cover"],s.c,a.H,a.I],null,null)],function(n,l){var u=l.component;n(l,1,0,!u._text),n(l,3,0,u._text)},function(n,l){var u=l.component;n(l,6,0,u.id,u._labelId,u._disabled)})}function i(n){return a._17(0,[(n()(),a._19(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(n,l,u){var t=!0;if("click"===l){t=!1!==a._22(n,1)._click(u)&&t}if("keyup.space"===l){t=!1!==a._22(n,1)._keyup()&&t}return t},o,m)),a._20(1228800,null,1,g.a,[d.a,f.a,s.c,a.H,a.I,[2,p.a],h.b],null,null),a._21(603979776,1,{options:1}),a._32(5120,null,b.f,function(n){return[n]},[g.a])],null,function(n,l){n(l,0,0,a._22(l,1)._disabled)})}var a=u(0),r=u(10),_=u(44),c=u(20),s=u(1),g=u(109),d=u(8),f=u(17),p=u(23),h=u(14),b=u(27);u.d(l,"b",function(){return m}),l.a=o;var v=[],m=a._16({encapsulation:2,styles:v,data:{}});a._23("ion-select",g.a,i,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},279:function(n,l,u){"use strict";u(0),u(43);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function n(n){this.appglobals=n,this.version="",this.version=this.appglobals.getAppVersion()}return n}())},280:function(n,l,u){"use strict";u(0),u(72),u(279),u(73);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,function(){function n(){}return n}())},281:function(n,l,u){"use strict";function t(n){return o._17(0,[(n()(),o._18(null,["\n"])),(n()(),o._19(0,null,null,10,"div",[],null,null,null,null,null)),(n()(),o._18(null,["\n  "])),(n()(),o._19(0,null,null,7,"div",[["align","center"],["padding-vertical",""]],null,null,null,null,null)),(n()(),o._18(null,[" "," "])),o._29(131072,i.a,[a.a,o.T]),(n()(),o._19(0,null,null,1,"a",[["href","https://ajency.in/"]],null,null,null,null,null)),(n()(),o._18(null,["Ajency.in"])),(n()(),o._18(null,[" "])),(n()(),o._19(0,null,null,1,"span",[["class","version-string"]],null,null,null,null,null)),(n()(),o._18(null,[" V",""])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n"]))],null,function(n,l){var u=l.component;n(l,4,0,o._30(l,4,0,o._22(l,5).transform("by"))),n(l,10,0,u.version)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"footer-element",[],null,null,null,t,s)),o._20(49152,null,0,r.a,[_.a],null,null)],null,null)}var o=u(0),i=u(108),a=u(19),r=u(279),_=u(43);u.d(l,"c",function(){return s}),l.b=t,u.d(l,"a",function(){return g});var c=[],s=o._16({encapsulation:2,styles:c,data:{}}),g=o._23("footer-element",r.a,e,{},{},[])},282:function(n,l,u){"use strict";var t=u(10),e=u(0),o=u(72),i=u(47),a=u(35),r=u(29),_=u(112),c=u(52),s=u(46),g=u(43);u.d(l,"a",function(){return h});var d=this&&this.__decorate||function(n,l,u,t){var e,o=arguments.length,i=o<3?l:null===t?t=Object.getOwnPropertyDescriptor(l,u):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,l,u,t);else for(var a=n.length-1;a>=0;a--)(e=n[a])&&(i=(o<3?e(i):o>3?e(l,u,i):e(l,u))||i);return o>3&&i&&Object.defineProperty(l,u,i),i},f=this&&this.__metadata||function(n,l){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,l)},p=this&&this.__param||function(n,l){return function(u,t){l(u,t,n)}},h=function(){function n(n,l,u,t,e,o,i,a,r,_,c,s,g){this.navCtrl=n,this.navParams=l,this.http=u,this.appglobals=t,this.events=e,this.appServiceProvider=o,this.cookieservice=i,this.toastCtrl=a,this.zone=r,this.storage=_,this.userDataProvider=c,this.location=s,this.environment=g,this.domainError=!1,this.logInProcess=!1,this.disableBtn=!1,console.log("Hello SignInCardComponent Component")}return n.prototype.ngOnInit=function(){console.log(this.page),"login"==this.page?this.login=!0:"register"==this.page&&(this.page=!1)},n.prototype.ionViewDidLoad=function(){this.zone.run(function(){})},n.prototype.navigateTo=function(){this.login?this.events.publish("app:navroot","register"):this.events.publish("app:navroot","login")},n.prototype.signin=function(){var n=this;this.logInProcess=!0,this.domainError=!1,this.appServiceProvider.signIn().then(function(l){n.token=l,n.disableBtn=!0,n.zone.run(function(){}),n.postRequest()})},n.prototype.postRequest=function(){var n=this,l=new i.l;l.append("Accept","application/json"),l.append("Content-Type","application/json");var u=this.environment.dilbertApi+"/login/google/"+this.appglobals.lang+"?token="+this.token;console.log(u),this.appServiceProvider.request(u,"get",{},{},!1,"observable","",{},!1).subscribe(function(l){n.loginResponse=l,n.status=n.loginResponse.status,n.next_url=n.loginResponse.next_url,n.storage.set("userData",n.loginResponse.data).then(function(){}),"200"==n.status?"/dashboard"===n.next_url?(n.cookieservice.put("keepLoggedIn","yes"),n.events.publish("app:navroot","dashboard")):"/join_organisation"===n.next_url?(n.cookieservice.put("join","yes"),n.events.publish("app:navroot","join-organisation")):(n.cookieservice.put("create","yes"),n.events.publish("app:navroot","create-organisation")):"400"==n.status&&(n.domainError=!0,n.error_msg=n.loginResponse.message,console.log(n.error_msg),n.disableBtn=!1,n.zone.run(function(){}))},function(n){console.log(n.status)})},n}();h=d([u.i(e._26)({selector:"sign-in-card",templateUrl:"sign-in-card.html"}),p(12,u.i(e.E)(s.a)),f("design:paramtypes",["function"==typeof(b=void 0!==o.a&&o.a)&&b||Object,"function"==typeof(v=void 0!==o.b&&o.b)&&v||Object,"function"==typeof(m=void 0!==i.k&&i.k)&&m||Object,"function"==typeof(k=void 0!==g.a&&g.a)&&k||Object,"function"==typeof(y=void 0!==o.c&&o.c)&&y||Object,"function"==typeof(I=void 0!==a.a&&a.a)&&I||Object,"function"==typeof(T=void 0!==r.b&&r.b)&&T||Object,"function"==typeof(C=void 0!==o.d&&o.d)&&C||Object,"function"==typeof(L=void 0!==e.g&&e.g)&&L||Object,"function"==typeof(H=void 0!==c.b&&c.b)&&H||Object,"function"==typeof(w=void 0!==_.a&&_.a)&&w||Object,"function"==typeof(x=void 0!==t.c&&t.c)&&x||Object,Object])],h);var b,v,m,k,y,I,T,C,L,H,w,x},283:function(n,l,u){"use strict";u(0),u(72),u(282),u(73);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,function(){function n(){}return n}())},284:function(n,l,u){"use strict";function t(n){return h._17(0,[(n()(),h._19(0,null,null,2,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,1,0,h._30(l,1,0,h._22(l,2).transform("account_exist")))})}function e(n){return h._17(0,[(n()(),h._19(0,null,null,3,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(n()(),h._18(null,[""," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,1,0,h._30(l,1,0,h._22(l,2).transform("sign_up")),h._30(l,1,1,h._22(l,3).transform("_change_ur_work_way")))})}function o(n){return h._17(0,[(n()(),h._19(0,null,null,4,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,[""," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"text-lighter")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_in")),h._30(l,2,1,h._22(l,4).transform("n_cont_whr_u_left_off")))})}function i(n){return h._17(0,[(n()(),h._19(0,null,null,3,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,[" "," "])),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"text-lighter")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("conn_using_google_acc")))})}function a(n){return h._17(0,[(n()(),h._19(0,null,null,9,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.signin()&&t}return t},y.a,y.b)),h._20(278528,null,0,I.l,[h.t,h.u,h.H,h.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),h._33(["loading"]),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(0,[" "])),(n()(),h._19(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._20(147456,null,0,C.a,[k.c,h.H,h.I],{name:[0,"name"]},null),(n()(),h._18(0,[" "," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"sign-in",n(l,2,0,l.component.disableBtn));n(l,3,0,"danger-dark");n(l,6,0,"logo-googleplus")},function(n,l){n(l,0,0,l.component.disableBtn),n(l,5,0,h._22(l,6)._hidden),n(l,7,0,h._30(l,7,0,h._22(l,8).transform("sign_in")),h._30(l,7,1,h._22(l,9).transform("with_google")))})}function r(n){return h._17(0,[(n()(),h._19(0,null,null,9,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.signin()&&t}return t},y.a,y.b)),h._20(278528,null,0,I.l,[h.t,h.u,h.H,h.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),h._33(["loading"]),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(0,[" "])),(n()(),h._19(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._20(147456,null,0,C.a,[k.c,h.H,h.I],{name:[0,"name"]},null),(n()(),h._18(0,[" "," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"sign-in",n(l,2,0,l.component.disableBtn));n(l,3,0,"danger-dark");n(l,6,0,"logo-googleplus")},function(n,l){n(l,0,0,l.component.disableBtn),n(l,5,0,h._22(l,6)._hidden),n(l,7,0,h._30(l,7,0,h._22(l,8).transform("sign_up")),h._30(l,7,1,h._22(l,9).transform("with_google")))})}function _(n){return h._17(0,[(n()(),h._19(0,null,null,6,"ion-card",[["class","alert-error"]],null,null,null,null,null)),h._20(16384,null,0,L.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,2,"ion-card-header",[],null,null,null,null,null)),h._20(16384,null,0,H.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t\t","\n\t\t\t\t"])),(n()(),h._18(null,["\n\t\t\t"]))],null,function(n,l){n(l,5,0,l.component.error_msg)})}function c(n){return h._17(0,[(n()(),h._19(0,null,null,3,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("not_conn_2_dilbert")))})}function s(n){return h._17(0,[(n()(),h._19(0,null,null,3,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.navigateTo()&&t}return t},y.a,y.b)),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),h._18(0,[" ","!"])),h._29(131072,b.a,[v.a,h.T])],function(n,l){
n(l,1,0,"primary","")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_up")))})}function g(n){return h._17(0,[(n()(),h._19(0,null,null,3,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("already_hv_acc_in_dil")))})}function d(n){return h._17(0,[(n()(),h._19(0,null,null,3,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(n,l,u){var t=!0,e=n.component;if("click"===l){t=!1!==e.navigateTo()&&t}return t},y.a,y.b)),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),h._18(0,["","!"])),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"primary","")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_in")))})}function f(n){return h._17(0,[(n()(),h._18(null,["\n"])),(n()(),h._19(0,null,null,62,"div",[["class","container"],["p-h-20",""]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\n\n\t"])),(n()(),h._19(0,null,null,59,"div",[["class","login-card"],["text-center",""]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t"])),(n()(),h._19(0,null,null,44,"ion-card",[],null,null,null,null,null)),h._20(16384,null,0,L.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\n\t\t\t"])),(n()(),h._19(0,null,null,0,"img",[["src","./../../assets/img/dilbert.jpg"],["width","80"]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t\t"])),(n()(),h._19(0,null,null,35,"ion-card-content",[],null,null,null,null,null)),h._20(16384,null,0,w.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,11,"ion-card-title",[],null,null,null,null,null)),h._20(16384,null,0,x.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t\t"])),(n()(),h._19(0,null,null,2,"h2",[["class","login-card__title"],["ion-text",""],["m-b-8",""],["text-uppercase",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["Dilbert"])),(n()(),h._18(null,["\n\t\t\t\t\t"])),(n()(),h._19(0,null,null,3,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T]),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,t)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,e)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,o)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,i)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,a)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,r)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t\n\t\t\t"])),(n()(),h._18(null,["\n\n\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,_)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\n\t\t"])),(n()(),h._18(null,["\n\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,c)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,s)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,g)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,d)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t"])),(n()(),h._18(null,["\n\n\t\n\t\n\n"]))],function(n,l){var u=l.component;n(l,21,0,"text-lighter"),n(l,29,0,u.login),n(l,32,0,!u.login),n(l,35,0,u.login),n(l,38,0,!u.login),n(l,41,0,u.login),n(l,44,0,!u.login),n(l,48,0,u.domainError),n(l,52,0,u.login),n(l,55,0,u.login),n(l,58,0,!u.login),n(l,61,0,!u.login)},function(n,l){var u=l.component;n(l,22,0,h._30(l,22,0,h._22(l,23).transform(u.hero_title)))})}function p(n){return h._17(0,[(n()(),h._19(0,null,null,1,"sign-in-card",[],null,null,null,f,U)),h._20(114688,null,0,O.a,[P.a,j.a,S.k,M.a,N.a,E.a,B.a,R.a,h.g,F.c,D.a,I.c,A.a],null,null)],function(n,l){n(l,1,0)},null)}var h=u(0),b=u(108),v=u(19),m=u(110),k=u(1),y=u(44),I=u(10),T=u(20),C=u(36),L=u(121),H=u(119),w=u(118),x=u(120),O=u(282),P=u(22),j=u(9),S=u(47),M=u(43),N=u(45),E=u(35),B=u(28),R=u(80),F=u(115),D=u(112),A=u(46);u.d(l,"c",function(){return U}),l.b=f,u.d(l,"a",function(){return V});var z=[],U=h._16({encapsulation:2,styles:z,data:{}}),V=h._23("sign-in-card",O.a,p,{page:"page"},{},[])},406:function(n,l,u){"use strict";u(0),u(72),u(29);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function n(n){this.cookieservice=n,this.param="test user"}return n.prototype.ionViewCanEnter=function(){return"yes"!==this.cookieservice.get("keepLoggedIn")},n}())},432:function(n,l,u){"use strict";u(0),u(72),u(406),u(275),u(280),u(283),u(73);u.d(l,"a",function(){return t});var t=(this&&this.__decorate,function(){function n(){}return n}())},433:function(n,l,u){"use strict";function t(n){return o._17(0,[(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n"])),(n()(),o._19(0,null,null,6,"ion-header",[],null,null,null,null,null)),o._20(16384,null,0,i.a,[a.c,o.H,o.I,[2,r.a]],null,null),(n()(),o._18(null,["\n    "])),(n()(),o._19(0,null,null,2,"logged-in-header",[],null,null,null,_.b,_.c)),o._20(114688,null,0,c.a,[s.a,g.a,d.a,f.a,p.a,h.a,o.g],null,null),(n()(),o._18(null,[" "])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._19(0,null,null,6,"ion-content",[["padding",""]],[[2,"statusbar-padding",null]],null,null,b.a,b.b)),o._20(4374528,null,0,v.a,[a.c,m.b,k.a,o.H,o.I,y.a,I.a,o.g,[2,r.a],[2,T.a]],null,null),(n()(),o._18(1,["\n\t"])),(n()(),o._19(0,null,1,2,"sign-in-card",[],null,null,null,C.b,C.c)),o._20(114688,null,0,L.a,[T.a,H.a,w.k,h.a,d.a,f.a,g.a,x.a,o.g,O.c,P.a,j.c,S.a],{page:[0,"page"]},null),(n()(),o._18(null,[" "])),(n()(),o._18(1,["\n"])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._19(0,null,null,6,"ion-footer",[],null,null,null,null,null)),o._20(16384,null,0,M.a,[a.c,o.H,o.I,[2,r.a]],null,null),(n()(),o._18(null,["\n "])),(n()(),o._19(0,null,null,2,"footer-element",[],null,null,null,N.b,N.c)),o._20(49152,null,0,E.a,[h.a],null,null),(n()(),o._18(null,[" "])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n\n\n\n\n\n\n\n\n\n"]))],function(n,l){n(l,6,0);n(l,17,0,"login")},function(n,l){n(l,13,0,o._22(l,14).statusbarPadding)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"page-login",[],null,null,null,t,F)),o._20(49152,null,0,B.a,[g.a],null,null)],null,null)}var o=u(0),i=u(113),a=u(1),r=u(3),_=u(276),c=u(273),s=u(76),g=u(28),d=u(45),f=u(35),p=u(19),h=u(43),b=u(274),v=u(74),m=u(5),k=u(11),y=u(8),I=u(16),T=u(22),C=u(284),L=u(282),H=u(9),w=u(47),x=u(80),O=u(115),P=u(112),j=u(10),S=u(46),M=u(117),N=u(281),E=u(279),B=u(406);u.d(l,"a",function(){return D});var R=[],F=o._16({encapsulation:2,styles:R,data:{}}),D=o._23("page-login",B.a,e,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/3.main.js.map