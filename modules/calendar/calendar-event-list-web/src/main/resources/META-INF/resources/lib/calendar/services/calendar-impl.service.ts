import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
    BooleanOperator,
    CalendarService,
    END_DATE_FIELD_NAME,
    EVENT_DELETED_FIELD_NAME,
    LOCATION_FIELD_NAME,
    START_DATE_FIELD_NAME,
    STATUS_FIELD_NAME,
    TAG_FIELD_NAME,
    TARGET_AUDIENCE_FIELD_NAME
} from './calendar.service';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import {Attendee} from '../models/attendee';
import {CalendarEvents} from '../models/calendar-events';
import {CalendarEvent} from '../models/calendar-event';
import {Facet} from '../models/facet';
import {PageToken} from '../models/page-token';
import {Query} from '../models/query';
import {Observable} from 'rxjs';
import {CalendarEventDto} from '../models/dto/calendar-event-dto';
import {CalendarEventsDto} from '../models/dto/calendar-events-dto';
import {FacetsDto} from '../models/dto/facets-dto';
import {ConfigurationFilter} from '../models/configuration-filter';
import {Error} from '../models/error';
import {AttendeeDto} from '../models/dto/attendee-dto';
import {DEFAULT_TIME_INTERVAL, TimeInterval} from '../models/time-interval';
import {MiscUtil} from '../../core/utils/misc-util';
import {Facets} from '../models/facets';
import {Http, RequestMethod, Response} from '@angular/http';
import {CalendarEventListAppConfig} from '../calendar-event-list-app-config';

@Injectable()
export class CalendarServiceImpl extends CalendarService {

    constructor(private calendarEventListConfig: CalendarEventListConfig, private calendarServiceConfig: CalendarEventListAppConfig, httpClient: Http) {
        super(httpClient);
    }

    private static getLocationFilters(locations: string[]): object[] {
        if (locations && locations.length > 0) {
            if (Array.isArray(locations)) {
                return [{'field': LOCATION_FIELD_NAME, 'values': locations}];
            } else {
                return [{'field': LOCATION_FIELD_NAME, 'values': [locations]}];
            }
        }
        return [];
    }

    private static getTagFilters(tags: string[]): object[] {
        if (tags && tags.length > 0) {
            if (Array.isArray(tags)) {
                return [{'field': TAG_FIELD_NAME, 'values': tags}];
            } else {
                return [{'field': TAG_FIELD_NAME, 'values': [tags]}];
            }
        }
        return [];
    }

    private static getTargetAudienceFilters(targetAudiences: string[]): object[] {
        if (targetAudiences && targetAudiences.length > 0) {
            if (Array.isArray(targetAudiences)) {
                return [{'field': TARGET_AUDIENCE_FIELD_NAME, 'values': targetAudiences}];
            } else {
                return [{'field': TARGET_AUDIENCE_FIELD_NAME, 'values': [targetAudiences]}];
            }
        }
        return [];
    }

    private static getTimeIntervalFilters(timeInterval: TimeInterval) {
        const filters: object[] = [];
        if (timeInterval) {
            filters.push({'field': END_DATE_FIELD_NAME, 'gte': timeInterval.start.toISOString()});
            if (timeInterval.end) {
                filters.push({'field': START_DATE_FIELD_NAME, 'lte': timeInterval.end.toISOString()});
            }
        }
        return filters;
    }

    private getCalendarCustomerId(): string {
        return this.calendarServiceConfig.getCalendarCustomerId();
    }

    searchCalendarEvents(query: Query, timeInterval: TimeInterval, pageToken: PageToken): Observable<CalendarEvents> {
        const params = this.getSearchParams(query, timeInterval, pageToken);
        return this.serviceInvoke<CalendarEventsDto, any>(this.calendarServiceConfig.getCalendarApiEndpoint(),
            '/customers/' + this.getCalendarCustomerId() + '/search', RequestMethod.Get, params, null)
            .pipe(map(calendarEventsDTO => new CalendarEvents(calendarEventsDTO)));
    }

    getEventById(id: string): Observable<CalendarEvent> {
        return this.serviceInvoke<CalendarEventDto, any>(this.calendarServiceConfig.getCalendarApiEndpoint(),
            '/customers/' + this.getCalendarCustomerId() + '/events/' + id,
            RequestMethod.Get, {}, null)
            .pipe(map(calendarEventDTO => new CalendarEvent(calendarEventDTO)));
    }

