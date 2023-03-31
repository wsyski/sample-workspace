"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var portal_util_1 = require("../../core/utils/portal-util");
var DATE_FORMAT_OPTIONS = {
    month: 'short', weekday: 'short', day: 'numeric'
};
var DATE_FULL_FORMAT_OPTIONS = {
    month: 'long', weekday: 'long', day: 'numeric'
};
var DATETIME_FORMAT_OPTIONS = {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
};
var TIME_FORMAT_OPTIONS = {
    hour: '2-digit', minute: '2-digit'
};
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.isSameDay = function (startDate, endDate) {
        if (startDate && endDate) {
            var startYear = startDate.getFullYear();
            var endYear = endDate.getFullYear();
            var startMonth = endDate.getMonth();
            var endMonth = endDate.getMonth();
            var startDay = startDate.getDate();
            var endDay = endDate.getDate();
            return startYear === endYear && startMonth === endMonth && startDay === endDay;
        }
        else {
            return false;
        }
    };
    DateUtil.object2Date = function (dateAsObject) {
        if (dateAsObject) {
            return dateAsObject.value ? new Date(dateAsObject.value) : new Date(dateAsObject);
        }
    };
    DateUtil.formattedDateInterval = function (startDateTimeAsObject, endDateTimeAsObject) {
        var startDate = DateUtil.object2Date(startDateTimeAsObject);
        var endDate = DateUtil.object2Date(endDateTimeAsObject);
        if (!startDate || !endDate) {
            throw new Error('Both startDate and endDate must be set');
        }
        var localeId = portal_util_1.PortalUtil.getLocaleId();
        if (localeId === 'nn-NO') {
            localeId = 'nb-NO';
        }
        var CapitaliseFirstLetter = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        var object = {
            start: startDate.toLocaleTimeString(localeId, TIME_FORMAT_OPTIONS),
            startDate: CapitaliseFirstLetter(startDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS)),
            end: endDate.toLocaleTimeString(localeId, TIME_FORMAT_OPTIONS),
            endDate: endDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS),
            startDateFull: CapitaliseFirstLetter(startDate.toLocaleDateString(localeId, DATE_FULL_FORMAT_OPTIONS)),
            endDateFull: endDate.toLocaleDateString(localeId, DATE_FULL_FORMAT_OPTIONS)
        };
        if (this.isSameDay(startDate, endDate)) {
            object['date'] = startDate.toLocaleDateString(localeId, DATE_FORMAT_OPTIONS);
            return object;
        }
        else {
            return object;
        }
    };
    return DateUtil;
}());
exports.default = DateUtil;
//# sourceMappingURL=date-util.js.map