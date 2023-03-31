"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18n_provider_1 = require("./core/providers/i18n.provider");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var liferay_params_provider_1 = require("./core/providers/liferay-params.provider");
var calendar_event_list_module_1 = require("./calendar/calendar-event-list.module");
var dynamic_loader_1 = require("./core/utils/dynamic-loader");
var calendar_event_list_component_1 = require("./calendar/components/calendar-event-list.component");
// @dynamic
exports.default = (function (liferayParams) {
    i18n_provider_1.getI18nProviders(liferayParams).then(function (providers) {
        platform_browser_dynamic_1.platformBrowserDynamic([liferay_params_provider_1.getLiferayParamsProvider(liferayParams)])
            .bootstrapModule(calendar_event_list_module_1.CalendarEventListModule, { 'providers': providers })
            .then(function (ngModuleRef) {
            var dynamicLoader = new dynamic_loader_1.DynamicLoader(ngModuleRef);
            dynamicLoader.loadComponent(calendar_event_list_component_1.CalendarEventListComponent, liferayParams);
        });
    });
});
//# sourceMappingURL=bootstrap.js.map