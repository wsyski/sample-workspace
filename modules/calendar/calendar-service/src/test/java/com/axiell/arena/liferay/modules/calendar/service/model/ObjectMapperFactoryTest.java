package com.axiell.arena.liferay.modules.calendar.service.model;

import com.axiell.arena.liferay.modules.calendar.exception.Apierror;
import com.axiell.arena.liferay.modules.calendar.exception.CalendarServiceException;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.EventDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.SearchResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.time.Instant;
import java.util.Properties;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;

public class ObjectMapperFactoryTest {
    private ObjectMapper underTest;

    @Before
    public void setUp() {
        underTest = ObjectMapperFactory.create();
    }

    @Test
    public void serializeInstant() throws JsonProcessingException {
        TestInstant testInstant = new TestInstant();
        testInstant.setPublicationDate(Instant.parse("2000-01-01T00:00:00.000Z"));
        String json = underTest.writeValueAsString(testInstant);
        assertThat(json, is("{\"publicationDate\":\"2000-01-01T00:00:00.000Z\"}"));
        testInstant.setPublicationDate(Instant.parse("2020-05-04T00:00:00Z"));
    }

    @Test
    public void eventServiceObjectMapper_SearchResponse() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream("/test-data.properties"));
        SearchResponseDTO result = underTest.readValue(getProperty(properties, "jsonSearchResult"), SearchResponseDTO.class);
        assertThat(result, is(notNullValue()));
        assertThat(result.getFrom(), is(0));
        assertThat(result.getName(), is("full_text_search"));
        assertThat(result.getSize(), is(20));
        assertThat(result.getTotalHits(), is(168));
        assertThat(result.getHits(), is(iterableWithSize(20)));
        assertThat(result.getHits().get(0), is(notNullValue()));
        assertThat(result.getHits().get(0).getDeviceType(), is(nullValue()));
        assertThat(result.getHits().get(0).getEventSource(), is("nightlyno"));
        assertThat(result.getHits().get(0).getEventType(), is("EVENT_UPDATED"));
        assertThat(result.getHits().get(0).getEvent(), is(notNullValue()));
        assertThat(result.getHits().get(0).getEvent().getStatus(), is("PUBLISHED"));
        assertThat(result.getHits().get(0).getEvent().getId(), is("9247507a-5dbc-493c-9912-66e2d70a9450"));
        assertThat(result.getHits().get(0).getEvent().getImages(), is(Matchers.iterableWithSize(1)));
        assertThat(result.getHits().get(0).getEvent().getImages().get(0).getImageUrl(),
                is("/documents/20142/0/breakfast-1663295.jpg/0826ea0a-e471-b18c-6596-7ae3d8c32d3b?t=1553903510397"));
    }

    @Test
    public void eventServiceObjectMapper_Event1() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream("/test-data.properties"));
        EventDTO result = underTest.readValue(getProperty(properties, "jsonEvent1"), EventDTO.class);
        assertThat(result, is(notNullValue()));
        assertThat(result.getStatus(), is("DRAFT"));
        assertThat(result.getId(), is("9247507a-5dbc-493c-9912-66e2d70a9450"));
        assertThat(result.getRecurring().getFrequency(), is("WEEKLY"));
        assertThat(result.getRecurring().getInterval(), is(1));
        assertThat(result.getRecurring().getByDay(), is(new String[]{"WE", "FR"}));
        assertThat(result.getImages(), is(iterableWithSize(1)));
        assertThat(result.getImages().get(0).getImageUrl(), is("/documents/20142/0/breakfast-1663295.jpg/0826ea0a-e471-b18c-6596-7ae3d8c32d3b?t=1553903510397"));
    }

    @Test
    public void eventServiceObjectMapper_Event2() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream("/test-data.properties"));
        EventDTO result = underTest.readValue(getProperty(properties, "jsonEvent2"), EventDTO.class);
        assertThat(result, is(notNullValue()));
        assertThat(result.getStatus(), is("DRAFT"));
        assertThat(result.getId(), is("9247507a-5dbc-493c-9912-66e2d70a9450"));
        assertThat(result.getRecurring().getFrequency(), is("MONTHLY"));
        assertThat(result.getRecurring().getInterval(), is(1));
        assertThat(result.getRecurring().getByDay(), is(new String[]{"2TU"}));
        assertThat(result.getImages(), is(iterableWithSize(1)));
        assertThat(result.getImages().get(0).getImageUrl(), is("/documents/20142/0/breakfast-1663295.jpg/0826ea0a-e471-b18c-6596-7ae3d8c32d3b?t=1553903510397"));
    }

    @Test
    public void eventServiceObjectMapper_ApiError0() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream("/test-data.properties"));
        CalendarServiceException result = underTest.readValue(getProperty(properties,
                "jsonApiError0"), CalendarServiceException.class);
        assertThat(result, is(notNullValue()));
        assertThat(result.getMessage(), is("Both numberOfRepeats and repeatUntil can not be in the same request."));
        Apierror apiError = result.getApierror();
        assertThat(apiError, notNullValue());
        assertThat(apiError.getErrorCode(), is("BAD_REQUEST_CONFLICTING_RECURRENCE_VALUES"));
        assertThat(apiError.getStatus(), is("BAD_REQUEST"));
        assertThat(apiError.getDebugMessage(), is(nullValue()));
    }

    @Test
    public void eventServiceObjectMapper_ApiError1() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream("/test-data.properties"));
        CalendarServiceException result = underTest.readValue(getProperty(properties,
                "jsonApiError1"), CalendarServiceException.class);
        assertThat(result, is(notNullValue()));
        assertThat(result.getMessage(), is("Validation error"));
        Apierror apiError = result.getApierror();
        assertThat(apiError, notNullValue());
        assertThat(apiError.getErrorCode(), is("BAD_REQUEST_VALIDATON_ERROR"));
        assertThat(apiError.getStatus(), is("BAD_REQUEST"));
        assertThat(apiError.getDebugMessage(), is(nullValue()));
        assertThat(apiError.getSubErrors().size(), is(1));
        assertThat(apiError.getSubErrors().get(0).getMessage(), is("BAD_REQUEST_INVALID_MODIFIEDBY"));
    }

    private String getProperty(Properties properties, String property) {
        return properties.getProperty(property).replace("\n", "");
    }


    private class TestInstant {
        private Instant publicationDate;

        public Instant getPublicationDate() {
            return publicationDate;
        }

        public void setPublicationDate(Instant publicationDate) {
            this.publicationDate = publicationDate;
        }
    }
}
