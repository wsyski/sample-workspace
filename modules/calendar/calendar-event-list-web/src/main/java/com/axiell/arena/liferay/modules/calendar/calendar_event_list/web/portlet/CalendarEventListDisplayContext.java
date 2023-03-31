package com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet;

import com.axiell.arena.liferay.modules.arena.constants.ArenaPortletKeys;
import com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration;
import com.axiell.arena.liferay.modules.calendar.model.event.Facets;
import com.axiell.arena.liferay.modules.calendar.model.event.RangeFilter;
import com.axiell.arena.liferay.modules.calendar.model.event.Status;
import com.axiell.arena.liferay.modules.calendar.model.event.TermFilter;
import com.axiell.arena.liferay.modules.calendar.service.EventLocalServiceUtil;
import com.axiell.arena.liferay.modules.calendar.util.CalendarUtil;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesGroupConfiguration;
import com.axiell.arena.liferay.modules.common_services.util.CommonServicesUtil;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.util.Validator;
import org.apache.commons.lang3.StringUtils;

import javax.portlet.PortletPreferences;
import javax.portlet.RenderRequest;
import java.lang.reflect.Method;
import java.util.*;

public class CalendarEventListDisplayContext {
    private static final Log LOGGER = LogFactoryUtil.getLog(CalendarEventListDisplayContext.class);
    private static final String ATTR_CHECKED = "checked";
    private static final String INPUT_NAME_PREFIX = "_com_liferay_portlet_configuration_web_portlet_PortletConfigurationPortlet_";
    private final static Set<String> PORTLET_PREFERENCES_FIELD_NAMES = new HashSet<>();

    static {
        Method[] methods = CalendarEventListPortletInstanceConfiguration.class.getDeclaredMethods();
        for (Method method : methods) {
            PORTLET_PREFERENCES_FIELD_NAMES.add(method.getName());
        }
    }

    private Facets facets;
    private List<String> selectedLocations;
    private List<String> selectedTags;
    private List<String> selectedTargetAudiences;
    private String pageSize = StringUtils.EMPTY;
    private String eventDetailPage = StringUtils.EMPTY;
    private ViewMode viewMode = ViewMode.FULL;
    private boolean isFullWidthMode = Boolean.FALSE;
    private String moduleName;
    private String customerId;
    private RenderRequest renderRequest;
    private String privacyPolicyLink = StringUtils.EMPTY ;
    private boolean isDropdownLocationSelectorViewed = Boolean.FALSE;
    private String cookieSavedDays = StringUtils.EMPTY;

