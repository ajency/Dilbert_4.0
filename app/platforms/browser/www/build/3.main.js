webpackJsonp([3],{

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_logged_in_header_logged_in_header_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_footer_footer_module__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sign_in_card_sign_in_card_module__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { AppServiceProvider } from '../../providers/app-service/app-service';




var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateModule */].forChild(),
            __WEBPACK_IMPORTED_MODULE_3__components_logged_in_header_logged_in_header_module__["a" /* LoggedInHeaderComponentModule */],
            __WEBPACK_IMPORTED_MODULE_5__components_sign_in_card_sign_in_card_module__["a" /* SignInCardComponentModule */],
            __WEBPACK_IMPORTED_MODULE_4__components_footer_footer_module__["a" /* FooterComponentModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ]
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logged_in_header__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedInHeaderComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoggedInHeaderComponentModule = (function () {
    function LoggedInHeaderComponentModule() {
    }
    return LoggedInHeaderComponentModule;
}());
LoggedInHeaderComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__logged_in_header__["a" /* LoggedInHeaderComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__logged_in_header__["a" /* LoggedInHeaderComponent */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateModule */].forChild(),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__logged_in_header__["a" /* LoggedInHeaderComponent */]
        ]
    })
], LoggedInHeaderComponentModule);

