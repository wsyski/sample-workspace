import {Component, Input} from '@angular/core';
import * as SearchActions from '../store/actions/event-search.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';

@Component({
    selector: 'app-event-search-query',
    template: `
      <div class="form-group arena-event-search">
        <div class="input-group">
          <label class="control-label visuallyhidden" i18n="@@lblSearchEvents" for="eventSearch-inputSearch" [attr.for]="inputSearch.id">Search events:</label>
          <input id="eventSearch-inputSearch" #inputSearch type="text" class="form-control" placeholder="Search for events"
                 (keyup.enter)="search()" [(ngModel)]="value" i18n-placeholder="@@plhSearchEvents"/>
          <span class="arena-event-search-clear" *ngIf="isClearButtonVisible()">
            <button (click)="onClear()"><i class="icon-remove"><span class="visuallyhidden" i18n="@@clearSearch">Clear</span></i></button>
        </span>
          <div class="input-group-btn">
            <button class="btn icon-search event-search-button" (click)="search()"><span class="visuallyhidden" i18n="@@btnSearch.title">Search</span></button>
          </div>
        </div>
      </div>
    `
})
export class EventSearchQueryComponent {
    @Input()
    value: string;

    constructor(private store: Store<fromRoot.State>) {
    }

    onClear(): void {
        this.value = '';
        this.search();
    }

    isClearButtonVisible(): boolean {
        return !!this.value;
    }

    search() {
        this.store.dispatch(new SearchActions.Search({'query': {q: this.value}}));
    }
}
