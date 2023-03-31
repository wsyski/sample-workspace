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
var store_1 = require("@ngrx/store");
var fromRoot = require("../store/store");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var misc_util_1 = require("../../core/utils/misc-util");
var common_1 = require("@angular/common");
var effects_1 = require("@ngrx/effects");
var event_search_actions_1 = require("../store/actions/event-search.actions");
var EventSearchComponent = /** @class */ (function () {
    function EventSearchComponent(document, store$, actions$, calendarEventListConfig) {
        this.document = document;
        this.store$ = store$;
        this.actions$ = actions$;
        this.calendarEventListConfig = calendarEventListConfig;
        this.isFirstSearch = true;
        this.isScroll = false;
    }
    EventSearchComponent.prototype.ngOnInit = function () {
        this.isSearchInputVisible = this.calendarEventListConfig.isSearchInputVisible();
        this.isMoreEventsButtonVisible = this.calendarEventListConfig.isMoreEventsButtonVisible();
        this.isAllEventsLinkVisible = this.calendarEventListConfig.isAllEventsLinkVisible();
        this.isSearchFilterVisible = this.calendarEventListConfig.isSearchFilterVisible();
        this.isDropdownLocationSelectorViewed = this.calendarEventListConfig.isDropdownLocationSelectorViewed();
        this.query$ = this.store$.select(fromRoot.selectQuery);
        this.q$ = this.query$.pipe(operators_1.map(function (query) {
            return query.q;
        }));
        this.isNoSearchResultVisible$ = this.store$.select(fromRoot.selectTotalItems).pipe(operators_1.map(function (totalItems) {
            return totalItems === 0;
        }));
        this.subscribeActions();
        this.calendarEvents$ = this.store$.select(fromRoot.selectResults);
    };
    EventSearchComponent.prototype.ngAfterViewChecked = function () {
        if (this.isScrollTop() && !this.isDropdownLocationSelectorViewed) {
            this.eventSearchElementRef.nativeElement.scrollIntoView({ block: 'start', inline: 'nearest' });
        }
    };
    EventSearchComponent.prototype.subscribeActions = function () {
        var _this = this;
        var subscription = this.actions$.pipe(effects_1.ofType(event_search_actions_1.EventSearchActionType.SearchSuccess)).subscribe(function (action) {
            if (_this.isFirstSearch) {
                _this.isFirstSearch = false;
                _this.isScroll = false;
            }
            else {
                _this.isScroll = true;
            }
        }, function (error) { return console.error(error); }, function () { return subscription.unsubscribe(); });
    };
    EventSearchComponent.prototype.isScrollTop = function () {
        if (this.isScroll && this.eventSearchElementRef) {
            this.isScroll = false;
            var isTopInViewport = misc_util_1.MiscUtil.isTopInViewport(this.eventSearchElementRef.nativeElement, this.document);
            return !isTopInViewport;
        }
        else {
            return false;
        }
    };
    EventSearchComponent.prototype.getHeaderCols = function () {
        var cols = 12;
        if (this.isSearchInputVisible) {
            cols -= 4;
        }
        return cols;
    };
    EventSearchComponent.prototype.getBodyCols = function () {
        var cols = 12;
        if (this.isSearchFilterVisible) {
            cols -= 4;
        }
        return cols;
    };
    __decorate([
        core_1.ViewChild('eventSearch'),
        __metadata("design:type", core_1.ElementRef)
    ], EventSearchComponent.prototype, "eventSearchElementRef", void 0);
    EventSearchComponent = __decorate([
        core_1.Component({
            template: "\n        <div #eventSearch class=\"arena-events-container container-fluid\">\n            <div class=\"row row-bordered\">\n                <div [ngClass]=\"'arena-events-list col-sm-12 col-md-' + getBodyCols()\">\n                    <app-event-location-filter *ngIf=\"isAllEventsLinkVisible&&isDropdownLocationSelectorViewed\"></app-event-location-filter>\n                    <h3 class=\"arena-events-zero-hits\" *ngIf=\"isNoSearchResultVisible$ | async\"\n                        i18n=\"@@txtNoSearchResult\" [tabIndex]=\"0\">Sorry, there are no events matching the current filter</h3>\n                    <app-event-search-result [calendarEvents]=\"calendarEvents$ | async\"></app-event-search-result>\n                    <app-event-search-more *ngIf='isMoreEventsButtonVisible'></app-event-search-more>\n                    <app-event-all-link-without-filter *ngIf=\"isAllEventsLinkVisible && isNoSearchResultVisible$ | async\"></app-event-all-link-without-filter>\n                    <app-event-all-link *ngIf=\"isAllEventsLinkVisible && !(isNoSearchResultVisible$ | async)\"></app-event-all-link>\n                </div>\n                <div class=\"arena-events-search-filter col-sm-12 col-md-4\" *ngIf=\"isSearchInputVisible\">\n                    <app-event-search-query [value]=\"q$ | async\"></app-event-search-query>\n                    <app-event-search-filter *ngIf=\"isSearchFilterVisible\"></app-event-search-filter>\n                </div>\n            </div>\n        </div>\n    ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [Document, store_1.Store, effects_1.Actions, calendar_event_list_config_1.CalendarEventListConfig])
    ], EventSearchComponent);
    return EventSearchComponent;
}());
exports.EventSearchComponent = EventSearchComponent;
//# sourceMappingURL=event-search.component.js.map