webpackJsonp([7],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_guide__ = __webpack_require__(470);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleGuidePageModule", function() { return StyleGuidePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StyleGuidePageModule = (function () {
    function StyleGuidePageModule() {
    }
    return StyleGuidePageModule;
}());
StyleGuidePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__style_guide__["a" /* StyleGuidePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__style_guide__["a" /* StyleGuidePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__style_guide__["a" /* StyleGuidePage */]
        ]
    })
], StyleGuidePageModule);

//# sourceMappingURL=style-guide.module.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(55);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleGuidePage; });
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
 * Generated class for the StyleGuidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StyleGuidePage = (function () {
    function StyleGuidePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StyleGuidePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StyleGuidePage');
    };
    return StyleGuidePage;
}());
StyleGuidePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-style-guide',template:/*ion-inline-start:"/home/aj-sujit/Dilbert_4.0/app/src/pages/style-guide/style-guide.html"*/'<!--\n  Generated template for the StyleGuidePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-title>Style Guide</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <div class="style-guide" m-t-20 p-h-50>\n        <h2 font-weight-3 ion-text color="primary" text-center>Style Guide -- Version - 1.0</h2>\n        <hr>\n        <!-- Heading -->\n        <div m-v-30>\n            <h2 ion-text color="text">Headings</h2>\n            <hr>\n            <h1>Heading H1</h1>\n            <h2>Heading H2</h2>\n            <h3>Heading H3</h3>\n            <h4>Heading H4</h4>\n            <h5>Heading H5</h5>\n            <h6>Heading H6</h6>\n<!--             <div>\n                &lt;h1&gt;Heading H1&lt;h1&gt;\n                &lt;h2&gt;Heading H2&lt;h2&gt;\n                &lt;h3&gt;Heading H3&lt;h3&gt;\n                &lt;h4&gt;Heading H4&lt;h4&gt;\n                &lt;h5&gt;Heading H5&lt;h5&gt;\n                &lt;h6&gt;Heading H6&lt;h6&gt;\n            </div> -->\n        </div>\n        <hr>\n        <!-- Colors -->\n        <div class="color-code" m-v-30>\n            <h2 ion-text color="text">Colors</h2>\n            <hr>\n            <div class="code-container">\n                <div class="primary" text-center>\n                    <p class="color"></p>\n                    <p>Primary</p>\n                </div>\n                <div class="secondary" text-center>\n                    <p class="color"></p>\n                    <p>Secondary</p>\n                </div>\n                <div class="text" text-center>\n                    <p class="color"></p>\n                    <p>Text</p>\n                </div>\n                <div class="text-lighter" text-center>\n                    <p class="color"></p>\n                    <p>Text Lighter</p>\n                </div>\n                <div class="text-darker" text-center>\n                    <p class="color"></p>\n                    <p>Text Darker</p>\n                </div>\n                <div class="success" text-center>\n                    <p class="color"></p>\n                    <p>Success</p>\n                </div>\n                <div class="danger" text-center>\n                    <p class="color"></p>\n                    <p>Danger</p>\n                </div>\n            </div>\n        </div>\n        <hr>\n        <!-- Typography -->\n        <div m-v-30>\n            <h2 ion-text color="text">Typography</h2>\n            <hr>\n            <h5>Page Title</h5>\n            <p>Element Title</p>\n            <span ion-title color="text">Labels</span>\n            <span class="dis-block xx-small" m-t-15>xx Smaller label</span>\n            <br>\n            <span class="dis-block xxx-small">xxx smaller label</span>\n        </div>\n        <hr>\n        <!-- Weights -->\n        <div m-v-30>\n            <h2 ion-text color="text">Font Weights</h2>\n            <hr>\n            <p font-weight-6>Font-weight-6(Bolder)</p>\n            <p font-weight-5>Font-weight-5(Bold)</p>\n            <p font-weight-4>Font-weight-4(Medium)</p>\n            <p font-weight-3>Font-weight-3(Regular)</p>\n            <p font-weight-1>Font-weight-1(Lighter)</p>\n        </div>\n        <!-- Icons -->\n        <div m-v-30>\n            <h2 ion-text color="text">Icons</h2>\n            <hr>\n            <ion-icon name="calendar" class="icon-size full" m-v-10></ion-icon> - Full\n            <br>\n            <ion-icon name="calendar" class="icon-size mini"></ion-icon> - Mini\n            <br>\n            <i class="custom-icon summary"></i> - Custom Icons\n        </div>\n        <hr>\n        <!-- Utility -->\n        <div m-v-30>\n            <h2 ion-text color="text">Utility Classes</h2>\n            <hr>\n            <p m-t-15 m-b-15>m-t/b/-(number) - denotes margin-top/bottom(eg: m-t-5,m-b-10)</p>\n            <p m-t-15 m-b-15>m-h-number - denotes margin horizontal(eg: m-h-10)</p>\n            <p m-t-15 m-b-15>m-v-number - denotes margin vertical(eg: m-v-10)</p>\n            <p m-t-15 m-b-15>p-t/b/-(number) - denotes padding-top/bottom(eg: p-t-5,p-b-10)</p>\n            <p m-t-15 m-b-15>p-h-number - denotes padding horizontal(eg: p-h-10)</p>\n            <p m-t-15 m-b-15>p-v-number - denotes padding vertical(eg: p-v-10)</p>\n            <p m-t-15 m-b-15>.dis-block(display:block)</p>\n            <p m-t-15 m-b-15>.dis-inline(display:inline-block)</p>\n            <p>.visible(visibility:hidden)</p>\n        </div>\n        <!-- Shadow -->\n        <div m-v-30>\n            <h2 ion-text color="text">Shadow</h2>\n            <hr>\n            <div class="code-container shadow">\n                <div class="boxes box-1">Default box-shadow</div>\n                <div class="boxes box-2">Right sided Shadow</div>\n                <div class="boxes box-3">Smaller radius/blur shadow</div>\n            </div>\n        </div>\n\n        <hr>\n\n        <h2 ion-text color="text">Week Element</h2>\n        <hr>\n        <div class="summary-sidebar element-one">\n            <div class="full-card">\n             <ul class="week-list list-control overflow-active">\n                <button ion-item class="week-container" m-v-15>\n                    <li class="week-list__row flex-row">\n                        <div class="week-list__day">\n                            <p class="day-title" m-t-0 m-b-8 font-weight-5>Fri</p>\n                            <span ion-text color="text">May 12</span>\n                        </div>\n                        <div class="week-list__session">\n                            <!-- <span class="dis-block" m-b-11>09:35 am</span> -->\n                            <span class="dis-block session-start" m-t-0 m-b-8 font-weight-4>09:35 am</span>\n                            <span ion-text color="success">Online</span>\n                        </div>\n                        <div class="week-list__time flex-row">\n                            <ion-icon name="alert" color="danger" class="visible icon-size mini"></ion-icon>\n                            <h6 class="total-time" p-h-12 ion-text color="text-darker">3:02<span class="xx-small" p-l-2 font-weight-4>hr</span></h6>\n                            <ion-icon ion-text color="text-darker" name="ios-arrow-forward-outline" class="icon-size mini"></ion-icon>\n                        </div>\n                    </li>\n                </button>\n                <button ion-item class="week-container active" m-v-15>\n                    <li class="week-list__row flex-row">\n                        <div class="week-list__day">\n                            <p class="day-title" m-t-0 m-b-8 font-weight-5>Thu</p>\n                            <span ion-text color="text">May 11</span>\n                        </div>\n                        <div class="week-list__session">\n                            <span class="session-start dis-block" m-t-0 m-b-8 font-weight-4>09:28 am</span>\n                            <!-- <span class="dis-block" m-b-11>09:28 am</span> -->\n                            <span ion-text>6:28 pm</span>\n                        </div>\n                        <div class="week-list__time flex-row">\n                            <i data-tooltip="Please update your details"><ion-icon name="alert" color="danger" class="hvr-buzz-out test-icon icon-size mini"></ion-icon></i>\n                            <h6 class="total-time" p-h-12 ion-text color="text-darker">9:00<span class="xx-small" p-l-2 font-weight-4>hr</span></h6>\n                            <ion-icon ion-text color="text-darker" name="ios-arrow-forward-outline" class="icon-size mini"></ion-icon>\n                        </div>\n                    </li>\n                </button>\n                </ul>\n            </div>\n        </div>\n        \n        <hr>\n\n    </div>\n</ion-content>\n'/*ion-inline-end:"/home/aj-sujit/Dilbert_4.0/app/src/pages/style-guide/style-guide.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], StyleGuidePage);

//# sourceMappingURL=style-guide.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map