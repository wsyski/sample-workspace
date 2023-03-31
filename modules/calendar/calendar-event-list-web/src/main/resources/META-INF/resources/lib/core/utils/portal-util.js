"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FRIENDLY_URL_PATTERN = '^(?:/(?:[a-z]{2}(?:_[A-Z]{2})?))?(?:/widget)?(/group|/user|/web)(/[^/^\\s^\\?^;]+)(?:[^\\s^\\?]*)$';
var DEFAULT_FRIENDLY_URL = '/arena';
// @dynamic
var PortalUtil = /** @class */ (function () {
    function PortalUtil() {
    }
    PortalUtil.getPortletConfigurationUrl = function (portletNamespace) {
        var portletId = PortalUtil.getPortletId(portletNamespace);
        var resourceURL = Liferay.PortletURL.createResourceURL();
        resourceURL.setPortletId(portletId);
        resourceURL.setResourceId('/portlet-configuration');
        return resourceURL.toString();
    };
    PortalUtil.getTranslationsUrl = function (portletNamespace) {
        var language = navigator.language;
        var portletId = PortalUtil.getPortletId(portletNamespace);
        var resourceURL = Liferay.PortletURL.createResourceURL();
        resourceURL.setPortletId(portletId);
        resourceURL.setResourceId('/translations');
        resourceURL.setParameter('language', language);
        return resourceURL.toString();
    };
    PortalUtil.getPortletId = function (portletNamespace) {
        return portletNamespace.replace(/^_+|_+$/g, '');
    };
    PortalUtil.getPortletName = function (portletNamespace) {
        var portletId = PortalUtil.getPortletId(portletNamespace);
        return portletId.replace(/_INSTANCE_\w+$/g, '');
    };
    PortalUtil.getGroupDisplayUrl = function () {
        var layoutUrl = Liferay.ThemeDisplay.getLayoutRelativeURL();
        return layoutUrl.replace(/\/[^\/]+$/g, '');
    };
    PortalUtil.getLocaleId = function () {
        return PortalUtil.getLocale().replace('_', '-');
    };
    PortalUtil.getLocale = function () {
        return Liferay.ThemeDisplay.getLanguageId();
    };
    PortalUtil.getLayoutUrl = function () {
        return Liferay.ThemeDisplay.getLayoutURL();
    };
    PortalUtil.getFriendlyUrl = function () {
        var layoutRelativeURL = Liferay.ThemeDisplay.getLayoutRelativeURL();
        if (layoutRelativeURL) {
            var match = layoutRelativeURL.match(FRIENDLY_URL_PATTERN);
            if (match && match.length > 1) {
                return match[2];
            }
        }
        return DEFAULT_FRIENDLY_URL;
    };
    return PortalUtil;
}());
exports.PortalUtil = PortalUtil;
//# sourceMappingURL=portal-util.js.map