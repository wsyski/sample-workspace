import {map} from 'rxjs/operators';
import {AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import {Query} from '../models/query';
import {CalendarEvent} from '../models/calendar-event';
import {MiscUtil} from '../../core/utils/misc-util';
import {DOCUMENT} from '@angular/common';
import {Actions, ofType} from '@ngrx/effects';
import {EventSearchActionType} from '../store/actions/event-search.actions';

@Component({
    template: `
        <div #eventSearch class="arena-events-container container-fluid">
            <div class="row row-bordered">
                <div [ngClass]="'arena-events-list col-sm-12 col-md-' + getBodyCols()">
                    <app-event-location-filter *ngIf="isAllEventsLinkVisible&&isDropdownLocationSelectorViewed"></app-event-location-filter>
                    <h3 class="arena-events-zero-hits" *ngIf="isNoSearchResultVisible$ | async"
                        i18n="@@txtNoSearchResult" [tabIndex]="0">Sorry, there are no events matching the current filter</h3>
                    <app-event-search-result [calendarEvents]="calendarEvents$ | async"></app-event-search-result>
                    <app-event-search-more *ngIf='isMoreEventsButtonVisible'></app-event-search-more>
                    <app-event-all-link-without-filter *ngIf="isAllEventsLinkVisible && isNoSearchResultVisible$ | async"></app-event-all-link-without-filter>
                    <app-event-all-link *ngIf="isAllEventsLinkVisible && !(isNoSearchResultVisible$ | async)"></app-event-all-link>
                </div>
                <div class="arena-events-search-filter col-sm-12 col-md-4" *ngIf="isSearchInputVisible">
                    <app-event-search-query [value]="q$ | async"></app-event-search-query>
                    <app-event-search-filter *ngIf="isSearchFilterVisible"></app-event-search-filter>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSearchComponent implements OnInit, AfterViewChecked {
    @ViewChild('eventSearch') eventSearchElementRef: ElementRef;
    q$: Observable<string>;
    query$: Observable<Query>;
    isFirstSearch = true;
    isScroll = false;
    calendarEvents$: Observable<CalendarEvent[]>;
    isNoSearchResultVisible$: Observable<boolean>;
    isSearchInputVisible: boolean;
    isMoreEventsButtonVisible: boolean;
    isAllEventsLinkVisible: boolean;
    isSearchFilterVisible: boolean;
    isDropdownLocationSelectorViewed: boolean;
    constructor(@Inject(DOCUMENT) private document: Document, private store$: Store<fromRoot.State>, private actions$: Actions, private calendarEventListConfig: CalendarEventListConfig) {
    }

    ngOnInit(): void {
        this.isSearchInputVisible = this.calendarEventListConfig.isSearchInputVisible();
        this.isMoreEventsButtonVisible = this.calendarEventListConfig.isMoreEventsButtonVisible();
        this.isAllEventsLinkVisible = this.calendarEventListConfig.isAllEventsLinkVisible();
        this.isSearchFilterVisible = this.calendarEventListConfig.isSearchFilterVisible();
        this.isDropdownLocationSelectorViewed = this.calendarEventListConfig.isDropdownLocationSelectorViewed();
        this.query$ = this.store$.select(fromRoot.selectQuery);
        this.q$ = this.query$.pipe(map(query => {
                return query.q;
            }
        ));
        this.isNoSearchResultVisible$ = this.store$.select(fromRoot.selectTotalItems).pipe(map(totalItems => {
                return totalItems === 0;
            }
        ));
        this.subscribeActions();
        this.calendarEvents$ = this.store$.select(fromRoot.selectResults);
    }

    ngAfterViewChecked(): void {
         if (this.isScrollTop() && !this.isDropdownLocationSelectorViewed) {
            this.eventSearchElementRef.nativeElement.scrollIntoView({block: 'start', inline: 'nearest'});
         }
    }

    private subscribeActions() {
        const subscription: Subscription = this.actions$.pipe(ofType(EventSearchActionType.SearchSuccess)).subscribe((action: Action) => {
                if (this.isFirstSearch) {
                    this.isFirstSearch = false;
                    this.isScroll = false;
                } else {
                    this.isScroll = true;
                }
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    private isScrollTop(): boolean {
        if (this.isScroll && this.eventSearchElementRef) {
            this.isScroll = false;
            const isTopInViewport = MiscUtil.isTopInViewport(this.eventSearchElementRef.nativeElement, this.document);
            return !isTopInViewport;
        } else {
            return false;
        }
    }

    getHeaderCols(): number {
        let cols = 12;
        if (this.isSearchInputVisible) {
            cols -= 4;
        }
        return cols;
    }

    getBodyCols(): number {
        let cols = 12;
        if (this.isSearchFilterVisible) {
            cols -= 4;
        }
        return cols;
    }
}
