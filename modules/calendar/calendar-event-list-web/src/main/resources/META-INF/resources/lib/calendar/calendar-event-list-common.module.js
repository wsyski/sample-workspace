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
var event_icon_1 = require("./components/event-icon");
var link_toggle_component_1 = require("./components/link-toggle.component");
var event_date_interval_component_1 = require("./components/event-date-interval.component");
var event_date_interval_detail_component_1 = require("./components/event-date-interval-detail.component");
var CalendarEventListCommonModule = /** @class */ (function () {
    function CalendarEventListCommonModule() {
    }
    CalendarEventListCommonModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            providers: [],
            declarations: [
                event_icon_1.EventImageComponent,
                event_date_interval_component_1.EventDateIntervalComponent,
                event_date_interval_detail_component_1.EventDateIntervalDetailComponent,
                link_toggle_component_1.LinkToggleComponent
            ],
            exports: [
                event_icon_1.EventImageComponent,
                event_date_interval_component_1.EventDateIntervalComponent,
                event_date_interval_detail_component_1.EventDateIntervalDetailComponent,
                link_toggle_component_1.LinkToggleComponent
            ]
        })
    ], CalendarEventListCommonModule);
    return CalendarEventListCommonModule;
}());
exports.CalendarEventListCommonModule = CalendarEventListCommonModule;
//# sourceMappingURL=calendar-event-list-common.module.js.map