"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDetailActionType;
(function (EventDetailActionType) {
    EventDetailActionType["AddAttendee"] = "[CalendarEventDetail] Add Attendee";
    EventDetailActionType["AddAttendeeError"] = "[CalendarEventDetail] Add Attendee Error";
    EventDetailActionType["AddAttendeeSuccess"] = "[CalendarEventDetail] Add Attendee Success";
    EventDetailActionType["Select"] = "[CalendarEventDetail] Select";
    EventDetailActionType["SelectSuccess"] = "[CalendarEventDetail] Select Success";
})(EventDetailActionType = exports.EventDetailActionType || (exports.EventDetailActionType = {}));
var Select = /** @class */ (function () {
    function Select(payload) {
        this.payload = payload;
        this.type = EventDetailActionType.Select;
    }
    return Select;
}());
exports.Select = Select;
var SelectSuccess = /** @class */ (function () {
    function SelectSuccess(payload) {
        this.payload = payload;
        this.type = EventDetailActionType.SelectSuccess;
    }
    return SelectSuccess;
}());
exports.SelectSuccess = SelectSuccess;
var AddAttendee = /** @class */ (function () {
    function AddAttendee(payload) {
        this.payload = payload;
        this.type = EventDetailActionType.AddAttendee;
    }
    return AddAttendee;
}());
exports.AddAttendee = AddAttendee;
var AddAttendeeError = /** @class */ (function () {
    function AddAttendeeError(payload) {
        this.payload = payload;
        this.type = EventDetailActionType.AddAttendeeError;
    }
    return AddAttendeeError;
}());
exports.AddAttendeeError = AddAttendeeError;
var AddAttendeeSuccess = /** @class */ (function () {
    function AddAttendeeSuccess(payload) {
        this.payload = payload;
        this.type = EventDetailActionType.AddAttendeeSuccess;
    }
    return AddAttendeeSuccess;
}());
exports.AddAttendeeSuccess = AddAttendeeSuccess;
//# sourceMappingURL=event-detail.actions.js.map