//# sourceMappingURL=logged-in-header.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_cookie__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_service_app_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_globals_app_globals__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggedInHeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the LoggedInHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var LoggedInHeaderComponent = (function () {
    function LoggedInHeaderComponent(
        // private translate: TranslateService,
        popoverCtrl, cookieservice, events, appservice, translate, appglobals, zone) {
        this.popoverCtrl = popoverCtrl;
        this.cookieservice = cookieservice;
        this.events = events;
        this.appservice = appservice;
        this.translate = translate;
        this.appglobals = appglobals;
        this.zone = zone;
        this.langSelect = true;
        this.param = {
            value: 'world'
        };
        if (this.appglobals.lang == "en") {
            this.langSelect = true;
        }
        else {
            this.langSelect = false;
        }
        // this language will be used as a fallback when a translation isn't found in the current language
        // translate.setDefaultLang('fr');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        // translate.use('fr');
    }
    LoggedInHeaderComponent.prototype.ngOnInit = function () {
        if (this.cookieservice.get("keepLoggedIn") == 'yes') {
            this.header = "loggedin";
            if (this.appservice.image) {
                this.image = this.appservice.image;
            }
            else {
                this.image = this.cookieservice.get("profileImage");
            }
        }
        else {
            if (this.cookieservice.get("join") == 'yes' || this.cookieservice.get("create") == 'yes') {
                this.header = "new";
            }
            else {
                this.header = "notloggedin";
            }
        }
    };
    LoggedInHeaderComponent.prototype.ionViewDidLoad = function () {
        this.zone.run(function () { });
    };
    LoggedInHeaderComponent.prototype.setLocale = function () {
        console.log(this.lang);
        this.events.publish("app:localize", this.lang);
    };
    LoggedInHeaderComponent.prototype.openPopover = function (ev) {
        var popover = this.popoverCtrl.create('PopoverPage', {});
        popover.present({
            ev: ev
        });
    };
    LoggedInHeaderComponent.prototype.navigateToRegister = function () {
        this.events.publish('app:navroot', 'register');
        console.log('Navigating to another module');
    };
    LoggedInHeaderComponent.prototype.navigateToLogin = function () {
        this.events.publish('app:navroot', 'login');
        console.log('Navigating to another module');
    };
    return LoggedInHeaderComponent;
}());
LoggedInHeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'logged-in-header',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/components/logged-in-header/logged-in-header.html"*/'<!-- Generated template for the LoggedInHeaderComponent component -->\n<div class="main-header shadow-1">\n    <div class="container">\n        <!-- Navbar Start-->\n        <ion-navbar class="dilbert-nav">\n            <div class="dilbert-nav__left nav-cols">\n                <div>\n                <button class="ham" icon-only color="text"  ion-button="" m-h-0="" menutoggle="" clear="">\n                  <ion-icon name="menu">\n                  </ion-icon>\n                </button>\n                </div>\n                <!-- <button *ngIf="header == \'loggedin\' " class="mobile-hide" clear="" icon-only="" ion-button="" p-h-10="">\n                    <i class="custom-icon flower">\n                    </i>\n                </button>\n                <button *ngIf="header == \'loggedin\' " class="mobile-hide" clear="" icon-only="" ion-button="" p-h-10="">\n                    <i class="custom-icon summary">\n                    </i>\n                </button> -->\n                <div>\n                  <div *ngIf="header == \'loggedin\' " class="brand-name" font-weight-4="" start="">\n                      <p color="secondary" ion-text="" no-margin="">\n                          Ajency.in\n                      </p>\n                  </div>\n                  <div *ngIf="header == \'notloggedin\' || header == \'new\' " class="brand-name" font-weight-4="" start="">\n                      <p color="secondary" ion-text="" no-margin="" p-h-10>\n                          DILBERT\n                      </p>\n                  </div>\n                </div>\n                <div class="relative lang-container">\n                    <ion-select [(ngModel)]="lang" (ionChange)="setLocale()" class="select-lang mobile-hide" color="gray-link" interface="popover">\n                        <ion-option selected = "{{langSelect}}"  value="en">\n                            English\n                        </ion-option>\n                        <ion-option selected = "{{!langSelect}}" value="fr">\n                            French\n                        </ion-option>\n                    </ion-select>\n                </div>\n                 \n            </div>\n            <div class="dilbert-nav__right nav-cols">\n                <!-- Notification -->\n                <button (click)="navigateToLogin()" *ngIf="header == \'notloggedin\' " class="" clear="" color="gray-link" ion-button="" text-capitalize="">\n                {{ \'login\' | translate}}\n                    \n                </button>\n                <button (click)="navigateToRegister()" *ngIf="header == \'notloggedin\' " class="" clear="" color="gray-link" ion-button="" text-capitalize="">\n                    {{ \'register\' | translate }}\n                </button>\n                <button *ngIf="header == \'new\' " class="mobile-hide" clear="" color="gray-link" ion-button="" text-capitalize="">\n                    {{ \'contact us\' | translate}}\n                </button>\n               <!--  <button *ngIf="header == \'loggedin\' " class="notify hvr-pulse-grow mobile-hide" clear="" icon-only="" ion-button="" m-r-10="">\n                    <ion-icon color="dark" name="notifications-outline">\n                    </ion-icon>\n                </button> -->\n                <!-- User profile -->\n                <button (click)="openPopover($event)" *ngIf="header == \'loggedin\' " class="user-profile" clear="" icon-only="" ion-button="" p-v-20="">\n                    <ion-item p-l-0="">\n                        <ion-avatar item-start="" m-h-0="">\n                            <img src="{{image}}"/>\n                        </ion-avatar>\n                        <ion-icon name="arrow-dropdown" p-l-5="" p-r-0="">\n                        </ion-icon>\n                    </ion-item>\n                </button>\n                <!-- User profile ends -->\n            </div>\n        </ion-navbar>\n        <!-- Navbar ends -->\n    </div>\n</div>'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/components/logged-in-header/logged-in-header.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_2_ngx_cookie__["b" /* CookieService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__providers_app_service_app_service__["a" /* AppServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_globals_app_globals__["a" /* AppGlobalsProvider */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgZone */]])
], LoggedInHeaderComponent);

//# sourceMappingURL=logged-in-header.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__footer__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FooterComponentModule = (function () {
    function FooterComponentModule() {
    }
    return FooterComponentModule;
}());
FooterComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__footer__["a" /* FooterComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__footer__["a" /* FooterComponent */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__footer__["a" /* FooterComponent */]
        ]
    })
], FooterComponentModule);

//# sourceMappingURL=footer.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_app_globals_app_globals__ = __webpack_require__(119);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var FooterComponent = (function () {
    function FooterComponent(appglobals) {
        this.appglobals = appglobals;
        this.version = "";
        this.version = this.appglobals.getAppVersion();
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'footer-element',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/components/footer/footer.html"*/'<!-- Generated template for the FooterComponent component -->\n<div>\n  <div align="center" padding-vertical> {{ \'by\' | translate }} <a href = "https://ajency.in/">Ajency.in</a> <span class="version-string">&nbsp;V{{version}}</span></div>\n</div>\n'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/components/footer/footer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_app_globals_app_globals__["a" /* AppGlobalsProvider */]])
], FooterComponent);

