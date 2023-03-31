package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration;

import aQute.bnd.annotation.metatype.Meta;
import com.axiell.arena.liferay.modules.arena.constants.ArenaPortletKeys;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.constants.CalendarEventListPortletKeys;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.ViewMode;

@Meta.OCD(
        id = CalendarEventListPortletKeys.CALENDAR_EVENT_LIST_PORTLET_CONFIGURATION_ID,
        localization = ArenaPortletKeys.RESOURCE_BUNDLE
)
public interface CalendarEventListPortletInstanceConfiguration {
    public static final String KEY_VIEW_MODE = "viewMode";
    public static final String KEY_LOCATIONS = "locations";
    public static final String KEY_TAGS = "tags";
    public static final String KEY_TARGET_AUDIENCES = "targetAudiences";
    public static final String KEY_PAGE_SIZE = "pageSize";
    public static final String KEY_EVENT_DETAIL_PAGE = "eventDetailPage";
    public static final String IS_FULL_WIDTH_MODE = "isFullWidthMode";
    public static final int[]  PAGE_SIZES = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 50};
    public static final String KEY_PRIVACY_POLICY_LINK = "privacyPolicyLink";
    public static final String KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED = "isDropdownLocationSelectorViewed";
    public static final String KEY_COOKIE_SAVED_DAYS = "cookieSavedDays";

    @Meta.AD(required = false)
    public String[] locations();

    @Meta.AD(required = false)
    public String[] tags();

    @Meta.AD(required = false)
    public String[] targetAudiences();

    @Meta.AD(deflt = "8", required = false)
    public int pageSize();

    @Meta.AD(deflt = "/web/arena/events", required = false)
    public String eventDetailPage();

    @Meta.AD(deflt = "false", required = false)
    public boolean isFullWidthMode();

    @Meta.AD(deflt = "FULL", required = false)
    public ViewMode viewMode();

    @Meta.AD(deflt = "privacy-policy", required= false)
    public String privacyPolicyLink();

    @Meta.AD(deflt = "false", required = false)
    public boolean isDropdownLocationSelectorViewed();

    @Meta.AD(deflt = "7", required = false)
    public int cookieSavedDays();
}
