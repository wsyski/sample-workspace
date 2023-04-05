import {PortalUtil} from '../../core/utils/portal-util';
import {FormattedDateInterval} from '../models/formatted-date-interval';

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'short', weekday: 'short', day: 'numeric'
};

const DATE_FULL_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'long', weekday: 'long', day: 'numeric'
};

const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
};

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: '2-digit', minute: '2-digit'
};
export default class DateUtil {

    private static isSameDay(startDate: Date, endDate: Date): boolean {
        if (startDate && endDate) {
            const startYear: number = startDate.getFullYear();
            const endYear: number = endDate.getFullYear();
            const startMonth: number = endDate.getMonth();
            const endMonth: number = endDate.getMonth();
            const startDay: number = startDate.getDate();
            const endDay: number = endDate.getDate();
            return startYear === endYear && startMonth === endMonth && startDay === endDay;
        } else {
            return false;
        }
    }

    static object2Date(dateAsObject: any) {
        if (dateAsObject) {
            return dateAsObject.value ? new Date(dateAsObject.value) : new Date(dateAsObject);
        } else {
            return undefined;
        }
    }

    static formattedDateInterval(startDateTimeAsObject: any, endDateTimeAsObject: any): FormattedDateInterval {
        const startDate = DateUtil.object2Date(startDateTimeAsObject);
        const endDate = DateUtil.object2Date(endDateTimeAsObject);
        if (!startDate || !endDate) {
            throw new Error('Both startDate and endDate must be set');
        }
        let localeId = PortalUtil.getLocaleId();
        if (localeId === 'nn-NO') {
            localeId = 'nb-NO';
        }
        const CapitaliseFirstLetter =  (str: any) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const object = {
            start: startDate.toLocaleTimeString(localeId, TIME_FORMAT_OPTIONS),
            startDate: CapitaliseFirstLetter(startDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS)),
            end: endDate.toLocaleTimeString(localeId, TIME_FORMAT_OPTIONS),
            endDate: endDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS),
            startDateFull: CapitaliseFirstLetter(startDate.toLocaleDateString(localeId, DATE_FULL_FORMAT_OPTIONS)),
            endDateFull: endDate.toLocaleDateString(localeId, DATE_FULL_FORMAT_OPTIONS)
        };
        if (this.isSameDay(startDate, endDate)) {
            object['date'] = startDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS);
            return object;
        } else {
            return object;
        }
    }
}
