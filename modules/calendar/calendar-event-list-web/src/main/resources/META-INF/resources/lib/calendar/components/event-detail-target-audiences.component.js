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
var EventDetailTargetAudiencesComponent = /** @class */ (function () {
    function EventDetailTargetAudiencesComponent(router, activatedRoute, store) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.store = store;
    }
    EventDetailTargetAudiencesComponent.prototype.isShowTargetAudiences = function () {
        return this.calendarEvent && this.calendarEvent.targetAudiences && this.calendarEvent.targetAudiences.length > 0;
    };
    EventDetailTargetAudiencesComponent.prototype.onClickTargetAudience = function (event, targetAudience) {
        event.preventDefault();
        if (targetAudience) {
            var query = { targetAudiences: [targetAudience] };
            this.searchAndNavigate(query);
        }
    };
    EventDetailTargetAudiencesComponent.prototype.searchAndNavigate = function (query) {
        if (this.calendarEvent) {
            // this.store.dispatch(new SearchActions.Reset());
            // this.store.dispatch(new SearchActions.Search({'query': query}));
            this.router.navigate(['/'], { queryParams: query_1.query2QueryParams(query) });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", calendar_event_1.CalendarEvent)
    ], EventDetailTargetAudiencesComponent.prototype, "calendarEvent", void 0);
    EventDetailTargetAudiencesComponent = __decorate([
        core_1.Component({
            selector: 'app-event-detail-target-audiences',
            template: "\n        <div *ngIf=\"isShowTargetAudiences()\" class=\"arena-event-target-audiences\">\n            <h4 i18n=\"@@lblTargetAudiences\" class=\"arena-event-target-audiences-header\">Target Audiences</h4>\n            <ul>\n                <li *ngFor=\"let targetAudience of calendarEvent.targetAudiences\" class=\"arena-event-target-audience\">\n                    <a href=\"javascript:\" (click)=\"onClickTargetAudience($event, targetAudience)\"\n                       title=\"Click to see all events for this target audience\"\n                       i18n-title=\"@@lnkSearchTargetAudience.title\">{{targetAudience}}</a>\n                </li>\n            </ul>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, store_1.Store])
    ], EventDetailTargetAudiencesComponent);
    return EventDetailTargetAudiencesComponent;
}());
exports.EventDetailTargetAudiencesComponent = EventDetailTargetAudiencesComponent;
//# sourceMappingURL=event-detail-target-audiences.component.js.map