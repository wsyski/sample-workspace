"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_summary_component_1 = require("./components/event-summary.component");
var event_search_component_1 = require("./components/event-search.component");
var event_search_query_component_1 = require("./components/event-search-query.component");
var event_search_result_component_1 = require("./components/event-search-result.component");
var event_search_more_component_1 = require("./components/event-search-more.component");
var event_all_link_component_1 = require("./components/event-all-link.component");
var event_search_filter_component_1 = require("./components/event-search-filter.component");
var time_interval_selector_component_1 = require("./components/time-interval-selector.component");
var common_1 = require("@angular/common");
var checkbox_toggle_component_1 = require("./components/checkbox-toggle.component");
var radio_toggle_component_1 = require("./components/radio-toggle.component");
var forms_1 = require("@angular/forms");
var location_selector_component_1 = require("./components/location-selector.component");
var target_audience_selector_component_1 = require("./components/target-audience-selector.component");
var tag_selector_component_1 = require("./components/tag-selector.component");
var calendar_event_list_common_module_1 = require("./calendar-event-list-common.module");
var router_1 = require("@angular/router");
var event_location_filter_component_1 = require("./components/event-location-filter.component");
var location_dropdown_selector_component_1 = require("./components/location-dropdown-selector.component");
var angular2_cookies_1 = require("angular2-cookies");
var event_all_link_without_filter_component_1 = require("./components/event-all-link-without-filter.component");
var CalendarEventListSearchModule = /** @class */ (function () {
    function CalendarEventListSearchModule() {
    }
    CalendarEventListSearchModule = __decorate([
        core_1.NgModule({
            declarations: [
                checkbox_toggle_component_1.CheckboxToggleComponent,
                radio_toggle_component_1.RadioToggleComponent,
                location_selector_component_1.LocationSelectorComponent,
                location_dropdown_selector_component_1.LocationDropdownSelectorComponent,
                target_audience_selector_component_1.TargetAudienceSelectorComponent,
                tag_selector_component_1.TagSelectorComponent,
                event_search_component_1.EventSearchComponent,
                time_interval_selector_component_1.TimeIntervalSelectorComponent,
                event_search_query_component_1.EventSearchQueryComponent,
                event_search_filter_component_1.EventSearchFilterComponent,
                event_location_filter_component_1.EventLocationFilterComponent,
                event_all_link_component_1.EventAllLinkComponent,
                event_all_link_without_filter_component_1.EventAllLinkWithoutFilterComponent,
                event_summary_component_1.EventSummaryComponent,
                event_search_more_component_1.EventSearchMoreComponent,
                event_search_result_component_1.EventSearchResultComponent
            ],
            imports: [
                calendar_event_list_common_module_1.CalendarEventListCommonModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule
            ],
            providers: [angular2_cookies_1.Cookie],
            bootstrap: [],
        })
    ], CalendarEventListSearchModule);
    return CalendarEventListSearchModule;
}());
exports.CalendarEventListSearchModule = CalendarEventListSearchModule;
//# sourceMappingURL=calendar-event-list-search.module.js.map