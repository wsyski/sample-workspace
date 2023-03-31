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
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var rxjs_1 = require("rxjs");
var query_1 = require("../../models/query");
var misc_util_1 = require("../../../core/utils/misc-util");
var router_store_1 = require("@ngrx/router-store");
var SearchActions = require("../actions/event-search.actions");
var event_search_actions_1 = require("../actions/event-search.actions");
var fromRoot = require("../store");
var RouterEffects = /** @class */ (function () {
    function RouterEffects(actions$, store$, router) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.router = router;
        this.searchOnNavigate$ = this.actions$.pipe(effects_1.ofType(router_store_1.ROUTER_NAVIGATION), operators_1.withLatestFrom(this.store$.select(fromRoot.selectRouterState), this.store$.select(fromRoot.selectQuery), this.store$.select(fromRoot.selectTotalItems), function (action, routerState, query, totalItems) {
            // console.log('searchOnNavigate$ action: ', action);
            return RouterEffects_1.getPayload(routerState, query, totalItems);
        }), operators_1.filter(function (payload) { return payload.isNewQuery; }), operators_1.map(function (payload) {
            return new SearchActions.Search({ 'query': payload.paramsQuery });
        }));
        this.navigateOnSearchSuccess$ = this.actions$.pipe(effects_1.ofType(event_search_actions_1.EventSearchActionType.SearchSuccess), operators_1.withLatestFrom(this.store$.select(fromRoot.selectRouterState), this.store$.select(fromRoot.selectQuery), this.store$.select(fromRoot.selectTotalItems), function (action, routerState, query, totalItems) {
            // console.log('navigateOnSearchSuccess$ action: ', action);
            return RouterEffects_1.getPayload(routerState, query, totalItems);
        }), operators_1.filter(function (payload) { return payload.isNewQuery; }), operators_1.tap(function (payload) {
            _this.router.navigate([], { queryParams: query_1.query2QueryParams(payload.query) });
        }));
    }
    RouterEffects_1 = RouterEffects;
    RouterEffects.getPayload = function (routerState, query, totalItems) {
        var paramsQuery = query_1.queryParams2Query(routerState.state.queryParams);
        var isNewQuery = totalItems == null || !misc_util_1.MiscUtil.equals(query, paramsQuery);
        // console.log(' query: ', query, ' paramsQuery: ', paramsQuery, ' isNewQuery: ', isNewQuery);
        return {
            query: query,
            paramsQuery: paramsQuery,
            isNewQuery: isNewQuery
        };
    };
    var RouterEffects_1;
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], RouterEffects.prototype, "searchOnNavigate$", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Object)
    ], RouterEffects.prototype, "navigateOnSearchSuccess$", void 0);
    RouterEffects = RouterEffects_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, store_1.Store, router_1.Router])
    ], RouterEffects);
    return RouterEffects;
}());
exports.RouterEffects = RouterEffects;
//# sourceMappingURL=router.effects.js.map