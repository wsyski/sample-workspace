import {Inject, Injectable} from '@angular/core';
import {ConfigurationFilter} from './models/configuration-filter';
import {LiferayParamsProvider} from '../core/providers/liferay-params.provider';
import {PortalUtil} from '../core/utils/portal-util';

const KEY_VIEW_MODE = 'viewMode';
const KEY_LOCATIONS = 'locations';
const KEY_TAGS = 'tags';
const KEY_TARGET_AUDIENCES = 'targetAudiences';
const KEY_PAGE_SIZE = 'pageSize';
const KEY_EVENT_DETAIL_PAGE = 'eventDetailPage';
const KEY_IS_FULL_WIDTH_MODE = 'isFullWidthMode';
const PAGE_SIZE = 8;
const LOCATION_PAGE_SIZE = 7;
const TARGET_AUDIENCE_PAGE_SIZE = 7;
const TAG_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
const TIME_INTERVAL_PAGE_SIZE = Number.MAX_SAFE_INTEGER;
const KEY_PRIVACY_POLICY_LINK = 'privacyPolicyLink';
const PRIVACY_POLICY_LINK = 'privacy-policy';
const KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED = 'isDropdownLocationSelectorViewed';
const KEY_COOKIE_SAVED_DAYS = 'cookieSavedDays';
const COOKIE_SAVED_DAYS  = 7;

export enum ViewMode {
    FULL = 'FULL',
    BRIEF = 'BRIEF'
}

@Injectable()
export class CalendarEventListConfig {

    constructor(@Inject(LiferayParamsProvider) private liferayParamsProvider: LiferayParamsProvider) {
    }

    getConfigurationFilter(): ConfigurationFilter {
        return {
            locations: this.getLocations(),
            tags: this.getTags(),
            targetAudiences: this.getTargetAudiences()
        };
    }

    getPageSize(): number {
        const value = this.getPortletPreferenceForKey(KEY_PAGE_SIZE);
        return value ? Number(value) : PAGE_SIZE;
    }

    getLocationPageSize(): number {
        return LOCATION_PAGE_SIZE;
    }

    getTargetAudiencePageSize(): number {
        return TARGET_AUDIENCE_PAGE_SIZE;
    }

    getTagPageSize(): number {
        return TAG_PAGE_SIZE;
    }

    getTimeIntervalPageSize(): number {
        return TIME_INTERVAL_PAGE_SIZE;
    }

    isFullWidthMode(): boolean {
        const value = this.getPortletPreferenceForKey(KEY_IS_FULL_WIDTH_MODE);
        return !!value && value.toLowerCase() === 'true';
    }

    isSearchInputVisible(): boolean {
        return this.isFullModeView();
    }

    isSearchFilterVisible(): boolean {
        return this.isFullModeView();
    }

    isAllEventsLinkVisible(): boolean {
        return this.isBriefModeView();
    }

    isMoreEventsButtonVisible(): boolean {
        return this.isFullModeView();
    }

    getEventDetailAbsoluteUrl(eventId: string): string {
        const eventDetailPage: string = this.getEventDetailPage();
        return eventDetailPage + '#/events/' + encodeURIComponent(eventId);
    }

    getAllEventsUrl(): string {
        return this.getEventDetailPage();
    }

    isEventDetailRouterLink(): boolean {
        const eventDetailPage: string = this.getEventDetailPage();
        return !eventDetailPage;
    }

    getPrivacyPolicyLink(): string {
        return this.privacyPolicyLink();
    }

    private getLocations(): string[] {
        return this.getPortletPreferencesForKey(KEY_LOCATIONS);
    }

    private getTags(): string[] {
        return this.getPortletPreferencesForKey(KEY_TAGS);
    }

    private getTargetAudiences(): string[] {
        return this.getPortletPreferencesForKey(KEY_TARGET_AUDIENCES);
    }

    private getEventDetailPage(): string {
        const value = this.getPortletPreferenceForKey(KEY_EVENT_DETAIL_PAGE);
        return value ? PortalUtil.getGroupDisplayUrl() + '/' + value : undefined;
    }

    private privacyPolicyLink(): string {
        const value = this.getPortletPreferenceForKey(KEY_PRIVACY_POLICY_LINK);
        return value ?  String(value) : PRIVACY_POLICY_LINK;
    }

    private isFullModeView(): boolean {
        const value = this.getPortletPreferenceForKey(KEY_VIEW_MODE);
        return !value || value === ViewMode.FULL;
    }

    private isBriefModeView(): boolean {
        const value = this.getPortletPreferenceForKey(KEY_VIEW_MODE);
        return !!value && value === ViewMode.BRIEF;
    }

    private getPortletPreferencesForKey(key: string): string[] {
        const values = this.liferayParamsProvider.instanceOf().configuration.portletInstance[key];
        return values ? values : [];
    }

    private getPortletPreferenceForKey(key: string): string {
        const values = this.getPortletPreferencesForKey(key);
        if (Array.isArray(values)) {
            return values && values.length > 0 ? values[0] : undefined;
        } else {
            return values;
        }
    }

    isDropdownLocationSelectorViewed(): boolean {
        const value = this.getPortletPreferenceForKey(KEY_IS_DROPDOWN_LOCATION_SELECTOR_VIEWED);
        return !!value && value.toLowerCase() === 'true';
    }

    getCookieSavedDays(): number {
        const value = this.getPortletPreferenceForKey(KEY_COOKIE_SAVED_DAYS);
        return value ? Number(value) : COOKIE_SAVED_DAYS;
    }
}
