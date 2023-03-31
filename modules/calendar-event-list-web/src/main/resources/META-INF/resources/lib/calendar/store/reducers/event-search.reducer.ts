import {EventSearchAction, EventSearchActionType, Search} from '../actions/event-search.actions';
import {CalendarEvent} from '../../models/calendar-event';
import {DEFAULT_PAGE_TOKEN, PageToken} from '../../models/page-token';
import {Query} from '../../models/query';
import {DEFAULT_TIME_INTERVAL, TimeInterval} from '../../models/time-interval';

export interface State {
    query: Query;
    timeInterval: TimeInterval;
    pageToken: PageToken;
    totalItems: number;
    calendarEvents: CalendarEvent[];
    locations: string[];
    tags: string[];
    targetAudiences: string[];
}

export const INITIAL_STATE: State = {
    query: {},
    timeInterval: DEFAULT_TIME_INTERVAL,
    pageToken: DEFAULT_PAGE_TOKEN,
    totalItems: null,
    calendarEvents: [],
    locations: [],
    tags: [],
    targetAudiences: []
};


export function getNextSearchState(state: State, action: Search): State {
    return {
        ...state,
        query: {...state.query, ...action.payload.query},
        timeInterval: action.payload.timeInterval ? action.payload.timeInterval : state.timeInterval,
        pageToken: {start: 0, pageSize: state.pageToken.pageSize},
        totalItems: null
    };
}

export function reducer(state: State = INITIAL_STATE, action: EventSearchAction): State {
    switch (action.type) {
        case EventSearchActionType.InitEmpty: {
            return {
                ...state,
                ...INITIAL_STATE,
                totalItems: 0,
                calendarEvents: []
            };
        }

        case EventSearchActionType.Init: {
            return {
                ...state,
                pageToken: {
                    ...state.pageToken,
                    ...action.payload.pageToken
                }
            };
        }

        case EventSearchActionType.InitSuccess: {
            return {
                ...state,
                locations: action.payload.locations,
                tags: action.payload.tags,
                targetAudiences: action.payload.targetAudiences
            };
        }


        case EventSearchActionType.More: {
            return {
                ...state,
                pageToken: {start: state.pageToken.start + state.pageToken.pageSize, pageSize: state.pageToken.pageSize}
            };
        }

        case EventSearchActionType.MoreSuccess: {
            return {
                ...state,
                calendarEvents: state.calendarEvents.concat(action.payload.calendarEvents),
                totalItems: action.payload.totalItems
            };
        }

        case EventSearchActionType.Reset: {
            return {
                ...state,
                query: {},
                pageToken: {start: 0, pageSize: state.pageToken.pageSize},
                totalItems: null
            };
        }

        case EventSearchActionType.Search: {
            return getNextSearchState(state, action);
        }

        case EventSearchActionType.SearchSuccess: {
            return {
                ...state,
                calendarEvents: action.payload.calendarEvents,
                totalItems: action.payload.totalItems
            };
        }

        default: {
            return state;
        }
    }
}
