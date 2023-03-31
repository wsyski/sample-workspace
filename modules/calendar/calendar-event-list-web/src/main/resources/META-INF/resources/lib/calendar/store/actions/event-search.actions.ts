import {Action} from '@ngrx/store';
import {CalendarEvent} from '../../models/calendar-event';
import {Query} from '../../models/query';
import {PageToken} from '../../models/page-token';
import {TimeInterval} from '../../models/time-interval';
import {ActionWithPayload} from '../store';

export enum EventSearchActionType {
    InitEmpty = '[CalendarEventSearch] InitEmpty',
    Init = '[CalendarEventSearch] Init',
    InitSuccess = '[CalendarEventSearch] Init Success',
    Reset = '[calendarEventSearch] Reset',
    Search = '[calendarEventSearch] Search',
    SearchSuccess = '[CalendarEventSearch] Search Success',
    More = '[CalendarEventSearch] More',
    MoreSuccess = '[CalendarEventSearch] More Success'
}

export interface InitPayload {
    pageToken: PageToken;
}

export interface InitSuccessPayload {
    locations: string[];
    tags: string[];
    targetAudiences: string[];
}

export interface SearchPayload {
    query?: Query;
    timeInterval?: TimeInterval;
}

export interface SearchSuccessPayload {
    totalItems: number;
    calendarEvents: CalendarEvent[];
}

export class InitEmpty implements Action {
    readonly type = EventSearchActionType.InitEmpty;

    constructor() {
    }
}

export class Init implements  ActionWithPayload<InitPayload> {
    readonly type = EventSearchActionType.Init;

    constructor(public payload: InitPayload) {
    }
}

export class InitSuccess implements ActionWithPayload<InitSuccessPayload> {
    readonly type = EventSearchActionType.InitSuccess;

    constructor(public payload: InitSuccessPayload) {
    }
}


export class More implements Action {
    readonly type = EventSearchActionType.More;

    constructor() {
    }
}

export class MoreSuccess implements ActionWithPayload<SearchSuccessPayload> {
    readonly type = EventSearchActionType.MoreSuccess;

    constructor(public payload: SearchSuccessPayload) {
    }
}

export class Reset implements Action {
    readonly type = EventSearchActionType.Reset;

    constructor() {
    }
}

export class Search implements ActionWithPayload<SearchPayload> {
    readonly type = EventSearchActionType.Search;

    constructor(public payload: SearchPayload) {
    }
}

export class SearchSuccess implements ActionWithPayload<SearchSuccessPayload> {
    readonly type = EventSearchActionType.SearchSuccess;

    constructor(public payload: SearchSuccessPayload) {
    }
}

export type EventSearchAction = InitEmpty | Init | InitSuccess | More | MoreSuccess | Reset | Search | SearchSuccess;
