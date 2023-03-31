package com.axiell.arena.liferay.modules.calendar.service.resource;

import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.axiell.arena.liferay.modules.common_services.util.CommonServicesUtil;

public class SearchResourceFactory extends BaseResourceFactory {
    public static final SearchResourceFactory INSTANCE = new SearchResourceFactory();

    public <T> T createResource(final Class<T> clazz) {
        CommonServicesSystemConfiguration calendarEventSystemConfiguration = CommonServicesUtil.getCommonServicesSystemConfiguration();
        String calendarApiEndpoint = calendarEventSystemConfiguration.calendarApiEndpoint();
        return super.createResource(calendarApiEndpoint, clazz);
    }
}
