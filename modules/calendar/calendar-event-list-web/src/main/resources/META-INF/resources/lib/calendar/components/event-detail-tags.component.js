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
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var calendar_event_1 = require("../models/calendar-event");
var query_1 = require("../models/query");
var EventDetailTagsComponent = /** @class */ (function () {
    function EventDetailTagsComponent(router, activatedRoute, store) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.store = store;
    }
    EventDetailTagsComponent.prototype.isShowTags = function () {
        return this.calendarEvent && this.calendarEvent.tags && this.calendarEvent.tags.length > 0;
    };
    EventDetailTagsComponent.prototype.onClickTag = function (event, tag) {
        event.preventDefault();
        if (tag) {
            var query = { tags: [tag] };
            this.searchAndNavigate(query);
        }
    };
    EventDetailTagsComponent.prototype.searchAndNavigate = function (query) {
        if (this.calendarEvent) {
            // this.store.dispatch(new SearchActions.Reset());
            // this.store.dispatch(new SearchActions.Search({'query': query}));
            this.router.navigate(['/'], { queryParams: query_1.query2QueryParams(query) });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", calendar_event_1.CalendarEvent)
    ], EventDetailTagsComponent.prototype, "calendarEvent", void 0);
    EventDetailTagsComponent = __decorate([
        core_1.Component({
            selector: 'app-event-detail-tags',
            template: "\n        <div *ngIf=\"isShowTags()\" class=\"arena-event-tags\">\n            <h4 i18n=\"@@lblTags\" class=\"arena-event-tags-header\">Tags</h4>\n            <ul>\n                <li *ngFor=\"let tag of calendarEvent.tags\" class=\"arena-event-tag\">\n                    <a href=\"javascript:\" (click)=\"onClickTag($event, tag)\"\n                       title=\"Click to see all events in this tag\"\n                       i18n-title=\"@@lnkSearchTag.title\">{{tag}}</a>\n                </li>\n            </ul>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, store_1.Store])
    ], EventDetailTagsComponent);
    return EventDetailTagsComponent;
}());
exports.EventDetailTagsComponent = EventDetailTagsComponent;
//# sourceMappingURL=event-detail-tags.component.js.map