//# sourceMappingURL=footer.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sign_in_card__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInCardComponentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignInCardComponentModule = (function () {
    function SignInCardComponentModule() {
    }
    return SignInCardComponentModule;
}());
SignInCardComponentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__sign_in_card__["a" /* SignInCardComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sign_in_card__["a" /* SignInCardComponent */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateModule */].forChild(),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__sign_in_card__["a" /* SignInCardComponent */]
        ]
    })
], SignInCardComponentModule);

//# sourceMappingURL=sign-in-card.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_app_service_app_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_data_user_data__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_env_token__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_app_globals_app_globals__ = __webpack_require__(119);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignInCardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










/**
 * Generated class for the SignInCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var SignInCardComponent = (function () {
    function SignInCardComponent(navCtrl, navParams, http, appglobals, events, appServiceProvider, cookieservice, toastCtrl, zone, storage, userDataProvider, location, environment) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.appglobals = appglobals;
        this.events = events;
        this.appServiceProvider = appServiceProvider;
        this.cookieservice = cookieservice;
        this.toastCtrl = toastCtrl;
        this.zone = zone;
        this.storage = storage;
        this.userDataProvider = userDataProvider;
        this.location = location;
        this.environment = environment;
        this.domainError = false;
        this.logInProcess = false;
        this.disableBtn = false;
        console.log('Hello SignInCardComponent Component');
        // if(this.cookieservice.get("domainError")== 'yes'){
        //   this.domainError =true;    
        // }
        // this.cookieservice.remove("domainError");
    }
    SignInCardComponent.prototype.ngOnInit = function () {
        console.log(this.page);
        if (this.page == 'login') {
            this.login = true;
        }
        else if (this.page == 'register') {
            this.page = false;
        }
        // let path = this.location.path(true)
        //     let pathparts = path.split('/');
        //     pathparts.map((val) => {
        //       if(val === 'login'){
        //         this.login = true;
        //       }
        //       else if(val === 'register'){
        //       	this.login = false;
        //       }
        //     });
    };
    SignInCardComponent.prototype.ionViewDidLoad = function () {
        this.zone.run(function () { });
        // this.cookieservice.remove("domainError");
    };
    SignInCardComponent.prototype.navigateTo = function () {
        if (this.login) {
            this.events.publish('app:navroot', 'register');
        }
        else {
            this.events.publish('app:navroot', 'login');
        }
    };
    SignInCardComponent.prototype.signin = function () {
        var _this = this;
        // this.showLoader = true;
        this.logInProcess = true;
        this.domainError = false;
        this.appServiceProvider.signIn().then(function (token) {
            _this.token = token;
            _this.disableBtn = true;
            _this.zone.run(function () { });
            _this.postRequest();
        });
    };
    SignInCardComponent.prototype.postRequest = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        var url = this.environment.dilbertApi + "/login/google/" + this.appglobals.lang + "?token=" + this.token;
        console.log(url);
        // let postParams = {
        // token : this.token
        // }
        this.appServiceProvider.request(url, 'get', {}, {}, false, 'observable', '', {}, false).subscribe(function (data) {
            _this.loginResponse = data;
            // console.log(this.loginResponse);
            _this.status = _this.loginResponse.status;
            _this.next_url = _this.loginResponse.next_url;
            _this.storage.set('userData', _this.loginResponse.data).then(function () {
            });
            if (_this.status == "200") {
                // this.code= JSON.parse(data['_body']).code;
                // this.navigateToSummary();
                if (_this.next_url === "/dashboard") {
                    _this.cookieservice.put("keepLoggedIn", "yes");
                    _this.events.publish('app:navroot', 'dashboard');
                }
                else if (_this.next_url === "/join_organisation") {
                    _this.cookieservice.put("join", "yes");
                    _this.events.publish('app:navroot', 'join-organisation');
                }
                else {
                    _this.cookieservice.put("create", "yes");
                    _this.events.publish('app:navroot', 'create-organisation');
                }
            }
            else if (_this.status == "400") {
                // this.events.publish('app:navroot', 'login');
                _this.domainError = true;
                _this.error_msg = _this.loginResponse.message;
                console.log(_this.error_msg);
                _this.disableBtn = false;
                _this.zone.run(function () { });
                // this.cookieservice.put("domainError","yes");
                // this.errorToast();
            }
        }, function (error) {
            console.log(error.status); // Error getting the data
        });
        // this.http.get(url,options)
        // .subscribe(data => {
        // this.status = JSON.parse(data['_body']).status;
        // this.loginData = JSON.parse(data['_body']).data;
        // this.storage.set('userData', this.loginData).then( () => {
        //     });
        // console.log(this.status);
        // if(this.status =="success"){
        // 	// this.code= JSON.parse(data['_body']).code;
        // // this.navigateToSummary();
        // 	if(this.code === "dash"){
        // 			this.cookieservice.put("keepLoggedIn","yes");
        // 			this.events.publish('app:navroot', 'dashboard');
        // 			}
        // 	else if( this.code === "join" ){
        // 		this.events.publish('app:navroot', 'join-organisation');
        // 		this.cookieservice.put("join","yes");
        // 	}
        // 	else{
        // 		this.events.publish('app:navroot', 'create-organisation');
        // 		this.cookieservice.put("create","yes");
        // 	}
        // }
        // else if(this.status =="failure"){
        // 	this.events.publish('app:navroot', 'login');
        // 	this.domainError = true;
        // 	this.cookieservice.put("domainError","yes");
        // 	// this.errorToast();
        // }
        // }, error => {
        // console.log(error.status);// Error getting the data
        // });
        // this.zone.run(() => {});
        // // console.log(this.status);
    };
    return SignInCardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["q" /* Input */])('page'),
    __metadata("design:type", Object)
], SignInCardComponent.prototype, "page", void 0);
SignInCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_5" /* Component */])({
        selector: 'sign-in-card',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/components/sign-in-card/sign-in-card.html"*/'\n<div class="container" p-h-20>\n	\n\n	<div class="login-card" text-center>\n		<ion-card>\n			\n			<img src="./../../assets/img/dilbert.jpg" width="80">\n			<ion-card-content>\n				<ion-card-title>\n					<h2 ion-text text-uppercase class="login-card__title" m-b-8>Dilbert</h2>\n					<p ion-text color="text-lighter" font-weight-4>{{ hero_title | translate }}</p>\n				</ion-card-title>\n				<hr>\n				<h5 *ngIf = "login" class="login-card__title2" m-t-15>{{ \'account_exist\' | translate }}</h5>\n				<h5 *ngIf ="!login" class="login-card__title2" m-t-15>{{ \'sign_up\' | translate }} {{ \'_change_ur_work_way\' | translate }}</h5>\n\n				<p *ngIf = "login" ion-text color="text-lighter" font-weight-4 m-t-5>{{ \'sign_in\' | translate }} {{ \'n_cont_whr_u_left_off\' | translate }}</p>\n				<p *ngIf = "!login" ion-text color="text-lighter" font-weight-4 m-t-5> {{\'conn_using_google_acc\' | translate}} </p>\n\n\n				<button *ngIf = "login" ion-button color="danger-dark" m-t-15 class="sign-in" [disabled] = "disableBtn" [ngClass]="{loading: disableBtn}" (click) = "signin()"> <ion-icon name="logo-googleplus" p-r-10></ion-icon> {{\'sign_in\' | translate}} {{\'with_google\' | translate }}</button>\n\n				<button *ngIf = "!login" ion-button color="danger-dark" m-t-15 class="sign-in" [disabled] = "disableBtn" [ngClass]="{loading: disableBtn}" (click) = "signin()"> <ion-icon name="logo-googleplus" p-r-10></ion-icon> {{ \'sign_up\' | translate }} {{\'with_google\' | translate }}</button>\n				\n			</ion-card-content>\n\n			<ion-card *ngIf = "domainError" class="alert-error">\n				<ion-card-header>\n					{{error_msg}}\n				</ion-card-header>\n			</ion-card>\n			\n		</ion-card>\n\n		<div *ngIf = "login" ion-text p-t-20 m-b-0 class="sign-text">{{ \'not_conn_2_dilbert\' | translate }}</div>\n		<button *ngIf = "login" ion-button color="primary" clear class="sign-up" (click)="navigateTo()" > {{ \'sign_up\' | translate }}!</button>\n\n		<div *ngIf = "!login" ion-text p-t-20 m-b-0 class="sign-text">{{ \'already_hv_acc_in_dil\' | translate }}</div>\n		<button *ngIf = "!login" ion-button color="primary" clear class="sign-up" (click)="navigateTo()" >{{\'sign_in\' | translate}}!</button>\n	</div>\n\n	\n	\n\n</div>'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/components/sign-in-card/sign-in-card.html"*/
    }),
    __param(12, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["d" /* Inject */])(__WEBPACK_IMPORTED_MODULE_8__config_env_token__["a" /* EnvVariables */])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_9__providers_app_globals_app_globals__["a" /* AppGlobalsProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_4__providers_app_service_app_service__["a" /* AppServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_5_ngx_cookie__["b" /* CookieService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__providers_user_data_user_data__["a" /* UserDataProvider */],
        __WEBPACK_IMPORTED_MODULE_0__angular_common__["a" /* Location */], Object])
], SignInCardComponent);

