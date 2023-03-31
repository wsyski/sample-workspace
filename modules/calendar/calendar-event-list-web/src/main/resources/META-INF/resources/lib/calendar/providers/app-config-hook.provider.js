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
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var store_1 = require("@ngrx/store");
var event_search_actions_1 = require("../store/actions/event-search.actions");
var calendar_event_list_app_config_1 = require("../calendar-event-list-app-config");
var AppConfigHookProvider = /** @class */ (function () {
    function AppConfigHookProvider(store$, calendarEventListConfig) {
        this.store$ = store$;
        this.calendarEventListConfig = calendarEventListConfig;
    }
    AppConfigHookProvider.prototype.init = function (appConfigService) {
        var calendarEventListAppConfig = new calendar_event_list_app_config_1.CalendarEventListAppConfig(appConfigService);
        if (calendarEventListAppConfig.isValid()) {
            var pageSize = this.calendarEventListConfig.getPageSize();
            this.store$.dispatch(new event_search_actions_1.Init({
                pageToken: {
                    start: 0,
                    pageSize: pageSize
                }
            }));
        }
        else {
            this.store$.dispatch(new event_search_actions_1.InitEmpty());
        }
    };
    AppConfigHookProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [store_1.Store, calendar_event_list_config_1.CalendarEventListConfig])
    ], AppConfigHookProvider);
    return AppConfigHookProvider;
}());
exports.AppConfigHookProvider = AppConfigHookProvider;
//# sourceMappingURL=app-config-hook.provider.js.map