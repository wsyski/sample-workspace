"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var BooleanOperator;
(function (BooleanOperator) {
    BooleanOperator["AND"] = "AND";
    BooleanOperator["OR"] = "OR";
})(BooleanOperator = exports.BooleanOperator || (exports.BooleanOperator = {}));
exports.START_DATE_FIELD_NAME = 'event.startDate';
exports.END_DATE_FIELD_NAME = 'event.endDate';
exports.STATUS_FIELD_NAME = 'event.status';
exports.LOCATION_FIELD_NAME = 'event.location.value';
exports.TAG_FIELD_NAME = 'event.tags';
exports.EVENT_DELETED_FIELD_NAME = 'event.deleted';
exports.TARGET_AUDIENCE_FIELD_NAME = 'event.targetAudiences.value';
var CalendarService = /** @class */ (function () {
    function CalendarService(httpClient) {
        this.httpClient = httpClient;
    }
    CalendarService.luceneEscape = function (value) {
        var LUCENE_SPECIAL_CHARACTERS = ['+', '-', '&', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\'];
        var LUCENE_REGEXP = new RegExp('(\\' + LUCENE_SPECIAL_CHARACTERS.join('|\\') + ')', 'g');
        return value ? value.replace(LUCENE_REGEXP, '\\$1') : '';
    };
    CalendarService.prototype.serviceInvoke = function (baseUrl, relativeUrl, requestMethod, params, body) {
        var _this = this;
        var requestOptionsArgs = {
            method: requestMethod,
            params: params,
            body: body
        };
        return this.httpClient.request(baseUrl + relativeUrl, requestOptionsArgs)
            .pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(function (httpErrorResponse) { return rxjs_1.throwError(_this.getError(httpErrorResponse)); }));
    };
    return CalendarService;
}());
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map