//# sourceMappingURL=sign-in-card.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_cookie__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// declare const gapi : any;
var LoginPage = (function () {
    //  loginData : any;
    //  // showLoader : boolean;
    //  token : any;
    //  status : any;
    //  code :any;
    //  domainError : boolean = false;
    //  logInProcess : boolean = false;
    //  disableBtn : boolean = false;
    function LoginPage(cookieservice) {
        this.cookieservice = cookieservice;
        this.param = 'test user';
    }
    //  ionViewDidLoad() {
    //    this.storage.ready().then(() => {
    //      });
    //     this.cookieservice.remove("domainError");
    //  }
    LoginPage.prototype.ionViewCanEnter = function () {
        if (this.cookieservice.get("keepLoggedIn") !== 'yes') {
            return true;
        }
        else {
            return false;
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
        name: 'login',
        segment: 'login',
        priority: 'off'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- Site header goes here -->\n<ion-header>\n    <logged-in-header> </logged-in-header>\n</ion-header>\n\n<!-- <ion-header>\n    <logged-in-header> </logged-in-header>\n</ion-header> -->\n\n<!-- Site header ends -->\n\n\n<!-- Body starts -->\n\n\n<ion-content padding>\n	<sign-in-card [page] = "\'login\'"> </sign-in-card>\n</ion-content>\n<!-- <ion-content padding>\n    <div class="container" p-h-20>\n		\n\n		<div class="login-card" text-center>\n			<ion-card>\n        <ion-card *ngIf = "domainError" class="alert-error">\n          <ion-card-header>\n            Domain does not exist\n          </ion-card-header>\n        </ion-card>\n			  <img src="./../../assets/img/dilbert.jpg" width="80">\n			  <ion-card-content>\n			    <ion-card-title>\n			      <h2 ion-text text-uppercase class="login-card__title" m-b-8>Dilbert</h2>\n			      <p ion-text color="text-lighter" font-weight-4>Track Time. Record Work</p>\n			     </ion-card-title>\n			     <hr>\n			    <h5  class="login-card__title2" m-t-15>Have an existing account?</h5>\n\n			    <p ion-text color="text-lighter" font-weight-4 m-t-5>Sign in and continue where you left off</p>\n\n			    <button ion-button color="danger-dark" m-t-15 class="sign-in" [disabled] = "disableBtn" (click) = "signin()"> <ion-icon name="logo-googleplus" p-r-10></ion-icon> Sign in with Google</button>\n          \n			  </ion-card-content>\n			</ion-card>\n\n			<div ion-text p-t-20 m-b-0 class="sign-text">Haven\'t connected to Dilbert yet?</div>\n			<button ion-button color="primary" clear class="sign-up" (click)="navigateToRegister()" >Sign up!</button>\n		</div>\n\n   \n       \n\n    </div>\n</ion-content> -->\n\n<!-- Body Ends -->\n\n<!-- loader code -->\n\n<!-- <div *ngIf = "showLoader == true " class="site-loader">\n  <svg height="120" width="120">\n    <line class="pointer" x1="60" y1="60" x2="60" y2="50" />\n    <circle class="circle" cx="60" cy="60" r="15" />\n    <circle class="center" cx="60" cy="60" r="2.5" />\n  </svg>\n</div> -->\n\n<!-- loader ends -->\n\n\n<ion-footer>\n <footer-element> </footer-element>\n</ion-footer>\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ngx_cookie__["b" /* CookieService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map