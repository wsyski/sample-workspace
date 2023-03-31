import {Component, Input} from '@angular/core';
import {CalendarEvent} from '../models/calendar-event';

@Component({
    selector: 'app-event-detail-attachments',
    template: `
        <div *ngIf="isShowAttachments()" class="arena-event-detail-attachment">
            <h4 i18n="@@lblAttachments" class="arena-event-detail-attachments-header">Attachments</h4>
            <ul>
                <li *ngFor="let attachment of calendarEvent.attachments"
                    class="arena-event-detail-attachment">
                    <a [href]="attachment.fileUrl" download target="_blank">{{attachment.title}}</a>
                </li>
            </ul>
        </div>
    `
})
export class EventDetailAttachmentsComponent {
    @Input() calendarEvent: CalendarEvent;

    isShowAttachments() {
        return this.calendarEvent && this.calendarEvent.attachments && this.calendarEvent.attachments.length > 0;
    }
}
