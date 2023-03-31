package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.definition;

import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.liferay.portal.kernel.settings.definition.ConfigurationBeanDeclaration;
import org.osgi.service.component.annotations.Component;

@Component
public class CalendarEventListPortletInstanceConfigurationBeanDeclaration implements ConfigurationBeanDeclaration {

    @Override
    public Class getConfigurationBeanClass() {
        return CalendarEventListPortletInstanceConfiguration.class;
    }
}
