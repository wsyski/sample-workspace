import {getTestBed, TestBed} from '@angular/core/testing';
import {Actions} from '@ngrx/effects';
import {EventSearchEffects} from './event-search.effects';
import {Observable} from 'rxjs';
import {Init, InitSuccess, More, MoreSuccess, Search, SearchSuccess} from '../actions/event-search.actions';
import {cold, hot} from 'jasmine-marbles';
import {INITIAL_STATE, StoreModule} from '@ngrx/store';
import * as fromSearch from '../reducers/event-search.reducer';
import {MockCalendarEventsSearchResult} from '../../models/mock-calendar-events-search-result';
import {provideMockActions} from '@ngrx/effects/testing';
import {Facet} from '../../models/facet';
import {CalendarService, LOCATION_FIELD_NAME, TAG_FIELD_NAME, TARGET_AUDIENCE_FIELD_NAME} from '../../services/calendar.service';
import {CalendarServiceMock} from '../../services/calendar-mock.service';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('EventSearchEffects', () => {
    let effects: EventSearchEffects;
    let actions$: Observable<any>;
    let calendarService: CalendarService;
    let injector: TestBed;

    function init(initialState: fromSearch.State) {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({search: fromSearch.reducer})
            ],
            providers: [
                EventSearchEffects,
                {provide: INITIAL_STATE, useFactory: () => initialState},
                MockBackend,
                BaseRequestOptions,
                {provide: INITIAL_STATE, useFactory: () => initialState},
                {provide: Http, useFactory: (backend: ConnectionBackend, options: RequestOptions) => new Http(backend, options), deps: [MockBackend, BaseRequestOptions]},
                {provide: CalendarService, useClass: CalendarServiceMock},
                provideMockActions(() => actions$),
            ],
        });
        injector = getTestBed();
        effects = injector.get(EventSearchEffects);
        actions$ = injector.get(Actions);
        calendarService = injector.get(CalendarService);
    }

    describe('initSuccess$', () => {
        beforeEach(() => {
            init(fromSearch.INITIAL_STATE);
        });

        it('should return InitSuccess', () => {
            const facets: Map<string, Facet[]> = MockCalendarEventsSearchResult.getCalendarFacets().fields;
            const locations: string[] = facets.get(LOCATION_FIELD_NAME).map((facet: Facet) => facet.value);
            const tags: string[] = facets.get(TAG_FIELD_NAME).map((facet: Facet) => facet.value);
            const targetAudiences: string[] = facets.get(TARGET_AUDIENCE_FIELD_NAME).map((facet: Facet) => facet.value);
            const action = new Init({pageToken: {start: 0, pageSize: 9}});
            const initSuccess = new InitSuccess({
                locations: locations,
                tags: tags,
                targetAudiences: targetAudiences
            });
            actions$ = hot('a|', {a: action});
            const expected = cold('a|', {a: initSuccess});
            expect(effects.initSuccess$).toBeObservable(expected);
        });
    });

    describe('searchSuccess$', () => {
        beforeEach(() => {
            init(fromSearch.INITIAL_STATE);
        });

        it('should return SearchSuccess', () => {
            const action = new Search({query: {q: 'query'}});
            const searchSuccess = new SearchSuccess({
                calendarEvents: MockCalendarEventsSearchResult.getCalendarEvents().items,
                totalItems: MockCalendarEventsSearchResult.getHitCount()
            });
            actions$ = hot('a|', {a: action});
            const expected = cold('a|', {a: searchSuccess});
            expect(effects.searchSuccess$).toBeObservable(expected);
        });
    });

    describe('moreSuccess$', () => {
        beforeEach(() => {
            init(fromSearch.INITIAL_STATE);
        });
        it('should return MoreSuccess', () => {
            const action = new More();
            const moreSuccess = new MoreSuccess({
                calendarEvents: MockCalendarEventsSearchResult.getCalendarEvents().items,
                totalItems: MockCalendarEventsSearchResult.getHitCount()
            });
            actions$ = hot('a|', {a: action});
            const expected = cold('a|', {a: moreSuccess});
            expect(effects.moreSuccess$).toBeObservable(expected);
        });
    });
});
