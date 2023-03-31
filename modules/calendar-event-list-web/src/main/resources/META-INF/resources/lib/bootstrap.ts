import LiferayParams from './core/models/liferay-params';
import {getI18nProviders} from './core/providers/i18n.provider';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {getLiferayParamsProvider} from './core/providers/liferay-params.provider';
import {CalendarEventListModule} from './calendar/calendar-event-list.module';
import {NgModuleRef} from '@angular/core';
import {DynamicLoader} from './core/utils/dynamic-loader';
import {CalendarEventListComponent} from './calendar/components/calendar-event-list.component';

// @dynamic
export default (liferayParams: LiferayParams) => {

    getI18nProviders(liferayParams).then(providers => {
        platformBrowserDynamic([getLiferayParamsProvider(liferayParams)])
            .bootstrapModule(CalendarEventListModule, {'providers': providers})
            .then((ngModuleRef: NgModuleRef<any>) => {
                const dynamicLoader = new DynamicLoader(ngModuleRef);
                dynamicLoader.loadComponent(CalendarEventListComponent, liferayParams);
            });
    });
};
