"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var store_1 = require("@ngrx/store");
var event_search_actions_1 = require("../actions/event-search.actions");
var rxjs_1 = require("rxjs");
var event_search_reducer_1 = require("../reducers/event-search.reducer");
var store_2 = require("../store");
var calendar_service_1 = require("../../services/calendar.service");
var EventSearchEffects = /** @class */ (function () {
    function EventSearchEffects(actions$, store$, calendarService) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.calendarService = calendarService;
        this.initSuccess$ = this.actions$.pipe(effects_1.ofType(event_search_actions_1.EventSearchActionType.Init), operators_1.switchMap(function () { return _this.calendarService.getEventFilterFacets(); }), operators_1.map((function (results) { return new event_search_actions_1.InitSuccess({
            'locations': results[0].map(function (facet) { return facet.value; }),
            'tags': results[1].map(function (facet) { return facet.value; }),
            'targetAudiences': results[2].map(function (facet) { return facet.value; })
        }); })));
        this.searchSuccess$ = this.actions$.pipe(effects_1.ofType(event_search_actions_1.EventSearchActionType.Search), operators_1.withLatestFrom(this.store$.select(store_2.selectSearchState), function (action, state) {
            var nextSearchState = event_search_reducer_1.getNextSearchState(state, action);
            return [nextSearchState.query, nextSearchState.timeInterval, nextSearchState.pageToken];
        }), operators_1.switchMap(function (request) { return _this.calendarService.searchCalendarEvents(request[0], request[1], request[2]); }), operators_1.map(function (results) { return new event_search_actions_1.SearchSuccess({ 'calendarEvents': results.items, 'totalItems': results.totalItems }); }));
        this.moreSuccess$ = this.actions$.pipe(effects_1.ofType(event_search_actions_1.EventSearchActionType.More), operators_1.withLatestFrom(this.store$.select(store_2.selectSearchState), function (action, state) {
            return [state.query, state.timeInterval, state.pageToken];
        }), operators_1.switchMap(function (request) { return _this.calendarService.searchCalendarEvents(request[0], request[1], request[2]); }), operators_1.map(function (results) { return new event_search_actions_1.MoreSuccess({ 'calendarEvents': results.items, 'totalItems': results.totalItems }); }));
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], EventSearchEffects.prototype, "initSuccess$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], EventSearchEffects.prototype, "searchSuccess$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], EventSearchEffects.prototype, "moreSuccess$", void 0);
    EventSearchEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, store_1.Store, calendar_service_1.CalendarService])
    ], EventSearchEffects);
    return EventSearchEffects;
}());
exports.EventSearchEffects = EventSearchEffects;
//# sourceMappingURL=event-search.effects.js.map