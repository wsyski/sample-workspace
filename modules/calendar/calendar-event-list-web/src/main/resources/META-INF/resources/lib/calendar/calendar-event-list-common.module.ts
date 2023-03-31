import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventImageComponent} from './components/event-icon';
import {LinkToggleComponent} from './components/link-toggle.component';
import {EventDateIntervalComponent} from './components/event-date-interval.component';
import {EventDateIntervalDetailComponent} from './components/event-date-interval-detail.component';

@NgModule({
    imports: [CommonModule],
    providers: [],
    declarations: [
        EventImageComponent,
        EventDateIntervalComponent,
        EventDateIntervalDetailComponent,
        LinkToggleComponent],
    exports: [
        EventImageComponent,
        EventDateIntervalComponent,
        EventDateIntervalDetailComponent,
        LinkToggleComponent]
})
export class CalendarEventListCommonModule {
}


