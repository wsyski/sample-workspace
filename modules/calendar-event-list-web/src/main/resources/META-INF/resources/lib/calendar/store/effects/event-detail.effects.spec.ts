import {getTestBed, TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {EventDetailEffects} from './event-detail.effects';
import {Observable} from 'rxjs';
import {AddAttendee, AddAttendeeError, AddAttendeeSuccess, Select, SelectSuccess} from '../actions/event-detail.actions';
import {cold, hot} from 'jasmine-marbles';
import {INITIAL_STATE, StoreModule} from '@ngrx/store';
import * as fromDetail from '../reducers/event-detail.reducer';
import {MockCalendarEventsSearchResult} from '../../models/mock-calendar-events-search-result';
import {Attendee} from '../../models/attendee';
import {provideMockActions} from '@ngrx/effects/testing';
import {CalendarService} from '../../services/calendar.service';
import {CalendarServiceMock} from '../../services/calendar-mock.service';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('EventDetailEffects', () => {
    let effects: EventDetailEffects;
    let actions$: Observable<any>;
    let calendarService: CalendarService;
    let injector: TestBed;

    function init(initialState: fromDetail.State) {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({detail: fromDetail.reducer})
            ],
            providers: [
                EventDetailEffects,
                MockBackend,
                BaseRequestOptions,
                {provide: INITIAL_STATE, useFactory: () => initialState},
                {provide: Http, useFactory: (backend: ConnectionBackend, options: RequestOptions) => new Http(backend, options), deps: [MockBackend, BaseRequestOptions]},
                {provide: CalendarService, useClass: CalendarServiceMock},
                provideMockActions(() => actions$),
            ],
        });
        injector = getTestBed();
        effects = injector.get(EventDetailEffects);
        actions$ = injector.get(Actions);
        calendarService = injector.get(CalendarService);
    }

    describe('select$', () => {
        beforeEach(() => {
            init(fromDetail.INITIAL_STATE);
        });

        it('should return SelectSuccess', () => {
            const selectAction = new Select(MockCalendarEventsSearchResult.getSelectedCalendarEventId());
            const selectSuccess = new SelectSuccess(MockCalendarEventsSearchResult.getCalendarEvents().items[0]);
            actions$ = hot('a|', {a: selectAction});
            const expected = cold('a|', {a: selectSuccess});
            expect(effects.select$).toBeObservable(expected);
        });
    });

    describe('addAttendee$', () => {
        beforeEach(() => {
            init({
                selectedCalendarEventId: MockCalendarEventsSearchResult.getSelectedCalendarEventId(),
                selectedCalendarEvent: MockCalendarEventsSearchResult.getCalendarEvents().items[0],
                attendee: null,
                error: null
            });
        });

        it('should return AddAttendeeSuccess', () => {
            const attendee = <Attendee>{firstName: 'Wojciech', lastName: 'Syski', email: 'wos@axiell.com', nrRegistered: 1, id: null};
            const registeredAttendee = CalendarServiceMock.getRegisteredAttendee();
            const addAttendeeAction = new AddAttendee(attendee);
            const addAttendeeSuccess = new AddAttendeeSuccess(registeredAttendee);
            actions$ = hot('a|', {a: addAttendeeAction});
            const expected = cold('a|', {a: addAttendeeSuccess});
            expect(effects.addAttendee$).toBeObservable(expected);
        });

        it('should return AddAttendeeError', () => {
            const action = new AddAttendee({firstName: 'Wojciech', lastName: 'Syski', email: 'wsyski@axiell.com', nrRegistered: 1, id: null});
            const addAttendeeError = new AddAttendeeError(CalendarServiceMock.getRegistrationHttpErrorResponse());
            actions$ = hot('a|', {a: action});
            const expected = cold('a|', {a: addAttendeeError});
            expect(effects.addAttendee$).toBeObservable(expected);
        });
    });
});

