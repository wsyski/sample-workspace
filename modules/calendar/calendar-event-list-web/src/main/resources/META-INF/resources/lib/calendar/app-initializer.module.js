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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_config_service_1 = require("./services/app-config.service");
var http_1 = require("@angular/http");
var calendar_event_list_app_config_1 = require("./calendar-event-list-app-config");
function appConfigFactory(appConfigService) {
    return function () { return appConfigService.load(); };
}
exports.appConfigFactory = appConfigFactory;
// @dynamic
var AppInitializerModule = /** @class */ (function () {
    function AppInitializerModule(parentModule) {
        if (parentModule) {
            throw new Error('AppInitializerModule is already loaded. Import it in the application module only');
        }
    }
    AppInitializerModule_1 = AppInitializerModule;
    AppInitializerModule.forRoot = function () {
        return {
            ngModule: AppInitializerModule_1,
            providers: [
                app_config_service_1.AppConfigService,
                calendar_event_list_app_config_1.CalendarEventListAppConfig,
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: appConfigFactory,
                    deps: [app_config_service_1.AppConfigService],
                    multi: true
                }
            ]
        };
    };
    var AppInitializerModule_1;
    AppInitializerModule = AppInitializerModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule],
            providers: [],
            declarations: [],
            exports: []
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [AppInitializerModule])
    ], AppInitializerModule);
    return AppInitializerModule;
}());
exports.AppInitializerModule = AppInitializerModule;
//# sourceMappingURL=app-initializer.module.js.map