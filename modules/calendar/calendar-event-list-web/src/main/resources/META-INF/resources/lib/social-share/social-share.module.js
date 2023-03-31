"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var share_container_component_1 = require("./components/share-container.component");
var share_button_component_1 = require("./components/share-button.component");
var SocialShareModule = /** @class */ (function () {
    function SocialShareModule() {
    }
    SocialShareModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                share_container_component_1.ShareContainerComponent,
                share_button_component_1.ShareButtonComponent
            ],
            providers: [],
            exports: [
                share_container_component_1.ShareContainerComponent
            ]
        })
    ], SocialShareModule);
    return SocialShareModule;
}());
exports.SocialShareModule = SocialShareModule;
//# sourceMappingURL=social-share.module.js.map