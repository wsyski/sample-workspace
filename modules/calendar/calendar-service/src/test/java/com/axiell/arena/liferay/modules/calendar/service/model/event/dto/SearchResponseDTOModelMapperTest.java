package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.SearchResponse;
import com.axiell.arena.liferay.modules.calendar.service.constants.TestData;
import com.axiell.arena.liferay.modules.calendar.service.model.event.EventAnalytics;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;

import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

public class SearchResponseDTOModelMapperTest {

    private static final ZoneId ZONE_ID = ZoneId.of("UTC");
    private SearchResponseDTOModelMapper underTest;

    @Before
    public void setUp() {
        EventDTOModelMapper eventDTOModelMapper = new EventDTOModelMapper(ZONE_ID);
        underTest = new SearchResponseDTOModelMapper(eventDTOModelMapper);
    }

    @Test
    public void toModel() {
        EventDTO eventDto = new EventDTO();
        eventDto.setId(TestData.EVENT_ID);
        eventDto.setCustomerId(TestData.CUSTOMER_ID);
        EventAnalytics eventAnalytics = new EventAnalytics();
        eventAnalytics.setEvent(eventDto);
        SearchResponseDTO searchResponseDto = new SearchResponseDTO();
        searchResponseDto.setFrom(0);
        searchResponseDto.setHits(Collections.singletonList(eventAnalytics));
        searchResponseDto.setName("Name");
        searchResponseDto.setSize(1);
        searchResponseDto.setTotalHits(1);
        SearchResponse searchResponse = underTest.toModel(searchResponseDto);
        assertThat(searchResponse.getStart(), is(0));
        assertThat(searchResponse.getEnd(), is(1));
        assertThat(searchResponse.getTotal(), is(1));
        List<Event> events = searchResponse.getEvents();
        assertThat(events, Matchers.notNullValue());
        assertThat(events.size(), is(1));
        Event event = events.get(0);
        assertThat(event, is(notNullValue()));
        assertThat(event.getEventId(), is(TestData.EVENT_ID));
        assertThat(event.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
    }

    @Test
    public void toDto() {
        Event eventDto = new Event();
        eventDto.setCustomerId(TestData.CUSTOMER_ID);
        eventDto.setEventId(TestData.EVENT_ID);
        SearchResponse searchResponse = new SearchResponse(Collections.singletonList(eventDto), 1, 0, 1);
        SearchResponseDTO searchResponseDto = underTest.toDto(searchResponse);
        assertThat(searchResponseDto.getFrom(), is(0));
        assertThat(searchResponseDto.getSize(), is(1));
        assertThat(searchResponseDto.getTotalHits(), is(1));
        List<EventAnalytics> events = searchResponseDto.getHits();
        assertThat(events, Matchers.notNullValue());
        assertThat(events.size(), is(1));
        EventAnalytics eventAnalytics = events.get(0);
        assertThat(eventAnalytics, is(notNullValue()));
        assertThat(eventAnalytics.getEvent().getId(), is(TestData.EVENT_ID));
        assertThat(eventAnalytics.getEvent().getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));


    }
}
