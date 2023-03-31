import * as fromSearch from './reducers/event-search.reducer';
import * as fromDetail from './reducers/event-detail.reducer';
import {Action, ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {routerReducer, RouterReducerState, RouterStateSerializer} from '@ngrx/router-store';
import {Params, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

export interface State {
    detail: fromDetail.State;
    search: fromSearch.State;
    router: RouterReducerState<RouterStateUrl>;
}

export const REDUCERS: ActionReducerMap<State> = {
    detail: fromDetail.reducer,
    search: fromSearch.reducer,
    router: routerReducer
};

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

@Injectable()
export class RouterStateUrlSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {url, root: {queryParams}} = routerState;
        const {params} = route;
        return {url, params, queryParams};
    }
}

// Search store selectors
export function isShowMore(state: State) {
    return state.search.pageToken.start + state.search.pageToken.pageSize < state.search.totalItems;
}

export function selectResults(state: State) {
    return state.search.calendarEvents;
}

export function selectTotalItems(state: State) {
    return state.search.totalItems;
}
export function selectPageToken(state: State) {
    return state.search.pageToken;
}

export function selectQuery(state: State) {
    return state.search.query;
}

export function selectTimeInterval(state: State) {
    return state.search.timeInterval;
}

export function selectLocations(state: State) {
    return state.search.locations;
}

export function selectTags(state: State) {
    return state.search.tags;
}

export function selectTargetAudiences(state: State) {
    return state.search.targetAudiences;
}

// Detail store selectors
export function selectCalendarEventId(state: State) {
    return state.detail.selectedCalendarEventId;
}

export function selectCalendarEvent(state: State) {
    return state.detail.selectedCalendarEvent;
}

export function selectDetailError(state: State) {
    return state.detail.error;
}

export function selectAttendee(state: State) {
    return state.detail.attendee;
}

// Feature store selectors
export const selectDetailState = createFeatureSelector<fromDetail.State>('detail');
export const selectSearchState = createFeatureSelector<fromSearch.State>('search');
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

