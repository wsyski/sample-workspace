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
var event_detail_actions_1 = require("../actions/event-detail.actions");
exports.INITIAL_STATE = {
    selectedCalendarEventId: null,
    selectedCalendarEvent: null,
    attendee: null,
    error: null
};
function reducer(state, action) {
    if (state === void 0) { state = exports.INITIAL_STATE; }
    switch (action.type) {
        case event_detail_actions_1.EventDetailActionType.AddAttendee: {
            return __assign({}, state, { 'error': null, 'attendee': action.payload });
        }
        case event_detail_actions_1.EventDetailActionType.AddAttendeeError: {
            return __assign({}, state, { 'error': action.payload, 'attendee': null });
        }
        case event_detail_actions_1.EventDetailActionType.AddAttendeeSuccess: {
            return __assign({}, state, { 'attendee': action.payload });
        }
        case event_detail_actions_1.EventDetailActionType.Select: {
            return __assign({}, state, { 'error': null, 'selectedCalendarEventId': action.payload });
        }
        case event_detail_actions_1.EventDetailActionType.SelectSuccess: {
            return __assign({}, state, { 'error': null, 'selectedCalendarEvent': action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
//# sourceMappingURL=event-detail.reducer.js.map