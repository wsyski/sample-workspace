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
var ShareContainerComponent = /** @class */ (function () {
    function ShareContainerComponent() {
        // Primary platforms that appear
        this.platforms = ['twitter', 'facebook', 'googlePlus', 'reddit', 'pinterest', 'linkedin'];
        // This should be set up directly in the meta tags as this is good practice
        // Use this input only if you have multiple content to share per url.
        // So in case you need this the input should be like the following object (you can omitt some fields)
        // {title:'my title', description:'my desc',img:' an image', via:'Ced_VDB', hashtags:'someHashTag'}
        this.properties = {};
    }
    ShareContainerComponent.prototype.ngOnInit = function () {
        this.fetchProperties();
    };
    ShareContainerComponent.prototype.fetchProperties = function () {
        this.properties.url = this.properties.url || this.getMetaContent('og:url') || window.location.href.toString();
        this.properties.title = this.properties.title || this.getMetaContent('og:title') || document.title;
        this.properties.description = this.properties.description || this.getMetaContent('og:description');
        this.properties.image = this.properties.image || this.getMetaContent('og:image');
        this.properties.via = this.properties.via || this.getMetaContent('n2s:via');
        this.properties.hashtags = this.properties.hashtags || this.getMetaContent('n2s:hashtags');
    };
    ShareContainerComponent.prototype.getMetaContent = function (property) {
        var elem = document.querySelector("meta[property='" + property + "']");
        if (elem) {
            return elem.getAttribute('content');
        }
        return '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShareContainerComponent.prototype, "platforms", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShareContainerComponent.prototype, "properties", void 0);
    ShareContainerComponent = __decorate([
        core_1.Component({
            selector: 'app-share-container',
            template: "\n    <div>\n       <app-share-button *ngFor=\"let platform of platforms\" [platformName]=\"platform\" [properties]=\"properties\"></app-share-button>\n    </div>\n  "
        })
    ], ShareContainerComponent);
    return ShareContainerComponent;
}());
exports.ShareContainerComponent = ShareContainerComponent;
//# sourceMappingURL=share-container.component.js.map