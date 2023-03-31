"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var rxjs_1 = require("rxjs");
var mock_calendar_events_search_result_1 = require("../models/mock-calendar-events-search-result");
var operators_1 = require("rxjs/operators");
var calendar_service_1 = require("./calendar.service");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var REGISTRATION_ERROR = {
    status: 400,
    message: 'Email already registered',
    code: 'BAD_REQUEST_EMAIL_ALREADY_REGISTERED'
};
var REGISTERED_ATTENDEE = {
    firstName: 'Wojciech',
    lastName: 'Syski',
    email: 'wos@axiell.com',
    nrRegistered: 1,
    id: '2'
};
var CalendarServiceMock = /** @class */ (function (_super) {
    __extends(CalendarServiceMock, _super);
    function CalendarServiceMock(httpClient) {
        return _super.call(this, httpClient) || this;
    }
    CalendarServiceMock.getRegistrationHttpErrorResponse = function () {
        return REGISTRATION_ERROR;
    };
    CalendarServiceMock.getRegisteredAttendee = function () {
        return REGISTERED_ATTENDEE;
    };
    CalendarServiceMock.prototype.searchCalendarEvents = function (query, timeInterval, pageToken) {
        return rxjs_1.of(mock_calendar_events_search_result_1.MockCalendarEventsSearchResult.getCalendarEvents());
    };
    CalendarServiceMock.prototype.getEventById = function (id) {
        return rxjs_1.of(mock_calendar_events_search_result_1.MockCalendarEventsSearchResult.getCalendarEvents().items[0]);
    };
    CalendarServiceMock.prototype.addAttendee = function (attendee, calendarEvent) {
        if (attendee.email === 'wos@axiell.com') {
            return rxjs_1.of(REGISTERED_ATTENDEE);
        }
        else {
            return rxjs_1.throwError(REGISTRATION_ERROR);
        }
    };
    CalendarServiceMock.prototype.getEventFilterFacets = function () {
        return rxjs_1.of(mock_calendar_events_search_result_1.MockCalendarEventsSearchResult.getCalendarFacets()).pipe(operators_1.map(function (facets) {
            return [
                facets.fields.get(calendar_service_1.LOCATION_FIELD_NAME),
                facets.fields.get(calendar_service_1.TAG_FIELD_NAME),
                facets.fields.get(calendar_service_1.TARGET_AUDIENCE_FIELD_NAME)
            ];
        }));
    };
    CalendarServiceMock.prototype.getError = function (httpErrorResponse) {
        return REGISTRATION_ERROR;
    };
    CalendarServiceMock = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CalendarServiceMock);
    return CalendarServiceMock;
}(calendar_service_1.CalendarService));
exports.CalendarServiceMock = CalendarServiceMock;
//# sourceMappingURL=calendar-mock.service.js.map