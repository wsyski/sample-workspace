import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import * as SearchActions from '../store/actions/event-search.actions';
import {CalendarEvent} from '../models/calendar-event';
import {Query, query2QueryParams} from '../models/query';

@Component({
    selector: 'app-event-detail-tags',
    template: `
        <div *ngIf="isShowTags()" class="arena-event-tags">
            <h4 i18n="@@lblTags" class="arena-event-tags-header">Tags</h4>
            <ul>
                <li *ngFor="let tag of calendarEvent.tags" class="arena-event-tag">
                    <a href="javascript:" (click)="onClickTag($event, tag)"
                       title="Click to see all events in this tag"
                       i18n-title="@@lnkSearchTag.title">{{tag}}</a>
                </li>
            </ul>
        </div>
    `
})
export class EventDetailTagsComponent {
    @Input() calendarEvent: CalendarEvent;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromRoot.State>) {
    }

    isShowTags() {
        return this.calendarEvent && this.calendarEvent.tags && this.calendarEvent.tags.length > 0;
    }

    onClickTag(event: MouseEvent, tag: string): void {
        event.preventDefault();
        if (tag) {
            const query: Query = {tags: [tag]};
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
