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
var app_config_service_1 = require("./services/app-config.service");
var misc_util_1 = require("../core/utils/misc-util");
var CalendarEventListAppConfig = /** @class */ (function () {
    function CalendarEventListAppConfig(appConfigService) {
        this.appConfigService = appConfigService;
    }
    CalendarEventListAppConfig.prototype.getCalendarApiEndpoint = function () {
        return this.getCalendarEventListAppConfigDto().calendarApiEndpoint;
    };
    CalendarEventListAppConfig.prototype.getCalendarCustomerId = function () {
        return this.getCalendarEventListAppConfigDto().calendarCustomerId;
    };
    CalendarEventListAppConfig.prototype.isValid = function () {
        var customerId = this.getCalendarCustomerId();
        return !misc_util_1.MiscUtil.isBlank(customerId);
    };
    CalendarEventListAppConfig.prototype.getCalendarEventListAppConfigDto = function () {
        return this.appConfigService.calendarEventListAppConfigDto;
    };
    CalendarEventListAppConfig = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_config_service_1.AppConfigService])
    ], CalendarEventListAppConfig);
    return CalendarEventListAppConfig;
}());
exports.CalendarEventListAppConfig = CalendarEventListAppConfig;
//# sourceMappingURL=calendar-event-list-app-config.js.map