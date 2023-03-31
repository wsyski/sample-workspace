import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import * as SearchActions from '../store/actions/event-search.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-event-search-more',
  template: `
    <ng-container *ngIf="(isShowMore() | async )">
      <p class="text-center arena-event-list-load-more col-sm-12 col-md-12">
        <button class="btn btn-md btn-primary" (click)="showMore()" title="Load more events" i18n="@@btnShowMoreEvents.label" i18n-title="@@btnShowMoreEvents.title">Load more events</button>
      </p>
    </ng-container>
  `,
  styles: [`
    .arena-event-list-load-more {
      margin: 2em 0;
    }

    .arena-event-list-load-more button {
      text-transform: uppercase;
      min-width: 60%;
    }
  `]
})
export class EventSearchMoreComponent {

  constructor(private store: Store<fromRoot.State>) {
  }

  showMore() {
    this.store.dispatch(new SearchActions.More());
  }

  isShowMore(): Observable<boolean> {
    return this.store.select(fromRoot.isShowMore);
  }

}
