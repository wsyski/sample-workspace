import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppConfigService} from './services/app-config.service';
import {HttpModule} from '@angular/http';
import {CalendarEventListAppConfig} from './calendar-event-list-app-config';

export function appConfigFactory(appConfigService: AppConfigService) {
    return () => appConfigService.load();
}

// @dynamic
@NgModule({
    imports: [CommonModule, HttpModule],
    providers: [],
    declarations: [],
    exports: []
})
export class AppInitializerModule {

    constructor(@Optional() @SkipSelf() parentModule: AppInitializerModule) {
        if (parentModule) {
            throw new Error(
                'AppInitializerModule is already loaded. Import it in the application module only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppInitializerModule,
            providers: [
                AppConfigService,
                CalendarEventListAppConfig,
                {
                    provide: APP_INITIALIZER,
                    useFactory: appConfigFactory,
                    deps: [AppConfigService],
                    multi: true
                }
            ]
        };
    }
}



