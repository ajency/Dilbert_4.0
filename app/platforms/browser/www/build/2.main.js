webpackJsonp([2],{257:function(n,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var u=t(0),e=t(420),o=t(9),i=t(26),a=t(110),r=t(72),_=t(268),c=t(276),s=t(273),g=t(48),d=t(47),f=t(49),p=t(46),h=t(19),b=t(162),v=t(163),m=t(164),k=t(165),y=t(166),I=t(167),T=t(168),C=t(269),L=t(277),H=t(274),x=t(421),w=t(78),O=t(283),P=t(43);t.d(l,"LoginPageModuleNgFactory",function(){return M});var j=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,l){n.__proto__=l}||function(n,l){for(var t in l)l.hasOwnProperty(t)&&(n[t]=l[t])};return function(l,t){function u(){this.constructor=l}n(l,t),l.prototype=null===t?Object.create(t):(u.prototype=t.prototype,new u)}}(),S=function(n){function l(l){return n.call(this,l,[b.a,v.a,m.a,k.a,y.a,I.a,T.a,C.a,L.a,H.a,x.a],[])||this}return j(l,n),Object.defineProperty(l.prototype,"_NgLocalization_11",{get:function(){return null==this.__NgLocalization_11&&(this.__NgLocalization_11=new o.a(this.parent.get(u.c))),this.__NgLocalization_11},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_ɵi_12",{get:function(){return null==this.__ɵi_12&&(this.__ɵi_12=new i.a),this.__ɵi_12},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_FormBuilder_13",{get:function(){return null==this.__FormBuilder_13&&(this.__FormBuilder_13=new i.b),this.__FormBuilder_13},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateLoader_15",{get:function(){return null==this.__TranslateLoader_15&&(this.__TranslateLoader_15=new g.b),this.__TranslateLoader_15},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateCompiler_16",{get:function(){return null==this.__TranslateCompiler_16&&(this.__TranslateCompiler_16=new d.a),this.__TranslateCompiler_16},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateParser_17",{get:function(){return null==this.__TranslateParser_17&&(this.__TranslateParser_17=new f.a),this.__TranslateParser_17},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_MissingTranslationHandler_18",{get:function(){return null==this.__MissingTranslationHandler_18&&(this.__MissingTranslationHandler_18=new p.a),this.__MissingTranslationHandler_18},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_TranslateService_21",{get:function(){return null==this.__TranslateService_21&&(this.__TranslateService_21=new h.a(this.parent.get(w.a),this._TranslateLoader_15,this._TranslateCompiler_16,this._TranslateParser_17,this._MissingTranslationHandler_18,this._USE_DEFAULT_LANG_20,this._USE_STORE_19)),this.__TranslateService_21},enumerable:!0,configurable:!0}),l.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new i.c,this._FormsModule_2=new i.d,this._ReactiveFormsModule_3=new i.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._TranslateModule_6=new r.a,this._LoggedInHeaderComponentModule_7=new _.a,this._SignInCardComponentModule_8=new c.a,this._FooterComponentModule_9=new s.a,this._LoginPageModule_10=new e.a,this._LAZY_LOADED_TOKEN_14=O.a,this._USE_STORE_19=void 0,this._USE_DEFAULT_LANG_20=void 0,this._LoginPageModule_10},l.prototype.getInternal=function(n,l){return n===o.d?this._CommonModule_0:n===i.c?this._ɵba_1:n===i.d?this._FormsModule_2:n===i.e?this._ReactiveFormsModule_3:n===a.b?this._IonicModule_4:n===a.c?this._IonicPageModule_5:n===r.a?this._TranslateModule_6:n===_.a?this._LoggedInHeaderComponentModule_7:n===c.a?this._SignInCardComponentModule_8:n===s.a?this._FooterComponentModule_9:n===e.a?this._LoginPageModule_10:n===o.e?this._NgLocalization_11:n===i.a?this._ɵi_12:n===i.b?this._FormBuilder_13:n===P.d?this._LAZY_LOADED_TOKEN_14:n===g.a?this._TranslateLoader_15:n===d.b?this._TranslateCompiler_16:n===f.b?this._TranslateParser_17:n===p.b?this._MissingTranslationHandler_18:n===h.b?this._USE_STORE_19:n===h.c?this._USE_DEFAULT_LANG_20:n===h.a?this._TranslateService_21:l},l.prototype.destroyInternal=function(){},l}(u.x),M=new u.y(S,e.a)},266:function(n,l,t){"use strict";t(0),t(71),t(28),t(33),t(40),t(72);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,this&&this.__metadata,function(){function n(n,l,t,u,e,o){this.popoverCtrl=n,this.cookieservice=l,this.events=t,this.appservice=u,this.translate=e,this.appglobals=o,this.langSelect=!0,this.param={value:"world"},"en"==this.appglobals.lang?this.langSelect=!0:this.langSelect=!1}return n.prototype.ngOnInit=function(){"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},n.prototype.setLocale=function(n){console.log(this.lang),this.events.publish("app:localize",this.lang)},n.prototype.openPopover=function(n){this.popoverCtrl.create("PopoverPage",{}).present({ev:n})},n.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},n.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},n}())},267:function(n,l,t){"use strict";function u(n){return o._17(2,[o._21(402653184,1,{_fixedContent:0}),o._21(402653184,2,{_scrollContent:0}),(n()(),o._19(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._24(null,0),(n()(),o._19(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._24(null,1),o._24(null,2)],null,null)}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,u,p)),o._20(4374528,null,0,i.a,[a.c,r.b,_.a,o.H,o.I,c.a,s.a,o.g,[2,g.a],[2,d.a]],null,null)],null,function(n,l){n(l,0,0,o._22(l,1).statusbarPadding)})}var o=t(0),i=t(73),a=t(1),r=t(4),_=t(10),c=t(8),s=t(16),g=t(5),d=t(22);t.d(l,"b",function(){return p}),l.a=u;var f=[],p=o._16({encapsulation:2,styles:f,data:{}});o._23("ion-content",i.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},268:function(n,l,t){"use strict";t(0),t(71),t(266),t(72);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,function(){function n(){}return n}())},269:function(n,l,t){"use strict";function u(n){return s._17(0,[(n()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(n()(),s._18(null,["\n                      "])),(n()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),s._20(16384,null,0,g.a,[d.c,s.H,s.I],{color:[0,"color"]},null),(n()(),s._18(null,["\n                          Ajency.in\n                      "])),(n()(),s._18(null,["\n                  "]))],function(n,l){n(l,3,0,"secondary")},null)}function e(n){return s._17(0,[(n()(),s._19(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(n()(),s._18(null,["\n                      "])),(n()(),s._19(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),s._20(16384,null,0,g.a,[d.c,s.H,s.I],{color:[0,"color"]},null),(n()(),s._18(null,["\n                          DILBERT\n                      "])),(n()(),s._18(null,["\n                  "]))],function(n,l){n(l,3,0,"secondary")},null)}function o(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.navigateToLogin()&&u}return u},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                ","\n                    \n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("login")))})}function i(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.navigateToRegister()&&u}return u},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("register")))})}function a(n){return s._17(0,[(n()(),s._19(0,null,null,3,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                    ","\n                "])),s._29(131072,h.a,[b.a,s.T])],function(n,l){n(l,1,0,"gray-link","")},function(n,l){n(l,2,0,s._30(l,2,0,s._22(l,3).transform("contact us")))})}function r(n){return s._17(0,[(n()(),s._19(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.openPopover(t)&&u}return u},f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{clear:[0,"clear"]},null),(n()(),s._18(0,["\n                    "])),(n()(),s._19(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,v.a,v.b)),s._20(1097728,null,3,m.a,[k.a,d.c,s.H,s.I,[2,y.a]],null,null),s._21(335544320,2,{contentLabel:0}),s._21(603979776,3,{_buttons:1}),s._21(603979776,4,{_icons:1}),s._20(16384,null,0,I.a,[],null,null),(n()(),s._18(2,["\n                        "])),(n()(),s._19(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),s._20(16384,null,0,T.a,[],null,null),(n()(),s._18(null,["\n                            "])),(n()(),s._19(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(n()(),s._18(null,["\n                        "])),(n()(),s._18(2,["\n                        "])),(n()(),s._19(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),s._20(147456,[[4,4]],0,C.a,[d.c,s.H,s.I],{name:[0,"name"]},null),(n()(),s._18(null,["\n                        "])),(n()(),s._18(2,["\n                    "])),(n()(),s._18(0,["\n                "]))],function(n,l){n(l,1,0,"");n(l,17,0,"arrow-dropdown")},function(n,l){var t=l.component;n(l,13,0,s._31(1,"",t.image,"")),n(l,16,0,s._22(l,17)._hidden)})}function _(n){return s._17(0,[(n()(),s._18(null,["\n"])),(n()(),s._19(0,null,null,73,"div",[["class","main-header shadow-1"]],null,null,null,null,null)),(n()(),s._18(null,["\n    "])),(n()(),s._19(0,null,null,70,"div",[["class","container"]],null,null,null,null,null)),(n()(),s._18(null,["\n        "])),(n()(),s._18(null,["\n        "])),(n()(),s._19(0,null,null,65,"ion-navbar",[["class","dilbert-nav toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,L.a,L.b)),s._20(49152,null,0,H.a,[x.a,[2,w.a],[2,O.a],d.c,s.H,s.I],null,null),(n()(),s._18(3,["\n            "])),(n()(),s._19(0,null,3,42,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,9,"div",[],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,6,"button",[["class","ham"],["clear",""],["color","text"],["icon-only",""],["ion-button",""],["m-h-0",""],["menutoggle",""]],null,null,null,f.a,f.b)),s._20(1097728,null,0,p.a,[[8,""],d.c,s.H,s.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),s._18(0,["\n                  "])),(n()(),s._19(0,null,0,2,"ion-icon",[["name","menu"],["role","img"]],[[2,"hide",null]],null,null,null,null)),s._20(147456,null,0,C.a,[d.c,s.H,s.I],{name:[0,"name"]},null),(n()(),s._18(null,["\n                  "])),(n()(),s._18(0,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,7,"div",[],null,null,null,null,null)),(n()(),s._18(null,["\n                  "])),(n()(),s._25(16777216,null,null,1,null,u)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                  "])),(n()(),s._25(16777216,null,null,1,null,e)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._19(0,null,null,18,"div",[["class","relative lang-container"]],null,null,null,null,null)),(n()(),s._18(null,["\n                    "])),(n()(),s._19(0,null,null,15,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"click"],[null,"keyup.space"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==s._22(n,35)._click(t)&&u}if("keyup.space"===l){u=!1!==s._22(n,35)._keyup()&&u}if("ngModelChange"===l){u=!1!==(e.lang=t)&&u}if("ionChange"===l){u=!1!==e.setLocale()&&u}return u},S.a,S.b)),s._20(1228800,null,1,M.a,[x.a,k.a,d.c,s.H,s.I,[2,m.a],N.b],{color:[0,"color"],interface:[1,"interface"]},{ionChange:"ionChange"}),s._21(603979776,1,{options:1}),s._32(1024,null,E.f,function(n){return[n]},[M.a]),s._20(671744,null,0,E.g,[[8,null],[8,null],[8,null],[2,E.f]],{model:[0,"model"]},{update:"ngModelChange"}),s._32(2048,null,E.h,null,[E.g]),s._20(16384,null,0,E.i,[E.h],null,null),(n()(),s._18(null,["\n                        "])),(n()(),s._19(0,null,null,2,"ion-option",[["value","en"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,B.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(n()(),s._18(null,["\n                            English\n                        "])),(n()(),s._18(null,["\n                        "])),(n()(),s._19(0,null,null,2,"ion-option",[["value","fr"]],null,null,null,null,null)),s._20(16384,[[1,4]],0,B.a,[s.H],{selected:[0,"selected"],value:[1,"value"]},null),(n()(),s._18(null,["\n                            French\n                        "])),(n()(),s._18(null,["\n                    "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                 \n            "])),(n()(),s._18(3,["\n            "])),(n()(),s._19(0,null,3,17,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,o)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,i)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,a)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n               "])),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n                "])),(n()(),s._25(16777216,null,null,1,null,r)),s._20(16384,null,0,P.k,[s.L,s.N],{ngIf:[0,"ngIf"]},null),(n()(),s._18(null,["\n                "])),(n()(),s._18(null,["\n            "])),(n()(),s._18(3,["\n        "])),(n()(),s._18(null,["\n        "])),(n()(),s._18(null,["\n    "])),(n()(),s._18(null,["\n"]))],function(n,l){var t=l.component;n(l,14,0,"text","");n(l,17,0,"menu"),n(l,26,0,"loggedin"==t.header),n(l,29,0,"notloggedin"==t.header||"new"==t.header);n(l,35,0,"gray-link","popover"),n(l,38,0,t.lang);n(l,43,0,s._31(1,"",t.langSelect,""),"en");n(l,47,0,s._31(1,"",!t.langSelect,""),"fr"),n(l,57,0,"notloggedin"==t.header),n(l,60,0,"notloggedin"==t.header),n(l,63,0,"new"==t.header),n(l,68,0,"loggedin"==t.header)},function(n,l){n(l,6,0,s._22(l,7)._hidden,s._22(l,7)._sbPadding),n(l,16,0,s._22(l,17)._hidden),n(l,34,0,s._22(l,35)._disabled,s._22(l,40).ngClassUntouched,s._22(l,40).ngClassTouched,s._22(l,40).ngClassPristine,s._22(l,40).ngClassDirty,s._22(l,40).ngClassValid,s._22(l,40).ngClassInvalid,s._22(l,40).ngClassPending)})}function c(n){return s._17(0,[(n()(),s._19(0,null,null,1,"logged-in-header",[],null,null,null,_,V)),s._20(114688,null,0,j.a,[R.a,F.a,D.a,A.a,b.a,z.a],null,null)],function(n,l){n(l,1,0)},null)}var s=t(0),g=t(108),d=t(1),f=t(41),p=t(20),h=t(106),b=t(19),v=t(169),m=t(23),k=t(17),y=t(35),I=t(76),T=t(113),C=t(34),L=t(270),H=t(74),x=t(8),w=t(5),O=t(22),P=t(9),j=t(266),S=t(271),M=t(107),N=t(14),E=t(26),B=t(77),R=t(75),F=t(27),D=t(42),A=t(33),z=t(40);t.d(l,"c",function(){return V}),l.b=_,t.d(l,"a",function(){return q});var U=[],V=s._16({encapsulation:2,styles:U,data:{}}),q=s._23("logged-in-header",j.a,c,{},{},[])},270:function(n,l,t){"use strict";function u(n){return o._17(0,[(n()(),o._19(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),o._19(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.backButtonClick(t)&&u}return u},r.a,r.b)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(1097728,null,0,_.a,[[8,"bar-button"],c.c,o.H,o.I],null,null),(n()(),o._19(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._20(147456,null,0,s.a,[c.c,o.H,o.I],{name:[0,"name"]},null),(n()(),o._19(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),o._18(null,["",""])),o._24(null,0),o._24(null,1),o._24(null,2),(n()(),o._19(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._20(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._24(null,3)],function(n,l){var t=l.component;n(l,1,0,"toolbar-background","toolbar-background-"+t._mode);n(l,3,0,"back-button","back-button-"+t._mode);n(l,6,0,"back-button-icon","back-button-icon-"+t._mode),n(l,7,0,t._bbIcon);n(l,9,0,"back-button-text","back-button-text-"+t._mode);n(l,15,0,"toolbar-content","toolbar-content-"+t._mode)},function(n,l){var t=l.component;n(l,2,0,t._hideBb),n(l,5,0,o._22(l,7)._hidden),n(l,10,0,t._backText)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,u,h)),o._20(49152,null,0,a.a,[g.a,[2,d.a],[2,f.a],c.c,o.H,o.I],null,null)],null,function(n,l){n(l,0,0,o._22(l,1)._hidden,o._22(l,1)._sbPadding)})}var o=t(0),i=t(9),a=t(74),r=t(41),_=t(20),c=t(1),s=t(34),g=t(8),d=t(5),f=t(22);t.d(l,"b",function(){return h}),l.a=u;var p=[],h=o._16({encapsulation:2,styles:p,data:{}});o._23("ion-navbar",a.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},271:function(n,l,t){"use strict";function u(n){return a._17(0,[(n()(),a._19(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(n()(),a._18(null,["",""]))],null,function(n,l){n(l,1,0,l.component.placeholder)})}function e(n){return a._17(0,[(n()(),a._19(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(n()(),a._18(null,["",""]))],null,function(n,l){var t=l.component;n(l,1,0,t.selectedText||t._text)})}function o(n){return a._17(0,[(n()(),a._25(16777216,null,null,1,null,u)),a._20(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(n()(),a._25(16777216,null,null,1,null,e)),a._20(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(n()(),a._19(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(n()(),a._19(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(n()(),a._19(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,_.a,_.b)),a._20(1097728,null,0,c.a,[[8,"item-cover"],s.c,a.H,a.I],null,null)],function(n,l){var t=l.component;n(l,1,0,!t._text),n(l,3,0,t._text)},function(n,l){var t=l.component;n(l,6,0,t.id,t._labelId,t._disabled)})}function i(n){return a._17(0,[(n()(),a._19(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(n,l,t){var u=!0;if("click"===l){u=!1!==a._22(n,1)._click(t)&&u}if("keyup.space"===l){u=!1!==a._22(n,1)._keyup()&&u}return u},o,m)),a._20(1228800,null,1,g.a,[d.a,f.a,s.c,a.H,a.I,[2,p.a],h.b],null,null),a._21(603979776,1,{options:1}),a._32(5120,null,b.f,function(n){return[n]},[g.a])],null,function(n,l){n(l,0,0,a._22(l,1)._disabled)})}var a=t(0),r=t(9),_=t(41),c=t(20),s=t(1),g=t(107),d=t(8),f=t(17),p=t(23),h=t(14),b=t(26);t.d(l,"b",function(){return m}),l.a=o;var v=[],m=a._16({encapsulation:2,styles:v,data:{}});a._23("ion-select",g.a,i,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},272:function(n,l,t){"use strict";t(0),t(40);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,this&&this.__metadata,function(){function n(n){this.appglobals=n,this.version="",this.version=this.appglobals.getAppVersion()}return n}())},273:function(n,l,t){"use strict";t(0),t(71),t(272),t(72);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,function(){function n(){}return n}())},274:function(n,l,t){"use strict";function u(n){return o._17(0,[(n()(),o._18(null,["\n"])),(n()(),o._19(0,null,null,10,"div",[],null,null,null,null,null)),(n()(),o._18(null,["\n  "])),(n()(),o._19(0,null,null,7,"div",[["align","center"],["padding-vertical",""]],null,null,null,null,null)),(n()(),o._18(null,[" "," "])),o._29(131072,i.a,[a.a,o.T]),(n()(),o._19(0,null,null,1,"a",[["href","https://ajency.in/"]],null,null,null,null,null)),(n()(),o._18(null,["Ajency.in"])),(n()(),o._18(null,[" "])),(n()(),o._19(0,null,null,1,"span",[["class","version-string"]],null,null,null,null,null)),(n()(),o._18(null,[" V",""])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n"]))],null,function(n,l){var t=l.component;n(l,4,0,o._30(l,4,0,o._22(l,5).transform("by"))),n(l,10,0,t.version)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"footer-element",[],null,null,null,u,s)),o._20(49152,null,0,r.a,[_.a],null,null)],null,null)}var o=t(0),i=t(106),a=t(19),r=t(272),_=t(40);t.d(l,"c",function(){return s}),l.b=u,t.d(l,"a",function(){return g});var c=[],s=o._16({encapsulation:2,styles:c,data:{}}),g=o._23("footer-element",r.a,e,{},{},[])},275:function(n,l,t){"use strict";var u=t(9),e=t(0),o=t(71),i=t(45),a=t(33),r=t(28),_=t(109),c=t(50),s=t(44),g=t(40);t.d(l,"a",function(){return h});var d=this&&this.__decorate||function(n,l,t,u){var e,o=arguments.length,i=o<3?l:null===u?u=Object.getOwnPropertyDescriptor(l,t):u;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,l,t,u);else for(var a=n.length-1;a>=0;a--)(e=n[a])&&(i=(o<3?e(i):o>3?e(l,t,i):e(l,t))||i);return o>3&&i&&Object.defineProperty(l,t,i),i},f=this&&this.__metadata||function(n,l){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,l)},p=this&&this.__param||function(n,l){return function(t,u){l(t,u,n)}},h=function(){function n(n,l,t,u,e,o,i,a,r,_,c,s,g){this.navCtrl=n,this.navParams=l,this.http=t,this.appglobals=u,this.events=e,this.appServiceProvider=o,this.cookieservice=i,this.toastCtrl=a,this.zone=r,this.storage=_,this.userDataProvider=c,this.location=s,this.environment=g,this.domainError=!1,this.logInProcess=!1,this.disableBtn=!1,console.log("Hello SignInCardComponent Component"),"yes"==this.cookieservice.get("domainError")&&(this.domainError=!0),this.cookieservice.remove("domainError")}return n.prototype.ngOnInit=function(){console.log(this.page),"login"==this.page?this.login=!0:"register"==this.page&&(this.page=!1)},n.prototype.ionViewDidLoad=function(){this.storage.ready().then(function(){}),this.cookieservice.remove("domainError")},n.prototype.navigateTo=function(){this.login?this.events.publish("app:navroot","register"):this.events.publish("app:navroot","login")},n.prototype.signin=function(){var n=this;this.logInProcess=!0,this.disableBtn=!0,this.appServiceProvider.signIn().then(function(l){n.token=l,n.postRequest()}),this.zone.run(function(){})},n.prototype.postRequest=function(){var n=this,l=new i.l;l.append("Accept","application/json"),l.append("Content-Type","application/json");var t=this.environment.dilbertApi+"/login/google/"+this.appglobals.lang+"?token="+this.token;console.log(t),this.appServiceProvider.request(t,"get",{},{},!1,"observable","",{},!1).subscribe(function(l){n.loginResponse=l,n.status=n.loginResponse.status,n.next_url=n.loginResponse.next_url,n.storage.set("userData",n.loginResponse.data).then(function(){}),"200"==n.status?"/dashboard"===n.next_url?(n.cookieservice.put("keepLoggedIn","yes"),n.events.publish("app:navroot","dashboard")):"/join_organisation"===n.next_url?(n.cookieservice.put("join","yes"),n.events.publish("app:navroot","join-organisation")):(n.cookieservice.put("create","yes"),n.events.publish("app:navroot","create-organisation")):"400"==n.status&&(n.events.publish("app:navroot","login"),n.domainError=!0,n.cookieservice.put("domainError","yes"))},function(n){console.log(n.status)})},n}();h=d([t.i(e._26)({selector:"sign-in-card",templateUrl:"sign-in-card.html"}),p(12,t.i(e.E)(s.a)),f("design:paramtypes",["function"==typeof(b=void 0!==o.a&&o.a)&&b||Object,"function"==typeof(v=void 0!==o.b&&o.b)&&v||Object,"function"==typeof(m=void 0!==i.k&&i.k)&&m||Object,"function"==typeof(k=void 0!==g.a&&g.a)&&k||Object,"function"==typeof(y=void 0!==o.c&&o.c)&&y||Object,"function"==typeof(I=void 0!==a.a&&a.a)&&I||Object,"function"==typeof(T=void 0!==r.b&&r.b)&&T||Object,"function"==typeof(C=void 0!==o.d&&o.d)&&C||Object,"function"==typeof(L=void 0!==e.g&&e.g)&&L||Object,"function"==typeof(H=void 0!==c.b&&c.b)&&H||Object,"function"==typeof(x=void 0!==_.a&&_.a)&&x||Object,"function"==typeof(w=void 0!==u.c&&u.c)&&w||Object,Object])],h);var b,v,m,k,y,I,T,C,L,H,x,w},276:function(n,l,t){"use strict";t(0),t(71),t(275),t(72);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,function(){function n(){}return n}())},277:function(n,l,t){"use strict";function u(n){return h._17(0,[(n()(),h._19(0,null,null,2,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,1,0,h._30(l,1,0,h._22(l,2).transform("account_exist")))})}function e(n){return h._17(0,[(n()(),h._19(0,null,null,3,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(n()(),h._18(null,[""," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,1,0,h._30(l,1,0,h._22(l,2).transform("sign_up")),h._30(l,1,1,h._22(l,3).transform("_change_ur_work_way")))})}function o(n){return h._17(0,[(n()(),h._19(0,null,null,4,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,[""," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"text-lighter")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_in")),h._30(l,2,1,h._22(l,4).transform("n_cont_whr_u_left_off")))})}function i(n){return h._17(0,[(n()(),h._19(0,null,null,3,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,[" "," "])),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"text-lighter")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("conn_using_google_acc")))})}function a(n){return h._17(0,[(n()(),h._19(0,null,null,9,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.signin()&&u}return u},y.a,y.b)),h._20(278528,null,0,I.l,[h.t,h.u,h.H,h.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),h._33(["loading"]),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(0,[" "])),(n()(),h._19(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._20(147456,null,0,C.a,[k.c,h.H,h.I],{name:[0,"name"]},null),(n()(),h._18(0,[" "," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"sign-in",n(l,2,0,l.component.disableBtn));n(l,3,0,"danger-dark");n(l,6,0,"logo-googleplus")},function(n,l){n(l,0,0,l.component.disableBtn),n(l,5,0,h._22(l,6)._hidden),n(l,7,0,h._30(l,7,0,h._22(l,8).transform("sign_in")),h._30(l,7,1,h._22(l,9).transform("with_google")))})}function r(n){return h._17(0,[(n()(),h._19(0,null,null,9,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.signin()&&u}return u},y.a,y.b)),h._20(278528,null,0,I.l,[h.t,h.u,h.H,h.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),h._33(["loading"]),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(0,[" "])),(n()(),h._19(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._20(147456,null,0,C.a,[k.c,h.H,h.I],{name:[0,"name"]},null),(n()(),h._18(0,[" "," ",""])),h._29(131072,b.a,[v.a,h.T]),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"sign-in",n(l,2,0,l.component.disableBtn));n(l,3,0,"danger-dark");n(l,6,0,"logo-googleplus")},function(n,l){n(l,0,0,l.component.disableBtn),n(l,5,0,h._22(l,6)._hidden),n(l,7,0,h._30(l,7,0,h._22(l,8).transform("sign_up")),h._30(l,7,1,h._22(l,9).transform("with_google")))})}function _(n){return h._17(0,[(n()(),h._19(0,null,null,6,"ion-card",[["class","alert-error"]],null,null,null,null,null)),h._20(16384,null,0,L.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,2,"ion-card-header",[],null,null,null,null,null)),h._20(16384,null,0,H.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t\tDomain does not exist\n\t\t\t\t"])),(n()(),h._18(null,["\n\t\t\t"]))],null,null)}function c(n){return h._17(0,[(n()(),h._19(0,null,null,3,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("not_conn_2_dilbert")))})}function s(n){return h._17(0,[(n()(),h._19(0,null,null,3,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.navigateTo()&&u}return u},y.a,y.b)),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),
h._18(0,[" ","!"])),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"primary","")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_up")))})}function g(n){return h._17(0,[(n()(),h._19(0,null,null,3,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T])],null,function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("already_hv_acc_in_dil")))})}function d(n){return h._17(0,[(n()(),h._19(0,null,null,3,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(n,l,t){var u=!0,e=n.component;if("click"===l){u=!1!==e.navigateTo()&&u}return u},y.a,y.b)),h._20(1097728,null,0,T.a,[[8,""],k.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(n()(),h._18(0,["","!"])),h._29(131072,b.a,[v.a,h.T])],function(n,l){n(l,1,0,"primary","")},function(n,l){n(l,2,0,h._30(l,2,0,h._22(l,3).transform("sign_in")))})}function f(n){return h._17(0,[(n()(),h._18(null,["\n"])),(n()(),h._19(0,null,null,62,"div",[["class","container"],["p-h-20",""]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\n\n\t"])),(n()(),h._19(0,null,null,59,"div",[["class","login-card"],["text-center",""]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t"])),(n()(),h._19(0,null,null,44,"ion-card",[],null,null,null,null,null)),h._20(16384,null,0,L.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\n\t\t\t"])),(n()(),h._19(0,null,null,0,"img",[["src","./../../assets/img/dilbert.jpg"],["width","80"]],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t\t"])),(n()(),h._19(0,null,null,35,"ion-card-content",[],null,null,null,null,null)),h._20(16384,null,0,x.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,11,"ion-card-title",[],null,null,null,null,null)),h._20(16384,null,0,w.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["\n\t\t\t\t\t"])),(n()(),h._19(0,null,null,2,"h2",[["class","login-card__title"],["ion-text",""],["m-b-8",""],["text-uppercase",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],null,null),(n()(),h._18(null,["Dilbert"])),(n()(),h._18(null,["\n\t\t\t\t\t"])),(n()(),h._19(0,null,null,3,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""]],null,null,null,null,null)),h._20(16384,null,0,m.a,[k.c,h.H,h.I],{color:[0,"color"]},null),(n()(),h._18(null,["",""])),h._29(131072,b.a,[v.a,h.T]),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._19(0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,u)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,e)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,o)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,i)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,a)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,r)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\t\n\t\t\t"])),(n()(),h._18(null,["\n\n\t\t\t"])),(n()(),h._25(16777216,null,null,1,null,_)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t\t\n\t\t"])),(n()(),h._18(null,["\n\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,c)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,s)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,g)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t\t"])),(n()(),h._25(16777216,null,null,1,null,d)),h._20(16384,null,0,I.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(n()(),h._18(null,["\n\t"])),(n()(),h._18(null,["\n\n\t\n\t\n\n"]))],function(n,l){var t=l.component;n(l,21,0,"text-lighter"),n(l,29,0,t.login),n(l,32,0,!t.login),n(l,35,0,t.login),n(l,38,0,!t.login),n(l,41,0,t.login),n(l,44,0,!t.login),n(l,48,0,t.domainError),n(l,52,0,t.login),n(l,55,0,t.login),n(l,58,0,!t.login),n(l,61,0,!t.login)},function(n,l){var t=l.component;n(l,22,0,h._30(l,22,0,h._22(l,23).transform(t.hero_title)))})}function p(n){return h._17(0,[(n()(),h._19(0,null,null,1,"sign-in-card",[],null,null,null,f,U)),h._20(114688,null,0,O.a,[P.a,j.a,S.k,M.a,N.a,E.a,B.a,R.a,h.g,F.c,D.a,I.c,A.a],null,null)],function(n,l){n(l,1,0)},null)}var h=t(0),b=t(106),v=t(19),m=t(108),k=t(1),y=t(41),I=t(9),T=t(20),C=t(34),L=t(119),H=t(117),x=t(116),w=t(118),O=t(275),P=t(22),j=t(11),S=t(45),M=t(40),N=t(42),E=t(33),B=t(27),R=t(79),F=t(112),D=t(109),A=t(44);t.d(l,"c",function(){return U}),l.b=f,t.d(l,"a",function(){return V});var z=[],U=h._16({encapsulation:2,styles:z,data:{}}),V=h._23("sign-in-card",O.a,p,{page:"page"},{},[])},283:function(n,l,t){"use strict";t(0),t(71),t(28);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,this&&this.__metadata,function(){function n(n){this.cookieservice=n,this.param="test user"}return n.prototype.ionViewCanEnter=function(){return"yes"!==this.cookieservice.get("keepLoggedIn")},n}())},420:function(n,l,t){"use strict";t(0),t(71),t(283),t(268),t(273),t(276),t(72);t.d(l,"a",function(){return u});var u=(this&&this.__decorate,function(){function n(){}return n}())},421:function(n,l,t){"use strict";function u(n){return o._17(0,[(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n"])),(n()(),o._19(0,null,null,6,"ion-header",[],null,null,null,null,null)),o._20(16384,null,0,i.a,[a.c,o.H,o.I,[2,r.a]],null,null),(n()(),o._18(null,["\n    "])),(n()(),o._19(0,null,null,2,"logged-in-header",[],null,null,null,_.b,_.c)),o._20(114688,null,0,c.a,[s.a,g.a,d.a,f.a,p.a,h.a],null,null),(n()(),o._18(null,[" "])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._19(0,null,null,6,"ion-content",[["padding",""]],[[2,"statusbar-padding",null]],null,null,b.a,b.b)),o._20(4374528,null,0,v.a,[a.c,m.b,k.a,o.H,o.I,y.a,I.a,o.g,[2,r.a],[2,T.a]],null,null),(n()(),o._18(1,["\n\t"])),(n()(),o._19(0,null,1,2,"sign-in-card",[],null,null,null,C.b,C.c)),o._20(114688,null,0,L.a,[T.a,H.a,x.k,h.a,d.a,f.a,g.a,w.a,o.g,O.c,P.a,j.c,S.a],{page:[0,"page"]},null),(n()(),o._18(null,[" "])),(n()(),o._18(1,["\n"])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n"])),(n()(),o._18(null,["\n\n\n"])),(n()(),o._19(0,null,null,6,"ion-footer",[],null,null,null,null,null)),o._20(16384,null,0,M.a,[a.c,o.H,o.I,[2,r.a]],null,null),(n()(),o._18(null,["\n "])),(n()(),o._19(0,null,null,2,"footer-element",[],null,null,null,N.b,N.c)),o._20(49152,null,0,E.a,[h.a],null,null),(n()(),o._18(null,[" "])),(n()(),o._18(null,["\n"])),(n()(),o._18(null,["\n\n\n\n\n\n\n\n\n\n\n"]))],function(n,l){n(l,6,0);n(l,17,0,"login")},function(n,l){n(l,13,0,o._22(l,14).statusbarPadding)})}function e(n){return o._17(0,[(n()(),o._19(0,null,null,1,"page-login",[],null,null,null,u,F)),o._20(49152,null,0,B.a,[g.a],null,null)],null,null)}var o=t(0),i=t(111),a=t(1),r=t(5),_=t(269),c=t(266),s=t(75),g=t(27),d=t(42),f=t(33),p=t(19),h=t(40),b=t(267),v=t(73),m=t(4),k=t(10),y=t(8),I=t(16),T=t(22),C=t(277),L=t(275),H=t(11),x=t(45),w=t(79),O=t(112),P=t(109),j=t(9),S=t(44),M=t(114),N=t(274),E=t(272),B=t(283);t.d(l,"a",function(){return D});var R=[],F=o._16({encapsulation:2,styles:R,data:{}}),D=o._23("page-login",B.a,e,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/2.main.js.map