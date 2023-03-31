import {Attendee} from '../models/attendee';
import {CalendarEvents} from '../models/calendar-events';
import {CalendarEvent} from '../models/calendar-event';
import {Facet} from '../models/facet';
import {PageToken} from '../models/page-token';
import {Query} from '../models/query';
import {Observable, throwError} from 'rxjs';
import {TimeInterval} from '../models/time-interval';
import {catchError, map} from 'rxjs/operators';
import {Error} from '../models/error';
import {Http, RequestMethod, Response} from '@angular/http';


export enum BooleanOperator {
    AND = 'AND',
    OR = 'OR'
}

export const START_DATE_FIELD_NAME = 'event.startDate';
export const END_DATE_FIELD_NAME = 'event.endDate';
export const STATUS_FIELD_NAME = 'event.status';
export const LOCATION_FIELD_NAME = 'event.location.value';
export const TAG_FIELD_NAME = 'event.tags';
export const EVENT_DELETED_FIELD_NAME = 'event.deleted';
export const TARGET_AUDIENCE_FIELD_NAME = 'event.targetAudiences.value';

export abstract class CalendarService {

    constructor(private httpClient: Http) {
    }

    static luceneEscape(value: string): string {
        const LUCENE_SPECIAL_CHARACTERS = ['+', '-', '&', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\'];
        const LUCENE_REGEXP = new RegExp('(\\' + LUCENE_SPECIAL_CHARACTERS.join('|\\') + ')', 'g');
        return value ? value.replace(LUCENE_REGEXP, '\\$1') : '';
    }

    serviceInvoke<R, B>(baseUrl: string, relativeUrl: string, requestMethod: RequestMethod, params: { [key: string]: any | any[] }, body?: B): Observable<R> {
        const requestOptionsArgs = {
            method: requestMethod,
            params: params,
            body: body
        };
        return this.httpClient.request(baseUrl + relativeUrl, requestOptionsArgs)
            .pipe(map((response: Response) => response.json()), catchError((httpErrorResponse: Response) =>  throwError(this.getError(httpErrorResponse))));
    }

    abstract searchCalendarEvents(query: Query, timeInterval: TimeInterval, pageToken: PageToken): Observable<CalendarEvents>;

    abstract getEventById(id: string): Observable<CalendarEvent>;

    abstract addAttendee(attendee: Attendee, calendarEvent: CalendarEvent): Observable<Attendee>;

    abstract getEventFilterFacets(): Observable<[Facet[], Facet[], Facet[]]>;

    abstract getError(httpErrorResponse: Response): Error;
}
