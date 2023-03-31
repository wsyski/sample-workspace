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
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var calendar_service_1 = require("./calendar.service");
var calendar_event_list_config_1 = require("../calendar-event-list-config");
var attendee_1 = require("../models/attendee");
var calendar_events_1 = require("../models/calendar-events");
var calendar_event_1 = require("../models/calendar-event");
var time_interval_1 = require("../models/time-interval");
var misc_util_1 = require("../../core/utils/misc-util");
var facets_1 = require("../models/facets");
var http_1 = require("@angular/http");
var calendar_event_list_app_config_1 = require("../calendar-event-list-app-config");
var CalendarServiceImpl = /** @class */ (function (_super) {
    __extends(CalendarServiceImpl, _super);
    function CalendarServiceImpl(calendarEventListConfig, calendarServiceConfig, httpClient) {
        var _this = _super.call(this, httpClient) || this;
        _this.calendarEventListConfig = calendarEventListConfig;
        _this.calendarServiceConfig = calendarServiceConfig;
        return _this;
    }
    CalendarServiceImpl_1 = CalendarServiceImpl;
    CalendarServiceImpl.getLocationFilters = function (locations) {
        if (locations && locations.length > 0) {
            if (Array.isArray(locations)) {
                return [{ 'field': calendar_service_1.LOCATION_FIELD_NAME, 'values': locations }];
            }
            else {
                return [{ 'field': calendar_service_1.LOCATION_FIELD_NAME, 'values': [locations] }];
            }
        }
        return [];
    };
    CalendarServiceImpl.getTagFilters = function (tags) {
        if (tags && tags.length > 0) {
            if (Array.isArray(tags)) {
                return [{ 'field': calendar_service_1.TAG_FIELD_NAME, 'values': tags }];
            }
            else {
                return [{ 'field': calendar_service_1.TAG_FIELD_NAME, 'values': [tags] }];
            }
        }
        return [];
    };
    CalendarServiceImpl.getTargetAudienceFilters = function (targetAudiences) {
        if (targetAudiences && targetAudiences.length > 0) {
            if (Array.isArray(targetAudiences)) {
                return [{ 'field': calendar_service_1.TARGET_AUDIENCE_FIELD_NAME, 'values': targetAudiences }];
            }
            else {
                return [{ 'field': calendar_service_1.TARGET_AUDIENCE_FIELD_NAME, 'values': [targetAudiences] }];
            }
        }
        return [];
    };
    CalendarServiceImpl.getTimeIntervalFilters = function (timeInterval) {
        var filters = [];
        if (timeInterval) {
            filters.push({ 'field': calendar_service_1.END_DATE_FIELD_NAME, 'gte': timeInterval.start.toISOString() });
            if (timeInterval.end) {
                filters.push({ 'field': calendar_service_1.START_DATE_FIELD_NAME, 'lte': timeInterval.end.toISOString() });
            }
        }
        return filters;
    };
    CalendarServiceImpl.prototype.getCalendarCustomerId = function () {
        return this.calendarServiceConfig.getCalendarCustomerId();
    };
    CalendarServiceImpl.prototype.searchCalendarEvents = function (query, timeInterval, pageToken) {
        var params = this.getSearchParams(query, timeInterval, pageToken);
        return this.serviceInvoke(this.calendarServiceConfig.getCalendarApiEndpoint(), '/customers/' + this.getCalendarCustomerId() + '/search', http_1.RequestMethod.Get, params, null)
            .pipe(operators_1.map(function (calendarEventsDTO) { return new calendar_events_1.CalendarEvents(calendarEventsDTO); }));
    };
    CalendarServiceImpl.prototype.getEventById = function (id) {
        return this.serviceInvoke(this.calendarServiceConfig.getCalendarApiEndpoint(), '/customers/' + this.getCalendarCustomerId() + '/events/' + id, http_1.RequestMethod.Get, {}, null)
            .pipe(operators_1.map(function (calendarEventDTO) { return new calendar_event_1.CalendarEvent(calendarEventDTO); }));
    };
    CalendarServiceImpl.prototype.addAttendee = function (attendee, calendarEvent) {
        return this.serviceInvoke(this.calendarServiceConfig.getCalendarApiEndpoint(), '/customers/' + this.getCalendarCustomerId() + '/events/' + calendarEvent.id + '/attendees', http_1.RequestMethod.Post, {}, attendee)
            .pipe(operators_1.map(function (attendeeDTO) { return new attendee_1.Attendee(attendeeDTO); }));
    };
    CalendarServiceImpl.prototype.getEventFilterFacets = function () {
        var rangeFilters = CalendarServiceImpl_1.getTimeIntervalFilters(time_interval_1.DEFAULT_TIME_INTERVAL);
        var termFilters = this.getDefaultTermFilters();
        var params = {
            'aggFields': [calendar_service_1.LOCATION_FIELD_NAME, calendar_service_1.TAG_FIELD_NAME, calendar_service_1.TARGET_AUDIENCE_FIELD_NAME],
            'rangeFilters': JSON.stringify(rangeFilters),
            'termFilters': JSON.stringify(termFilters),
        };
        return this.serviceInvoke(this.calendarServiceConfig.getCalendarApiEndpoint(), '/customers/' + this.getCalendarCustomerId() + '/aggregation/terms', http_1.RequestMethod.Get, params, null)
            .pipe(operators_1.map(function (facetsDTO) { return new facets_1.Facets(facetsDTO); }), operators_1.map(function (facets) {
            return [
                misc_util_1.MiscUtil.nvlArray(facets.fields.get(calendar_service_1.LOCATION_FIELD_NAME)),
                misc_util_1.MiscUtil.nvlArray(facets.fields.get(calendar_service_1.TAG_FIELD_NAME)),
                misc_util_1.MiscUtil.nvlArray(facets.fields.get(calendar_service_1.TARGET_AUDIENCE_FIELD_NAME))
            ];
        }));
    };
    CalendarServiceImpl.prototype.getError = function (httpErrorResponse) {
        var json = httpErrorResponse.json();
        return {
            code: json.apierror.errorCode,
            message: json.apierror.message,
            status: httpErrorResponse.status
        };
    };
    CalendarServiceImpl.prototype.getSearchParams = function (query, timeInterval, pageToken) {
        var queryString = query.q ? '\"' + calendar_service_1.CalendarService.luceneEscape(query.q) + '\"' : '*';
        var rangeFilters = CalendarServiceImpl_1.getTimeIntervalFilters(timeInterval);
        var termFilters = this.getDefaultTermFilters();
        termFilters = termFilters.concat(CalendarServiceImpl_1.getLocationFilters(query.locations));
        termFilters = termFilters.concat(CalendarServiceImpl_1.getTagFilters(query.tags));
        termFilters = termFilters.concat(CalendarServiceImpl_1.getTargetAudienceFilters(query.targetAudiences));
        return {
            'queryString': 'event.title:' + queryString + ' ' + calendar_service_1.BooleanOperator.OR +
                ' event.description:' + queryString + ' ' + calendar_service_1.BooleanOperator.OR +
                ' event.location.value:' + queryString,
            'rangeFilters': JSON.stringify(rangeFilters),
            'termFilters': JSON.stringify(termFilters),
            'sorts': JSON.stringify([{ 'field': calendar_service_1.START_DATE_FIELD_NAME, 'order': 'ASC' }]),
            'start': pageToken.start,
            'size': pageToken.pageSize
        };
    };
    CalendarServiceImpl.prototype.getDefaultTermFilters = function () {
        var configurationFilter = this.calendarEventListConfig.getConfigurationFilter();
        var defaultFilters = [
            {
                'field': calendar_service_1.STATUS_FIELD_NAME, 'values': ['PUBLISHED', 'CANCELLED']
            },
            {
                'type': 'NOT_IN', 'field': calendar_service_1.EVENT_DELETED_FIELD_NAME, 'values': [true]
            }
        ];
        defaultFilters = defaultFilters.concat(CalendarServiceImpl_1.getLocationFilters(configurationFilter.locations));
        defaultFilters = defaultFilters.concat(CalendarServiceImpl_1.getTagFilters(configurationFilter.tags));
        defaultFilters = defaultFilters.concat(CalendarServiceImpl_1.getTargetAudienceFilters(configurationFilter.targetAudiences));
        return defaultFilters;
    };
    var CalendarServiceImpl_1;
    CalendarServiceImpl = CalendarServiceImpl_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [calendar_event_list_config_1.CalendarEventListConfig, calendar_event_list_app_config_1.CalendarEventListAppConfig, http_1.Http])
    ], CalendarServiceImpl);
    return CalendarServiceImpl;
}(calendar_service_1.CalendarService));
exports.CalendarServiceImpl = CalendarServiceImpl;
//# sourceMappingURL=calendar-impl.service.js.map