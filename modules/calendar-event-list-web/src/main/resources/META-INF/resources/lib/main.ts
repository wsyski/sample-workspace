import LiferayParams from './core/models/liferay-params';
import {getI18nProviders} from './core/providers/i18n.provider';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {getLiferayParamsProvider} from './core/providers/liferay-params.provider';
import {CalendarEventListModule} from './calendar/calendar-event-list.module';
import {NgModuleRef} from '@angular/core';
import {DynamicLoader} from './core/utils/dynamic-loader';
import {CalendarEventListComponent} from './calendar/components/calendar-event-list.component';

const LIFERAY_PARAMS: LiferayParams = {
    contextPath: '/o/calendar-event-list',
    portletElementId: 'arena__com_axiell_arena_liferay_modules_calendar_event_list_web_portlet_CalendarEventListPortlet_INSTANCE_0j5ngrXAxdxj_',
    portletNamespace: '_com_axiell_arena_liferay_modules_calendar_event_list_web_portlet_CalendarEventListPortlet_INSTANCE_0j5ngrXAxdxj_',
    configuration: {
        portletInstance: {},
        system: {}
    }
};

getI18nProviders(LIFERAY_PARAMS).then(providers => {
    platformBrowserDynamic([getLiferayParamsProvider(LIFERAY_PARAMS)])
        .bootstrapModule(CalendarEventListModule, {'providers': providers})
        .then((ngModuleRef: NgModuleRef<any>) => {
            const dynamicLoader = new DynamicLoader(ngModuleRef);
            dynamicLoader.loadComponent(CalendarEventListComponent, LIFERAY_PARAMS);
        });
});
