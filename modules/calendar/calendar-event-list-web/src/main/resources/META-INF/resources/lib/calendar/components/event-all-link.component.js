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
var router_1 = require("@angular/router");
var EventAllLinkComponent = /** @class */ (function () {
    function EventAllLinkComponent(calendarEventListConfig, router, serializer, route) {
        this.calendarEventListConfig = calendarEventListConfig;
        this.router = router;
        this.serializer = serializer;
        this.route = route;
    }
    EventAllLinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        var subscription = this.route.queryParams.subscribe(function (queryParams) {
            var urlTree = _this.router.createUrlTree(['/'], { queryParams: queryParams });
            _this.allEventsUrl = _this.calendarEventListConfig.getAllEventsUrl() + '#' + _this.serializer.serialize(urlTree);
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    EventAllLinkComponent = __decorate([
        core_1.Component({
            selector: 'app-event-all-link',
            template: "\n    <a href=\"{{allEventsUrl}}\" class=\"arena-events-show-all\" title=\"Go to the page for all events\"\n           i18n=\"@@lnkAllEvents.label\" i18n-title=\"@@lnkAllEvents.title\">Show all events</a>\n    ",
            styles: ["\n    "]
        }),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig, router_1.Router, router_1.UrlSerializer, router_1.ActivatedRoute])
    ], EventAllLinkComponent);
    return EventAllLinkComponent;
}());
exports.EventAllLinkComponent = EventAllLinkComponent;
//# sourceMappingURL=event-all-link.component.js.map