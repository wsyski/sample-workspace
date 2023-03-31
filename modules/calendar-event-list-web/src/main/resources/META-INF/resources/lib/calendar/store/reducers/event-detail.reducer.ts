import {EventDetailAction, EventDetailActionType} from '../actions/event-detail.actions';
import {Attendee} from '../../models/attendee';
import {CalendarEvent} from '../../models/calendar-event';
import {Error} from '../../models/error';

export interface State {
    selectedCalendarEventId: string;
    selectedCalendarEvent: CalendarEvent;
    attendee: Attendee;
    error: Error;
}

export const INITIAL_STATE: State = {
    selectedCalendarEventId: null,
    selectedCalendarEvent: null,
    attendee: null,
    error: null
};

export function reducer(state: State = INITIAL_STATE, action: EventDetailAction): State {
    switch (action.type) {
        case EventDetailActionType.AddAttendee: {
            return {
                ...state,
                'error': null,
                'attendee': action.payload
            };
        }

        case EventDetailActionType.AddAttendeeError: {
            return {
                ...state,
                'error': action.payload,
                'attendee': null
            };
        }

        case EventDetailActionType.AddAttendeeSuccess: {
            return {
                ...state,
                'attendee': action.payload
            };
        }

        case EventDetailActionType.Select: {
            return {
                ...state,
                'error': null,
                'selectedCalendarEventId': action.payload
            };
        }

        case EventDetailActionType.SelectSuccess: {
            return {
                ...state,
                'error': null,
                'selectedCalendarEvent': action.payload
            };
        }
        default: {
            return state;
        }
    }
}
