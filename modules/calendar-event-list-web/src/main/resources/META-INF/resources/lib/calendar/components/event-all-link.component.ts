import {Component, OnInit} from '@angular/core';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import {ActivatedRoute, Router, UrlSerializer} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-event-all-link',
    template: `
    <a href="{{allEventsUrl}}" class="arena-events-show-all" title="Go to the page for all events"
           i18n="@@lnkAllEvents.label" i18n-title="@@lnkAllEvents.title">Show all events</a>
    `,
    styles: [`
    `]
})
export class EventAllLinkComponent implements OnInit {
    allEventsUrl: string;

    constructor(private calendarEventListConfig: CalendarEventListConfig, private router: Router, private serializer: UrlSerializer, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const subscription: Subscription = this.route.queryParams.subscribe(
            queryParams => {
                const urlTree = this.router.createUrlTree(['/'], {queryParams: queryParams});
                this.allEventsUrl = this.calendarEventListConfig.getAllEventsUrl() + '#' + this.serializer.serialize(urlTree);
            },
            (error: any) => console.error(error),
            () => subscription.unsubscribe());
    }
}
