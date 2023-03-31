package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet;

import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.action.CalendarEventListPreferencesValidator;
import com.liferay.petra.string.StringPool;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.portlet.PortletPreferences;
import javax.portlet.ValidatorException;

@RunWith(MockitoJUnitRunner.class)
public class CalendarEventListPreferencesValidatorTest {
    private CalendarEventListPreferencesValidator underTest = new CalendarEventListPreferencesValidator();

    @Mock
    private PortletPreferences portletPreferences;

    @Test
    public void validPageSizeValue() throws ValidatorException {
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringPool.BLANK)).willReturn("10");
        underTest.validate(portletPreferences);
    }

    @Test(expected = ValidatorException.class)
    public void invalidPageSizeValue() throws ValidatorException {
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringPool.BLANK)).willReturn("0");
        underTest.validate(portletPreferences);
    }

    @Test(expected = ValidatorException.class)
    public void nonNumericPageSizeValue() throws ValidatorException {
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringPool.BLANK)).willReturn("string");
        underTest.validate(portletPreferences);
    }

    @Test
    public void validEventDetailPageValue() throws ValidatorException {
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringPool.BLANK)).willReturn("10");
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE, StringPool.BLANK)).willReturn("event-detail");
        underTest.validate(portletPreferences);
    }

    @Test(expected = ValidatorException.class)
    public void invalidEventDetailPageValue() throws ValidatorException {
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringPool.BLANK)).willReturn("10");
        BDDMockito.given(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE, StringPool.BLANK)).willReturn("/event-detail");
        underTest.validate(portletPreferences);
    }
}
