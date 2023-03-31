import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '../models/calendar-event';

@Component({
    selector: 'app-event-icon',
    template: `
        <div [ngClass]="classModel">
            <div *ngIf="isFullyBooked" class="event-banner" i18n="@@txtEventFullyBooked">Fully
                Booked
            </div>
            <div *ngIf="isCancelled" class="event-banner" i18n="@@txtEventCancelled">Cancelled</div>
            <img [src]="iconSrc" [alt]="iconAlt" *ngIf="iconSrc"/>
        </div>
    `
})
export class EventImageComponent implements OnInit {
    @Input() calendarEvent: CalendarEvent;
    @Input() containerClass: string;
    isAlmostFullyBooked: boolean;
    isFullyBooked: boolean;
    isCancelled: boolean;
    iconSrc: string;
    iconAlt: string;
    classModel: object;

    ngOnInit(): void {
        const primaryImage = this.calendarEvent.getPrimaryImage();
        this.iconSrc = primaryImage && primaryImage.url ? primaryImage.url : null;
        this.iconAlt = primaryImage && primaryImage.caption ? primaryImage.caption : '';
        this.isCancelled = this.calendarEvent.isCancelled();
        this.isFullyBooked = this.calendarEvent.isFullyBooked() && !this.calendarEvent.isCancelled();
        this.isAlmostFullyBooked = this.calendarEvent.isAlmostFullyBooked() && !this.calendarEvent.isCancelled();
        this.classModel = {
            containerClass: true,
            'arena-event-default-image': !this.iconSrc,
            'arena-event-custom-image': this.iconSrc,
            'event-fully-booked': this.isFullyBooked,
            'event-cancelled': this.isCancelled
        };
        if (this.containerClass) {
            this.classModel[this.containerClass] = true;
        }
    }

    getContainerClass(): string {
        return this.containerClass;
    }
}
