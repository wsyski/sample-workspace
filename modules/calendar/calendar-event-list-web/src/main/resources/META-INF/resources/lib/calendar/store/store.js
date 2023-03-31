"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fromSearch = require("./reducers/event-search.reducer");
var fromDetail = require("./reducers/event-detail.reducer");
var store_1 = require("@ngrx/store");
var router_store_1 = require("@ngrx/router-store");
var core_1 = require("@angular/core");
exports.REDUCERS = {
    detail: fromDetail.reducer,
    search: fromSearch.reducer,
    router: router_store_1.routerReducer
};
var RouterStateUrlSerializer = /** @class */ (function () {
    function RouterStateUrlSerializer() {
    }
    RouterStateUrlSerializer.prototype.serialize = function (routerState) {
        var route = routerState.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        var url = routerState.url, queryParams = routerState.root.queryParams;
        var params = route.params;
        return { url: url, params: params, queryParams: queryParams };
    };
    RouterStateUrlSerializer = __decorate([
        core_1.Injectable()
    ], RouterStateUrlSerializer);
    return RouterStateUrlSerializer;
}());
exports.RouterStateUrlSerializer = RouterStateUrlSerializer;
// Search store selectors
function isShowMore(state) {
    return state.search.pageToken.start + state.search.pageToken.pageSize < state.search.totalItems;
}
exports.isShowMore = isShowMore;
function selectResults(state) {
    return state.search.calendarEvents;
}
exports.selectResults = selectResults;
function selectTotalItems(state) {
    return state.search.totalItems;
}
exports.selectTotalItems = selectTotalItems;
function selectPageToken(state) {
    return state.search.pageToken;
}
exports.selectPageToken = selectPageToken;
function selectQuery(state) {
    return state.search.query;
}
exports.selectQuery = selectQuery;
function selectTimeInterval(state) {
    return state.search.timeInterval;
}
exports.selectTimeInterval = selectTimeInterval;
function selectLocations(state) {
    return state.search.locations;
}
exports.selectLocations = selectLocations;
function selectTags(state) {
    return state.search.tags;
}
exports.selectTags = selectTags;
function selectTargetAudiences(state) {
    return state.search.targetAudiences;
}
exports.selectTargetAudiences = selectTargetAudiences;
// Detail store selectors
function selectCalendarEventId(state) {
    return state.detail.selectedCalendarEventId;
}
exports.selectCalendarEventId = selectCalendarEventId;
function selectCalendarEvent(state) {
    return state.detail.selectedCalendarEvent;
}
exports.selectCalendarEvent = selectCalendarEvent;
function selectDetailError(state) {
    return state.detail.error;
}
exports.selectDetailError = selectDetailError;
function selectAttendee(state) {
    return state.detail.attendee;
}
exports.selectAttendee = selectAttendee;
// Feature store selectors
exports.selectDetailState = store_1.createFeatureSelector('detail');
exports.selectSearchState = store_1.createFeatureSelector('search');
exports.selectRouterState = store_1.createFeatureSelector('router');
//# sourceMappingURL=store.js.map