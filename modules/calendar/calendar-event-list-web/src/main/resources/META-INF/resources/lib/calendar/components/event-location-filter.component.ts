import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';

@Component({
    selector: 'app-event-location-filter',
    template: `
      <ng-container>
        <div aria-live="assertive" >
          <app-location-dropdown-selector [values]="locationsDropdown$ | async"></app-location-dropdown-selector>
        </div>
      </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventLocationFilterComponent implements OnInit {
    locationsDropdown$: Observable<string[]>;

    constructor(private store$: Store<fromRoot.State>) {
    }

    ngOnInit(): void {
        this.locationsDropdown$ = this.store$.select(fromRoot.selectLocations);
    }
}
