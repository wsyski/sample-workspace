import {Component, Input} from '@angular/core';
import {FormattedDateInterval} from '../models/formatted-date-interval';

@Component({
  selector: 'app-event-date-interval',
  template: `
    <ng-container *ngIf="formattedDateInterval">
      <div class="arena-event-date-interval">
        <div class="arena-event-dateonly">
          <span class="sr-only" i18n="@@eventDate">Date</span>
          <span class="icon-calendar" aria-hidden="true"></span>
          <span  [attr.aria-label]="formattedDateInterval.startDateFull" >{{formattedDateInterval.startDate}}</span>
          <span [attr.aria-label]="formattedDateInterval.endDateFull" *ngIf="!formattedDateInterval.date" [attr.datetime]="formattedDateInterval.endDate">&ndash; {{formattedDateInterval.endDate}}</span>
        </div>
        <span class="sr-only" i18n="@@eventTime">Time</span>
        <span class="icon-time" aria-hidden="true"></span>
        <time class="arena-event-start" [attr.datetime]="formattedDateInterval.start">
          {{formattedDateInterval.start}}
        </time>
        &ndash;
        <time [attr.datetime]="formattedDateInterval.end">{{formattedDateInterval.end}}</time>
      </div>
    </ng-container>
  `
})
export class EventDateIntervalComponent {
  @Input() formattedDateInterval: FormattedDateInterval;
}
