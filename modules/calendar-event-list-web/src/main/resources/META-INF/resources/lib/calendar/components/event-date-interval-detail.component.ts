import {Component, Input} from '@angular/core';
import {FormattedDateInterval} from '../models/formatted-date-interval';

@Component({
    selector: 'app-event-date-interval-detail',
    template: `
    <ng-container *ngIf="formattedDateInterval">
      <div class="arena-event-date-interval">
        <div class="arena-event-dateonly">
          <span  [attr.aria-label]="formattedDateInterval.startDateFull" >{{formattedDateInterval.startDateFull}}</span>
            <span *ngIf="!formattedDateInterval.date">&ndash;</span>
          <span [attr.aria-label]="formattedDateInterval.endDateFull" *ngIf="!formattedDateInterval.date" [attr.datetime]="formattedDateInterval.endDate">{{formattedDateInterval.endDateFull}}</span>
        </div>  
          <time class="arena-event-start" [attr.datetime]="formattedDateInterval.start">
          {{formattedDateInterval.start}}
        </time>
        &ndash;
        <time [attr.datetime]="formattedDateInterval.end">{{formattedDateInterval.end}}</time>
      </div>
    </ng-container>
  `
})
export class EventDateIntervalDetailComponent {
    @Input() formattedDateInterval: FormattedDateInterval;
}
