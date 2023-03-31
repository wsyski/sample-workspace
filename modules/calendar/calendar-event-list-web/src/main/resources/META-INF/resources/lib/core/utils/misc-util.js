"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiscUtil = /** @class */ (function () {
    function MiscUtil() {
    }
    MiscUtil.equals = function (object0, object1) {
        return JSON.stringify(object0) === JSON.stringify(object1);
    };
    MiscUtil.html2text = function (html) {
        var domParser = new DOMParser();
        var doc = domParser.parseFromString(html, 'text/html');
        return doc.documentElement.textContent;
    };
    MiscUtil.randomString = function (length) {
        var value = '';
        var RANDOM_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            value += RANDOM_VALUES.charAt(Math.floor(Math.random() * RANDOM_VALUES.length));
        }
        return value;
    };
    MiscUtil.isTopInViewport = function (element, document) {
        var boundingClientRect = element.getBoundingClientRect();
        return boundingClientRect.top >= 0 && boundingClientRect.top <= document.documentElement.clientHeight;
    };
    MiscUtil.isBlank = function (s) {
        return typeof s === 'undefined' || s === '' || s === null;
    };
    MiscUtil.nvlArray = function (a) {
        return a ? a : new Array();
    };
    return MiscUtil;
}());
exports.MiscUtil = MiscUtil;
//# sourceMappingURL=misc-util.js.map