    public CalendarEventListDisplayContext(final RenderRequest renderRequest, final PortletPreferences portletPreferences) {
        this.renderRequest = renderRequest;
        String[] locations = new String[0];
        String[] tags = new String[0];
        String[] targetAudiences = new String[0];
        this.moduleName = (String) renderRequest.getAttribute(ArenaPortletKeys.KEY_MODULE_NAME);
        if (Validator.isNotNull(portletPreferences)) {
            locations = portletPreferences.getValues(CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS, new String[0]);
            tags = portletPreferences.getValues(CalendarEventListPortletInstanceConfiguration.KEY_TAGS, new String[0]);
            targetAudiences = portletPreferences.getValues(CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES, new String[0]);
            pageSize = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE, StringUtils.EMPTY);
            eventDetailPage = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE, StringUtils.EMPTY);
            privacyPolicyLink = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK, StringUtils.EMPTY);
            this.viewMode = ViewMode.valueOf(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE, ViewMode.FULL.name()));
            this.isFullWidthMode = Boolean.parseBoolean(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE, String.valueOf(Boolean.FALSE)));
            isDropdownLocationSelectorViewed = Boolean.parseBoolean(portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED, String.valueOf(Boolean.FALSE)));
            cookieSavedDays = portletPreferences.getValue(CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS, StringUtils.EMPTY);
        }
        long groupId = CalendarUtil.getScopeGroupId(renderRequest);
        CommonServicesGroupConfiguration commonServicesGroupConfiguration = CommonServicesUtil.getCommonServicesGroupConfiguration(groupId);
        this.selectedLocations = Arrays.asList(locations == null ? new String[0] : locations);
        this.selectedTags = Arrays.asList(tags == null ? new String[0] : tags);
        this.selectedTargetAudiences = Arrays.asList(targetAudiences == null ? new String[0] : targetAudiences);
        this.customerId = commonServicesGroupConfiguration.calendarCustomerId();
    }

    public Facets getFacets() {
        if (this.facets != null) {
            return this.facets;
        }
        if (StringUtils.isBlank(customerId)) {
            this.facets = new Facets(new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        } else {
            TermFilter[] termFilters = getTermFilters().toArray(new TermFilter[0]);
            RangeFilter[] rangeFilters = getRangeFilters().toArray(new RangeFilter[0]);
            this.facets = EventLocalServiceUtil.getEventFacets(customerId, termFilters, rangeFilters);
        }
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("customer id: " + customerId + " facets: " + facets.toString());
        }
        return this.facets;
    }

    private List<TermFilter> getTermFilters() {
        List<TermFilter> termFilters = new ArrayList<>();
        termFilters.add(TermFilter.fieldDeletedFilter(TermFilter.Type.NOT_IN, "true"));
        termFilters.add(TermFilter.statusFilter(TermFilter.Type.IN, Status.PUBLISHED, Status.CANCELLED));
        return termFilters;
    }

    private List<RangeFilter> getRangeFilters() {
        List<RangeFilter> rangeFilters = new ArrayList<>();
        rangeFilters.add(RangeFilter.Builder.endDate().in().after("now").build());
        return rangeFilters;
    }

    public String getPortletInstanceConfiguration() {
        PortletPreferences portletPreferences = renderRequest.getPreferences();
        JSONObject portletPreferencesJSONObject =
                JSONFactoryUtil.createJSONObject();

        Enumeration<String> portletPreferencesNames = portletPreferences.getNames();

        while (portletPreferencesNames.hasMoreElements()) {
            String key = portletPreferencesNames.nextElement();

            if (!PORTLET_PREFERENCES_FIELD_NAMES.contains(key)) {
                continue;
            }

            String[] values = portletPreferences.getValues(
                    key, new String[0]);

            if (values.length == 1) {
                portletPreferencesJSONObject.put(key, values[0]);
            } else {
                portletPreferencesJSONObject.put(key, values);
            }
        }
        return portletPreferencesJSONObject.toJSONString();
    }

    public String getSystemConfiguration() {
        JSONObject systemConfigurationJSONObject = JSONFactoryUtil.createJSONObject();
        return systemConfigurationJSONObject.toJSONString();
    }

    public boolean showLocations() {
        return getFacets().getLocations().size() > 0;
    }

    public boolean showTags() {
        return getFacets().getTags().size() > 0;
    }

    public boolean showTargetAudiences() {
        return getFacets().getTargetAudiences().size() > 0;
    }

    public String getLocationChecked(final String location) {
        return this.selectedLocations.contains(location) ? ATTR_CHECKED : StringUtils.EMPTY;
    }

    public String getTagChecked(final String tag) {
        return this.selectedTags.contains(tag) ? ATTR_CHECKED : StringUtils.EMPTY;
    }

    public String getTargetAudienceChecked(final String targetAudience) {
        return this.selectedTargetAudiences.contains(targetAudience) ? ATTR_CHECKED : StringUtils.EMPTY;
    }

    public String getInputName(final String name) {
        return INPUT_NAME_PREFIX + name;
    }

    public String getPageSize() {
        return pageSize;
    }

    public String getEventDetailPage() {
        return eventDetailPage;
    }

    public boolean isFullWidthMode() {
        return isFullWidthMode;
    }

    public String getPrivacyPolicyLink() {
        return privacyPolicyLink;
    }

    public String getModuleName() {
        return this.moduleName;
    }

    public ViewMode getViewMode() {
        return this.viewMode;
    }

    public boolean isDropdownLocationSelectorViewed() {
        return this.viewMode == ViewMode.BRIEF && isDropdownLocationSelectorViewed;
    }

    public String getCookieSavedDays() {
        return cookieSavedDays;
    }
}
