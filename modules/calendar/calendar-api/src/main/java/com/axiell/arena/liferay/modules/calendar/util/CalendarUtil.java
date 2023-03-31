package com.axiell.arena.liferay.modules.calendar.util;

import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.WebKeys;
import lombok.CustomLog;

import javax.portlet.PortletRequest;

@CustomLog
public class CalendarUtil {

    public static ThemeDisplay getThemeDisplay(final PortletRequest request) {
        return (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
    }

    public static long getScopeGroupId(final PortletRequest request) {
        ThemeDisplay themeDisplay = getThemeDisplay(request);
        return themeDisplay.getScopeGroupId();
    }

}
