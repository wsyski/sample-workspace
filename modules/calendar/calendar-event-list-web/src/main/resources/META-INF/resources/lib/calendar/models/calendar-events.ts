import {CalendarEvent} from './calendar-event';
import {CalendarEventsDto} from './dto/calendar-events-dto';
import {CalendarEventAnalyticsDto} from './dto/calendar-event-analytics-dto';

export class CalendarEvents {
  nrOfItems: number;
  totalItems: number;
  items: CalendarEvent[];

  constructor(calendarEventsDTO: CalendarEventsDto) {
    this.items = calendarEventsDTO.hits.map((calendarEventAnalyticsDto: CalendarEventAnalyticsDto) => new CalendarEvent(calendarEventAnalyticsDto.event));
    this.totalItems = calendarEventsDTO.totalHits;
    this.nrOfItems = this.items.length;
  }
}

