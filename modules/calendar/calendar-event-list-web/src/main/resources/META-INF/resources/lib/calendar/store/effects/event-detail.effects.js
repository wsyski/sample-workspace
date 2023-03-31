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
var rxjs_1 = require("rxjs");
var store_1 = require("@ngrx/store");
var event_detail_actions_1 = require("../actions/event-detail.actions");
var store_2 = require("../store");
var calendar_service_1 = require("../../services/calendar.service");
var EventDetailEffects = /** @class */ (function () {
    function EventDetailEffects(actions$, store$, calendarService) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.calendarService = calendarService;
        this.select$ = this.actions$.pipe(effects_1.ofType(event_detail_actions_1.EventDetailActionType.Select), operators_1.map(function (action) { return action.payload; }), operators_1.switchMap(function (selectedCalendarEventId) { return _this.calendarService.getEventById(selectedCalendarEventId); }), operators_1.map(function (event) { return new event_detail_actions_1.SelectSuccess(event); }));
        this.addAttendee$ = this.actions$.pipe(effects_1.ofType(event_detail_actions_1.EventDetailActionType.AddAttendee), operators_1.withLatestFrom(this.store$.select(store_2.selectCalendarEvent), function (action, calendarEvent) {
            return [action.payload, calendarEvent];
        }), operators_1.switchMap(function (values) {
            var disposableStream$ = rxjs_1.of(values);
            return disposableStream$
                .pipe(operators_1.switchMap(function (request) {
                return _this.calendarService.addAttendee(request[0], request[1]).pipe(operators_1.map(function (value) {
                    return new event_detail_actions_1.AddAttendeeSuccess(value);
                }), operators_1.catchError(function (error) {
                    return rxjs_1.of(new event_detail_actions_1.AddAttendeeError(error));
                }));
            }));
        }));
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], EventDetailEffects.prototype, "select$", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", rxjs_1.Observable)
    ], EventDetailEffects.prototype, "addAttendee$", void 0);
    EventDetailEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, store_1.Store, calendar_service_1.CalendarService])
    ], EventDetailEffects);
    return EventDetailEffects;
}());
exports.EventDetailEffects = EventDetailEffects;
//# sourceMappingURL=event-detail.effects.js.map