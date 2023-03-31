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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DetailActions = require("../store/actions/event-detail.actions");
var store_1 = require("@ngrx/store");
var fromRoot = require("../store/store");
var platform_browser_1 = require("@angular/platform-browser");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var register_attendee_component_1 = require("./register-attendee.component");
var FileSaver = require("file-saver");
var query_1 = require("../models/query");
var common_1 = require("@angular/common");
var misc_util_1 = require("../../core/utils/misc-util");
var EventDetailComponent = /** @class */ (function () {
    function EventDetailComponent(document, router, activatedRoute, store, title, meta, modalService) {
        this.document = document;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.store = store;
        this.title = title;
        this.meta = meta;
        this.modalService = modalService;
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        this.calendarEvent$ = this.store.select(fromRoot.selectCalendarEvent).pipe(operators_1.share());
        this.queryParams$ = this.store.select(fromRoot.selectQuery).pipe(operators_1.map(function (query) { return query_1.query2QueryParams(query); }), operators_1.share());
        this.subscribeRouteParamsEvent();
        this.subscribeCalendarEvent();
    };
    EventDetailComponent.prototype.ngAfterViewChecked = function () {
        if (this.isScrollTop()) {
            this.eventDetailElementRef.nativeElement.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
    };
    EventDetailComponent.prototype.isScrollTop = function () {
        if (this.eventDetailElementRef) {
            var isTopInViewport = misc_util_1.MiscUtil.isTopInViewport(this.eventDetailElementRef.nativeElement, this.document);
            return !isTopInViewport;
        }
        else {
            return false;
        }
    };
    EventDetailComponent.prototype.subscribeRouteParamsEvent = function () {
        var _this = this;
        var subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.store.dispatch(new DetailActions.Select(params['id']));
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    EventDetailComponent.prototype.subscribeCalendarEvent = function () {
        var _this = this;
        var subscription = this.calendarEvent$.subscribe(function (calendarEvent) {
            if (calendarEvent) {
                _this.title.setTitle(calendarEvent.title);
                _this.calendarEvent = calendarEvent;
                _this.isAlmostFullyBooked = _this.calendarEvent.isAlmostFullyBooked() && !_this.calendarEvent.isCancelled();
                _this.isLocationVisible = !!_this.calendarEvent.location;
                _this.isRoomVisible = !!_this.calendarEvent.location && !!_this.calendarEvent.room;
                _this.isRegisterAttendeeButtonVisible = _this.calendarEvent.isRegisterable &&
                    !_this.calendarEvent.isCancelled() && !_this.calendarEvent.isFullyBooked();
                _this.showCalendarLink = !_this.calendarEvent.isCancelled();
                _this.showDescription = !!_this.calendarEvent.description;
                _this.meta.updateTag({ property: 'og:title', content: _this.calendarEvent.title });
                if (_this.calendarEvent.description) {
                    _this.meta.updateTag({ property: 'og:description', content: _this.calendarEvent.description });
                }
                var primaryImage = _this.calendarEvent.getPrimaryImage();
                var iconUrl = primaryImage ? primaryImage.url : null;
                if (iconUrl) {
                    _this.meta.updateTag({ property: 'og:image', content: iconUrl });
                }
            }
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    EventDetailComponent.prototype.onClickLocation = function (event, location) {
        event.preventDefault();
        if (location) {
            var query = { locations: [location] };
            this.searchAndNavigate(query);
        }
    };
    EventDetailComponent.prototype.onClickDownloadICalendar = function (event) {
        event.preventDefault();
        if (this.calendarEvent) {
            var iCalendar = this.calendarEvent.getAsICalendar(this.document);
            var blob = new Blob([iCalendar], { type: 'text/x-vCalendar;charset=utf-8' });
            FileSaver.saveAs(blob, this.calendarEvent.title + '.ics');
        }
    };
    EventDetailComponent.prototype.onClickRegister = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.calendarEvent) {
            this.bsModalRef = this.modalService.show(register_attendee_component_1.RegisterAttendeeComponent);
            var subscription_1 = this.modalService.onHidden.subscribe(function () {
                _this.registerButtonElementRef.nativeElement.focus();
                subscription_1.unsubscribe();
            });
        }
    };
    EventDetailComponent.prototype.isShowAttachments = function () {
        return this.calendarEvent && this.calendarEvent.attachments && this.calendarEvent.attachments.length > 0;
    };
    EventDetailComponent.prototype.isShowTags = function () {
        return this.calendarEvent && this.calendarEvent.tags && this.calendarEvent.tags.length > 0;
    };
    EventDetailComponent.prototype.isShowTargetAudiences = function () {
        return this.calendarEvent && this.calendarEvent.targetAudiences && this.calendarEvent.targetAudiences.length > 0;
    };
    EventDetailComponent.prototype.searchAndNavigate = function (query) {
        if (this.calendarEvent) {
            // this.store.dispatch(new SearchActions.Reset());
            // this.store.dispatch(new SearchActions.Search({'query': query}));
            this.router.navigate(['/'], { queryParams: query_1.query2QueryParams(query) });
        }
    };
    __decorate([
        core_1.ViewChild('eventDetail'),
        __metadata("design:type", core_1.ElementRef)
    ], EventDetailComponent.prototype, "eventDetailElementRef", void 0);
    __decorate([
        core_1.ViewChild('registerButton'),
        __metadata("design:type", core_1.ElementRef)
    ], EventDetailComponent.prototype, "registerButtonElementRef", void 0);
    EventDetailComponent = __decorate([
        core_1.Component({
            template: "\n        <ng-container *ngIf=\"(calendarEvent$ | async) as calendarEvent\">\n            <div #eventDetail class=\"arena-event-detail\">\n                <div class=\"row arena-event-detail-top\">\n                    <div class=\"col-sm-12 arena-event-back-to-list\">\n                        <a [routerLink]=\"['/']\" [queryParams]=\"queryParams$ | async\" title=\"Back\" i18n=\"@@lnkBack.label\" i18n-title=\"@@lnkBack.title\">Back</a>\n                    </div>\n                    <div class=\"col-sm-7\">\n                        <app-event-icon containerClass=\"arena-event-detail-image-container\" [calendarEvent]=\"calendarEvent\"></app-event-icon>\n                    </div>\n                    <div class=\"col-sm-5\">\n                        <div class=\"arena-event-detail-header\">\n                            <h3>{{calendarEvent.title}}</h3>\n                        </div>\n                        <h4 class=\"\" i18n=\"@@lblEventDateTime\">Date and time</h4>\n                        <app-event-date-interval-detail\n                                [formattedDateInterval]=\"calendarEvent.getFormattedDateInterval()\"></app-event-date-interval-detail>\n                        <div class=\"ics-calendar-link\" *ngIf=\"showCalendarLink\">\n                            <a href=\"javascript:\" (click)=\"onClickDownloadICalendar($event)\"\n                               title=\"Add to your calendar\"\n                               i18n=\"@@lnkDownloadICalendar.label\" i18n-title=\"@@lnkDownloadICalendar.title\">Add to your\n                                calendar</a>\n                        </div>\n                        <ng-container *ngIf=\"isLocationVisible\">\n                            <h4 class=\"arena-event-location-header\" i18n=\"@@lblEventLocation\">Location</h4>\n                            <a href=\"javascript:\" (click)=\"onClickLocation($event, calendarEvent.location)\"\n                               title=\"Click to see all events in this location\"\n                               i18n-title=\"@@lnkSearchLocation.title\">{{calendarEvent.location}}</a><span *ngIf=\"isRoomVisible\"> - {{calendarEvent.room}}</span>\n                        </ng-container>\n                        <div class=\"arena-event-detail-register\" *ngIf=\"isRegisterAttendeeButtonVisible\">\n                            <button #registerButton type=\"button\" class=\"btn btn-primary\"\n                                    (click)=\"onClickRegister($event)\" role=\"button\" title=\"Register\"\n                                    i18n=\"@@btnRegister.label\" i18n-title=\"@@btnRegister.title\">Register\n                            </button>\n                            <span *ngIf=\"isAlmostFullyBooked\" i18n=\"@@txtEventAlmostFullyBooked\"\n                                  class=\"register-call-to-action\">Few seats left - you better hurry!</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"row arena-event-detail-body\">\n                    <div class=\"col-sm-7\">\n                        <div class=\"row\" *ngIf=\"showDescription\">\n                            <div class=\"arena-event-detail-description col-sm-12\">\n                                <h4 class=\"\" i18n=\"@@lblEventDescription\">Description</h4>\n                                <p [innerHTML]=\"calendarEvent.description | safeHtml\"></p>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"arena-event-detail-contributions col-sm-12\">\n                                <div class=\"row\">\n                                    <div *ngIf=\"isShowTargetAudiences()\" class=\"col-sm-4\">\n                                        <app-event-detail-target-audiences [calendarEvent]=\"calendarEvent\"></app-event-detail-target-audiences>\n                                    </div>\n                                    <div *ngIf=\"isShowTags()\" class=\"col-sm-8\">\n                                        <app-event-detail-tags [calendarEvent]=\"calendarEvent\"></app-event-detail-tags>\n                                    </div>\n                                    <div *ngIf=\"isShowAttachments()\" class=\"col-sm-4\">\n                                        <app-event-detail-attachments [calendarEvent]=\"calendarEvent\"></app-event-detail-attachments>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-5 arena-events-share\">\n                        <h4 class=\"\" i18n=\"@@lblSocialShare\">Share with your friends</h4>\n                        <app-share-container [platforms]=\"['email','facebook','twitter']\"></app-share-container>\n                    </div>\n                </div>\n            </div>\n        </ng-container>\n    "
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [Document, router_1.Router, router_1.ActivatedRoute, store_1.Store, platform_browser_1.Title,
            platform_browser_1.Meta, ngx_bootstrap_1.BsModalService])
    ], EventDetailComponent);
    return EventDetailComponent;
}());
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=event-detail.component.js.map