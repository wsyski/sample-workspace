import {Component} from '@angular/core';
import {ToggleListComponent} from './toggle-list.component';

@Component({
    selector: 'app-location-selector',
    template: `
      <fieldset class="form-group">
        <legend i18n="@@lgdLocationSelector">Locations</legend>
        <div class="input-group arena-event-locations">
          <div *ngFor="let value of getSortedValues(values)|slice:0:end">
            <app-checkbox-toggle-component [value]="value" [selectedValues]="selectedValues" (selectedValuesChanged)="onSelectedValuesChanged($event)">
              {{value}}
            </app-checkbox-toggle-component>
          </div>
        </div>
        <ng-container *ngIf="isShowMore()">
          <div class="arena-facet-show-all">
            <a class="arena-show-all" href="javascript:" (click)="showMore()" title="Show all" i18n="@@lnkShowAllLocations.label" i18n-title="@@lnkShowAllLocations.title">
              Show all
            </a>
          </div>
        </ng-container>
      </fieldset>
    `
})
export class LocationSelectorComponent extends ToggleListComponent {
}
