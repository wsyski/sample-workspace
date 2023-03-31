import {NgModule} from '@angular/core';
import {EventSummaryComponent} from './components/event-summary.component';
import {EventSearchComponent} from './components/event-search.component';
import {EventSearchQueryComponent} from './components/event-search-query.component';
import {EventSearchResultComponent} from './components/event-search-result.component';
import {EventSearchMoreComponent} from './components/event-search-more.component';
import {EventAllLinkComponent} from './components/event-all-link.component';
import {EventSearchFilterComponent} from './components/event-search-filter.component';
import {TimeIntervalSelectorComponent} from './components/time-interval-selector.component';
import {CommonModule} from '@angular/common';
import {CheckboxToggleComponent} from './components/checkbox-toggle.component';
import {RadioToggleComponent} from './components/radio-toggle.component';
import {FormsModule} from '@angular/forms';
import {LocationSelectorComponent} from './components/location-selector.component';
import {TargetAudienceSelectorComponent} from './components/target-audience-selector.component';
import {TagSelectorComponent} from './components/tag-selector.component';
import {CalendarEventListCommonModule} from './calendar-event-list-common.module';
import {RouterModule} from '@angular/router';
import {EventLocationFilterComponent} from './components/event-location-filter.component';
import {LocationDropdownSelectorComponent} from './components/location-dropdown-selector.component';
import { Cookie } from 'angular2-cookies';
import {EventAllLinkWithoutFilterComponent} from './components/event-all-link-without-filter.component';

@NgModule({
    declarations: [
        CheckboxToggleComponent,
        RadioToggleComponent,
        LocationSelectorComponent,
        LocationDropdownSelectorComponent,
        TargetAudienceSelectorComponent,
        TagSelectorComponent,
        EventSearchComponent,
        TimeIntervalSelectorComponent,
        EventSearchQueryComponent,
        EventSearchFilterComponent,
        EventLocationFilterComponent,
        EventAllLinkComponent,
        EventAllLinkWithoutFilterComponent,
        EventSummaryComponent,
        EventSearchMoreComponent,
        EventSearchResultComponent
    ],
    imports: [
        CalendarEventListCommonModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [Cookie],
    bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
})

export class CalendarEventListSearchModule {
}

