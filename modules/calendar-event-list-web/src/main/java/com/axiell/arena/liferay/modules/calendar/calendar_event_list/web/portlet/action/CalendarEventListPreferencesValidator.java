package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.action;

import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.constants.CalendarEventListPortletKeys;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;

import javax.portlet.PortletPreferences;
import javax.portlet.PreferencesValidator;
import javax.portlet.ValidatorException;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component(
        configurationPid = CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION_ID,
        configurationPolicy = ConfigurationPolicy.OPTIONAL,
        immediate = true,
        property = {
                "javax.portlet.name=" + CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME
        }
)
public class CalendarEventListPreferencesValidator implements PreferencesValidator {
    private Pattern VALID_URL_PATTERN = Pattern.compile("[0-9a-z_\\-][0-9a-z_\\-/]*[0-9a-z_\\-]*");
    private static final String ERROR_INVALID_PAGE_SIZE = "Invalid page size";
    private static final String ERROR_INVALID_EVENT_DETAIL_PAGE = "Invalid event detail page";

    @Override
    public void validate(PortletPreferences portletPreferences) throws ValidatorException {

        String pageSizeAsString = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringUtils.EMPTY);
        try {
            if (StringUtils.isBlank(pageSizeAsString) || Integer.parseInt(pageSizeAsString) <= 0) {
                throw new ValidatorException(ERROR_INVALID_PAGE_SIZE, Collections.singletonList(pageSizeAsString));
            }
        } catch (IllegalArgumentException ex) {
            throw new ValidatorException(ERROR_INVALID_PAGE_SIZE, Collections.singletonList(pageSizeAsString));
        }
        String eventDetailPage = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE, StringUtils.EMPTY);
        if (StringUtils.isNotBlank(eventDetailPage)) {
            Matcher matcher = VALID_URL_PATTERN.matcher(eventDetailPage);
            if (!matcher.matches()) {
                throw new ValidatorException(ERROR_INVALID_EVENT_DETAIL_PAGE, Collections.singletonList(eventDetailPage));
            }
        }
    }
}
