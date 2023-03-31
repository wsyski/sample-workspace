package com.axiell.arena.liferay.modules.calendar.service.impl;

import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.RangeFilter;
import com.axiell.arena.liferay.modules.calendar.model.event.SearchResponse;
import com.axiell.arena.liferay.modules.calendar.model.event.Sort;
import com.axiell.arena.liferay.modules.calendar.model.event.TermFilter;
import com.axiell.arena.liferay.modules.calendar.constants.CalendarEventConstants;
import com.axiell.arena.liferay.modules.calendar.service.constants.TestData;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.MockitoRule;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.doReturn;

@Ignore
@RunWith(MockitoJUnitRunner.class)
public class CalendarEventAdminServiceImplTest {
    private static final String EVENT_ID = "f514d622-61b1-4762-815b-621769c612c8";

    @Mock
    private User userMock;

    @Rule
    public MockitoRule mockitoRule = MockitoJUnit.rule();

    @Spy
    private EventLocalServiceImpl underTest = new EventLocalServiceImpl();

    @Before
    public void setUp() {
        CommonServicesSystemConfiguration commonServicesSystemConfiguration = config();
        doReturn(commonServicesSystemConfiguration).when(underTest).getCommonServicesSystemConfiguration();
        doReturn("UTC").when(userMock).getTimeZoneId();
    }

    @Test
    public void searchEvents() throws PortalException {
        Sort sort = new Sort(CalendarEventConstants.FIELD_START_DATE, Sort.Order.ASC);
        TermFilter[] termFilters = new TermFilter[0];
        RangeFilter[] rangeFilters = new RangeFilter[0];
        SearchResponse searchResponse = underTest.searchEvents(TestData.CUSTOMER_ID, "*", 0, 100, sort, termFilters, rangeFilters, userMock);
        assertThat(searchResponse.getTotal(), is(302));
    }

    @Test
    public void readEvent() throws PortalException {
        Event event = underTest.readEvent(TestData.CUSTOMER_ID, EVENT_ID, userMock);
        assertThat(event, is(notNullValue()));
        assertThat(event.getTitle(), is("string"));
        assertThat(event.getDescription(), is("string"));
        assertThat(event.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(event.getCreatedBy(), is("string"));
        assertThat(event.getEventId(), is(EVENT_ID));
        assertThat(event.getMaxAttendees(), is(0));
        assertThat(event.getModifiedBy(), Matchers.nullValue());
        assertThat(event.getNrOfAttendees(), is(0));
        assertThat(event.isRegisterable(), is(true));
        assertThat(event.getStatus(), is("DRAFT"));

        assertThat(event.getStartDate(), is("2019-05-22"));
        assertThat(event.getCreatedDate(), is("2019-05-22T14:32:34.237Z"));
        assertThat(event.getEndDate(), is("2019-05-22"));
        assertThat(event.getPublicationDate(), is("2019-05-22"));

        assertThat(event.isRecurring(), is(false));
        assertThat(event.getFrequency(), is(""));
        assertThat(event.getInterval(), is(0));
        assertThat(event.getRecurrenceEndDate(), is(""));

        assertThat(event.getRoom(), is("string"));
        assertThat(event.getImage(), is("string"));
    }

    private CommonServicesSystemConfiguration config() {
        return new CommonServicesSystemConfiguration() {

            @Override
            public String calendarApiEndpoint() {
                return "https://test.axiell.io/api/calendar-event/latest/api";
            }

            @Override
            public String calendarApiKey() {
                return "apiKey";
            }

            @Override
            public String calendarApiUser() {
                return "apiUser";
            }

            @Override
            public String calendarApiPassword() {
                return "apiPassword";
            }

            @Override
            public String federatedSearchApiEndpoint() {
                return null;
            }

            @Override
            public String openingHoursApiEndpoint() {
                return null;
            }

            @Override
            public String transactionApiEndpoint() {
                return null;
            }

        };
    }
}
