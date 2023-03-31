"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_search_actions_1 = require("../actions/event-search.actions");
var page_token_1 = require("../../models/page-token");
var time_interval_1 = require("../../models/time-interval");
exports.INITIAL_STATE = {
    query: {},
    timeInterval: time_interval_1.DEFAULT_TIME_INTERVAL,
    pageToken: page_token_1.DEFAULT_PAGE_TOKEN,
    totalItems: null,
    calendarEvents: [],
    locations: [],
    tags: [],
    targetAudiences: []
};
function getNextSearchState(state, action) {
    return __assign({}, state, { query: __assign({}, state.query, action.payload.query), timeInterval: action.payload.timeInterval ? action.payload.timeInterval : state.timeInterval, pageToken: { start: 0, pageSize: state.pageToken.pageSize }, totalItems: null });
}
exports.getNextSearchState = getNextSearchState;
function reducer(state, action) {
    if (state === void 0) { state = exports.INITIAL_STATE; }
    switch (action.type) {
        case event_search_actions_1.EventSearchActionType.InitEmpty: {
            return __assign({}, state, exports.INITIAL_STATE, { totalItems: 0, calendarEvents: [] });
        }
        case event_search_actions_1.EventSearchActionType.Init: {
            return __assign({}, state, { pageToken: __assign({}, state.pageToken, action.payload.pageToken) });
        }
        case event_search_actions_1.EventSearchActionType.InitSuccess: {
            return __assign({}, state, { locations: action.payload.locations, tags: action.payload.tags, targetAudiences: action.payload.targetAudiences });
        }
        case event_search_actions_1.EventSearchActionType.More: {
            return __assign({}, state, { pageToken: { start: state.pageToken.start + state.pageToken.pageSize, pageSize: state.pageToken.pageSize } });
        }
        case event_search_actions_1.EventSearchActionType.MoreSuccess: {
            return __assign({}, state, { calendarEvents: state.calendarEvents.concat(action.payload.calendarEvents), totalItems: action.payload.totalItems });
        }
        case event_search_actions_1.EventSearchActionType.Reset: {
            return __assign({}, state, { query: {}, pageToken: { start: 0, pageSize: state.pageToken.pageSize }, totalItems: null });
        }
        case event_search_actions_1.EventSearchActionType.Search: {
            return getNextSearchState(state, action);
        }
        case event_search_actions_1.EventSearchActionType.SearchSuccess: {
            return __assign({}, state, { calendarEvents: action.payload.calendarEvents, totalItems: action.payload.totalItems });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=event-search.reducer.js.map