import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {CalendarEventListAppConfigDto} from '../models/dto/calendar-event-list-app-config-dto';
import {AppConfigHook} from '../providers/app-config-hook';

declare var Liferay: any;

export const APP_CONFIG_HOOK_TOKEN = new InjectionToken<AppConfigHook>('appConfigHook');

@Injectable()
export class AppConfigService {
    calendarEventListAppConfigDto: CalendarEventListAppConfigDto;

    constructor(
        @Optional() @Inject(APP_CONFIG_HOOK_TOKEN) private appConfigHook: AppConfigHook) {
    }

    load() {
        const fetchConfig = ({method: 'GET'});
        const url = `${Liferay.ThemeDisplay.getPortalURL()}/o/common-services/v1.0/groups/${Liferay.ThemeDisplay.getScopeGroupId()}/config`;
        return new Promise<CalendarEventListAppConfigDto>((resolve: any) => {
            return fetch(url, fetchConfig).then<CalendarEventListAppConfigDto>(response => response.json())
                .then((calendarEventListAppConfiguDto: CalendarEventListAppConfigDto) => {
                    this.calendarEventListAppConfigDto = calendarEventListAppConfiguDto;
                    if (this.appConfigHook) {
                        this.appConfigHook.init(this);
                    }
                    resolve(true);
                });
        });
    }
}
