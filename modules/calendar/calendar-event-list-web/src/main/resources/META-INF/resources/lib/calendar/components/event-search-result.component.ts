import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {Observable} from 'rxjs';
import {CalendarEvent} from '../models/calendar-event';
import {CalendarEventListConfig} from '../calendar-event-list-config';

@Component({
    selector: 'app-event-search-result',
    template: `
        <div *ngIf="(selectedCalendarEventId$ | async) || {}; let selectedCalendarEventId" aria-live="assertive" class="row">
            <ng-container *ngFor="let calendarEvent of calendarEvents; index as i" [class.item-selected]="calendarEvent.id === selectedCalendarEventId">
                <div [ngClass]="'col-sm-12 col-md-' + getCols()">
                    <app-event-summary [calendarEvent]="calendarEvent" [loadMoreFocus]="i === getNextFocus()"></app-event-summary>
                </div>
            </ng-container>
        </div>
    `,
    styles: [`
        .item-selected {
            border: red 1px;
        }
    `]
})
export class EventSearchResultComponent {
    selectedCalendarEventId$: Observable<string>;
    @Input() calendarEvents: CalendarEvent[];

    constructor(private calendarEventListConfig: CalendarEventListConfig, private store: Store<fromRoot.State>) {
        this.selectedCalendarEventId$ = store.select(fromRoot.selectCalendarEventId);
    }

    getCols(): number {
        if (this.calendarEventListConfig.isFullWidthMode()) {
            return 12;
        } else {
            return this.calendarEventListConfig.isSearchFilterVisible() ? 6 : 4;
        }
    }

    getNextFocus(): number {
        const pageSize = this.calendarEventListConfig.getPageSize();
        const calendarSum = this.calendarEvents.length;
        if (calendarSum > pageSize) {
            return (Math.floor(calendarSum / pageSize) - 1) * pageSize;
        }
        return -1;
    }
}
