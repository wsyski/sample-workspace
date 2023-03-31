import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import {CalendarEvent} from '../models/calendar-event';
import {Observable} from 'rxjs';
import {query2QueryParams, QueryParams} from '../models/query';
import * as fromRoot from '../store/store';
import {map, share} from 'rxjs/operators';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-event-summary',
    template: `
        <div [ngClass]="{'arena-event-card': true, 'event-cancelled': calendarEvent.isCancelled()}">
            <a [ngClass]="{'focusedEventElement': loadMoreFocus }" [routerLink]="['/events', calendarEvent.id]" [queryParams]="queryParams$ | async"
               *ngIf="isEventDetailRouterLink">
                <ng-container *ngTemplateOutlet="cardContent"></ng-container>
            </a>
            <a [ngClass]="{ 'focusedEventElement': loadMoreFocus }" href="{{eventDetailAbsoluteUrl}}" *ngIf="!isEventDetailRouterLink">
                <ng-container *ngTemplateOutlet="cardContent"></ng-container>
            </a>
        </div>

        <ng-template #cardContent>
            <app-event-icon containerClass="card-image-container" [calendarEvent]="calendarEvent"></app-event-icon>
            <div class="card-body">
                <h3 class="card-title">{{calendarEvent.title}}</h3>
                <app-event-date-interval
                        [formattedDateInterval]="calendarEvent.getFormattedDateInterval()"></app-event-date-interval>
                <div class="arena-event-location">
                    <span class="sr-only" i18n="@@eventLocation">Location</span>
                    <span class="icon-map-marker" aria-hidden="true"></span>
                    <span>{{calendarEvent.location ? calendarEvent.location : '&nbsp;'}}</span></div>
            </div>
        </ng-template>
    `
})
export class EventSummaryComponent implements OnInit, AfterViewChecked {

    @Input() calendarEvent: CalendarEvent;
    @Input() loadMoreFocus: boolean;
    eventDetailAbsoluteUrl: string;
    isEventDetailRouterLink: boolean;
    iconUrl: string;
    queryParams$: Observable<QueryParams>;

    constructor(private calendarEventListConfig: CalendarEventListConfig, private store: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        const primaryImage = this.calendarEvent.getPrimaryImage();
        this.iconUrl = primaryImage ? primaryImage.url : null;
        this.eventDetailAbsoluteUrl = this.calendarEventListConfig.getEventDetailAbsoluteUrl(this.calendarEvent.id);
        this.isEventDetailRouterLink = this.calendarEventListConfig.isEventDetailRouterLink();
        this.queryParams$ = this.store.select(fromRoot.selectQuery).pipe(map(query => query2QueryParams(query)), share());
    }

    ngAfterViewChecked(): void {
        if (this.loadMoreFocus) {
            const focusedEventElement = <HTMLElement>document.querySelector('.focusedEventElement');
            focusedEventElement.focus();
            focusedEventElement.scrollIntoView();
        }
    }
}
