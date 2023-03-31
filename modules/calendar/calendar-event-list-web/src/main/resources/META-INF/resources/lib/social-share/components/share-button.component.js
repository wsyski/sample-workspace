"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platforms_1 = require("../models/platforms");
var WINDOW_NAME = 'wndSocialShare';
var WINDOW_WIDTH = 1070;
var WINDOW_HEIGHT = 600;
var ShareButtonComponent = /** @class */ (function () {
    function ShareButtonComponent() {
    }
    ShareButtonComponent.prototype.ngOnInit = function () {
        this.platform = platforms_1.SHARE_PLATFORMS[this.platformName];
        this.constructUrl();
    };
    ShareButtonComponent.prototype.click = function (event) {
        if (this.platform.isNewWindow) {
            window.open(this.url, WINDOW_NAME, "width=" + WINDOW_WIDTH + ", height=" + WINDOW_HEIGHT);
            event.preventDefault();
        }
    };
    ShareButtonComponent.prototype.constructUrl = function () {
        this.url = this.platform.url + encodeURIComponent(this.properties.url);
        if (this.platform.properties) {
            for (var key in this.platform.properties) {
                if (this.platform.properties.hasOwnProperty(key)) {
                    // if the property has been found.
                    var val = this.properties[this.platform.properties[key]];
                    if (val) {
                        this.url += '&' + key + '=' + encodeURIComponent(val);
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ShareButtonComponent.prototype, "platformName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShareButtonComponent.prototype, "properties", void 0);
    ShareButtonComponent = __decorate([
        core_1.Component({
            selector: 'app-share-button',
            template: "\n    <span i18n=\"@@lnkShare.title\" hidden #lnkShareTitle>Share {platform.name, select, email {via email} facebook {on Facebook} twitter {on Twitter}}</span>\n    <a href=\"{{url}}\" (click)=\"click($event)\" [title]=\"lnkShareTitle.textContent\">\n      <span class=\"icon-stack\">\n         <i class=\"icon-circle icon-2x icon-circle-bg\"></i>\n         <i [class]=\"platform.styleClass\"></i>\n      </span>\n    </a>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ShareButtonComponent);
    return ShareButtonComponent;
}());
exports.ShareButtonComponent = ShareButtonComponent;
//# sourceMappingURL=share-button.component.js.map