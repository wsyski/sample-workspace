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
exports.APP_CONFIG_HOOK_TOKEN = new core_1.InjectionToken('appConfigHook');
var AppConfigService = /** @class */ (function () {
    function AppConfigService(appConfigHook) {
        this.appConfigHook = appConfigHook;
    }
    AppConfigService.prototype.load = function () {
        var _this = this;
        var fetchConfig = ({ method: 'GET' });
        var url = Liferay.ThemeDisplay.getPortalURL() + "/o/common-services/v1.0/groups/" + Liferay.ThemeDisplay.getScopeGroupId() + "/config";
        return new Promise(function (resolve) {
            return fetch(url, fetchConfig).then(function (response) { return response.json(); })
                .then(function (calendarEventListAppConfiguDto) {
                _this.calendarEventListAppConfigDto = calendarEventListAppConfiguDto;
                if (_this.appConfigHook) {
                    _this.appConfigHook.init(_this);
                }
                resolve(true);
            });
        });
    };
    AppConfigService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), __param(0, core_1.Inject(exports.APP_CONFIG_HOOK_TOKEN)),
        __metadata("design:paramtypes", [Object])
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=app-config.service.js.map