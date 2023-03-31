import {Attendee} from '../models/attendee';
import {CalendarEvents} from '../models/calendar-events';
import {CalendarEvent} from '../models/calendar-event';
import {Facets} from '../models/facets';
import {Facet} from '../models/facet';
import {PageToken} from '../models/page-token';
import {Error} from '../models/error';
import {Query} from '../models/query';
import {of, Observable, throwError} from 'rxjs';
import {MockCalendarEventsSearchResult} from '../models/mock-calendar-events-search-result';
import {map} from 'rxjs/operators';
import {CalendarService, LOCATION_FIELD_NAME, TAG_FIELD_NAME, TARGET_AUDIENCE_FIELD_NAME} from './calendar.service';
import {TimeInterval} from '../models/time-interval';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

const REGISTRATION_ERROR: Error = {
    status: 400,
    message: 'Email already registered',
    code: 'BAD_REQUEST_EMAIL_ALREADY_REGISTERED'
};

const REGISTERED_ATTENDEE: Attendee = {
    firstName: 'Wojciech',
    lastName: 'Syski',
    email: 'wos@axiell.com',
    nrRegistered: 1,
    id: '2'
};

@Injectable()
export class CalendarServiceMock extends CalendarService {
    constructor(httpClient: Http) {
        super(httpClient);
    }

    static getRegistrationHttpErrorResponse(): Error {
        return REGISTRATION_ERROR;
    }

    static getRegisteredAttendee(): Attendee {
        return REGISTERED_ATTENDEE;
    }

    searchCalendarEvents(query: Query, timeInterval: TimeInterval, pageToken: PageToken): Observable<CalendarEvents> {
        return of(MockCalendarEventsSearchResult.getCalendarEvents());
    }

    getEventById(id: string): Observable<CalendarEvent> {
        return of(MockCalendarEventsSearchResult.getCalendarEvents().items[0]);
    }

    addAttendee(attendee: Attendee, calendarEvent: CalendarEvent): Observable<Attendee> {
        if (attendee.email === 'wos@axiell.com') {
            return of(REGISTERED_ATTENDEE);
        } else {
            return throwError(REGISTRATION_ERROR);
        }
    }

    getEventFilterFacets(): Observable<[Facet[], Facet[], Facet[]]> {
        return of(MockCalendarEventsSearchResult.getCalendarFacets()).pipe(map((facets: Facets) =>
            <[Facet[], Facet[], Facet[]]>[
                facets.fields.get(LOCATION_FIELD_NAME),
                facets.fields.get(TAG_FIELD_NAME),
                facets.fields.get(TARGET_AUDIENCE_FIELD_NAME)
            ]));
    }

    getError(httpErrorResponse: Response): Error {
        return REGISTRATION_ERROR;
    }
}