    addAttendee(attendee: Attendee, calendarEvent: CalendarEvent): Observable<Attendee> {
        return this.serviceInvoke<AttendeeDto, Attendee>(this.calendarServiceConfig.getCalendarApiEndpoint(),
            '/customers/' + this.getCalendarCustomerId() + '/events/' + calendarEvent.id + '/attendees', RequestMethod.Post, {}, attendee)
            .pipe(map(attendeeDTO => new Attendee(attendeeDTO)));
    }

    getEventFilterFacets(): Observable<[Facet[], Facet[], Facet[]]> {
        const rangeFilters = CalendarServiceImpl.getTimeIntervalFilters(DEFAULT_TIME_INTERVAL);
        const termFilters = this.getDefaultTermFilters();
        const params = {
            'aggFields': [LOCATION_FIELD_NAME, TAG_FIELD_NAME, TARGET_AUDIENCE_FIELD_NAME],
            'rangeFilters': JSON.stringify(rangeFilters),
            'termFilters': JSON.stringify(termFilters),
        };
        return this.serviceInvoke<FacetsDto, any>(this.calendarServiceConfig.getCalendarApiEndpoint(),
            '/customers/' + this.getCalendarCustomerId() + '/aggregation/terms', RequestMethod.Get, params, null)
            .pipe(
                map((facetsDTO: FacetsDto) => new Facets(facetsDTO)),
                map((facets: Facets) =>
                    <[Facet[], Facet[], Facet[]]>[
                        MiscUtil.nvlArray<Facet>(facets.fields.get(LOCATION_FIELD_NAME)),
                        MiscUtil.nvlArray<Facet>(facets.fields.get(TAG_FIELD_NAME)),
                        MiscUtil.nvlArray<Facet>(facets.fields.get(TARGET_AUDIENCE_FIELD_NAME))]));
    }

    getError(httpErrorResponse: Response): Error {
        const json = httpErrorResponse.json();
        return <Error>{
            code: json.apierror.errorCode,
            message: json.apierror.message,
            status: httpErrorResponse.status
        };
    }

    private getSearchParams(query: Query, timeInterval: TimeInterval, pageToken: PageToken) {
        const queryString = query.q ? '\"' + CalendarService.luceneEscape(query.q) + '\"' : '*';
        const rangeFilters = CalendarServiceImpl.getTimeIntervalFilters(timeInterval);

        let termFilters = this.getDefaultTermFilters();
        termFilters = termFilters.concat(CalendarServiceImpl.getLocationFilters(query.locations));
        termFilters = termFilters.concat(CalendarServiceImpl.getTagFilters(query.tags));
        termFilters = termFilters.concat(CalendarServiceImpl.getTargetAudienceFilters(query.targetAudiences));

        return {
            'queryString': 'event.title:' + queryString + ' ' + BooleanOperator.OR +
                ' event.description:' + queryString + ' ' + BooleanOperator.OR +
                ' event.location.value:' + queryString,
            'rangeFilters': JSON.stringify(rangeFilters),
            'termFilters': JSON.stringify(termFilters),
            'sorts': JSON.stringify([{'field': START_DATE_FIELD_NAME, 'order': 'ASC'}]),
            'start': pageToken.start,
            'size': pageToken.pageSize
        };
    }

    private getDefaultTermFilters(): Object[] {
        const configurationFilter: ConfigurationFilter = this.calendarEventListConfig.getConfigurationFilter();
        let defaultFilters: object[] = [
            {
                'field': STATUS_FIELD_NAME, 'values': ['PUBLISHED', 'CANCELLED']
            },
            {
                'type': 'NOT_IN', 'field': EVENT_DELETED_FIELD_NAME, 'values': [true]
            }
        ];
        defaultFilters = defaultFilters.concat(CalendarServiceImpl.getLocationFilters(configurationFilter.locations));
        defaultFilters = defaultFilters.concat(CalendarServiceImpl.getTagFilters(configurationFilter.tags));
        defaultFilters = defaultFilters.concat(CalendarServiceImpl.getTargetAudienceFilters(configurationFilter.targetAudiences));
        return defaultFilters;
    }


}
