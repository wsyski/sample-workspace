"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var liferay_params_provider_1 = require("../core/providers/liferay-params.provider");
var portal_util_1 = require("../core/utils/portal-util");
var KEY_VIEW_MODE = 'viewMode';
var KEY_LOCATIONS = 'locations';
var KEY_TAGS = 'tags';
var KEY_TARGET_AUDIENCES = 'targetAudiences';
var KEY_PAGE_SIZE = 'pageSize';
var KEY_EVENT_DETAIL_PAGE = 'eventDetailPage';
var KEY_IS_FULL_WIDTH_MODE = 'isFullWidthMode';
var PAGE_SIZE = 8;
var LOCATION_PAGE_SIZE = 7;
var TARGET_AUDIENCE_PAGE_SIZE = 7;
var TAG_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
var TIME_INTERVAL_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
var KEY_PRIVACY_POLICY_LINK = 'privacyPolicyLink';
var PRIVACY_POLICY_LINK = 'privacy-policy';
var KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED = 'isDropdownLocationSelectorViewed';
var KEY_COOKIE_SAVED_DAYS = 'cookieSavedDays';
var COOKIE_SAVED_DAYS = 7;
var ViewMode;
(function (ViewMode) {
    ViewMode["FULL"] = "FULL";
    ViewMode["BRIEF"] = "BRIEF";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var CalendarEventListConfig = /** @class */ (function () {
    function CalendarEventListConfig(liferayParamsProvider) {
        this.liferayParamsProvider = liferayParamsProvider;
    }
    CalendarEventListConfig.prototype.getConfigurationFilter = function () {
        return {
            locations: this.getLocations(),
            tags: this.getTags(),
            targetAudiences: this.getTargetAudiences()
        };
    };
    CalendarEventListConfig.prototype.getPageSize = function () {
        var value = this.getPortletPreferenceForKey(KEY_PAGE_SIZE);
        return value ? Number(value) : PAGE_SIZE;
    };
    CalendarEventListConfig.prototype.getLocationPageSize = function () {
        return LOCATION_PAGE_SIZE;
    };
    CalendarEventListConfig.prototype.getTargetAudiencePageSize = function () {
        return TARGET_AUDIENCE_PAGE_SIZE;
    };
    CalendarEventListConfig.prototype.getTagPageSize = function () {
        return TAG_PAGE_SIZE;
    };
    CalendarEventListConfig.prototype.getTimeIntervalPageSize = function () {
        return TIME_INTERVAL_PAGE_SIZE;
    };
    CalendarEventListConfig.prototype.isFullWidthMode = function () {
        var value = this.getPortletPreferenceForKey(KEY_IS_FULL_WIDTH_MODE);
        return !!value && value.toLowerCase() === 'true';
    };
    CalendarEventListConfig.prototype.isSearchInputVisible = function () {
        return this.isFullModeView();
    };
    CalendarEventListConfig.prototype.isSearchFilterVisible = function () {
        return this.isFullModeView();
    };
    CalendarEventListConfig.prototype.isAllEventsLinkVisible = function () {
        return this.isBriefModeView();
    };
    CalendarEventListConfig.prototype.isMoreEventsButtonVisible = function () {
        return this.isFullModeView();
    };
    CalendarEventListConfig.prototype.getEventDetailAbsoluteUrl = function (eventId) {
        var eventDetailPage = this.getEventDetailPage();
        return eventDetailPage + '#/events/' + encodeURIComponent(eventId);
    };
    CalendarEventListConfig.prototype.getAllEventsUrl = function () {
        return this.getEventDetailPage();
    };
    CalendarEventListConfig.prototype.isEventDetailRouterLink = function () {
        var eventDetailPage = this.getEventDetailPage();
        return !eventDetailPage;
    };
    CalendarEventListConfig.prototype.getPrivacyPolicyLink = function () {
        return this.privacyPolicyLink();
    };
    CalendarEventListConfig.prototype.getLocations = function () {
        return this.getPortletPreferencesForKey(KEY_LOCATIONS);
    };
    CalendarEventListConfig.prototype.getTags = function () {
        return this.getPortletPreferencesForKey(KEY_TAGS);
    };
    CalendarEventListConfig.prototype.getTargetAudiences = function () {
        return this.getPortletPreferencesForKey(KEY_TARGET_AUDIENCES);
    };
    CalendarEventListConfig.prototype.getEventDetailPage = function () {
        var value = this.getPortletPreferenceForKey(KEY_EVENT_DETAIL_PAGE);
        return value ? portal_util_1.PortalUtil.getGroupDisplayUrl() + '/' + value : undefined;
    };
    CalendarEventListConfig.prototype.privacyPolicyLink = function () {
        var value = this.getPortletPreferenceForKey(KEY_PRIVACY_POLICY_LINK);
        return value ? String(value) : PRIVACY_POLICY_LINK;
    };
    CalendarEventListConfig.prototype.isFullModeView = function () {
        var value = this.getPortletPreferenceForKey(KEY_VIEW_MODE);
        return !value || value === ViewMode.FULL;
    };
    CalendarEventListConfig.prototype.isBriefModeView = function () {
        var value = this.getPortletPreferenceForKey(KEY_VIEW_MODE);
        return !!value && value === ViewMode.BRIEF;
    };
    CalendarEventListConfig.prototype.getPortletPreferencesForKey = function (key) {
        var values = this.liferayParamsProvider.instanceOf().configuration.portletInstance[key];
        return values ? values : [];
    };
    CalendarEventListConfig.prototype.getPortletPreferenceForKey = function (key) {
        var values = this.getPortletPreferencesForKey(key);
        if (Array.isArray(values)) {
            return values && values.length > 0 ? values[0] : undefined;
        }
        else {
            return values;
        }
    };
    CalendarEventListConfig.prototype.isDropdownLocationSelectorViewed = function () {
        var value = this.getPortletPreferenceForKey(KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED);
        return !!value && value.toLowerCase() === 'true';
    };
    CalendarEventListConfig.prototype.getCookieSavedDays = function () {
        var value = this.getPortletPreferenceForKey(KEY_COOKIE_SAVED_DAYS);
        return value ? Number(value) : COOKIE_SAVED_DAYS;
    };
    CalendarEventListConfig = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(liferay_params_provider_1.LiferayParamsProvider)),
        __metadata("design:paramtypes", [liferay_params_provider_1.LiferayParamsProvider])
    ], CalendarEventListConfig);
    return CalendarEventListConfig;
}());
exports.CalendarEventListConfig = CalendarEventListConfig;
//# sourceMappingURL=calendar-event-list-config.js.map