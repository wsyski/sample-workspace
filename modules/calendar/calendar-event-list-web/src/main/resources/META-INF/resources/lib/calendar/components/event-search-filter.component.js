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
var time_interval_1 = require("../models/time-interval");
var operators_1 = require("rxjs/operators");
var SearchActions = require("../store/actions/event-search.actions");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var EventSearchFilterComponent = /** @class */ (function () {
    function EventSearchFilterComponent(store$, calendarEventListConfig) {
        var _this = this;
        this.store$ = store$;
        this.calendarEventListConfig = calendarEventListConfig;
        this.onTagSelectedValuesChanged = (function (selectedValues) {
            _this.store$.dispatch(new SearchActions.Search({ query: { 'tags': selectedValues } }));
        });
        this.onLocationSelectedValuesChanged = (function (selectedValues) {
            _this.store$.dispatch(new SearchActions.Search({ query: { 'locations': selectedValues } }));
        });
        this.onTargetAudienceSelectedValuesChanged = (function (selectedValues) {
            _this.store$.dispatch(new SearchActions.Search({ query: { 'targetAudiences': selectedValues } }));
        });
        this.onTimeIntervalSelectedValuesChanged = (function (selectedValues) {
            var timeIntervalName = time_interval_1.TimeIntervalName[selectedValues[0]];
            _this.store$.dispatch(new SearchActions.Search({ timeInterval: time_interval_1.getTimeInterval(timeIntervalName) }));
        });
        this.timeIntervalPageSize = calendarEventListConfig.getTimeIntervalPageSize();
        this.locationPageSize = calendarEventListConfig.getLocationPageSize();
        this.tagPageSize = calendarEventListConfig.getTagPageSize();
        this.targetAudiencePageSize = calendarEventListConfig.getTargetAudiencePageSize();
    }
    EventSearchFilterComponent.prototype.ngOnInit = function () {
        this.query$ = this.store$.select(fromRoot.selectQuery);
        this.locations$ = this.store$.select(fromRoot.selectLocations);
        this.tags$ = this.store$.select(fromRoot.selectTags);
        this.targetAudiences$ = this.store$.select(fromRoot.selectTargetAudiences);
        this.query$ = this.store$.select(fromRoot.selectQuery);
        var configurationFilter = this.calendarEventListConfig.getConfigurationFilter();
        this.showLocations$ = this.locations$.pipe(operators_1.map(function (locations) { return locations.length > 0 && (!configurationFilter.locations || configurationFilter.locations.length !== 1); }));
        this.showTags$ = this.tags$.pipe(operators_1.map(function (tags) { return tags.length > 0 && (!configurationFilter.tags || configurationFilter.tags.length !== 1); }));
        this.showTargetAudiences$ = this.targetAudiences$.pipe(operators_1.map(function (targetAudiences) { return targetAudiences.length > 0
            && (!configurationFilter.targetAudiences || configurationFilter.targetAudiences.length !== 1); }));
        this.selectedTimeIntervalName$ = this.store$.select(fromRoot.selectTimeInterval).pipe(operators_1.map(function (timeInterval) { return time_interval_1.getTimeIntervalName(timeInterval); }));
        this.selectedLocations$ = this.query$.pipe(operators_1.map(function (query) {
            return query.locations;
        }));
        this.selectedTags$ = this.query$.pipe(operators_1.map(function (query) {
            return query.tags;
        }));
        this.selectedTargetAudiences$ = this.query$.pipe(operators_1.map(function (query) {
            return query.targetAudiences;
        }));
        this.timeIntervalNames = Object.keys(time_interval_1.TimeIntervalName);
    };
    EventSearchFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-event-search-filter',
            template: "\n      <ng-container>\n        <div>\n          <app-time-interval-selector [selectedValues]=\"[selectedTimeIntervalName$ | async]\"\n                                      [values]=\"timeIntervalNames\"\n                                      [pageSize]=\"timeIntervalPageSize\"\n                                      (selectedValuesChanged)=\"onTimeIntervalSelectedValuesChanged($event)\">\n          </app-time-interval-selector>\n        </div>\n        <div *ngIf=\"showLocations$ | async\" aria-live=\"assertive\">\n          <app-location-selector [selectedValues]=\"selectedLocations$ | async\"\n                                 [values]=\"locations$ | async\"\n                                 [pageSize]=\"locationPageSize\"\n                                 (selectedValuesChanged)=\"onLocationSelectedValuesChanged($event)\">\n          </app-location-selector>\n        </div>\n        <div *ngIf=\"showTargetAudiences$ | async\" aria-live=\"assertive\">\n          <app-target-audience-selector [selectedValues]=\"selectedTargetAudiences$ | async\"\n                                        [values]=\"targetAudiences$ | async\"\n                                        [pageSize]=\"targetAudiencePageSize\"\n                                        (selectedValuesChanged)=\"onTargetAudienceSelectedValuesChanged($event)\">\n          </app-target-audience-selector>\n        </div>\n        <div *ngIf=\"showTags$ | async\" aria-live=\"assertive\">\n          <app-tag-selector [selectedValues]=\"selectedTags$ | async\"\n                            [values]=\"tags$ | async\"\n                            [pageSize]=\"tagPageSize\"\n                            (selectedValuesChanged)=\"onTagSelectedValuesChanged($event)\">\n          </app-tag-selector>\n        </div>\n      </ng-container>\n    ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [store_1.Store, calendar_event_list_config_1.CalendarEventListConfig])
    ], EventSearchFilterComponent);
    return EventSearchFilterComponent;
}());
exports.EventSearchFilterComponent = EventSearchFilterComponent;
//# sourceMappingURL=event-search-filter.component.js.map