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
var EventAllLinkWithoutFilterComponent = /** @class */ (function () {
    function EventAllLinkWithoutFilterComponent(calendarEventListConfig) {
        this.calendarEventListConfig = calendarEventListConfig;
    }
    EventAllLinkWithoutFilterComponent.prototype.ngOnInit = function () {
        this.allEventsUrl = this.calendarEventListConfig.getAllEventsUrl();
    };
    EventAllLinkWithoutFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-event-all-link-without-filter',
            template: "\n    <a href=\"{{allEventsUrl}}\" class=\"arena-events-show-all\" title=\"Go to the page for all events\"\n           i18n=\"@@lnkAllEvents.label\" i18n-title=\"@@lnkAllEvents.title\">Show all events</a>\n    ",
        }),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig])
    ], EventAllLinkWithoutFilterComponent);
    return EventAllLinkWithoutFilterComponent;
}());
exports.EventAllLinkWithoutFilterComponent = EventAllLinkWithoutFilterComponent;
//# sourceMappingURL=event-all-link-without-filter.component.js.map