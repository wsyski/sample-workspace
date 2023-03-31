"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NOW = new Date();
exports.DEFAULT_TIME_INTERVAL = {
    start: NOW
};
var TODAY_END_DATE = new Date(new Date().setHours(24, 0, 0, 0));
var ONE_WEEK_END_DATE = new Date(new Date(NOW.getTime() + 7 * 24 * 3600000).setHours(24, 0, 0, 0));
var ONE_MONTH_END_DATE = new Date(new Date(NOW.getTime() + 30 * 24 * 3600000).setHours(24, 0, 0, 0));
var ONE_YEAR_END_DATE = new Date(new Date(NOW.getTime() + 365 * 24 * 3600000).setHours(24, 0, 0, 0));
var TimeIntervalName;
(function (TimeIntervalName) {
    TimeIntervalName["ALL"] = "ALL";
    TimeIntervalName["TODAY"] = "TODAY";
    TimeIntervalName["ONE_WEEK"] = "ONE_WEEK";
    TimeIntervalName["ONE_MONTH"] = "ONE_MONTH";
    TimeIntervalName["ONE_YEAR"] = "ONE_YEAR";
})(TimeIntervalName = exports.TimeIntervalName || (exports.TimeIntervalName = {}));
function getTimeInterval(timeIntervalName) {
    switch (timeIntervalName) {
        case TimeIntervalName.TODAY:
            return { start: NOW, end: TODAY_END_DATE };
        case TimeIntervalName.ONE_WEEK:
            return { start: NOW, end: ONE_WEEK_END_DATE };
        case TimeIntervalName.ONE_MONTH:
            return { start: NOW, end: ONE_MONTH_END_DATE };
        case TimeIntervalName.ONE_YEAR:
            return { start: NOW, end: ONE_YEAR_END_DATE };
        default:
            return { start: NOW };
    }
}
exports.getTimeInterval = getTimeInterval;
function getTimeIntervalName(timeInterval) {
    switch (timeInterval.end) {
        case TODAY_END_DATE:
            return TimeIntervalName.TODAY;
        case ONE_WEEK_END_DATE:
            return TimeIntervalName.ONE_WEEK;
        case ONE_MONTH_END_DATE:
            return TimeIntervalName.ONE_MONTH;
        case ONE_YEAR_END_DATE:
            return TimeIntervalName.ONE_YEAR;
        default:
            return TimeIntervalName.ALL;
    }
}
exports.getTimeIntervalName = getTimeIntervalName;
//# sourceMappingURL=time-interval.js.map