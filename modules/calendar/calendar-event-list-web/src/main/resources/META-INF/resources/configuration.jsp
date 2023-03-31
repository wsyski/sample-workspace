<%@ include file="./init.jsp" %>

<%@ page import="com.liferay.portal.kernel.util.Constants" %>
<%@ page import="com.liferay.portal.kernel.util.HtmlUtil" %>
<%@ page import="javax.portlet.ValidatorException" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="com.axiell.arena.liferay.modules.calendar.model.event.Facets" %>
<%@ page import="com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.configuration.CalendarEventListPortletInstanceConfiguration" %>
<%@ page import="com.axiell.arena.liferay.modules.calendar.calendar_event_list.web.portlet.ViewMode" %>

<%
    Facets facets = calendarEventListDisplayContext.getFacets();
%>
<liferay-portlet:actionURL portletConfiguration="<%= true %>" var="configurationActionURL"/>

<liferay-portlet:renderURL portletConfiguration="<%= true %>" var="configurationRenderURL"/>

<aui:form action="<%= configurationActionURL %>" method="post" name="fm">
    <aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.UPDATE %>"/>

    <aui:input name="redirect" type="hidden" value="<%= configurationRenderURL %>"/>

    <div class="portlet-configuration-body-content">
        <div class="container-fluid-1280">

            <liferay-ui:error exception="<%= ValidatorException.class %>">
                <%
                    ValidatorException ve = (ValidatorException) errorException;
                %>

                <liferay-ui:message key="invalidConfigurationValues"/>

                <%
                    Enumeration<String> enu = ve.getFailedKeys();
                    while (enu.hasMoreElements()) {
                        String key = (String) enu.nextElement();
                %>
                <strong><%= HtmlUtil.escape(key) %>
                </strong><%= (enu.hasMoreElements()) ? ", " : "." %>
                <% } %>
            </liferay-ui:error>

            <aui:fieldset-group markupView="lexicon">
                <aui:fieldset collapsible="<%= true %>" label="basicSettings">
                    <aui:input name='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE %>' type="radio"
                               label='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Full.label"%>'
                               title='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Full.title"%>'
                               onChange="onChangeModeOrLocationFilterBtn()"
                               id='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Full.title"%>'
                               value="<%=ViewMode.FULL%>" checked="<%= calendarEventListDisplayContext.getViewMode() == ViewMode.FULL%>"/>

                    <aui:input name='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE %>' type="radio"
                               label='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Brief.label"%>'
                               title='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Brief.title"%>'
                               onChange="onChangeModeOrLocationFilterBtn()"
                               id='<%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Brief.title"%>'
                               value="<%=ViewMode.BRIEF%>" checked="<%= calendarEventListDisplayContext.getViewMode() == ViewMode.BRIEF%>"/>

            <div  id='briefModeContainer'>
            <aui:fieldset collapsible="<%= true %>" label="viewModeBriefSetting.label">
                        <aui:input name="<%=CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED%>" type="toggle-switch"
                                   label='<%=CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED+".label"%>'
                                   onChange="onChangeModeOrLocationFilterBtn()"
                                   value="<%= calendarEventListDisplayContext.isDropdownLocationSelectorViewed() %>"
                        />

                        <aui:input name="<%=CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE%>" type="text"
                                   label='<%=CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE+".label"%>'
                                   title='<%=CalendarEventListPortletInstanceConfiguration.KEY_EVENT_DETAIL_PAGE+".title"%>'
                                   value="<%= calendarEventListDisplayContext.getEventDetailPage() %>"/>
                   <div   id='cookieSavedDays'>
                        <aui:input name="<%=CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS%>" type="text"
                                   label='<%=CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS +".label"%>'
                                   prefix='<%=CalendarEventListPortletInstanceConfiguration.KEY_COOKIE_SAVED_DAYS +".prefix"%>'
                                   id="cookie-saved-days"
                                   value="<%= calendarEventListDisplayContext.getCookieSavedDays() %>">
                            <aui:validator name="number" />
                        </aui:input>
                   </div>
             </aui:fieldset>
            </div>
            <SUP>&nbsp;</SUP>
                    <aui:select
                            name="<%=CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE%>"
                            label='<%=CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE+".label"%>'
                            title='<%=CalendarEventListPortletInstanceConfiguration.KEY_PAGE_SIZE+".title"%>'
                            value="<%= HtmlUtil.escape(calendarEventListDisplayContext.getPageSize()) %>"
                            required="true">
                        <%
                            for (int i = 0; i < CalendarEventListPortletInstanceConfiguration.PAGE_SIZES.length; i++) {
                                int value = CalendarEventListPortletInstanceConfiguration.PAGE_SIZES[i];
                        %>
                        <aui:option label="<%=value %>" value="<%=value %>"
                                    selected="<%=calendarEventListDisplayContext.getPageSize() != null && Integer.parseInt(calendarEventListDisplayContext.getPageSize()) == value %>"/>
                        <% } %>
                    </aui:select>

                    <aui:script>
                        const fullModeBtn = document.getElementById('<portlet:namespace/><%=CalendarEventListPortletInstanceConfiguration.KEY_VIEW_MODE + "Full.title"%>');
                        const cookieSavedDaysField = document.getElementById('cookieSavedDays');
                        const briefModeContainer = document.getElementById('briefModeContainer');
                        const locationFilterBtn = document.getElementById('<portlet:namespace/><%=CalendarEventListPortletInstanceConfiguration.KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED%>');
                        const onChangeModeOrLocationFilterBtn = ()=> { fullModeBtn.checked ? briefModeContainer.hidden = true : briefModeContainer.hidden = false;
                               locationFilterBtn.checked ? cookieSavedDaysField.hidden = false : cookieSavedDaysField.hidden = true; }
                        onChangeModeOrLocationFilterBtn();
                    </aui:script>

                    <aui:input name="<%=CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE%>" type="toggle-switch"
                               label='<%=CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE+".label"%>'
                               title='<%=CalendarEventListPortletInstanceConfiguration.IS_FULL_WIDTH_MODE+".title"%>'
                               value="<%= calendarEventListDisplayContext.isFullWidthMode() %>"/>
                </aui:fieldset>
                <aui:fieldset collapsible="<%= true %>" label="privacyPolicy">
                    <aui:input name="<%=CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK%>" type="text"
                               label='<%=CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK +".label"%>'
                               title='<%=CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK +".title"%>'
                               prefix='<%=CalendarEventListPortletInstanceConfiguration.KEY_PRIVACY_POLICY_LINK +".prefix"%>'
                               value="<%= calendarEventListDisplayContext.getPrivacyPolicyLink() %>"/>
                </aui:fieldset>
                <% if (calendarEventListDisplayContext.showLocations()) { %>
                <aui:fieldset collapsible="<%= true %>" id="<%=CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS%>"
                              label='<%=CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS+".label"%>'>
                    <aui:field-wrapper>
                        <%
                            for (String location : facets.getLocations()) {
                        %>
                        <label>
                            <input class="field"
                                   name="<%=calendarEventListDisplayContext.getInputName(CalendarEventListPortletInstanceConfiguration.KEY_LOCATIONS)%>" type="checkbox"
                                   value="<%=HtmlUtil.escape(location) %>"
                                   title="<%=location %>" <%=calendarEventListDisplayContext.getLocationChecked(location) %>/>
                            <%=HtmlUtil.escape(location) %>
                        </label>
                        <% } %>
                    </aui:field-wrapper>
                </aui:fieldset>
                <% } %>

                <% if (calendarEventListDisplayContext.showTargetAudiences()) { %>
                <aui:fieldset collapsible="<%= true %>"
                              id="<%=CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES%>"
                              label='<%=CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES+".label"%>'>
                    <aui:field-wrapper>
                        <%
                            for (String targetAudience : facets.getTargetAudiences()) {
                        %>
                        <label>
                            <input class="field"
                                   name="<%=calendarEventListDisplayContext.getInputName(CalendarEventListPortletInstanceConfiguration.KEY_TARGET_AUDIENCES)%>"
                                   type="checkbox"
                                   value="<%=HtmlUtil.escape(targetAudience) %>"
                                   title="<%=targetAudience %>" <%=calendarEventListDisplayContext.getTargetAudienceChecked(targetAudience) %>/>
                            <%=HtmlUtil.escape(targetAudience) %>
                        </label>
                        <% } %>
                    </aui:field-wrapper>
                </aui:fieldset>
                <% } %>

                <% if (calendarEventListDisplayContext.showTags()) { %>
                <aui:fieldset collapsible="<%= true %>" id="<%=CalendarEventListPortletInstanceConfiguration.KEY_TAGS%>"
                              label='<%=CalendarEventListPortletInstanceConfiguration.KEY_TAGS+".label"%>'>
                    <aui:field-wrapper>
                        <%
                            for (String tag : facets.getTags()) {
                        %>
                        <label>
                            <input class="field"
                                   name="<%=calendarEventListDisplayContext.getInputName(CalendarEventListPortletInstanceConfiguration.KEY_TAGS)%>" type="checkbox"
                                   value="<%=HtmlUtil.escape(tag) %>"
                                   title="<%=tag %>" <%=calendarEventListDisplayContext.getTagChecked(tag) %>/>
                            <%=HtmlUtil.escape(tag) %>
                        </label>
                        <% } %>
                    </aui:field-wrapper>
                </aui:fieldset>
                <% } %>

            </aui:fieldset-group>
        </div>
    </div>
    <aui:button-row>
        <aui:button cssClass="btn-lg" primary="<%= true %>" type="submit"/>
    </aui:button-row>
</aui:form>
