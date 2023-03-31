import {Facets} from './facets';
import {CalendarEvents} from './calendar-events';
import {CalendarEventsDto} from './dto/calendar-events-dto';
import {FacetsDto} from './dto/facets-dto';

const CALENDAR_EVENTS_SEARCH_RESULT_DTO: CalendarEventsDto = require('../../../../../../../../dev/resources/calendar-events-search-result-dto.json');
const CALENDAR_EVENTS_FACETS_DTO: FacetsDto = require('../../../../../../../../dev/resources/calendar-events-facets-dto.json');
const CALENDAR_EVENTS: CalendarEvents = new CalendarEvents(CALENDAR_EVENTS_SEARCH_RESULT_DTO);
const CALENDAR_FACETS: Facets = new Facets(CALENDAR_EVENTS_FACETS_DTO);
const SELECTED_CALENDAR_EVENT_ID = 'd84e5468-9fa5-4e48-aa2e-bbf345f7c8c4';

export class MockCalendarEventsSearchResult {
    static getCalendarEvents(): CalendarEvents {
        return CALENDAR_EVENTS;
    }

    static getCalendarFacets(): Facets {
        return CALENDAR_FACETS;
    }

    static getHitCount(): number {
        return CALENDAR_EVENTS.totalItems;
    }

    static getSelectedCalendarEventId(): string {
        return SELECTED_CALENDAR_EVENT_ID;
    }
}
