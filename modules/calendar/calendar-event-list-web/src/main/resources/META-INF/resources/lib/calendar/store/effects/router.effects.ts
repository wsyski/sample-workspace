import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Query, query2QueryParams, queryParams2Query} from '../../models/query';
import {MiscUtil} from '../../../core/utils/misc-util';
import {ROUTER_NAVIGATION, RouterNavigationAction, RouterReducerState} from '@ngrx/router-store';
import * as SearchActions from '../actions/event-search.actions';
import {EventSearchActionType} from '../actions/event-search.actions';
import * as fromRoot from '../store';
import {RouterStateUrl} from '../store';

@Injectable()
export class RouterEffects {

    @Effect()
    searchOnNavigate$: Observable<Action> = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        withLatestFrom(this.store$.select(fromRoot.selectRouterState), this.store$.select(fromRoot.selectQuery), this.store$.select(fromRoot.selectTotalItems),
            (action, routerState, query, totalItems) => {
                // console.log('searchOnNavigate$ action: ', action);
                return RouterEffects.getPayload(routerState, query, totalItems);
            }
        ),
        filter(payload => payload.isNewQuery),
        map((payload) => {
            return new SearchActions.Search({'query': payload.paramsQuery});
        })
    );

    @Effect({dispatch: false})
    navigateOnSearchSuccess$ = this.actions$.pipe(
        ofType(EventSearchActionType.SearchSuccess),
        withLatestFrom(this.store$.select(fromRoot.selectRouterState), this.store$.select(fromRoot.selectQuery), this.store$.select(fromRoot.selectTotalItems),
            (action, routerState, query, totalItems) => {
                // console.log('navigateOnSearchSuccess$ action: ', action);
                return RouterEffects.getPayload(routerState, query, totalItems);
            }
        ),
        filter(payload => payload.isNewQuery),
        tap(payload => {
            this.router.navigate([], {queryParams: query2QueryParams(payload.query)});
        }));

    constructor(private actions$: Actions<RouterNavigationAction>, private store$: Store<fromRoot.State>, private router: Router) {
    }

    static getPayload(routerState: RouterReducerState<RouterStateUrl>, query: Query, totalItems: number) {
        const paramsQuery = queryParams2Query(routerState.state.queryParams);
        const isNewQuery = totalItems == null || !MiscUtil.equals(query, paramsQuery);
        // console.log(' query: ', query, ' paramsQuery: ', paramsQuery, ' isNewQuery: ', isNewQuery);
        return {
            query: query,
            paramsQuery: paramsQuery,
            isNewQuery: isNewQuery
        };
    }
}
