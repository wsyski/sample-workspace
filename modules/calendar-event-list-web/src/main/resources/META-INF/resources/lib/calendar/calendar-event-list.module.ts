import {CalendarEventListRoutingModule} from './calendar-event-list-routing.module';
import {AppInitializerModule} from './app-initializer.module';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {REDUCERS, RouterStateUrlSerializer} from './store/store';
import {EventDetailEffects} from './store/effects/event-detail.effects';
import {EventSearchEffects} from './store/effects/event-search.effects';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {RouterEffects} from './store/effects/router.effects';
import {APP_CONFIG_HOOK_TOKEN} from './services/app-config.service';
import {AppConfigHookProvider} from './providers/app-config-hook.provider';
import {CalendarService} from './services/calendar.service';
import {CalendarServiceImpl} from './services/calendar-impl.service';
import {CalendarEventListConfig} from './calendar-event-list-config';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        AppInitializerModule.forRoot(),
        CalendarEventListRoutingModule,
        StoreModule.forRoot(REDUCERS),
        EffectsModule.forRoot([EventDetailEffects, EventSearchEffects, RouterEffects]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        })
    ],
    exports: [RouterModule],
    providers: [
        CalendarEventListConfig,
        {provide: CalendarService, useClass: CalendarServiceImpl},
        {provide: RouterStateSerializer, useClass: RouterStateUrlSerializer},
        {provide: APP_CONFIG_HOOK_TOKEN, useClass: AppConfigHookProvider}
    ],
    bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
})

export class CalendarEventListModule {
    ngDoBootstrap() {
    }
}

