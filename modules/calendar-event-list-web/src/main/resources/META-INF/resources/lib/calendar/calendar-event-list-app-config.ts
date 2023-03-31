import {AppConfig} from '../core/models/app-config';
import {Injectable} from '@angular/core';
import {AppConfigService} from './services/app-config.service';
import {CalendarEventListAppConfigDto} from './models/dto/calendar-event-list-app-config-dto';
import {MiscUtil} from '../core/utils/misc-util';

@Injectable()
export class CalendarEventListAppConfig implements AppConfig {

    constructor(private appConfigService: AppConfigService) { }

    getCalendarApiEndpoint(): string {
        return this.getCalendarEventListAppConfigDto().calendarApiEndpoint;
    }

    getCalendarCustomerId(): string {
        return this.getCalendarEventListAppConfigDto().calendarCustomerId;
    }

    isValid(): boolean {
        const customerId = this.getCalendarCustomerId();
        return !MiscUtil.isBlank(customerId);
    }

    getCalendarEventListAppConfigDto(): CalendarEventListAppConfigDto {
        return this.appConfigService.calendarEventListAppConfigDto;
    }
}
