"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var facets_1 = require("./facets");
var calendar_events_1 = require("./calendar-events");
var CALENDAR_EVENTS_SEARCH_RESULT_DTO = require('../../../../../../../../dev/resources/calendar-events-search-result-dto.json');
var CALENDAR_EVENTS_FACETS_DTO = require('../../../../../../../../dev/resources/calendar-events-facets-dto.json');
var CALENDAR_EVENTS = new calendar_events_1.CalendarEvents(CALENDAR_EVENTS_SEARCH_RESULT_DTO);
var CALENDAR_FACETS = new facets_1.Facets(CALENDAR_EVENTS_FACETS_DTO);
var SELECTED_CALENDAR_EVENT_ID = 'd84e5468-9fa5-4e48-aa2e-bbf345f7c8c4';
var MockCalendarEventsSearchResult = /** @class */ (function () {
    function MockCalendarEventsSearchResult() {
    }
    MockCalendarEventsSearchResult.getCalendarEvents = function () {
        return CALENDAR_EVENTS;
    };
    MockCalendarEventsSearchResult.getCalendarFacets = function () {
        return CALENDAR_FACETS;
    };
    MockCalendarEventsSearchResult.getHitCount = function () {
        return CALENDAR_EVENTS.totalItems;
    };
    MockCalendarEventsSearchResult.getSelectedCalendarEventId = function () {
        return SELECTED_CALENDAR_EVENT_ID;
    };
    return MockCalendarEventsSearchResult;
}());
exports.MockCalendarEventsSearchResult = MockCalendarEventsSearchResult;
//# sourceMappingURL=mock-calendar-events-search-result.js.map