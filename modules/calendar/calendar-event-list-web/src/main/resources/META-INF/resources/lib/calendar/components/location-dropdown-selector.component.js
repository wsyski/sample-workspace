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
var angular2_cookies_1 = require("angular2-cookies");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var SearchActions = require("../store/actions/event-search.actions");
var store_1 = require("@ngrx/store");
var LocationDropdownSelectorComponent = /** @class */ (function () {
    function LocationDropdownSelectorComponent(calendarEventListConfig, store$) {
        this.calendarEventListConfig = calendarEventListConfig;
        this.store$ = store$;
        this.selectedValuesChanged = new core_1.EventEmitter();
        this.selectedLocation = angular2_cookies_1.Cookie.load('SELECTED_LOCATION_VALUE');
        this.cookieSavedDays = this.calendarEventListConfig.getCookieSavedDays();
    }
    LocationDropdownSelectorComponent.prototype.ngOnInit = function () {
        if (this.selectedLocation) {
            this.store$.dispatch(new SearchActions.Search({ query: { 'locations': this.selectedLocation } }));
        }
    };
    LocationDropdownSelectorComponent.prototype.onChangeObj = function (e) {
        var isAllLocation = !this.values.find(function (element) { return element === e; });
        if (isAllLocation) {
            this.store$.dispatch(new SearchActions.Search({ query: { 'locations': [] } }));
            angular2_cookies_1.Cookie.remove('SELECTED_LOCATION_VALUE', '/');
        }
        else {
            this.store$.dispatch(new SearchActions.Search({ query: { 'locations': [e] } }));
            angular2_cookies_1.Cookie.save('SELECTED_LOCATION_VALUE', e, this.cookieSavedDays, '/');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LocationDropdownSelectorComponent.prototype, "values", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.EventEmitter)
    ], LocationDropdownSelectorComponent.prototype, "selectedValuesChanged", void 0);
    LocationDropdownSelectorComponent = __decorate([
        core_1.Component({
            selector: 'app-location-dropdown-selector',
            template: "\n    <div class=\"row location-dropdown\">  \n      <label class=\"col-sm-2 col-form-label\" for=\"location-selector\" i18n=\"@@lnkShowEventsFor.label\">Show events for: </label>\n      <select class=\"col-sm-2 form-control-static\" [ngModel]=\"selectedLocation\" id=\"location-selector\" (ngModelChange)=\"onChangeObj($event)\">\n         <option value=\"null\" i18n=\"@@lnkAllLocation.label\" >All locations</option>\n         <option [ngValue]=\"value\" *ngFor=\"let value of values|slice:0:end\" >{{value}}</option>\n      </select>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig, store_1.Store])
    ], LocationDropdownSelectorComponent);
    return LocationDropdownSelectorComponent;
}());
exports.LocationDropdownSelectorComponent = LocationDropdownSelectorComponent;
//# sourceMappingURL=location-dropdown-selector.component.js.map