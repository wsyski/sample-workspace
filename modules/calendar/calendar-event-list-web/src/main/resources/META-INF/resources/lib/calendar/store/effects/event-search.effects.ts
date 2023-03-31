import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import {
    EventSearchActionType,
    InitSuccess,
    More,
    MoreSuccess,
    Search,
    SearchSuccess
} from '../actions/event-search.actions';
import {Query} from '../../models/query';
import {PageToken} from '../../models/page-token';
import {Observable} from 'rxjs';
import {Facet} from '../../models/facet';
import {TimeInterval} from '../../models/time-interval';
import {getNextSearchState} from '../reducers/event-search.reducer';
import {selectSearchState} from '../store';
import {CalendarService} from '../../services/calendar.service';

@Injectable()
export class EventSearchEffects {

    @Effect()
    initSuccess$: Observable<InitSuccess> = this.actions$.pipe(
        ofType(EventSearchActionType.Init),
        switchMap(() => this.calendarService.getEventFilterFacets()),
        map(((results: [Facet[], Facet[], Facet[]]) => new InitSuccess({
            'locations': results[0].map((facet: Facet) => facet.value),
            'tags': results[1].map((facet: Facet) => facet.value),
            'targetAudiences': results[2].map((facet: Facet) => facet.value)
        }))));

    @Effect()
    searchSuccess$: Observable<SearchSuccess> = this.actions$.pipe(
        ofType(EventSearchActionType.Search),
        withLatestFrom(this.store$.select(selectSearchState),
            (action, state) => {
                const nextSearchState = getNextSearchState(state, <Search>action);
                return [nextSearchState.query, nextSearchState.timeInterval, nextSearchState.pageToken];
            }
        ),
        switchMap((request: [Query, TimeInterval, PageToken]) => this.calendarService.searchCalendarEvents(request[0], request[1], request[2])),
        map(results => new SearchSuccess({'calendarEvents': results.items, 'totalItems': results.totalItems})));

    @Effect()
    moreSuccess$: Observable<MoreSuccess> = this.actions$.pipe(
        ofType(EventSearchActionType.More),
        withLatestFrom(this.store$.select(selectSearchState),
            (action, state) => {
                return [state.query, state.timeInterval, state.pageToken];
            }
        ),
        switchMap((request: [Query, TimeInterval, PageToken]) => this.calendarService.searchCalendarEvents(request[0], request[1], request[2])),
        map(results => new MoreSuccess({'calendarEvents': results.items, 'totalItems': results.totalItems})));

    constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private calendarService: CalendarService) {
    }

}
