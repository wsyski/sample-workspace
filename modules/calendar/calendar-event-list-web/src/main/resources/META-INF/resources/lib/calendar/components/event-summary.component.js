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
var calendar_event_1 = require("../models/calendar-event");
var query_1 = require("../models/query");
var fromRoot = require("../store/store");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var EventSummaryComponent = /** @class */ (function () {
    function EventSummaryComponent(calendarEventListConfig, store) {
        this.calendarEventListConfig = calendarEventListConfig;
        this.store = store;
    }
    EventSummaryComponent.prototype.ngOnInit = function () {
        var primaryImage = this.calendarEvent.getPrimaryImage();
        this.iconUrl = primaryImage ? primaryImage.url : null;
        this.eventDetailAbsoluteUrl = this.calendarEventListConfig.getEventDetailAbsoluteUrl(this.calendarEvent.id);
        this.isEventDetailRouterLink = this.calendarEventListConfig.isEventDetailRouterLink();
        this.queryParams$ = this.store.select(fromRoot.selectQuery).pipe(operators_1.map(function (query) { return query_1.query2QueryParams(query); }), operators_1.share());
    };
    EventSummaryComponent.prototype.ngAfterViewChecked = function () {
        if (this.loadMoreFocus) {
            var focusedEventElement = document.querySelector('.focusedEventElement');
            focusedEventElement.focus();
            focusedEventElement.scrollIntoView();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", calendar_event_1.CalendarEvent)
    ], EventSummaryComponent.prototype, "calendarEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EventSummaryComponent.prototype, "loadMoreFocus", void 0);
    EventSummaryComponent = __decorate([
        core_1.Component({
            selector: 'app-event-summary',
            template: "\n        <div [ngClass]=\"{'arena-event-card': true, 'event-cancelled': calendarEvent.isCancelled()}\">\n            <a [ngClass]=\"{'focusedEventElement': loadMoreFocus }\" [routerLink]=\"['/events', calendarEvent.id]\" [queryParams]=\"queryParams$ | async\"\n               *ngIf=\"isEventDetailRouterLink\">\n                <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n            </a>\n            <a [ngClass]=\"{ 'focusedEventElement': loadMoreFocus }\" href=\"{{eventDetailAbsoluteUrl}}\" *ngIf=\"!isEventDetailRouterLink\">\n                <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n            </a>\n        </div>\n\n        <ng-template #cardContent>\n            <app-event-icon containerClass=\"card-image-container\" [calendarEvent]=\"calendarEvent\"></app-event-icon>\n            <div class=\"card-body\">\n                <h3 class=\"card-title\">{{calendarEvent.title}}</h3>\n                <app-event-date-interval\n                        [formattedDateInterval]=\"calendarEvent.getFormattedDateInterval()\"></app-event-date-interval>\n                <div class=\"arena-event-location\">\n                    <span class=\"sr-only\" i18n=\"@@eventLocation\">Location</span>\n                    <span class=\"icon-map-marker\" aria-hidden=\"true\"></span>\n                    <span>{{calendarEvent.location ? calendarEvent.location : '&nbsp;'}}</span></div>\n            </div>\n        </ng-template>\n    "
        }),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig, store_1.Store])
    ], EventSummaryComponent);
    return EventSummaryComponent;
}());
exports.EventSummaryComponent = EventSummaryComponent;
//# sourceMappingURL=event-summary.component.js.map