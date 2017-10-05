webpackJsonp([8],{

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover__ = __webpack_require__(467);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverPageModule", function() { return PopoverPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopoverPageModule = (function () {
    function PopoverPageModule() {
    }
    return PopoverPageModule;
}());
PopoverPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__popover__["a" /* PopoverPage */]
        ]
    })
], PopoverPageModule);

//# sourceMappingURL=popover.module.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_cookie__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopoverPage = (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl, cookieservice, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cookieservice = cookieservice;
        this.events = events;
        this.handleClientLoad();
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.handleClientLoad = function () {
        // let that = this;
        gapi.load('client:auth2', function () {
            gapi.client.init({
                // client_id: '676621258132-6q9s2j1hc8343jj3nn75k0is4s1nb893.apps.googleusercontent.com',
                client_id: '460485328187-93cuogcf3omo4ort1l8kd32n25ktf5hn.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'https://www.googleapis.com/auth/spreadsheets'
            }).then(function () {
                console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
        });
        // this.user =  gapi.auth2.getAuthInstance().currentUser.get().w3.ig;
        // console.log(this.user);
    };
    PopoverPage.prototype.signOut = function () {
        var _this = this;
        this.viewCtrl.dismiss();
        gapi.auth2.getAuthInstance().signOut().then(function () {
            _this.events.publish('app:navroot', 'login');
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
            _this.cookieservice.remove("keepLoggedIn");
        });
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-popover',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/pages/popover/popover.html"*/'\n<!-- User profile contents -->\n\n<ion-list m-v-0 class="profile-dropdown">\n	<button ion-item (click)="close()"><ion-icon name="md-person" p-r-5></ion-icon> Profile Information</button>\n	<button ion-item (click)="close()"><ion-icon name="star" p-r-5></ion-icon> View Summary</button>\n	<button ion-item (click)="close()"><ion-icon name="md-person" p-r-5></ion-icon> Edit Profile</button>\n	<button ion-item (click)="signOut()"><ion-icon name="md-power" p-r-5></ion-icon> Logout</button>\n</ion-list>'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/pages/popover/popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2_ngx_cookie__["b" /* CookieService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map