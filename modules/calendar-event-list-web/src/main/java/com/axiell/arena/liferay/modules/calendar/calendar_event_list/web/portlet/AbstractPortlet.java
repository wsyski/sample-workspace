package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet;

import com.axiell.arena.liferay.modules.arena.constants.ArenaPortletKeys;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;
import java.util.Map;

public abstract class AbstractPortlet<C> extends MVCPortlet {

    @Override
    public void doView(final RenderRequest renderRequest, final RenderResponse renderResponse) throws IOException, PortletException {
        renderRequest.setAttribute(ArenaPortletKeys.KEY_MODULE_NAME, getModuleName());
        super.doView(renderRequest, renderResponse);
    }

    protected void activate(final Map<Object, Object> properties) {
        portletConfiguration = ConfigurableUtil.createConfigurable(getConfigurationClass(), properties);
    }

    protected volatile C portletConfiguration;

    protected abstract Class<C> getConfigurationClass();

    protected abstract String getModuleName();

}
