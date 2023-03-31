import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import * as SearchActions from '../store/actions/event-search.actions';
import {CalendarEvent} from '../models/calendar-event';
import {Query, query2QueryParams} from '../models/query';

@Component({
    selector: 'app-event-detail-target-audiences',
    template: `
        <div *ngIf="isShowTargetAudiences()" class="arena-event-target-audiences">
            <h4 i18n="@@lblTargetAudiences" class="arena-event-target-audiences-header">Target Audiences</h4>
            <ul>
                <li *ngFor="let targetAudience of calendarEvent.targetAudiences" class="arena-event-target-audience">
                    <a href="javascript:" (click)="onClickTargetAudience($event, targetAudience)"
                       title="Click to see all events for this target audience"
                       i18n-title="@@lnkSearchTargetAudience.title">{{targetAudience}}</a>
                </li>
            </ul>
        </div>
    `
})
export class EventDetailTargetAudiencesComponent {
    @Input() calendarEvent: CalendarEvent;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromRoot.State>) {
    }

    isShowTargetAudiences() {
        return this.calendarEvent && this.calendarEvent.targetAudiences && this.calendarEvent.targetAudiences.length > 0;
    }

    onClickTargetAudience(event: Event, targetAudience: string): void {
        event.preventDefault();
        if (targetAudience) {
            const query: Query = {targetAudiences: [targetAudience]};
            this.searchAndNavigate(query);
        }
    }

    private searchAndNavigate(query: Query) {
        if (this.calendarEvent) {
            // this.store.dispatch(new SearchActions.Reset());
            // this.store.dispatch(new SearchActions.Search({'query': query}));
            this.router.navigate(['/'], {queryParams: query2QueryParams(query)});
        }
    }
}
