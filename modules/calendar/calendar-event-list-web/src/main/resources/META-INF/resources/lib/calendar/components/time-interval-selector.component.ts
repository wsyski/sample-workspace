import {Component} from '@angular/core';
import {ToggleListComponent} from './toggle-list.component';

@Component({
    selector: 'app-time-interval-selector',
    template: `
      <fieldset class="form-group">
        <legend i18n="@@lgdTimeIntervalSelector">Time interval</legend>
        <div class="input-group arena-event-time-intervals">
          <div *ngFor="let value of values|slice:0:end">
            <app-radio-toggle-component [value]="value" [selectedValues]="selectedValues" (selectedValuesChanged)="onSelectedValuesChanged($event)">
              <ng-container i18n="@@txtTimeIntervalName">
              {value, select,
                ALL {All events}
                TODAY {Today}
                ONE_WEEK {One week ahead}
                ONE_MONTH {One month ahead}
                ONE_YEAR {One year ahead}
                }
              </ng-container>
            </app-radio-toggle-component>
          </div>
        </div>
        <ng-container *ngIf="isShowMore()">
          <div class="arena-facet-show-all">
            <a class="arena-show-all" href="javascript:" (click)="showMore()" title="Show all" i18n="@@lnkShowAllTimeIntervals.label" i18n-title="@@lnkShowAllTimeIntervals.title">
              Show all
            </a>
          </div>
        </ng-container>
      </fieldset>
    `
})
export class TimeIntervalSelectorComponent extends ToggleListComponent {
}
