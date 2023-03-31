import {CalendarEventAnalyticsDto} from './calendar-event-analytics-dto';

export interface CalendarEventsDto {
  totalHits: number;
  start: number;
  hits: CalendarEventAnalyticsDto[];
}
