import {map, share} from 'rxjs/operators';
import {AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as DetailActions from '../store/actions/event-detail.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {Observable, Subscription} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RegisterAttendeeComponent} from './register-attendee.component';
import * as FileSaver from 'file-saver';
import {CalendarEvent} from '../models/calendar-event';
import {Query, query2QueryParams, QueryParams} from '../models/query';
import {DOCUMENT} from '@angular/common';
import {MiscUtil} from '../../core/utils/misc-util';

@Component({
    template: `
        <ng-container *ngIf="(calendarEvent$ | async) as calendarEvent">
            <div #eventDetail class="arena-event-detail">
                <div class="row arena-event-detail-top">
                    <div class="col-sm-12 arena-event-back-to-list">
                        <a [routerLink]="['/']" [queryParams]="queryParams$ | async" title="Back" i18n="@@lnkBack.label" i18n-title="@@lnkBack.title">Back</a>
                    </div>
                    <div class="col-sm-7">
                        <app-event-icon containerClass="arena-event-detail-image-container" [calendarEvent]="calendarEvent"></app-event-icon>
                    </div>
                    <div class="col-sm-5">
                        <div class="arena-event-detail-header">
                            <h3>{{calendarEvent.title}}</h3>
                        </div>
                        <h4 class="" i18n="@@lblEventDateTime">Date and time</h4>
                        <app-event-date-interval-detail
                                [formattedDateInterval]="calendarEvent.getFormattedDateInterval()"></app-event-date-interval-detail>
                        <div class="ics-calendar-link" *ngIf="showCalendarLink">
                            <a href="javascript:" (click)="onClickDownloadICalendar($event)"
                               title="Add to your calendar"
                               i18n="@@lnkDownloadICalendar.label" i18n-title="@@lnkDownloadICalendar.title">Add to your
                                calendar</a>
                        </div>
                        <ng-container *ngIf="isLocationVisible">
                            <h4 class="arena-event-location-header" i18n="@@lblEventLocation">Location</h4>
                            <a href="javascript:" (click)="onClickLocation($event, calendarEvent.location)"
                               title="Click to see all events in this location"
                               i18n-title="@@lnkSearchLocation.title">{{calendarEvent.location}}</a><span *ngIf="isRoomVisible"> - {{calendarEvent.room}}</span>
                        </ng-container>
                        <div class="arena-event-detail-register" *ngIf="isRegisterAttendeeButtonVisible">
                            <button #registerButton type="button" class="btn btn-primary"
                                    (click)="onClickRegister($event)" role="button" title="Register"
                                    i18n="@@btnRegister.label" i18n-title="@@btnRegister.title">Register
                            </button>
                            <span *ngIf="isAlmostFullyBooked" i18n="@@txtEventAlmostFullyBooked"
                                  class="register-call-to-action">Few seats left - you better hurry!</span>
                        </div>
                    </div>
                </div>
                <div class="row arena-event-detail-body">
                    <div class="col-sm-7">
                        <div class="row" *ngIf="showDescription">
                            <div class="arena-event-detail-description col-sm-12">
                                <h4 class="" i18n="@@lblEventDescription">Description</h4>
                                <p [innerHTML]="calendarEvent.description | safeHtml"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="arena-event-detail-contributions col-sm-12">
                                <div class="row">
                                    <div *ngIf="isShowTargetAudiences()" class="col-sm-4">
                                        <app-event-detail-target-audiences [calendarEvent]="calendarEvent"></app-event-detail-target-audiences>
                                    </div>
                                    <div *ngIf="isShowTags()" class="col-sm-8">
                                        <app-event-detail-tags [calendarEvent]="calendarEvent"></app-event-detail-tags>
                                    </div>
                                    <div *ngIf="isShowAttachments()" class="col-sm-4">
                                        <app-event-detail-attachments [calendarEvent]="calendarEvent"></app-event-detail-attachments>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-5 arena-events-share">
                        <h4 class="" i18n="@@lblSocialShare">Share with your friends</h4>
                        <app-share-container [platforms]="['email','facebook','twitter']"></app-share-container>
                    </div>
                </div>
            </div>
        </ng-container>
    `
})
export class EventDetailComponent implements OnInit, AfterViewChecked {
    @ViewChild('eventDetail') eventDetailElementRef: ElementRef;
    @ViewChild('registerButton') registerButtonElementRef: ElementRef;
    bsModalRef: BsModalRef;
    queryParams$: Observable<QueryParams>;
    calendarEvent$: Observable<CalendarEvent>;
    calendarEvent: CalendarEvent;
    isRegisterAttendeeButtonVisible: boolean;
    isLocationVisible: boolean;
    isRoomVisible: boolean;
    showCalendarLink: boolean;
    showDescription: boolean;
    isAlmostFullyBooked: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromRoot.State>, private title: Title,
                private meta: Meta, private modalService: BsModalService) {
    }

    ngOnInit(): void {
        this.calendarEvent$ = this.store.select(fromRoot.selectCalendarEvent).pipe(share());
        this.queryParams$ = this.store.select(fromRoot.selectQuery).pipe(map(query => query2QueryParams(query)), share());
        this.subscribeRouteParamsEvent();
        this.subscribeCalendarEvent();
    }

    ngAfterViewChecked(): void {
        if (this.isScrollTop()) {
            this.eventDetailElementRef.nativeElement.scrollIntoView({block: 'end', inline: 'nearest'});
        }
    }

    private isScrollTop(): boolean {
        if (this.eventDetailElementRef) {
            const isTopInViewport = MiscUtil.isTopInViewport(this.eventDetailElementRef.nativeElement, this.document);
            return !isTopInViewport;
        } else {
            return false;
        }
    }

    private subscribeRouteParamsEvent() {
        const subscription: Subscription = this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.store.dispatch(new DetailActions.Select(params['id']));
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    private subscribeCalendarEvent() {
        const subscription: Subscription = this.calendarEvent$.subscribe((calendarEvent: CalendarEvent) => {
                if (calendarEvent) {
                    this.title.setTitle(calendarEvent.title);
                    this.calendarEvent = calendarEvent;
                    this.isAlmostFullyBooked = this.calendarEvent.isAlmostFullyBooked() && !this.calendarEvent.isCancelled();
                    this.isLocationVisible = !!this.calendarEvent.location;
                    this.isRoomVisible = !!this.calendarEvent.location && !!this.calendarEvent.room;
                    this.isRegisterAttendeeButtonVisible = this.calendarEvent.isRegisterable &&
                        !this.calendarEvent.isCancelled() && !this.calendarEvent.isFullyBooked();
                    this.showCalendarLink = !this.calendarEvent.isCancelled();
                    this.showDescription = !!this.calendarEvent.description;
                    this.meta.updateTag({property: 'og:title', content: this.calendarEvent.title});
                    if (this.calendarEvent.description) {
                        this.meta.updateTag({property: 'og:description', content: this.calendarEvent.description});
                    }
                    const primaryImage = this.calendarEvent.getPrimaryImage();
                    const iconUrl = primaryImage ? primaryImage.url : null;
                    if (iconUrl) {
                        this.meta.updateTag({property: 'og:image', content: iconUrl});
                    }
                }
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }

    onClickLocation(event: MouseEvent, location: string): void {
        event.preventDefault();
        if (location) {
            const query: Query = {locations: [location]};
            this.searchAndNavigate(query);
        }
    }

    onClickDownloadICalendar(event: MouseEvent) {
        event.preventDefault();
        if (this.calendarEvent) {
            const iCalendar = this.calendarEvent.getAsICalendar(this.document);
            const blob = new Blob([iCalendar], {type: 'text/x-vCalendar;charset=utf-8'});
            FileSaver.saveAs(blob, this.calendarEvent.title + '.ics');
        }
    }

    onClickRegister(event: MouseEvent): void {
        event.preventDefault();
        if (this.calendarEvent) {
            this.bsModalRef = this.modalService.show(RegisterAttendeeComponent);
            const subscription: Subscription = this.modalService.onHidden.subscribe(() => {
                this.registerButtonElementRef.nativeElement.focus();
                subscription.unsubscribe();
            });
        }
    }

    isShowAttachments() {
        return this.calendarEvent && this.calendarEvent.attachments && this.calendarEvent.attachments.length > 0;
    }

    isShowTags() {
        return this.calendarEvent && this.calendarEvent.tags && this.calendarEvent.tags.length > 0;
    }

    isShowTargetAudiences() {
        return this.calendarEvent && this.calendarEvent.targetAudiences && this.calendarEvent.targetAudiences.length > 0;
    }

    private searchAndNavigate(query: Query) {
        if (this.calendarEvent) {
            // this.store.dispatch(new SearchActions.Reset());
            // this.store.dispatch(new SearchActions.Search({'query': query}));
            this.router.navigate(['/'], {queryParams: query2QueryParams(query)});
        }
    }
}
