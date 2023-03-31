package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.action;

import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.portlet.DefaultConfigurationAction;

import javax.portlet.PortletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public abstract class AbstractPortletConfigurationAction<C> extends DefaultConfigurationAction {

    @Override
    public void include(final PortletConfig portletConfig, final HttpServletRequest httpServletRequest, final HttpServletResponse httpServletResponse)
            throws Exception {
        httpServletRequest.setAttribute(getConfigurationClass().getName(), portletConfiguration);
        super.include(portletConfig, httpServletRequest, httpServletResponse);
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
    }

    private volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();
}
