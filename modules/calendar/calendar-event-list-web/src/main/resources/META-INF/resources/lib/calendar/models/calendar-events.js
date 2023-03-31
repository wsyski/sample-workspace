"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calendar_event_1 = require("./calendar-event");
var CalendarEvents = /** @class */ (function () {
    function CalendarEvents(calendarEventsDTO) {
        this.items = calendarEventsDTO.hits.map(function (calendarEventAnalyticsDto) { return new calendar_event_1.CalendarEvent(calendarEventAnalyticsDto.event); });
        this.totalItems = calendarEventsDTO.totalHits;
        this.nrOfItems = this.items.length;
    }
    return CalendarEvents;
}());
exports.CalendarEvents = CalendarEvents;
//# sourceMappingURL=calendar-events.js.map