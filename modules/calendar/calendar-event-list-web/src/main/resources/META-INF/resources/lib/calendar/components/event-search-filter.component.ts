import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {Query} from '../models/query';
import {getTimeInterval, getTimeIntervalName, TimeIntervalName} from '../models/time-interval';
import {map} from 'rxjs/operators';
import * as SearchActions from '../store/actions/event-search.actions';
import {CalendarEventListConfig} from '../calendar-event-list-config';

@Component({
    selector: 'app-event-search-filter',
    template: `
      <ng-container>
        <div>
          <app-time-interval-selector [selectedValues]="[selectedTimeIntervalName$ | async]"
                                      [values]="timeIntervalNames"
                                      [pageSize]="timeIntervalPageSize"
                                      (selectedValuesChanged)="onTimeIntervalSelectedValuesChanged($event)">
          </app-time-interval-selector>
        </div>
        <div *ngIf="showLocations$ | async" aria-live="assertive">
          <app-location-selector [selectedValues]="selectedLocations$ | async"
                                 [values]="locations$ | async"
                                 [pageSize]="locationPageSize"
                                 (selectedValuesChanged)="onLocationSelectedValuesChanged($event)">
          </app-location-selector>
        </div>
        <div *ngIf="showTargetAudiences$ | async" aria-live="assertive">
          <app-target-audience-selector [selectedValues]="selectedTargetAudiences$ | async"
                                        [values]="targetAudiences$ | async"
                                        [pageSize]="targetAudiencePageSize"
                                        (selectedValuesChanged)="onTargetAudienceSelectedValuesChanged($event)">
          </app-target-audience-selector>
        </div>
        <div *ngIf="showTags$ | async" aria-live="assertive">
          <app-tag-selector [selectedValues]="selectedTags$ | async"
                            [values]="tags$ | async"
                            [pageSize]="tagPageSize"
                            (selectedValuesChanged)="onTagSelectedValuesChanged($event)">
          </app-tag-selector>
        </div>
      </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSearchFilterComponent implements OnInit {
    showLocations$: Observable<boolean>;
    showTags$: Observable<boolean>;
    showTargetAudiences$: Observable<boolean>;
    timeIntervalPageSize: number;
    locationPageSize: number;
    tagPageSize: number;
    targetAudiencePageSize: number;
    selectedLocations$: Observable<string[]>;
    selectedTags$: Observable<string[]>;
    selectedTargetAudiences$: Observable<string[]>;
    selectedTimeIntervalName$: Observable<TimeIntervalName>;
    tags$: Observable<string[]>;
    locations$: Observable<string[]>;
    targetAudiences$: Observable<string[]>;
    timeIntervalNames: string[];
    query$: Observable<Query>;
    onTagSelectedValuesChanged = ((selectedValues: string[]) => {
        this.store$.dispatch(new SearchActions.Search({query: {'tags': selectedValues}}));
    });

    onLocationSelectedValuesChanged = ((selectedValues: string[]) => {
        this.store$.dispatch(new SearchActions.Search({query: {'locations': selectedValues}}));
    });

    onTargetAudienceSelectedValuesChanged = ((selectedValues: string[]) => {
        this.store$.dispatch(new SearchActions.Search({query: {'targetAudiences': selectedValues}}));
    });

    onTimeIntervalSelectedValuesChanged = ((selectedValues: string[]) => {
        const timeIntervalName: TimeIntervalName = TimeIntervalName[selectedValues[0]];
        this.store$.dispatch(new SearchActions.Search({timeInterval: getTimeInterval(timeIntervalName)}));
    });

    constructor(private store$: Store<fromRoot.State>, private calendarEventListConfig: CalendarEventListConfig) {
        this.timeIntervalPageSize = calendarEventListConfig.getTimeIntervalPageSize();
        this.locationPageSize = calendarEventListConfig.getLocationPageSize();
        this.tagPageSize = calendarEventListConfig.getTagPageSize();
        this.targetAudiencePageSize = calendarEventListConfig.getTargetAudiencePageSize();
    }

    ngOnInit(): void {
        this.query$ = this.store$.select(fromRoot.selectQuery);
        this.locations$ = this.store$.select(fromRoot.selectLocations);
        this.tags$ = this.store$.select(fromRoot.selectTags);
        this.targetAudiences$ = this.store$.select(fromRoot.selectTargetAudiences);
        this.query$ = this.store$.select(fromRoot.selectQuery);
        const configurationFilter = this.calendarEventListConfig.getConfigurationFilter();
        this.showLocations$ = this.locations$.pipe(map(locations => locations.length > 0 && (!configurationFilter.locations || configurationFilter.locations.length !== 1)));
        this.showTags$ = this.tags$.pipe(map(tags => tags.length > 0 && (!configurationFilter.tags || configurationFilter.tags.length !== 1)));
        this.showTargetAudiences$ = this.targetAudiences$.pipe(map(targetAudiences => targetAudiences.length > 0
            && (!configurationFilter.targetAudiences || configurationFilter.targetAudiences.length !== 1)));
        this.selectedTimeIntervalName$ = this.store$.select(fromRoot.selectTimeInterval).pipe(map(
            timeInterval => getTimeIntervalName(timeInterval))
        );
        this.selectedLocations$ = this.query$.pipe(map(query => {
                return query.locations;
            }
        ));
        this.selectedTags$ = this.query$.pipe(map(query => {
                return query.tags;
            }
        ));
        this.selectedTargetAudiences$ = this.query$.pipe(map(query => {
                return query.targetAudiences;
            }
        ));
        this.timeIntervalNames = Object.keys(TimeIntervalName);
    }
}
