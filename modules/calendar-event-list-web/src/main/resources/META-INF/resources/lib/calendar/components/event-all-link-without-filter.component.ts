import {Component, OnInit} from '@angular/core';
import {CalendarEventListConfig} from '../calendar-event-list-config';


@Component({
    selector: 'app-event-all-link-without-filter',
    template: `
    <a href="{{allEventsUrl}}" class="arena-events-show-all" title="Go to the page for all events"
           i18n="@@lnkAllEvents.label" i18n-title="@@lnkAllEvents.title">Show all events</a>
    `,

})
export class EventAllLinkWithoutFilterComponent implements OnInit {
    allEventsUrl: string;

    constructor(private calendarEventListConfig: CalendarEventListConfig) {
    }

    ngOnInit() {
        this.allEventsUrl = this.calendarEventListConfig.getAllEventsUrl();
    }
}
