const NOW = new Date();

export const DEFAULT_TIME_INTERVAL: TimeInterval = {
    start: NOW
};

const TODAY_END_DATE = new Date(new Date().setHours(24, 0, 0, 0));
const ONE_WEEK_END_DATE = new Date(new Date(NOW.getTime() + 7 * 24 * 3600000).setHours(24, 0, 0, 0));
const ONE_MONTH_END_DATE = new Date(new Date(NOW.getTime() + 30 * 24 * 3600000).setHours(24, 0, 0, 0));
const ONE_YEAR_END_DATE = new Date(new Date(NOW.getTime() + 365 * 24 * 3600000).setHours(24, 0, 0, 0));

export enum TimeIntervalName {
    ALL = 'ALL',
    TODAY = 'TODAY',
    ONE_WEEK = 'ONE_WEEK',
    ONE_MONTH = 'ONE_MONTH',
    ONE_YEAR = 'ONE_YEAR'
}

export interface TimeInterval {
    start: Date;
    end?: Date;
}

export function getTimeInterval(timeIntervalName: TimeIntervalName): TimeInterval {
    switch (timeIntervalName) {
        case TimeIntervalName.TODAY:
            return {start: NOW, end: TODAY_END_DATE};
        case TimeIntervalName.ONE_WEEK:
            return {start: NOW, end: ONE_WEEK_END_DATE};
        case TimeIntervalName.ONE_MONTH:
            return {start: NOW, end: ONE_MONTH_END_DATE};
        case TimeIntervalName.ONE_YEAR:
            return {start: NOW, end: ONE_YEAR_END_DATE};
        default:
            return {start: NOW};
    }
}

export function getTimeIntervalName(timeInterval: TimeInterval): TimeIntervalName {
    switch (timeInterval.end) {
        case TODAY_END_DATE:
            return TimeIntervalName.TODAY;
        case ONE_WEEK_END_DATE:
            return TimeIntervalName.ONE_WEEK;
        case ONE_MONTH_END_DATE:
            return TimeIntervalName.ONE_MONTH;
        case ONE_YEAR_END_DATE:
            return TimeIntervalName.ONE_YEAR;
        default:
            return TimeIntervalName.ALL;
    }
}
