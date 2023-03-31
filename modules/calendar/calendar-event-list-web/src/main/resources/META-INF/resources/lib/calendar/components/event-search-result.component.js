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
var store_1 = require("@ngrx/store");
var fromRoot = require("../store/store");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var EventSearchResultComponent = /** @class */ (function () {
    function EventSearchResultComponent(calendarEventListConfig, store) {
        this.calendarEventListConfig = calendarEventListConfig;
        this.store = store;
        this.selectedCalendarEventId$ = store.select(fromRoot.selectCalendarEventId);
    }
    EventSearchResultComponent.prototype.getCols = function () {
        if (this.calendarEventListConfig.isFullWidthMode()) {
            return 12;
        }
        else {
            return this.calendarEventListConfig.isSearchFilterVisible() ? 6 : 4;
        }
    };
    EventSearchResultComponent.prototype.getNextFocus = function () {
        var pageSize = this.calendarEventListConfig.getPageSize();
        var calendarSum = this.calendarEvents.length;
        if (calendarSum > pageSize) {
            return (Math.floor(calendarSum / pageSize) - 1) * pageSize;
        }
        return -1;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EventSearchResultComponent.prototype, "calendarEvents", void 0);
    EventSearchResultComponent = __decorate([
        core_1.Component({
            selector: 'app-event-search-result',
            template: "\n        <div *ngIf=\"(selectedCalendarEventId$ | async) || {}; let selectedCalendarEventId\" aria-live=\"assertive\" class=\"row\">\n            <ng-container *ngFor=\"let calendarEvent of calendarEvents; index as i\" [class.item-selected]=\"calendarEvent.id === selectedCalendarEventId\">\n                <div [ngClass]=\"'col-sm-12 col-md-' + getCols()\">\n                    <app-event-summary [calendarEvent]=\"calendarEvent\" [loadMoreFocus]=\"i === getNextFocus()\"></app-event-summary>\n                </div>\n            </ng-container>\n        </div>\n    ",
            styles: ["\n        .item-selected {\n            border: red 1px;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig, store_1.Store])
    ], EventSearchResultComponent);
    return EventSearchResultComponent;
}());
exports.EventSearchResultComponent = EventSearchResultComponent;
//# sourceMappingURL=event-search-result.component.js.map