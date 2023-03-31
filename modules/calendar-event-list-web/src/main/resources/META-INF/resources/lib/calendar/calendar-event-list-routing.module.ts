import {RouterModule, Routes} from '@angular/router';
import {AlwaysDenyGuard} from '../core/guards/always-deny.guard';
import {NotFoundComponent} from '../core/components/not-found.component';
import {APP_CONFIG_TOKEN, AppConfigGuard} from '../core/guards/app-config.guard';
import {CalendarEventListComponent} from './components/calendar-event-list.component';
import {NgModule} from '@angular/core';
import {CalendarEventListAppConfig} from './calendar-event-list-app-config';
import {EventSearchComponent} from './components/event-search.component';
import {EventDetailComponent} from './components/event-detail.component';
import {CalendarEventListSearchModule} from './calendar-event-list-search.module';
import {CalendarEventListDetailModule} from './calendar-event-list-detail.module';

const ROUTES: Routes = [
    {
        path: '', component: CalendarEventListComponent, canActivate: [AppConfigGuard],
        children: [
            {path: '', component: EventSearchComponent, pathMatch: 'full'},
            {path: 'events/:id', component: EventDetailComponent}
        ]
    },
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

@NgModule({
    declarations: [
        CalendarEventListComponent,
        NotFoundComponent
    ],
    imports: [
        CalendarEventListSearchModule,
        CalendarEventListDetailModule,
        RouterModule.forRoot(ROUTES, {useHash: true, enableTracing: false})
    ],
    exports: [RouterModule],
    providers: [
        AppConfigGuard,
        AlwaysDenyGuard,
        {provide: APP_CONFIG_TOKEN, useExisting: CalendarEventListAppConfig}
    ],
    entryComponents: [CalendarEventListComponent]
})
export class CalendarEventListRoutingModule {
}


