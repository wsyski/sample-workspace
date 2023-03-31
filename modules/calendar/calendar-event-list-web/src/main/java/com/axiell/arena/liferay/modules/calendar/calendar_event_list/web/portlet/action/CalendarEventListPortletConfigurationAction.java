package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.action;

import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.constants.CalendarEventListPortletKeys;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.ConfigurationAction;
import com.liferay.portal.kernel.util.ParamUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletConfig;
import java.util.Map;

@Component(
        configurationPid = CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION_ID,
        configurationPolicy = ConfigurationPolicy.OPTIONAL, immediate = true,
        property = {
                "javax.portlet.name=" + CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME
        },
        service = ConfigurationAction.class
)
public class CalendarEventListPortletConfigurationAction extends AbstractPortletConfigurationAction<CalendarEventListPortletInstanceConfiguration> {
    private static final Log LOGGER = LogFactoryUtil.getLog(CalendarEventListPortletConfigurationAction.class);

    @Override
    public void processAction(final PortletConfig portletConfig, final ActionRequest actionRequest, final ActionResponse actionResponse) throws Exception {
        String[] locations = ParamUtil.getStringValues(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS);
        String[] tags = ParamUtil.getStringValues(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_TAGS);
        String[] targetAudiences = ParamUtil.getStringValues(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES);
        String pageSize = ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE);
        String eventDetailPage = ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE);
        String viewMode = ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE);
        String isFullWidthMode = ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE);
        String privacyPolicyLink = ParamUtil.getString(actionRequest,CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK);
        String isDropdownLocationSelectorViewed= ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED);
        String cookieSavedDays = ParamUtil.getString(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS);

        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS, locations);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_TAGS, tags);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES, targetAudiences);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, pageSize);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE, eventDetailPage);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE, viewMode);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE, isFullWidthMode);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK, privacyPolicyLink);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED, isDropdownLocationSelectorViewed);
        setPreference(actionRequest, CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS, cookieSavedDays);
        super.processAction(portletConfig, actionRequest, actionResponse);
    }

    @Activate
    @Modified
    protected void activate(final Map<Object, Object> properties) {
        super.activate(properties);
    }

    @Override
    protected Class<CalendarEventListPortletInstanceConfiguration> getConfigurationClass() {
        return CalendarEventListPortletInstanceConfiguration.class;
    }
}
