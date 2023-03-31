package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet;

import com.axiell.arena.liferay.modules.arena.constants.ArenaPortletKeys;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.constants.CalendarEventListPortletKeys;
import com.liferay.frontend.js.loader.modules.extender.npm.NPMResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;

import javax.portlet.Portlet;
import java.util.Map;

import static com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.constants.CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_MODULE_NAME;

@Component(
        configurationPid = CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION_ID,
        immediate = true,
        property = {
                "com.liferay.portlet.display-category=" + ArenaPortletKeys.DISPLAY_CATEGORY,
                "com.liferay.portlet.instanceable=true",
                "com.liferay.portlet.header-portlet-css=/css/main.css",
                "com.liferay.portlet.single-page-application=false",
                "com.liferay.portlet.css-class-wrapper="+CalendarEventListPortletKeys.CSS_CLASS_WRAPPER,
                "javax.portlet.display-name=" + CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_DISPLAY_NAME,
                "javax.portlet.init-param.config-template=" + ArenaPortletKeys.CONFIGURATION_TEMPLATE,
                "javax.portlet.init-param.view-template=" + ArenaPortletKeys.VIEW_TEMPLATE,
                "javax.portlet.init-param.template-path=/",
                "javax.portlet.name=" + CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_NAME,
                "javax.portlet.resource-bundle=" + ArenaPortletKeys.RESOURCE_BUNDLE,
                "javax.portlet.preferences=" + ArenaPortletKeys.DEFAULT_PORTLET_PREFERENCES,
                "javax.portlet.security-role-ref=power-user,user",
                "javax.portlet.version=3.0"
        },
        service = Portlet.class
)
public class CalendarEventListPortlet extends AbstractPortlet<CalendarEventListPortletInstanceConfiguration> {

    @Reference
    private NPMResolver _npmResolver;

    @Override
    protected String getModuleName() {
        return _npmResolver.resolveModuleName(CALENDAR_EVENT_LIST_MODULE_NAME);
    }

    @Activate
    @Modified
    protected void activate(Map<Object, Object> properties) {
        super.activate(properties);
    }

    @Override
    protected Class<CalendarEventListPortletInstanceConfiguration> getConfigurationClass() {
        return CalendarEventListPortletInstanceConfiguration.class;
    }
}
