import {Action} from '@ngrx/store';
import {Attendee} from '../../models/attendee';
import {Error} from '../../models/error';
import {CalendarEvent} from '../../models/calendar-event';

export enum EventDetailActionType {
  AddAttendee = '[CalendarEventDetail] Add Attendee',
  AddAttendeeError = '[CalendarEventDetail] Add Attendee Error',
  AddAttendeeSuccess = '[CalendarEventDetail] Add Attendee Success',
  Select = '[CalendarEventDetail] Select',
  SelectSuccess = '[CalendarEventDetail] Select Success'
}

export class Select implements Action {
  readonly type = EventDetailActionType.Select;

  constructor(public payload: string) {
  }
}

export class SelectSuccess implements Action {
  readonly type = EventDetailActionType.SelectSuccess;

  constructor(public payload: CalendarEvent) {
  }
}

export class AddAttendee implements Action {
  readonly type = EventDetailActionType.AddAttendee;

  constructor(public payload: Attendee) {
  }
}

export class AddAttendeeError implements Action {
  readonly type = EventDetailActionType.AddAttendeeError;

  constructor(public payload: Error) {
  }
}

export class AddAttendeeSuccess implements Action {
  readonly type = EventDetailActionType.AddAttendeeSuccess;

  constructor(public payload: Attendee) {
  }
}

export type EventDetailAction = AddAttendee | AddAttendeeError | AddAttendeeSuccess | AddAttendeeError | Select | SelectSuccess;
