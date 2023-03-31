import {Injectable} from '@angular/core';
import {AppConfigHook} from './app-config-hook';
import {AppConfigService} from '../services/app-config.service';
import {CalendarEventListConfig} from '../calendar-event-list-config';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store/store';
import {Init, InitEmpty} from '../store/actions/event-search.actions';
import {CalendarEventListAppConfig} from '../calendar-event-list-app-config';

@Injectable()
export class AppConfigHookProvider implements AppConfigHook {

    constructor(private store$: Store<fromRoot.State>, private calendarEventListConfig: CalendarEventListConfig) {
    }

    init(appConfigService: AppConfigService) {
        const calendarEventListAppConfig = new CalendarEventListAppConfig(appConfigService);
        if (calendarEventListAppConfig.isValid()) {
            const pageSize = this.calendarEventListConfig.getPageSize();
            this.store$.dispatch(new Init({
                pageToken: {
                    start: 0,
                    pageSize: pageSize
                }
            }));
        } else {
            this.store$.dispatch(new InitEmpty());
        }
    }
}
