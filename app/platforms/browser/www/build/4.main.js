webpackJsonp([4],{

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__organization__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_logged_in_header_logged_in_header_module__ = __webpack_require__(332);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationPageModule", function() { return OrganizationPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OrganizationPageModule = (function () {
    function OrganizationPageModule() {
    }
    return OrganizationPageModule;
}());
OrganizationPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__organization__["a" /* OrganizationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__organization__["a" /* OrganizationPage */]),
            __WEBPACK_IMPORTED_MODULE_3__components_logged_in_header_logged_in_header_module__["a" /* LoggedInHeaderComponentModule */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__organization__["a" /* OrganizationPage */]
        ]
    })
], OrganizationPageModule);

//# sourceMappingURL=organization.module.js.map

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

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizationPage; });
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
 * Generated class for the OrganizationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrganizationPage = (function () {
    function OrganizationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OrganizationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrganizationPage');
    };
    return OrganizationPage;
}());
OrganizationPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-organization',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/pages/organization/organization.html"*/'<!--\n  Generated template for the OrganizationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- Site header goes here -->\n\n<ion-header>\n    <logged-in-header> </logged-in-header>\n</ion-header>\n\n<!-- Site header ends -->\n\n\n<ion-content padding>\n\n <div class="container organization" p-h-20>\n\n    <ion-grid class="grid" m-t-15 p-h-30>\n        <ion-row class="row dashboard__row">\n            <ion-col class="col" col-12 m-b-20>\n                <!-- Heading -->\n                <ion-row>\n	                <ion-col>\n	                <div class="organization__title">\n	                	<h5>Join <b>an Organisation</b></h5>\n	                	<span color="text" class="dis-block" ion-text no-margin font-weight-5 m-t-5>Here’s a match for you</span>\n	                </div>\n	                </ion-col>\n                </ion-row>\n                <ion-row>\n				    <ion-col class="col" col-md-8>\n				    	<div class="organization__container">\n			                <div class="organization__match" m-v-30>\n			                	<p color="gray" ion-text>We found an organisation that matches your domain name. Would you like to join?</p>\n			                </div>\n			                <div class="domain-name flex-row direction-col" p-t-10>\n			                	<div class="entries flex-row">\n			                		<p ion-text color="gray" class="row-title" m-v-10>Name</p>\n			                		<p ion-text font-weight-5 m-v-10>Ajency.in</p>\n			                	</div>\n			                	<div class="entries flex-row">\n			                		<p ion-text color="gray" class="row-title" m-v-10>Domain</p>\n			                		<p ion-text font-weight-5 m-v-10>@ ajency.in</p>\n			                	</div>\n			                	<div class="entries flex-row">\n			                		<p ion-text color="gray" class="row-title" m-v-10>Time Zone</p>\n			                		<div class="select-time">\n									    <ion-select interface="popover">\n									      <ion-option value="i" selected=\'true\'>India (GMT+05:30)</ion-option>\n									      <ion-option value="u">United Kingdom(GMT)</ion-option>\n									      <ion-option value="us">United States of America (GMT-05:00)</ion-option>\n									    </ion-select>\n									  </div>\n			                	</div>\n			                </div>\n			                <div class="organization-change flex-row space-between" m-t-30>\n			                	<button ion-button color="primary" clear p-l-0 class="no-organization">Not the organisation you were looking for?</button>\n			                	<button ion-button color="primary" text-capitalize>Join Organisation</button>\n			                </div>\n				    	</div>\n				    </ion-col>\n				    <ion-col class="col" col-md-4>\n					    <div class="organization__info-container" text-center>\n					    	<div class="organization__info">\n					    		<img src="../../assets/img/company-icon.png">		\n					    		<h6 p-v-10>Organisation</h6>\n					    	</div>\n					      	<div class="organization__points">\n					      		<span ion-text class="dis-block" color="text-lighter" p-v-10>Create an organisation to manage your employees and projects in one place</span>\n					    		<span ion-text class="dis-block" color="text-lighter" p-v-10>Choose a unique domain name for each organisation you create</span>\n					    		<span ion-text class="dis-block" color="text-lighter" p-v-10>Generate reports for your entire organisation automatically</span>\n					      	</div>\n					    </div>\n				    </ion-col>\n				 </ion-row>\n                \n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n </div>\n\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/pages/organization/organization.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], OrganizationPage);

//# sourceMappingURL=organization.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map