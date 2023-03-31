import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of, Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {
    AddAttendee,
    AddAttendeeError,
    AddAttendeeSuccess,
    EventDetailAction,
    EventDetailActionType,
    SelectSuccess
} from '../actions/event-detail.actions';
import * as fromRoot from '../store';
import {Attendee} from '../../models/attendee';
import {CalendarEvent} from '../../models/calendar-event';
import {Error} from '../../models/error';
import {selectCalendarEvent} from '../store';
import {CalendarService} from '../../services/calendar.service';

@Injectable()
export class EventDetailEffects {
    @Effect()
    select$: Observable<Action> = this.actions$.pipe(ofType(EventDetailActionType.Select),
        map((action: EventDetailAction) => action.payload),
        switchMap((selectedCalendarEventId: string) => this.calendarService.getEventById(selectedCalendarEventId)),
        map(event => new SelectSuccess(event)));

    @Effect()
    addAttendee$: Observable<Action> = this.actions$.pipe(
        ofType(EventDetailActionType.AddAttendee),
        withLatestFrom(this.store$.select(selectCalendarEvent),
            (action, calendarEvent) => {
                return [(<AddAttendee>action).payload, calendarEvent];
            }
        ),
        switchMap((values: [Attendee, CalendarEvent]) => {
            const disposableStream$ = of(values);
            return disposableStream$
                .pipe(switchMap((request: [Attendee, CalendarEvent]) => {
                    return this.calendarService.addAttendee(request[0], request[1]).pipe(map(value => {
                        return new AddAttendeeSuccess(value);
                    }), catchError((error: Error) => {
                        return of(new AddAttendeeError(error));
                    }));
                }));
        }));

    constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private calendarService: CalendarService) {
    }
}
