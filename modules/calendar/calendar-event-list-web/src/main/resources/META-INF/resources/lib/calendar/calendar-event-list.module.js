"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var calendar_event_list_routing_module_1 = require("./calendar-event-list-routing.module");
var app_initializer_module_1 = require("./app-initializer.module");
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var store_2 = require("./store/store");
var event_detail_effects_1 = require("./store/effects/event-detail.effects");
var event_search_effects_1 = require("./store/effects/event-search.effects");
var platform_browser_1 = require("@angular/platform-browser");
var effects_1 = require("@ngrx/effects");
var router_store_1 = require("@ngrx/router-store");
var router_effects_1 = require("./store/effects/router.effects");
var app_config_service_1 = require("./services/app-config.service");
var app_config_hook_provider_1 = require("./providers/app-config-hook.provider");
var calendar_service_1 = require("./services/calendar.service");
var calendar_impl_service_1 = require("./services/calendar-impl.service");
var calendar_event_list_config_1 = require("./calendar-event-list-config");
var router_1 = require("@angular/router");
var CalendarEventListModule = /** @class */ (function () {
    function CalendarEventListModule() {
    }
    CalendarEventListModule.prototype.ngDoBootstrap = function () {
    };
    CalendarEventListModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_initializer_module_1.AppInitializerModule.forRoot(),
                calendar_event_list_routing_module_1.CalendarEventListRoutingModule,
                store_1.StoreModule.forRoot(store_2.REDUCERS),
                effects_1.EffectsModule.forRoot([event_detail_effects_1.EventDetailEffects, event_search_effects_1.EventSearchEffects, router_effects_1.RouterEffects]),
                router_store_1.StoreRouterConnectingModule.forRoot({
                    stateKey: 'router'
                })
            ],
            exports: [router_1.RouterModule],
            providers: [
                calendar_event_list_config_1.CalendarEventListConfig,
                { provide: calendar_service_1.CalendarService, useClass: calendar_impl_service_1.CalendarServiceImpl },
                { provide: router_store_1.RouterStateSerializer, useClass: store_2.RouterStateUrlSerializer },
                { provide: app_config_service_1.APP_CONFIG_HOOK_TOKEN, useClass: app_config_hook_provider_1.AppConfigHookProvider }
            ],
            bootstrap: [],
        })
    ], CalendarEventListModule);
    return CalendarEventListModule;
}());
exports.CalendarEventListModule = CalendarEventListModule;
//# sourceMappingURL=calendar-event-list.module.js.map