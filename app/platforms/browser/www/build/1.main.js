webpackJsonp([1],{239:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u(0),e=u(401),o=u(9),i=u(25),a=u(98),r=u(244),c=u(250),s=u(146),_=u(147),d=u(148),g=u(150),f=u(151),p=u(152),h=u(153),b=u(245),v=u(251),m=u(402),k=u(261),I=u(42);u.d(n,"RegisterPageModuleNgFactory",function(){return H});var y=this&&this.__extends||function(){var l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var u in n)n.hasOwnProperty(u)&&(l[u]=n[u])};return function(n,u){function t(){this.constructor=n}l(n,u),n.prototype=null===u?Object.create(u):(t.prototype=u.prototype,new t)}}(),x=function(l){function n(n){return l.call(this,n,[s.a,_.a,d.a,g.a,f.a,p.a,h.a,b.a,v.a,m.a],[])||this}return y(n,l),Object.defineProperty(n.prototype,"_NgLocalization_9",{get:function(){return null==this.__NgLocalization_9&&(this.__NgLocalization_9=new o.a(this.parent.get(t.c))),this.__NgLocalization_9},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_10",{get:function(){return null==this.__ɵi_10&&(this.__ɵi_10=new i.a),this.__ɵi_10},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_11",{get:function(){return null==this.__FormBuilder_11&&(this.__FormBuilder_11=new i.b),this.__FormBuilder_11},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new i.c,this._FormsModule_2=new i.d,this._ReactiveFormsModule_3=new i.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._LoggedInHeaderComponentModule_6=new r.a,this._SignInCardComponentModule_7=new c.a,this._RegisterPageModule_8=new e.a,this._LAZY_LOADED_TOKEN_12=k.a,this._RegisterPageModule_8},n.prototype.getInternal=function(l,n){return l===o.d?this._CommonModule_0:l===i.c?this._ɵba_1:l===i.d?this._FormsModule_2:l===i.e?this._ReactiveFormsModule_3:l===a.b?this._IonicModule_4:l===a.c?this._IonicPageModule_5:l===r.a?this._LoggedInHeaderComponentModule_6:l===c.a?this._SignInCardComponentModule_7:l===e.a?this._RegisterPageModule_8:l===o.e?this._NgLocalization_9:l===i.a?this._ɵi_10:l===i.b?this._FormBuilder_11:l===I.d?this._LAZY_LOADED_TOKEN_12:n},n.prototype.destroyInternal=function(){},n}(t.x),H=new t.y(x,e.a)},243:function(l,n,u){"use strict";u(0),u(64),u(32),u(30);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,u,t){this.popoverCtrl=l,this.cookieservice=n,this.events=u,this.appservice=t}return l.prototype.ngOnInit=function(){"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},l.prototype.openPopover=function(l){this.popoverCtrl.create("PopoverPage",{}).present({ev:l})},l.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},l.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},l}())},244:function(l,n,u){"use strict";u(0),u(64),u(243);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},245:function(l,n,u){"use strict";function t(l){return _._14(0,[(l()(),_._16(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),_._15(null,["\n                      "])),(l()(),_._16(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),_._17(16384,null,0,d.a,[g.c,_.H,_.I],{color:[0,"color"]},null),(l()(),_._15(null,["\n                          Ajency.in\n                      "])),(l()(),_._15(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function e(l){return _._14(0,[(l()(),_._16(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),_._15(null,["\n                      "])),(l()(),_._16(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),_._17(16384,null,0,d.a,[g.c,_.H,_.I],{color:[0,"color"]},null),(l()(),_._15(null,["\n                          DILBERT\n                      "])),(l()(),_._15(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function o(l){return _._14(0,[(l()(),_._16(0,null,null,2,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToLogin()&&t}return t},f.a,f.b)),_._17(1097728,null,0,p.a,[[8,""],g.c,_.H,_.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),_._15(0,["\n                    Login\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function i(l){return _._14(0,[(l()(),_._16(0,null,null,2,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToRegister()&&t}return t},f.a,f.b)),_._17(1097728,null,0,p.a,[[8,""],g.c,_.H,_.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),_._15(0,["\n                    Register\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function a(l){return _._14(0,[(l()(),_._16(0,null,null,2,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,f.a,f.b)),_._17(1097728,null,0,p.a,[[8,""],g.c,_.H,_.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),_._15(0,["\n                    Contact Us\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function r(l){return _._14(0,[(l()(),_._16(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.openPopover(u)&&t}return t},f.a,f.b)),_._17(1097728,null,0,p.a,[[8,""],g.c,_.H,_.I],{clear:[0,"clear"]},null),(l()(),_._15(0,["\n                    "])),(l()(),_._16(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,h.a,h.b)),_._17(1097728,null,3,b.a,[v.a,g.c,_.H,_.I,[2,m.a]],null,null),_._18(335544320,2,{contentLabel:0}),_._18(603979776,3,{_buttons:1}),_._18(603979776,4,{_icons:1}),_._17(16384,null,0,k.a,[],null,null),(l()(),_._15(2,["\n                        "])),(l()(),_._16(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),_._17(16384,null,0,I.a,[],null,null),(l()(),_._15(null,["\n                            "])),(l()(),_._16(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),_._15(null,["\n                        "])),(l()(),_._15(2,["\n                        "])),(l()(),_._16(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),_._17(147456,[[4,4]],0,y.a,[g.c,_.H,_.I],{name:[0,"name"]},null),(l()(),_._15(null,["\n                        "])),(l()(),_._15(2,["\n                    "])),(l()(),_._15(0,["\n                "]))],function(l,n){l(n,1,0,"");l(n,17,0,"arrow-dropdown")},function(l,n){var u=n.component;l(n,13,0,_._28(1,"",u.image,"")),l(n,16,0,_._19(n,17)._hidden)})}function c(l){return _._14(0,[(l()(),_._15(null,["\n"])),(l()(),_._16(0,null,null,70,"div",[["class","main-header shadow-1"]],null,null,null,null,null)),(l()(),_._15(null,["\n    "])),(l()(),_._16(0,null,null,67,"div",[["class","container"]],null,null,null,null,null)),(l()(),_._15(null,["\n        "])),(l()(),_._15(null,["\n        "])),(l()(),_._16(0,null,null,62,"ion-navbar",[["class","dilbert-nav toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,x.a,x.b)),_._17(49152,null,0,H.a,[w.a,[2,L.a],[2,C.a],g.c,_.H,_.I],null,null),(l()(),_._15(3,["\n            "])),(l()(),_._16(0,null,3,39,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(l()(),_._15(null,["\n                "])),(l()(),_._16(0,null,null,9,"div",[],null,null,null,null,null)),(l()(),_._15(null,["\n                "])),(l()(),_._16(0,null,null,6,"button",[["class","ham"],["clear",""],["color","text"],["icon-only",""],["ion-button",""],["m-h-0",""],["menutoggle",""]],null,null,null,f.a,f.b)),_._17(1097728,null,0,p.a,[[8,""],g.c,_.H,_.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),_._15(0,["\n                  "])),(l()(),_._16(0,null,0,2,"ion-icon",[["name","menu"],["role","img"]],[[2,"hide",null]],null,null,null,null)),_._17(147456,null,0,y.a,[g.c,_.H,_.I],{name:[0,"name"]},null),(l()(),_._15(null,["\n                  "])),(l()(),_._15(0,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._16(0,null,null,7,"div",[],null,null,null,null,null)),(l()(),_._15(null,["\n                  "])),(l()(),_._22(16777216,null,null,1,null,t)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n                  "])),(l()(),_._22(16777216,null,null,1,null,e)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._16(0,null,null,15,"div",[["class","relative lang-container"]],null,null,null,null,null)),(l()(),_._15(null,["\n                    "])),(l()(),_._16(0,null,null,12,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==_._19(l,35)._click(u)&&t}if("keyup.space"===n){t=!1!==_._19(l,35)._keyup()&&t}return t},j.a,j.b)),_._17(1228800,null,1,N.a,[w.a,v.a,g.c,_.H,_.I,[2,b.a],P.b],{color:[0,"color"],interface:[1,"interface"]},null),_._18(603979776,1,{options:1}),_._29(5120,null,R.f,function(l){return[l]},[N.a]),(l()(),_._15(null,["\n                        "])),(l()(),_._16(0,null,null,2,"ion-option",[["selected","true"],["value","eng"]],null,null,null,null,null)),_._17(16384,[[1,4]],0,T.a,[_.H],{selected:[0,"selected"],value:[1,"value"]},null),(l()(),_._15(null,["\n                            English\n                        "])),(l()(),_._15(null,["\n                        "])),(l()(),_._16(0,null,null,2,"ion-option",[["value","french"]],null,null,null,null,null)),_._17(16384,[[1,4]],0,T.a,[_.H],{value:[0,"value"]},null),(l()(),_._15(null,["\n                            French\n                        "])),(l()(),_._15(null,["\n                    "])),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n            "])),(l()(),_._15(3,["\n            "])),(l()(),_._16(0,null,3,17,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._22(16777216,null,null,1,null,o)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n                "])),(l()(),_._22(16777216,null,null,1,null,i)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n                "])),(l()(),_._22(16777216,null,null,1,null,a)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n               "])),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n                "])),(l()(),_._22(16777216,null,null,1,null,r)),_._17(16384,null,0,O.k,[_.L,_.N],{ngIf:[0,"ngIf"]},null),(l()(),_._15(null,["\n                "])),(l()(),_._15(null,["\n            "])),(l()(),_._15(3,["\n        "])),(l()(),_._15(null,["\n        "])),(l()(),_._15(null,["\n    "])),(l()(),_._15(null,["\n"]))],function(l,n){var u=n.component;l(n,14,0,"text","");l(n,17,0,"menu"),l(n,26,0,"loggedin"==u.header),l(n,29,0,"notloggedin"==u.header||"new"==u.header);l(n,35,0,"gray-link","popover");l(n,40,0,"true","eng");l(n,44,0,"french"),l(n,54,0,"notloggedin"==u.header),l(n,57,0,"notloggedin"==u.header),l(n,60,0,"new"==u.header),l(n,65,0,"loggedin"==u.header)},function(l,n){l(n,6,0,_._19(n,7)._hidden,_._19(n,7)._sbPadding),l(n,16,0,_._19(n,17)._hidden),l(n,34,0,_._19(n,35)._disabled)})}function s(l){return _._14(0,[(l()(),_._16(0,null,null,1,"logged-in-header",[],null,null,null,c,z)),_._17(114688,null,0,S.a,[M.a,E.a,B.a,D.a],null,null)],function(l,n){l(n,1,0)},null)}var _=u(0),d=u(96),g=u(1),f=u(40),p=u(18),h=u(149),b=u(22),v=u(16),m=u(33),k=u(68),I=u(101),y=u(31),x=u(247),H=u(65),w=u(8),L=u(4),C=u(21),O=u(9),j=u(248),N=u(95),P=u(14),R=u(25),T=u(69),S=u(243),M=u(67),E=u(26),B=u(41),D=u(30);u.d(n,"c",function(){return z}),n.b=c,u.d(n,"a",function(){return A});var F=[],z=_._13({encapsulation:2,styles:F,data:{}}),A=_._20("logged-in-header",S.a,s,{},{},[])},246:function(l,n,u){"use strict";function t(l){return o._14(2,[o._18(402653184,1,{_fixedContent:0}),o._18(402653184,2,{_scrollContent:0}),(l()(),o._16(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._21(null,0),(l()(),o._16(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._21(null,1),o._21(null,2)],null,null)}function e(l){return o._14(0,[(l()(),o._16(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,t,p)),o._17(4374528,null,0,i.a,[a.c,r.b,c.a,o.H,o.I,s.a,_.a,o.g,[2,d.a],[2,g.a]],null,null)],null,function(l,n){l(n,0,0,o._19(n,1).statusbarPadding)})}var o=u(0),i=u(66),a=u(1),r=u(3),c=u(10),s=u(8),_=u(15),d=u(4),g=u(21);u.d(n,"b",function(){return p}),n.a=t;var f=[],p=o._13({encapsulation:2,styles:f,data:{}});o._20("ion-content",i.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},247:function(l,n,u){"use strict";function t(l){return o._14(0,[(l()(),o._16(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._16(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.backButtonClick(u)&&t}return t},r.a,r.b)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._17(1097728,null,0,c.a,[[8,"bar-button"],s.c,o.H,o.I],null,null),(l()(),o._16(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._17(147456,null,0,_.a,[s.c,o.H,o.I],{name:[0,"name"]},null),(l()(),o._16(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._15(null,["",""])),o._21(null,0),o._21(null,1),o._21(null,2),(l()(),o._16(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._21(null,3)],function(l,n){var u=n.component;l(n,1,0,"toolbar-background","toolbar-background-"+u._mode);l(n,3,0,"back-button","back-button-"+u._mode);l(n,6,0,"back-button-icon","back-button-icon-"+u._mode),l(n,7,0,u._bbIcon);l(n,9,0,"back-button-text","back-button-text-"+u._mode);l(n,15,0,"toolbar-content","toolbar-content-"+u._mode)},function(l,n){var u=n.component;l(n,2,0,u._hideBb),l(n,5,0,o._19(n,7)._hidden),l(n,10,0,u._backText)})}function e(l){return o._14(0,[(l()(),o._16(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,t,h)),o._17(49152,null,0,a.a,[d.a,[2,g.a],[2,f.a],s.c,o.H,o.I],null,null)],null,function(l,n){l(n,0,0,o._19(n,1)._hidden,o._19(n,1)._sbPadding)})}var o=u(0),i=u(9),a=u(65),r=u(40),c=u(18),s=u(1),_=u(31),d=u(8),g=u(4),f=u(21);u.d(n,"b",function(){return h}),n.a=t;var p=[],h=o._13({encapsulation:2,styles:p,data:{}});o._20("ion-navbar",a.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},248:function(l,n,u){"use strict";function t(l){return a._14(0,[(l()(),a._16(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(l()(),a._15(null,["",""]))],null,function(l,n){l(n,1,0,n.component.placeholder)})}function e(l){return a._14(0,[(l()(),a._16(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(l()(),a._15(null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,u.selectedText||u._text)})}function o(l){return a._14(0,[(l()(),a._22(16777216,null,null,1,null,t)),a._17(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._22(16777216,null,null,1,null,e)),a._17(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._16(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(l()(),a._16(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(l()(),a._16(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,c.a,c.b)),a._17(1097728,null,0,s.a,[[8,"item-cover"],_.c,a.H,a.I],null,null)],function(l,n){var u=n.component;l(n,1,0,!u._text),l(n,3,0,u._text)},function(l,n){var u=n.component;l(n,6,0,u.id,u._labelId,u._disabled)})}function i(l){return a._14(0,[(l()(),a._16(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==a._19(l,1)._click(u)&&t}if("keyup.space"===n){t=!1!==a._19(l,1)._keyup()&&t}return t},o,m)),a._17(1228800,null,1,d.a,[g.a,f.a,_.c,a.H,a.I,[2,p.a],h.b],null,null),a._18(603979776,1,{options:1}),a._29(5120,null,b.f,function(l){return[l]},[d.a])],null,function(l,n){l(n,0,0,a._19(n,1)._disabled)})}var a=u(0),r=u(9),c=u(40),s=u(18),_=u(1),d=u(95),g=u(8),f=u(16),p=u(22),h=u(14),b=u(25);u.d(n,"b",function(){return m}),n.a=o;var v=[],m=a._13({encapsulation:2,styles:v,data:{}});a._20("ion-select",d.a,i,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},249:function(l,n,u){"use strict";var t=u(9),e=u(0),o=u(64),i=u(34),a=u(30),r=u(32),c=u(97),s=u(70),_=u(43);u.d(n,"a",function(){return p});var d=this&&this.__decorate||function(l,n,u,t){var e,o=arguments.length,i=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,u):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,n,u,t);else for(var a=l.length-1;a>=0;a--)(e=l[a])&&(i=(o<3?e(i):o>3?e(n,u,i):e(n,u))||i);return o>3&&i&&Object.defineProperty(n,u,i),i},g=this&&this.__metadata||function(l,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(l,n)},f=this&&this.__param||function(l,n){return function(u,t){n(u,t,l)}},p=function(){function l(l,n,u,t,e,o,i,a,r,c,s,_){this.navCtrl=l,this.navParams=n,this.http=u,this.events=t,this.appServiceProvider=e,this.cookieservice=o,this.toastCtrl=i,this.zone=a,this.storage=r,this.userDataProvider=c,this.location=s,this.environment=_,this.domainError=!1,this.logInProcess=!1,this.disableBtn=!1,console.log("Hello SignInCardComponent Component"),"yes"==this.cookieservice.get("domainError")&&(this.domainError=!0),this.cookieservice.remove("domainError")}return l.prototype.ngOnInit=function(){console.log(this.page),"login"==this.page?this.login=!0:"register"==this.page&&(this.page=!1)},l.prototype.ionViewDidLoad=function(){this.storage.ready().then(function(){}),this.cookieservice.remove("domainError")},l.prototype.navigateTo=function(){this.login?this.events.publish("app:navroot","register"):this.events.publish("app:navroot","login")},l.prototype.signin=function(){var l=this;this.logInProcess=!0,this.disableBtn=!0,this.appServiceProvider.signIn().then(function(n){l.token=n,l.postRequest()}),this.zone.run(function(){})},l.prototype.postRequest=function(){var l=this,n=new i.l;n.append("Accept","application/json"),n.append("Content-Type","application/json");var u=this.environment.dilbertApi+"/login/google?token="+this.token;this.appServiceProvider.request(u,"get",{},{},!1,"observable","").subscribe(function(n){l.loginResponse=n,l.status=l.loginResponse.status,l.next_url=l.loginResponse.next_url,l.storage.set("userData",l.loginResponse.data).then(function(){}),"200"==l.status?"/dashboard"===l.next_url?(l.cookieservice.put("keepLoggedIn","yes"),l.events.publish("app:navroot","dashboard")):"/join_organisation"===l.next_url?(l.cookieservice.put("join","yes"),l.events.publish("app:navroot","join-organisation")):(l.cookieservice.put("create","yes"),l.events.publish("app:navroot","create-organisation")):"400"==l.status&&(l.events.publish("app:navroot","login"),l.domainError=!0,l.cookieservice.put("domainError","yes"))},function(l){console.log(l.status)})},l}();p=d([u.i(e._23)({selector:"sign-in-card",templateUrl:"sign-in-card.html"}),f(11,u.i(e.E)(_.a)),g("design:paramtypes",["function"==typeof(h=void 0!==o.a&&o.a)&&h||Object,"function"==typeof(b=void 0!==o.b&&o.b)&&b||Object,"function"==typeof(v=void 0!==i.k&&i.k)&&v||Object,"function"==typeof(m=void 0!==o.c&&o.c)&&m||Object,"function"==typeof(k=void 0!==a.a&&a.a)&&k||Object,"function"==typeof(I=void 0!==r.b&&r.b)&&I||Object,"function"==typeof(y=void 0!==o.d&&o.d)&&y||Object,"function"==typeof(x=void 0!==e.g&&e.g)&&x||Object,"function"==typeof(H=void 0!==s.b&&s.b)&&H||Object,"function"==typeof(w=void 0!==c.a&&c.a)&&w||Object,"function"==typeof(L=void 0!==t.c&&t.c)&&L||Object,Object])],p);var h,b,v,m,k,I,y,x,H,w,L},250:function(l,n,u){"use strict";u(0),u(64),u(249);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},251:function(l,n,u){"use strict";function t(l){return h._14(0,[(l()(),h._16(0,null,null,6,"ion-card",[["class","alert-error"]],null,null,null,null,null)),h._17(16384,null,0,b.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["\n          "])),(l()(),h._16(0,null,null,2,"ion-card-header",[],null,null,null,null,null)),h._17(16384,null,0,m.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["\n            Domain does not exist\n          "])),(l()(),h._15(null,["\n        "]))],null,null)}function e(l){return h._14(0,[(l()(),h._16(0,null,null,1,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(l()(),h._15(null,["Have an existing account?"]))],null,null)}function o(l){return h._14(0,[(l()(),h._16(0,null,null,1,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(l()(),h._15(null,["Sign up, change your way of work"]))],null,null)}function i(l){return h._14(0,[(l()(),h._16(0,null,null,2,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],{color:[0,"color"]},null),(l()(),h._15(null,["Sign in and continue where you left off"]))],function(l,n){l(n,1,0,"text-lighter")},null)}function a(l){return h._14(0,[(l()(),h._16(0,null,null,2,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],{color:[0,"color"]},null),(l()(),h._15(null,["Just connect your Google account"]))],function(l,n){l(n,1,0,"text-lighter")},null)}function r(l){return h._14(0,[(l()(),h._16(0,null,null,5,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.signin()&&t}return t},I.a,I.b)),h._17(1097728,null,0,y.a,[[8,""],v.c,h.H,h.I],{color:[0,"color"]},null),(l()(),h._15(0,[" "])),(l()(),h._16(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._17(147456,null,0,x.a,[v.c,h.H,h.I],{name:[0,"name"]},null),(l()(),h._15(0,[" Sign in with Google"]))],function(l,n){l(n,1,0,"danger-dark");l(n,4,0,"logo-googleplus")},function(l,n){l(n,0,0,n.component.disableBtn),l(n,3,0,h._19(n,4)._hidden)})}function c(l){return h._14(0,[(l()(),h._16(0,null,null,5,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.signin()&&t}return t},I.a,I.b)),h._17(1097728,null,0,y.a,[[8,""],v.c,h.H,h.I],{color:[0,"color"]},null),(l()(),h._15(0,[" "])),(l()(),h._16(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),h._17(147456,null,0,x.a,[v.c,h.H,h.I],{name:[0,"name"]},null),(l()(),h._15(0,[" Sign up with Google"]))],function(l,n){l(n,1,0,"danger-dark");l(n,4,0,"logo-googleplus")},function(l,n){l(n,3,0,h._19(n,4)._hidden)})}function s(l){return h._14(0,[(l()(),h._16(0,null,null,2,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["Haven't connected to Dilbert yet?"]))],null,null)}function _(l){return h._14(0,[(l()(),h._16(0,null,null,2,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateTo()&&t}return t},I.a,I.b)),h._17(1097728,null,0,y.a,[[8,""],v.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),h._15(0,["Sign up!"]))],function(l,n){l(n,1,0,"primary","")},null)}function d(l){return h._14(0,[(l()(),h._16(0,null,null,2,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["Already have an account on Dilbert?"]))],null,null)}function g(l){return h._14(0,[(l()(),h._16(0,null,null,2,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateTo()&&t}return t},I.a,I.b)),h._17(1097728,null,0,y.a,[[8,""],v.c,h.H,h.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),h._15(0,["Sign in!"]))],function(l,n){l(n,1,0,"primary","")},null)}function f(l){return h._14(0,[(l()(),h._15(null,["\n    "])),(l()(),h._16(0,null,null,61,"div",[["class","container"],["p-h-20",""]],null,null,null,null,null)),(l()(),h._15(null,["\n\t\t\n\n\t\t"])),(l()(),h._16(0,null,null,58,"div",[["class","login-card"],["text-center",""]],null,null,null,null,null)),(l()(),h._15(null,["\n\t\t\t"])),(l()(),h._16(0,null,null,43,"ion-card",[],null,null,null,null,null)),h._17(16384,null,0,b.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["\n        "])),(l()(),h._22(16777216,null,null,1,null,t)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t\t  "])),(l()(),h._16(0,null,null,0,"img",[["src","./../../assets/img/dilbert.jpg"],["width","80"]],null,null,null,null,null)),(l()(),h._15(null,["\n\t\t\t  "])),(l()(),h._16(0,null,null,34,"ion-card-content",[],null,null,null,null,null)),h._17(16384,null,0,w.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["\n\t\t\t    "])),(l()(),h._16(0,null,null,10,"ion-card-title",[],null,null,null,null,null)),h._17(16384,null,0,L.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["\n\t\t\t      "])),(l()(),h._16(0,null,null,2,"h2",[["class","login-card__title"],["ion-text",""],["m-b-8",""],["text-uppercase",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],null,null),(l()(),h._15(null,["Dilbert"])),(l()(),h._15(null,["\n\t\t\t      "])),(l()(),h._16(0,null,null,2,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""]],null,null,null,null,null)),h._17(16384,null,0,k.a,[v.c,h.H,h.I],{color:[0,"color"]},null),(l()(),h._15(null,["Track Time. Record Work"])),(l()(),h._15(null,["\n\t\t\t     "])),(l()(),h._15(null,["\n\t\t\t     "])),(l()(),h._16(0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),h._15(null,["\n\t\t\t    "])),(l()(),h._22(16777216,null,null,1,null,e)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t        "])),(l()(),h._22(16777216,null,null,1,null,o)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\n\t\t\t    "])),(l()(),h._22(16777216,null,null,1,null,i)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t        "])),(l()(),h._22(16777216,null,null,1,null,a)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\n\n\t\t\t    "])),(l()(),h._22(16777216,null,null,1,null,r)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\n\t\t\t    "])),(l()(),h._22(16777216,null,null,1,null,c)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n          \n\t\t\t  "])),(l()(),h._15(null,["\n\t\t\t"])),(l()(),h._15(null,["\n\n\t\t\t"])),(l()(),h._22(16777216,null,null,1,null,s)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t\t"])),(l()(),h._22(16777216,null,null,1,null,_)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\n\t\t\t "])),(l()(),h._22(16777216,null,null,1,null,d)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t     "])),(l()(),h._22(16777216,null,null,1,null,g)),h._17(16384,null,0,H.k,[h.L,h.N],{ngIf:[0,"ngIf"]},null),(l()(),h._15(null,["\n\t\t"])),(l()(),h._15(null,["\n\n   \n       \n\n    "]))],function(l,n){var u=n.component;l(n,9,0,u.domainError);l(n,24,0,"text-lighter"),l(n,31,0,u.login),l(n,34,0,!u.login),l(n,37,0,u.login),l(n,40,0,!u.login),l(n,43,0,u.login),l(n,46,0,!u.login),l(n,51,0,u.login),l(n,54,0,u.login),l(n,57,0,!u.login),l(n,60,0,!u.login)},null)}function p(l){return h._14(0,[(l()(),h._16(0,null,null,1,"sign-in-card",[],null,null,null,f,F)),h._17(114688,null,0,C.a,[O.a,j.a,N.k,P.a,R.a,T.a,S.a,h.g,M.c,E.a,H.c,B.a],null,null)],function(l,n){l(n,1,0)},null)}var h=u(0),b=u(105),v=u(1),m=u(103),k=u(96),I=u(40),y=u(18),x=u(31),H=u(9),w=u(102),L=u(104),C=u(249),O=u(21),j=u(11),N=u(34),P=u(41),R=u(30),T=u(26),S=u(71),M=u(100),E=u(97),B=u(43);u.d(n,"c",function(){return F}),n.b=f,u.d(n,"a",function(){return z});var D=[],F=h._13({encapsulation:2,styles:D,data:{}}),z=h._20("sign-in-card",C.a,p,{page:"page"},{},[])},261:function(l,n,u){"use strict";u(0),u(64),u(32);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l){this.cookieservice=l}return l.prototype.ionViewCanEnter=function(){return"yes"!==this.cookieservice.get("keepLoggedIn")},l}())},401:function(l,n,u){"use strict";u(0),u(64),u(261),u(244),u(250);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},402:function(l,n,u){"use strict";function t(l){return o._14(0,[(l()(),o._15(null,["\n\n"])),(l()(),o._15(null,["\n\n"])),(l()(),o._16(0,null,null,6,"ion-header",[],null,null,null,null,null)),o._17(16384,null,0,i.a,[a.c,o.H,o.I,[2,r.a]],null,null),(l()(),o._15(null,["\n    "])),(l()(),o._16(0,null,null,2,"logged-in-header",[],null,null,null,c.b,c.c)),o._17(114688,null,0,s.a,[_.a,d.a,g.a,f.a],null,null),(l()(),o._15(null,[" "])),(l()(),o._15(null,["\n"])),(l()(),o._15(null,["\n\n"])),(l()(),o._15(null,["\n\n\n\n\n"])),(l()(),o._15(null,["\n"])),(l()(),
o._16(0,null,null,7,"ion-content",[["padding",""]],[[2,"statusbar-padding",null]],null,null,p.a,p.b)),o._17(4374528,null,0,h.a,[a.c,b.b,v.a,o.H,o.I,m.a,k.a,o.g,[2,r.a],[2,I.a]],null,null),(l()(),o._15(1,["\n\n  "])),(l()(),o._16(0,null,1,2,"sign-in-card",[],null,null,null,y.b,y.c)),o._17(114688,null,0,x.a,[I.a,H.a,w.k,g.a,f.a,d.a,L.a,o.g,C.c,O.a,j.c,N.a],{page:[0,"page"]},null),(l()(),o._15(null,[" "])),(l()(),o._15(1,["\n"])),(l()(),o._15(1,["\n"])),(l()(),o._15(null,["\n\n\n\n"])),(l()(),o._15(null,["\n\n"])),(l()(),o._15(null,["\n\n"])),(l()(),o._15(null,["\n\n"]))],function(l,n){l(n,6,0);l(n,16,0,"register")},function(l,n){l(n,12,0,o._19(n,13).statusbarPadding)})}function e(l){return o._14(0,[(l()(),o._16(0,null,null,1,"page-register",[],null,null,null,t,T)),o._17(49152,null,0,P.a,[d.a],null,null)],null,null)}var o=u(0),i=u(99),a=u(1),r=u(4),c=u(245),s=u(243),_=u(67),d=u(26),g=u(41),f=u(30),p=u(246),h=u(66),b=u(3),v=u(10),m=u(8),k=u(15),I=u(21),y=u(251),x=u(249),H=u(11),w=u(34),L=u(71),C=u(100),O=u(97),j=u(9),N=u(43),P=u(261);u.d(n,"a",function(){return S});var R=[],T=o._13({encapsulation:2,styles:R,data:{}}),S=o._20("page-register",P.a,e,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/1.main.js.map