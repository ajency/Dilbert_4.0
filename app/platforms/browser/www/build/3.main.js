webpackJsonp([3],{225:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u(0),e=u(382),o=u(10),i=u(16),a=u(96),r=u(234),c=u(147),s=u(148),_=u(149),d=u(151),g=u(152),p=u(153),f=u(154),h=u(235),b=u(383),v=u(244),m=u(44);u.d(n,"LoginPageModuleNgFactory",function(){return I});var k=this&&this.__extends||function(){var l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var u in n)n.hasOwnProperty(u)&&(l[u]=n[u])};return function(n,u){function t(){this.constructor=n}l(n,u),n.prototype=null===u?Object.create(u):(t.prototype=u.prototype,new t)}}(),y=function(l){function n(n){return l.call(this,n,[c.a,s.a,_.a,d.a,g.a,p.a,f.a,h.a,b.a],[])||this}return k(n,l),Object.defineProperty(n.prototype,"_NgLocalization_8",{get:function(){return null==this.__NgLocalization_8&&(this.__NgLocalization_8=new o.a(this.parent.get(t.c))),this.__NgLocalization_8},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_ɵi_9",{get:function(){return null==this.__ɵi_9&&(this.__ɵi_9=new i.a),this.__ɵi_9},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"_FormBuilder_10",{get:function(){return null==this.__FormBuilder_10&&(this.__FormBuilder_10=new i.b),this.__FormBuilder_10},enumerable:!0,configurable:!0}),n.prototype.createInternal=function(){return this._CommonModule_0=new o.d,this._ɵba_1=new i.c,this._FormsModule_2=new i.d,this._ReactiveFormsModule_3=new i.e,this._IonicModule_4=new a.b,this._IonicPageModule_5=new a.c,this._LoggedInHeaderComponentModule_6=new r.a,this._LoginPageModule_7=new e.a,this._LAZY_LOADED_TOKEN_11=v.a,this._LoginPageModule_7},n.prototype.getInternal=function(l,n){return l===o.d?this._CommonModule_0:l===i.c?this._ɵba_1:l===i.d?this._FormsModule_2:l===i.e?this._ReactiveFormsModule_3:l===a.b?this._IonicModule_4:l===a.c?this._IonicPageModule_5:l===r.a?this._LoggedInHeaderComponentModule_6:l===e.a?this._LoginPageModule_7:l===o.e?this._NgLocalization_8:l===i.a?this._ɵi_9:l===i.b?this._FormBuilder_10:l===m.d?this._LAZY_LOADED_TOKEN_11:n},n.prototype.destroyInternal=function(){},n}(t.x),I=new t.y(y,e.a)},233:function(l,n,u){"use strict";u(0),u(60),u(32),u(30);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,this&&this.__metadata,function(){function l(l,n,u,t){this.popoverCtrl=l,this.cookieservice=n,this.events=u,this.appservice=t}return l.prototype.ngOnInit=function(){"yes"==this.cookieservice.get("keepLoggedIn")?(this.header="loggedin",this.appservice.image?this.image=this.appservice.image:this.image=this.cookieservice.get("profileImage")):"yes"==this.cookieservice.get("join")||"yes"==this.cookieservice.get("create")?this.header="new":this.header="notloggedin"},l.prototype.openPopover=function(l){this.popoverCtrl.create("PopoverPage",{}).present({ev:l})},l.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register"),console.log("Navigating to another module")},l.prototype.navigateToLogin=function(){this.events.publish("app:navroot","login"),console.log("Navigating to another module")},l}())},234:function(l,n,u){"use strict";u(0),u(60),u(233);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},235:function(l,n,u){"use strict";function t(l){return d._14(0,[(l()(),d._16(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),d._15(null,["\n                      "])),(l()(),d._16(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""]],null,null,null,null,null)),d._17(16384,null,0,g.a,[p.c,d.H,d.I],{color:[0,"color"]},null),(l()(),d._15(null,["\n                          Ajency.in\n                      "])),(l()(),d._15(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function e(l){return d._14(0,[(l()(),d._16(0,null,null,5,"div",[["class","brand-name"],["font-weight-4",""],["start",""]],null,null,null,null,null)),(l()(),d._15(null,["\n                      "])),(l()(),d._16(0,null,null,2,"p",[["color","secondary"],["ion-text",""],["no-margin",""],["p-h-10",""]],null,null,null,null,null)),d._17(16384,null,0,g.a,[p.c,d.H,d.I],{color:[0,"color"]},null),(l()(),d._15(null,["\n                          DILBERT\n                      "])),(l()(),d._15(null,["\n                  "]))],function(l,n){l(n,3,0,"secondary")},null)}function o(l){return d._14(0,[(l()(),d._16(0,null,null,2,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToLogin()&&t}return t},f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._15(0,["\n                    Login\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function i(l){return d._14(0,[(l()(),d._16(0,null,null,2,"button",[["class",""],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToRegister()&&t}return t},f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._15(0,["\n                    Register\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function a(l){return d._14(0,[(l()(),d._16(0,null,null,2,"button",[["class","mobile-hide"],["clear",""],["color","gray-link"],["ion-button",""],["text-capitalize",""]],null,null,null,f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._15(0,["\n                    Contact Us\n                "]))],function(l,n){l(n,1,0,"gray-link","")},null)}function r(l){return d._14(0,[(l()(),d._16(0,null,null,6,"button",[["class","notify hvr-pulse-grow mobile-hide"],["clear",""],["icon-only",""],["ion-button",""],["m-r-10",""]],null,null,null,f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{clear:[0,"clear"]},null),(l()(),d._15(0,["\n                    "])),(l()(),d._16(0,null,0,2,"ion-icon",[["color","dark"],["name","notifications-outline"],["role","img"]],[[2,"hide",null]],null,null,null,null)),d._17(147456,null,0,b.a,[p.c,d.H,d.I],{color:[0,"color"],name:[1,"name"]},null),(l()(),d._15(null,["\n                    "])),(l()(),d._15(0,["\n                "]))],function(l,n){l(n,1,0,"");l(n,4,0,"dark","notifications-outline")},function(l,n){l(n,3,0,d._19(n,4)._hidden)})}function c(l){return d._14(0,[(l()(),d._16(0,null,null,20,"button",[["class","user-profile"],["clear",""],["icon-only",""],["ion-button",""],["p-v-20",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.openPopover(u)&&t}return t},f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{clear:[0,"clear"]},null),(l()(),d._15(0,["\n                    "])),(l()(),d._16(0,null,0,16,"ion-item",[["class","item item-block"],["p-l-0",""]],null,null,null,v.a,v.b)),d._17(1097728,null,3,m.a,[k.a,p.c,d.H,d.I,[2,y.a]],null,null),d._18(335544320,2,{contentLabel:0}),d._18(603979776,3,{_buttons:1}),d._18(603979776,4,{_icons:1}),d._17(16384,null,0,I.a,[],null,null),(l()(),d._15(2,["\n                        "])),(l()(),d._16(0,null,0,4,"ion-avatar",[["item-start",""],["m-h-0",""]],null,null,null,null,null)),d._17(16384,null,0,x.a,[],null,null),(l()(),d._15(null,["\n                            "])),(l()(),d._16(0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),d._15(null,["\n                        "])),(l()(),d._15(2,["\n                        "])),(l()(),d._16(0,null,2,2,"ion-icon",[["name","arrow-dropdown"],["p-l-5",""],["p-r-0",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),d._17(147456,[[4,4]],0,b.a,[p.c,d.H,d.I],{name:[0,"name"]},null),(l()(),d._15(null,["\n                        "])),(l()(),d._15(2,["\n                    "])),(l()(),d._15(0,["\n                "]))],function(l,n){l(n,1,0,"");l(n,17,0,"arrow-dropdown")},function(l,n){var u=n.component;l(n,13,0,d._28(1,"",u.image,"")),l(n,16,0,d._19(n,17)._hidden)})}function s(l){return d._14(0,[(l()(),d._15(null,["\n"])),(l()(),d._16(0,null,null,76,"div",[["class","main-header shadow-1"]],null,null,null,null,null)),(l()(),d._15(null,["\n    "])),(l()(),d._16(0,null,null,73,"div",[["class","container"]],null,null,null,null,null)),(l()(),d._15(null,["\n        "])),(l()(),d._15(null,["\n        "])),(l()(),d._16(0,null,null,68,"ion-navbar",[["class","dilbert-nav toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,H.a,H.b)),d._17(49152,null,0,w.a,[L.a,[2,O.a],[2,C.a],p.c,d.H,d.I],null,null),(l()(),d._15(3,["\n            "])),(l()(),d._16(0,null,3,43,"div",[["class","dilbert-nav__left nav-cols"]],null,null,null,null,null)),(l()(),d._15(null,["\n                "])),(l()(),d._16(0,null,null,9,"div",[],null,null,null,null,null)),(l()(),d._15(null,["\n                "])),(l()(),d._16(0,null,null,6,"button",[["class","ham"],["clear",""],["color","text"],["icon-only",""],["ion-button",""],["m-h-0",""],["menutoggle",""]],null,null,null,f.a,f.b)),d._17(1097728,null,0,h.a,[[8,""],p.c,d.H,d.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),d._15(0,["\n                  "])),(l()(),d._16(0,null,0,2,"ion-icon",[["name","menu"],["role","img"]],[[2,"hide",null]],null,null,null,null)),d._17(147456,null,0,b.a,[p.c,d.H,d.I],{name:[0,"name"]},null),(l()(),d._15(null,["\n                  "])),(l()(),d._15(0,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._16(0,null,null,7,"div",[],null,null,null,null,null)),(l()(),d._15(null,["\n                  "])),(l()(),d._22(16777216,null,null,1,null,t)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                  "])),(l()(),d._22(16777216,null,null,1,null,e)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._16(0,null,null,19,"div",[["class","relative lang-container"]],null,null,null,null,null)),(l()(),d._15(null,["\n                    "])),(l()(),d._16(0,null,null,16,"ion-select",[["class","select-lang mobile-hide"],["color","gray-link"],["interface","popover"]],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==d._19(l,35)._click(u)&&t}if("keyup.space"===n){t=!1!==d._19(l,35)._keyup()&&t}return t},P.a,P.b)),d._17(1228800,null,1,N.a,[L.a,k.a,p.c,d.H,d.I,[2,m.a],T.b],{color:[0,"color"],interface:[1,"interface"]},null),d._18(603979776,1,{options:1}),d._29(5120,null,D.f,function(l){return[l]},[N.a]),(l()(),d._15(null,["\n                        "])),(l()(),d._16(0,null,null,2,"ion-option",[["selected","true"],["value","eng"]],null,null,null,null,null)),d._17(16384,[[1,4]],0,E.a,[d.H],{selected:[0,"selected"],value:[1,"value"]},null),(l()(),d._15(null,["\n                            English\n                        "])),(l()(),d._15(null,["\n                        "])),(l()(),d._16(0,null,null,2,"ion-option",[["value","french"]],null,null,null,null,null)),d._17(16384,[[1,4]],0,E.a,[d.H],{value:[0,"value"]},null),(l()(),d._15(null,["\n                            French\n                        "])),(l()(),d._15(null,["\n                        "])),(l()(),d._16(0,null,null,2,"ion-option",[["value","italiano"]],null,null,null,null,null)),d._17(16384,[[1,4]],0,E.a,[d.H],{value:[0,"value"]},null),(l()(),d._15(null,["\n                            Italiano\n                        "])),(l()(),d._15(null,["\n                    "])),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n            "])),(l()(),d._15(3,["\n            "])),(l()(),d._16(0,null,3,19,"div",[["class","dilbert-nav__right nav-cols"]],null,null,null,null,null)),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._22(16777216,null,null,1,null,o)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._22(16777216,null,null,1,null,i)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._22(16777216,null,null,1,null,a)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._22(16777216,null,null,1,null,r)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n                "])),(l()(),d._22(16777216,null,null,1,null,c)),d._17(16384,null,0,j.k,[d.L,d.N],{ngIf:[0,"ngIf"]},null),(l()(),d._15(null,["\n                "])),(l()(),d._15(null,["\n            "])),(l()(),d._15(3,["\n        "])),(l()(),d._15(null,["\n        "])),(l()(),d._15(null,["\n    "])),(l()(),d._15(null,["\n"]))],function(l,n){var u=n.component;l(n,14,0,"text","");l(n,17,0,"menu"),l(n,26,0,"loggedin"==u.header),l(n,29,0,"notloggedin"==u.header||"new"==u.header);l(n,35,0,"gray-link","popover");l(n,40,0,"true","eng");l(n,44,0,"french");l(n,48,0,"italiano"),l(n,58,0,"notloggedin"==u.header),l(n,61,0,"notloggedin"==u.header),l(n,64,0,"new"==u.header),l(n,67,0,"loggedin"==u.header),l(n,71,0,"loggedin"==u.header)},function(l,n){l(n,6,0,d._19(n,7)._hidden,d._19(n,7)._sbPadding),l(n,16,0,d._19(n,17)._hidden),l(n,34,0,d._19(n,35)._disabled)})}function _(l){return d._14(0,[(l()(),d._16(0,null,null,1,"logged-in-header",[],null,null,null,s,A)),d._17(114688,null,0,M.a,[R.a,B.a,S.a,F.a],null,null)],function(l,n){l(n,1,0)},null)}var d=u(0),g=u(95),p=u(1),f=u(41),h=u(21),b=u(31),v=u(150),m=u(17),k=u(14),y=u(33),I=u(63),x=u(99),H=u(237),w=u(61),L=u(8),O=u(4),C=u(20),j=u(10),P=u(238),N=u(94),T=u(15),D=u(16),E=u(64),M=u(233),R=u(62),B=u(25),S=u(43),F=u(30);u.d(n,"c",function(){return A}),n.b=s,u.d(n,"a",function(){return J});var z=[],A=d._13({encapsulation:2,styles:z,data:{}}),J=d._20("logged-in-header",M.a,_,{},{},[])},236:function(l,n,u){"use strict";function t(l){return o._14(2,[o._18(402653184,1,{_fixedContent:0}),o._18(402653184,2,{_scrollContent:0}),(l()(),o._16(0,[[1,0],["fixedContent",1]],null,1,"div",[["class","fixed-content"]],null,null,null,null,null)),o._21(null,0),(l()(),o._16(0,[[2,0],["scrollContent",1]],null,1,"div",[["class","scroll-content"]],null,null,null,null,null)),o._21(null,1),o._21(null,2)],null,null)}function e(l){return o._14(0,[(l()(),o._16(0,null,null,1,"ion-content",[],[[2,"statusbar-padding",null]],null,null,t,f)),o._17(4374528,null,0,i.a,[a.c,r.b,c.a,o.H,o.I,s.a,_.a,o.g,[2,d.a],[2,g.a]],null,null)],null,function(l,n){l(n,0,0,o._19(n,1).statusbarPadding)})}var o=u(0),i=u(42),a=u(1),r=u(3),c=u(9),s=u(8),_=u(18),d=u(4),g=u(20);u.d(n,"b",function(){return f}),n.a=t;var p=[],f=o._13({encapsulation:2,styles:p,data:{}});o._20("ion-content",i.a,e,{color:"color",mode:"mode",fullscreen:"fullscreen",scrollDownOnLoad:"scrollDownOnLoad"},{ionScrollStart:"ionScrollStart",ionScroll:"ionScroll",ionScrollEnd:"ionScrollEnd"},["[ion-fixed],ion-fab","*","ion-refresher"])},237:function(l,n,u){"use strict";function t(l){return o._14(0,[(l()(),o._16(0,null,null,1,"div",[["class","toolbar-background"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._16(0,null,null,8,"button",[["class","back-button"],["ion-button","bar-button"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.backButtonClick(u)&&t}return t},r.a,r.b)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._17(1097728,null,0,c.a,[[8,"bar-button"],s.c,o.H,o.I],null,null),(l()(),o._16(0,null,0,2,"ion-icon",[["class","back-button-icon"],["role","img"]],[[2,"hide",null]],null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._17(147456,null,0,_.a,[s.c,o.H,o.I],{name:[0,"name"]},null),(l()(),o._16(0,null,0,2,"span",[["class","back-button-text"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),o._15(null,["",""])),o._21(null,0),o._21(null,1),o._21(null,2),(l()(),o._16(0,null,null,2,"div",[["class","toolbar-content"]],null,null,null,null,null)),o._17(278528,null,0,i.l,[o.t,o.u,o.H,o.I],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),o._21(null,3)],function(l,n){var u=n.component;l(n,1,0,"toolbar-background","toolbar-background-"+u._mode);l(n,3,0,"back-button","back-button-"+u._mode);l(n,6,0,"back-button-icon","back-button-icon-"+u._mode),l(n,7,0,u._bbIcon);l(n,9,0,"back-button-text","back-button-text-"+u._mode);l(n,15,0,"toolbar-content","toolbar-content-"+u._mode)},function(l,n){var u=n.component;l(n,2,0,u._hideBb),l(n,5,0,o._19(n,7)._hidden),l(n,10,0,u._backText)})}function e(l){return o._14(0,[(l()(),o._16(0,null,null,1,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,t,h)),o._17(49152,null,0,a.a,[d.a,[2,g.a],[2,p.a],s.c,o.H,o.I],null,null)],null,function(l,n){l(n,0,0,o._19(n,1)._hidden,o._19(n,1)._sbPadding)})}var o=u(0),i=u(10),a=u(61),r=u(41),c=u(21),s=u(1),_=u(31),d=u(8),g=u(4),p=u(20);u.d(n,"b",function(){return h}),n.a=t;var f=[],h=o._13({encapsulation:2,styles:f,data:{}});o._20("ion-navbar",a.a,e,{color:"color",mode:"mode",hideBackButton:"hideBackButton"},{},["[menuToggle],ion-buttons[left]","ion-buttons[start]","ion-buttons[end],ion-buttons[right]","*"])},238:function(l,n,u){"use strict";function t(l){return a._14(0,[(l()(),a._16(0,null,null,1,"div",[["class","select-placeholder select-text"]],null,null,null,null,null)),(l()(),a._15(null,["",""]))],null,function(l,n){l(n,1,0,n.component.placeholder)})}function e(l){return a._14(0,[(l()(),a._16(0,null,null,1,"div",[["class","select-text"]],null,null,null,null,null)),(l()(),a._15(null,["",""]))],null,function(l,n){var u=n.component;l(n,1,0,u.selectedText||u._text)})}function o(l){return a._14(0,[(l()(),a._22(16777216,null,null,1,null,t)),a._17(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._22(16777216,null,null,1,null,e)),a._17(16384,null,0,r.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._16(0,null,null,1,"div",[["class","select-icon"]],null,null,null,null,null)),(l()(),a._16(0,null,null,0,"div",[["class","select-icon-inner"]],null,null,null,null,null)),(l()(),a._16(0,null,null,1,"button",[["aria-haspopup","true"],["class","item-cover"],["ion-button","item-cover"]],[[8,"id",0],[1,"aria-labelledby",0],[1,"aria-disabled",0]],null,null,c.a,c.b)),a._17(1097728,null,0,s.a,[[8,"item-cover"],_.c,a.H,a.I],null,null)],function(l,n){var u=n.component;l(n,1,0,!u._text),l(n,3,0,u._text)},function(l,n){var u=n.component;l(n,6,0,u.id,u._labelId,u._disabled)})}function i(l){return a._14(0,[(l()(),a._16(0,null,null,3,"ion-select",[],[[2,"select-disabled",null]],[[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==a._19(l,1)._click(u)&&t}if("keyup.space"===n){t=!1!==a._19(l,1)._keyup()&&t}return t},o,m)),a._17(1228800,null,1,d.a,[g.a,p.a,_.c,a.H,a.I,[2,f.a],h.b],null,null),a._18(603979776,1,{options:1}),a._29(5120,null,b.f,function(l){return[l]},[d.a])],null,function(l,n){l(n,0,0,a._19(n,1)._disabled)})}var a=u(0),r=u(10),c=u(41),s=u(21),_=u(1),d=u(94),g=u(8),p=u(14),f=u(17),h=u(15),b=u(16);u.d(n,"b",function(){return m}),n.a=o;var v=[],m=a._13({encapsulation:2,styles:v,data:{}});a._20("ion-select",d.a,i,{color:"color",mode:"mode",disabled:"disabled",cancelText:"cancelText",okText:"okText",placeholder:"placeholder",selectOptions:"selectOptions",interface:"interface",selectedText:"selectedText",multiple:"multiple"},{ionFocus:"ionFocus",ionChange:"ionChange",ionBlur:"ionBlur",ionCancel:"ionCancel"},[])},244:function(l,n,u){"use strict";var t=u(0),e=u(60),o=u(26),i=u(30),a=u(32),r=u(98),c=u(65),s=u(66);u.d(n,"a",function(){return p});var _=this&&this.__decorate||function(l,n,u,t){var e,o=arguments.length,i=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,u):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,n,u,t);else for(var a=l.length-1;a>=0;a--)(e=l[a])&&(i=(o<3?e(i):o>3?e(n,u,i):e(n,u))||i);return o>3&&i&&Object.defineProperty(n,u,i),i},d=this&&this.__metadata||function(l,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(l,n)},g=this&&this.__param||function(l,n){return function(u,t){n(u,t,l)}},p=function(){function l(l,n,u,t,e,o,i,a,r,c,s){this.navCtrl=l,this.navParams=n,this.http=u,this.events=t,this.appServiceProvider=e,this.cookieservice=o,this.toastCtrl=i,this.zone=a,this.storage=r,this.userDataProvider=c,this.environment=s,this.domainError=!1,this.logInProcess=!1,"yes"==this.cookieservice.get("domainError")&&(this.domainError=!0)}return l.prototype.ionViewDidLoad=function(){this.storage.ready().then(function(){}),this.cookieservice.remove("domainError")},l.prototype.ionViewCanEnter=function(){return"yes"!==this.cookieservice.get("keepLoggedIn")},l.prototype.navigateToRegister=function(){this.events.publish("app:navroot","register")},l.prototype.signin=function(){var l=this;this.showLoader=!0,this.appServiceProvider.signIn().then(function(n){l.token=n,l.postRequest()}),this.zone.run(function(){})},l.prototype.postRequest=function(){var l=this,n=new o.l;n.append("Accept","application/json"),n.append("Content-Type","application/json");var u=new o.j({headers:n}),t=this.environment.dilbertApi+"/login",e={token:this.token};this.http.post(t,e,u).subscribe(function(n){l.status=JSON.parse(n._body).status,l.loginData=JSON.parse(n._body).data,l.storage.set("userData",l.loginData).then(function(){}),console.log(l.status),"success"==l.status?(l.code=JSON.parse(n._body).code,"dash"===l.code?(l.cookieservice.put("keepLoggedIn","yes"),l.events.publish("app:navroot","dashboard")):"join"===l.code?(l.events.publish("app:navroot","join-organisation"),l.cookieservice.put("join","yes")):(l.events.publish("app:navroot","create-organisation"),l.cookieservice.put("create","yes"))):"failure"==l.status&&(l.events.publish("app:navroot","login"),l.domainError=!0,l.cookieservice.put("domainError","yes"))},function(l){console.log(l.status)}),this.zone.run(function(){})},l.prototype.errorToast=function(){console.log("errorToast function"),this.toastCtrl.create({message:"Domain does not exist",showCloseButton:!0,closeButtonText:"OK",position:"bottom"}).present(),this.zone.run(function(){})},l}();p=_([u.i(e.a)({name:"login",segment:"login",priority:"off"}),u.i(t._23)({selector:"page-login",templateUrl:"login.html"}),g(10,u.i(t.E)(s.a)),d("design:paramtypes",["function"==typeof(f=void 0!==e.b&&e.b)&&f||Object,"function"==typeof(h=void 0!==e.c&&e.c)&&h||Object,"function"==typeof(b=void 0!==o.k&&o.k)&&b||Object,"function"==typeof(v=void 0!==e.d&&e.d)&&v||Object,"function"==typeof(m=void 0!==i.a&&i.a)&&m||Object,"function"==typeof(k=void 0!==a.b&&a.b)&&k||Object,"function"==typeof(y=void 0!==e.e&&e.e)&&y||Object,"function"==typeof(I=void 0!==t.g&&t.g)&&I||Object,"function"==typeof(x=void 0!==c.b&&c.b)&&x||Object,"function"==typeof(H=void 0!==r.a&&r.a)&&H||Object,Object])],p);var f,h,b,v,m,k,y,I,x,H},382:function(l,n,u){"use strict";u(0),u(60),u(244),u(234);u.d(n,"a",function(){return t});var t=(this&&this.__decorate,function(){function l(){}return l}())},383:function(l,n,u){"use strict";function t(l){return a._14(0,[(l()(),a._16(0,null,null,6,"ion-card",[["class","alert-error"]],null,null,null,null,null)),a._17(16384,null,0,r.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["\n          "])),(l()(),a._16(0,null,null,2,"ion-card-header",[],null,null,null,null,null)),a._17(16384,null,0,s.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["\n            Domain does not exist\n          "])),(l()(),a._15(null,["\n        "]))],null,null)}function e(l){return a._14(0,[(l()(),a._16(0,null,null,10,"div",[["class","site-loader"]],null,null,null,null,null)),(l()(),a._15(null,["\n  "])),(l()(),a._16(0,null,null,7,":svg:svg",[["height","120"],["width","120"]],null,null,null,null,null)),(l()(),a._15(null,["\n    "])),(l()(),a._16(0,null,null,0,":svg:line",[["class","pointer"],["x1","60"],["x2","60"],["y1","60"],["y2","50"]],null,null,null,null,null)),(l()(),a._15(null,["\n    "])),(l()(),a._16(0,null,null,0,":svg:circle",[["class","circle"],["cx","60"],["cy","60"],["r","15"]],null,null,null,null,null)),(l()(),a._15(null,["\n    "])),(l()(),a._16(0,null,null,0,":svg:circle",[["class","center"],["cx","60"],["cy","60"],["r","2.5"]],null,null,null,null,null)),(l()(),a._15(null,["\n  "])),(l()(),a._15(null,["\n"]))],null,null)}function o(l){return a._14(0,[(l()(),a._15(null,["\n"])),(l()(),a._15(null,["\n"])),(l()(),a._16(0,null,null,6,"ion-header",[],null,null,null,null,null)),a._17(16384,null,0,_.a,[c.c,a.H,a.I,[2,d.a]],null,null),(l()(),a._15(null,["\n    "])),(l()(),a._16(0,null,null,2,"logged-in-header",[],null,null,null,g.b,g.c)),a._17(114688,null,0,p.a,[f.a,h.a,b.a,v.a],null,null),(l()(),a._15(null,[" "])),(l()(),a._15(null,["\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._15(null,["\n\n\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._16(0,null,null,57,"ion-content",[["padding",""]],[[2,"statusbar-padding",null]],null,null,m.a,m.b)),a._17(4374528,null,0,k.a,[c.c,y.b,I.a,a.H,a.I,x.a,H.a,a.g,[2,d.a],[2,w.a]],null,null),(l()(),a._15(1,["\n    "])),(l()(),a._16(0,null,1,53,"div",[["class","container"],["p-h-20",""]],null,null,null,null,null)),(l()(),a._15(null,["\n\t\t\n\n\t\t"])),(l()(),a._16(0,null,null,50,"div",[["class","login-card"],["text-center",""]],null,null,null,null,null)),(l()(),a._15(null,["\n\t\t\t"])),(l()(),a._16(0,null,null,39,"ion-card",[],null,null,null,null,null)),a._17(16384,null,0,r.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["\n        "])),(l()(),a._22(16777216,null,null,1,null,t)),a._17(16384,null,0,L.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._15(null,["\n\t\t\t  "])),(l()(),a._16(0,null,null,0,"img",[["src","./../../assets/img/dilbert.jpg"],["width","80"]],null,null,null,null,null)),(l()(),a._15(null,["\n\t\t\t  "])),(l()(),a._16(0,null,null,30,"ion-card-content",[],null,null,null,null,null)),a._17(16384,null,0,O.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["\n\t\t\t    "])),(l()(),a._16(0,null,null,10,"ion-card-title",[],null,null,null,null,null)),a._17(16384,null,0,C.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["\n\t\t\t      "])),(l()(),a._16(0,null,null,2,"h2",[["class","login-card__title"],["ion-text",""],["m-b-8",""],["text-uppercase",""]],null,null,null,null,null)),a._17(16384,null,0,j.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["Dilbert"])),(l()(),a._15(null,["\n\t\t\t      "])),(l()(),a._16(0,null,null,2,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""]],null,null,null,null,null)),a._17(16384,null,0,j.a,[c.c,a.H,a.I],{color:[0,"color"]},null),(l()(),a._15(null,["Track Time. Record Work"])),(l()(),a._15(null,["\n\t\t\t     "])),(l()(),a._15(null,["\n\t\t\t     "])),(l()(),a._16(0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),a._15(null,["\n\t\t\t    "])),(l()(),a._16(0,null,null,1,"h5",[["class","login-card__title2"],["m-t-15",""]],null,null,null,null,null)),(l()(),a._15(null,["Have an existing account?"])),(l()(),a._15(null,["\n\n\t\t\t    "])),(l()(),a._16(0,null,null,2,"p",[["color","text-lighter"],["font-weight-4",""],["ion-text",""],["m-t-5",""]],null,null,null,null,null)),a._17(16384,null,0,j.a,[c.c,a.H,a.I],{color:[0,"color"]},null),(l()(),a._15(null,["Sign in and continue where you left off"])),(l()(),a._15(null,["\n\n\t\t\t    "])),(l()(),a._16(0,null,null,5,"button",[["class","sign-in"],["color","danger-dark"],["ion-button",""],["m-t-15",""]],[[8,"disabled",0]],[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.signin()&&t}return t},N.a,N.b)),a._17(1097728,null,0,T.a,[[8,""],c.c,a.H,a.I],{color:[0,"color"]},null),(l()(),a._15(0,[" "])),(l()(),a._16(0,null,0,1,"ion-icon",[["name","logo-googleplus"],["p-r-10",""],["role","img"]],[[2,"hide",null]],null,null,null,null)),a._17(147456,null,0,D.a,[c.c,a.H,a.I],{name:[0,"name"]},null),(l()(),a._15(0,[" Sign in with Google"])),(l()(),a._15(null,["\n          \n\t\t\t  "])),(l()(),a._15(null,["\n\t\t\t"])),(l()(),a._15(null,["\n\n\t\t\t"])),(l()(),a._16(0,null,null,2,"div",[["class","sign-text"],["ion-text",""],["m-b-0",""],["p-t-20",""]],null,null,null,null,null)),a._17(16384,null,0,j.a,[c.c,a.H,a.I],null,null),(l()(),a._15(null,["Haven't connected to Dilbert yet?"])),(l()(),a._15(null,["\n\t\t\t"])),(l()(),a._16(0,null,null,2,"button",[["class","sign-up"],["clear",""],["color","primary"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.navigateToRegister()&&t}return t},N.a,N.b)),a._17(1097728,null,0,T.a,[[8,""],c.c,a.H,a.I],{color:[0,"color"],clear:[1,"clear"]},null),(l()(),a._15(0,["Sign up!"])),(l()(),a._15(null,["\n\t\t"])),(l()(),a._15(null,["\n\n   \n       \n\n    "])),(l()(),a._15(1,["\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._15(null,["\n\n"])),(l()(),a._22(16777216,null,null,1,null,e)),a._17(16384,null,0,L.k,[a.L,a.N],{ngIf:[0,"ngIf"]},null),(l()(),a._15(null,["\n\n"])),(l()(),a._15(null,["\n\n\n\n\n\n\n\n\n\n\n\n\n\n"]))],function(l,n){var u=n.component;l(n,6,0),l(n,24,0,u.domainError);l(n,39,0,"text-lighter");l(n,49,0,"text-lighter");l(n,53,0,"danger-dark");l(n,56,0,"logo-googleplus");l(n,66,0,"primary",""),l(n,75,0,1==u.showLoader)},function(l,n){var u=n.component;l(n,13,0,a._19(n,14).statusbarPadding),l(n,52,0,u.logInProcess),l(n,55,0,a._19(n,56)._hidden)})}function i(l){return a._14(0,[(l()(),a._16(0,null,null,1,"page-login",[],null,null,null,o,A)),a._17(49152,null,0,P.a,[w.a,E.a,M.k,b.a,v.a,h.a,R.a,a.g,B.c,S.a,F.a],null,null)],null,null)}var a=u(0),r=u(103),c=u(1),s=u(110),_=u(97),d=u(4),g=u(235),p=u(233),f=u(62),h=u(25),b=u(43),v=u(30),m=u(236),k=u(42),y=u(3),I=u(9),x=u(8),H=u(18),w=u(20),L=u(10),O=u(101),C=u(102),j=u(95),P=u(244),N=u(41),T=u(21),D=u(31),E=u(11),M=u(26),R=u(67),B=u(100),S=u(98),F=u(66);u.d(n,"a",function(){return J});var z=[],A=a._13({encapsulation:2,styles:z,data:{}}),J=a._20("page-login",P.a,i,{},{},[])}});
//# sourceMappingURL=/home/aj-sujit/Dilbert_4.0/app/www/build/3.main.js.map