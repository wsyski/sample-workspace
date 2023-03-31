"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var always_deny_guard_1 = require("../core/guards/always-deny.guard");
var not_found_component_1 = require("../core/components/not-found.component");
var app_config_guard_1 = require("../core/guards/app-config.guard");
var calendar_event_list_component_1 = require("./components/calendar-event-list.component");
var core_1 = require("@angular/core");
var calendar_event_list_app_config_1 = require("./calendar-event-list-app-config");
var event_search_component_1 = require("./components/event-search.component");
var event_detail_component_1 = require("./components/event-detail.component");
var calendar_event_list_search_module_1 = require("./calendar-event-list-search.module");
var calendar_event_list_detail_module_1 = require("./calendar-event-list-detail.module");
var ROUTES = [
    {
        path: '', component: calendar_event_list_component_1.CalendarEventListComponent, canActivate: [app_config_guard_1.AppConfigGuard],
        children: [
            { path: '', component: event_search_component_1.EventSearchComponent, pathMatch: 'full' },
            { path: 'events/:id', component: event_detail_component_1.EventDetailComponent }
        ]
    },
    { path: '**', component: not_found_component_1.NotFoundComponent, canActivate: [always_deny_guard_1.AlwaysDenyGuard] }
];
var CalendarEventListRoutingModule = /** @class */ (function () {
    function CalendarEventListRoutingModule() {
    }
    CalendarEventListRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [
                calendar_event_list_component_1.CalendarEventListComponent,
                not_found_component_1.NotFoundComponent
            ],
            imports: [
                calendar_event_list_search_module_1.CalendarEventListSearchModule,
                calendar_event_list_detail_module_1.CalendarEventListDetailModule,
                router_1.RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: false })
            ],
            exports: [router_1.RouterModule],
            providers: [
                app_config_guard_1.AppConfigGuard,
                always_deny_guard_1.AlwaysDenyGuard,
                { provide: app_config_guard_1.APP_CONFIG_TOKEN, useExisting: calendar_event_list_app_config_1.CalendarEventListAppConfig }
            ],
            entryComponents: [calendar_event_list_component_1.CalendarEventListComponent]
        })
    ], CalendarEventListRoutingModule);
    return CalendarEventListRoutingModule;
}());
exports.CalendarEventListRoutingModule = CalendarEventListRoutingModule;
//# sourceMappingURL=calendar-event-list-routing.module.js.map