import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Cookie } from 'angular2-cookies';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import * as SearchActions from '../store/actions/event-search.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';

@Component({
  selector: 'app-location-dropdown-selector',
  template: `
    <div class="row location-dropdown">  
      <label class="col-sm-2 col-form-label" for="location-selector" i18n="@@lnkShowEventsFor.label">Show events for: </label>
      <select class="col-sm-2 form-control-static" [ngModel]="selectedLocation" id="location-selector" (ngModelChange)="onChangeObj($event)">
         <option value="null" i18n="@@lnkAllLocation.label" >All locations</option>
         <option [ngValue]="value" *ngFor="let value of values|slice:0:end" >{{value}}</option>
      </select>
    </div>
  `
})

export class LocationDropdownSelectorComponent implements OnInit {
  @Input()
  values: string[];
  @Input()
  selectedValuesChanged: EventEmitter<string[]> = new EventEmitter();
  end: number;
  selectedLocation: any = Cookie.load('SELECTED_LOCATION_VALUE');
  cookieSavedDays: number ;

  constructor( private calendarEventListConfig: CalendarEventListConfig, private store$: Store<fromRoot.State> ) {
    this.cookieSavedDays = this.calendarEventListConfig.getCookieSavedDays();
  }

  ngOnInit(): void {
    if (this.selectedLocation) {this.store$.dispatch(new SearchActions.Search({query: {'locations': this.selectedLocation}})); }
  }

  onChangeObj(e: string) {
    const isAllLocation = !this.values.find(element => element === e);
    if (isAllLocation) {
      this.store$.dispatch(new SearchActions.Search({query: {'locations': []}}));
      Cookie.remove('SELECTED_LOCATION_VALUE', '/');
    } else {
      this.store$.dispatch(new SearchActions.Search({query: {'locations': [e]}}));
      Cookie.save( 'SELECTED_LOCATION_VALUE', e, this.cookieSavedDays, '/');
    }
  }
}
