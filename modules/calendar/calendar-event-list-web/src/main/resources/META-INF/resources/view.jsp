<%@ page import="com.liferay.portal.kernel.util.Validator" %>
<%@ page import="com.axiell.arena.liferay.modules.arena.constants.ArenaPortletKeys" %>
<%@ include file="./init.jsp" %>

<c:choose>
    <c:when test="<%= Validator.isNull(calendarEventListDisplayContext.getPageSize()) || !Validator.isNumber(calendarEventListDisplayContext.getPageSize()) || Integer.parseInt(calendarEventListDisplayContext.getPageSize()) <= 0 %>">
        <liferay-ui:message key="configurationPrompt"/>
    </c:when>
    <c:otherwise>
        <div id="<%=ArenaPortletKeys.ID_PREFIX%><portlet:namespace/>">
            <div class="spinner-parent">
                <div class="spinner-border" role="status">
                    <span class="sr-only"><liferay-ui:message key="loading"/></span>
                </div>
            </div>
        </div>

        <script type="text/javascript">


            AUI().use('liferay-portlet-url', function () {
                var moduleName = "<%= calendarEventListDisplayContext.getModuleName() + "/lib/index" %>";
                    Liferay.Loader.require(moduleName, function (module) {
                        var initializer;

                        if (typeof module.default === 'function') {
                            initializer = module.default;
                        } else if (typeof module === 'function') {
                            initializer = module;
                        }

                        if (initializer) {
                            initializer({
                                contextPath: "<%= renderRequest.getContextPath() %>",
                                portletElementId: "<%=ArenaPortletKeys.ID_PREFIX%><portlet:namespace/>",
                                portletNamespace: "<portlet:namespace/>",
                                configuration: {
                                    portletInstance: <%= calendarEventListDisplayContext.getPortletInstanceConfiguration() %>,
                                    system: <%= calendarEventListDisplayContext.getSystemConfiguration() %>
                                }
                            });
                        } else {
                            console.error('Module', moduleName, 'is not exporting a function: cannot initialize it.');
                        }
                    });
            });
        </script>
    </c:otherwise>
</c:choose>
