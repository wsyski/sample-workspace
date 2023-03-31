"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventSearchActionType;
(function (EventSearchActionType) {
    EventSearchActionType["InitEmpty"] = "[CalendarEventSearch] InitEmpty";
    EventSearchActionType["Init"] = "[CalendarEventSearch] Init";
    EventSearchActionType["InitSuccess"] = "[CalendarEventSearch] Init Success";
    EventSearchActionType["Reset"] = "[calendarEventSearch] Reset";
    EventSearchActionType["Search"] = "[calendarEventSearch] Search";
    EventSearchActionType["SearchSuccess"] = "[CalendarEventSearch] Search Success";
    EventSearchActionType["More"] = "[CalendarEventSearch] More";
    EventSearchActionType["MoreSuccess"] = "[CalendarEventSearch] More Success";
})(EventSearchActionType = exports.EventSearchActionType || (exports.EventSearchActionType = {}));
var InitEmpty = /** @class */ (function () {
    function InitEmpty() {
        this.type = EventSearchActionType.InitEmpty;
    }
    return InitEmpty;
}());
exports.InitEmpty = InitEmpty;
var Init = /** @class */ (function () {
    function Init(payload) {
        this.payload = payload;
        this.type = EventSearchActionType.Init;
    }
    return Init;
}());
exports.Init = Init;
var InitSuccess = /** @class */ (function () {
    function InitSuccess(payload) {
        this.payload = payload;
        this.type = EventSearchActionType.InitSuccess;
    }
    return InitSuccess;
}());
exports.InitSuccess = InitSuccess;
var More = /** @class */ (function () {
    function More() {
        this.type = EventSearchActionType.More;
    }
    return More;
}());
exports.More = More;
var MoreSuccess = /** @class */ (function () {
    function MoreSuccess(payload) {
        this.payload = payload;
        this.type = EventSearchActionType.MoreSuccess;
    }
    return MoreSuccess;
}());
exports.MoreSuccess = MoreSuccess;
var Reset = /** @class */ (function () {
    function Reset() {
        this.type = EventSearchActionType.Reset;
    }
    return Reset;
}());
exports.Reset = Reset;
var Search = /** @class */ (function () {
    function Search(payload) {
        this.payload = payload;
        this.type = EventSearchActionType.Search;
    }
    return Search;
}());
exports.Search = Search;
var SearchSuccess = /** @class */ (function () {
    function SearchSuccess(payload) {
        this.payload = payload;
        this.type = EventSearchActionType.SearchSuccess;
    }
    return SearchSuccess;
}());
exports.SearchSuccess = SearchSuccess;
//# sourceMappingURL=event-search.actions.js.map