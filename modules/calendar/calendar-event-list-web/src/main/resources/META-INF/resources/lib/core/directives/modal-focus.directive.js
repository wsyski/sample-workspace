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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalFocusDirective = /** @class */ (function () {
    function ModalFocusDirective() {
        this.isFirstFocused = false;
        this.isLastFocused = false;
    }
    ModalFocusDirective.prototype.ngAfterViewInit = function () {
        this.getElements();
    };
    ModalFocusDirective.prototype.getElements = function () {
        this.allElements = Array.prototype.slice.call(document.querySelectorAll('.modal-content *'));
        this.allElements.map(function (x, index) { return x.id = 'GenModalId' + index; });
        this.elements = this.allElements.filter(function (element) { return element.nodeName === 'INPUT' || element.nodeName === 'BUTTON' || element.nodeName === 'SELECT'; });
        this.elements.map(function (x, index) { return x['myTabIndex'] = index; });
        this.firstElement = this.elements[0];
        this.lastElement = this.elements[this.elements.length - 1];
    };
    ModalFocusDirective.prototype.handleKeyboardEvent = function (event) {
        var keyCode = event.which || event.keyCode;
        this.getElements();
        var last = this.getLastAvailable();
        var first = this.getFirstAvailable();
        if (this.currentFocus['myTabIndex'] === last['myTabIndex']) {
            this.isLastFocused = true;
            this.isFirstFocused = false;
        }
        else if (this.currentFocus['myTabIndex'] === first['myTabIndex']) {
            this.isLastFocused = false;
            this.isFirstFocused = true;
        }
        if (keyCode === 9) {
            if (event.shiftKey && this.isFirstFocused) {
                var elem = this.currentFocus = this.getLastAvailable();
                elem.focus();
                this.isFirstFocused = false;
                event.preventDefault();
                return;
            }
            else if (this.isFirstFocused) {
                this.isLastFocused = false;
                this.isFirstFocused = false;
                return;
            }
            else if (event.shiftKey && this.isLastFocused) {
                this.isLastFocused = false;
                this.isFirstFocused = false;
                return;
            }
            else if (this.isLastFocused) {
                var lastAval = this.getLastAvailable();
                if (lastAval['myTabIndex'] !== this.currentFocus['myTabIndex']) {
                    lastAval.focus();
                }
                else {
                    this.getFirstAvailable().focus();
                }
                event.preventDefault();
                return;
            }
        }
    };
    ModalFocusDirective.prototype.getFirstAvailable = function () {
        return this.elements.find(function (element) { return !element.hasAttribute('disabled'); });
    };
    ModalFocusDirective.prototype.getLastAvailable = function () {
        var len = this.elements.filter(function (element) { return !element.hasAttribute('disabled'); }).length;
        return this.elements.filter(function (element) { return !element.hasAttribute('disabled'); })[len - 1];
    };
    ModalFocusDirective.prototype.onFocusIn = function (event) {
        this.getElements();
        var firstAvailable = this.getFirstAvailable();
        var lastAvailable = this.getLastAvailable();
        if (!event.target['id'] || (event.target['id'] && !this.allElements.find(function (elems) { return elems.id === event.target['id']; }))) {
            firstAvailable.focus();
            this.currentFocus = firstAvailable;
            this.isFirstFocused = true;
            this.isLastFocused = false;
            event.preventDefault();
            return;
        }
        this.currentFocus = event.target;
        if (event.target['myTabIndex'] === firstAvailable['myTabIndex']) {
            this.isFirstFocused = true;
            this.isLastFocused = false;
        }
        else if (event.target['myTabIndex'] === lastAvailable['myTabIndex']) {
            this.isFirstFocused = false;
            this.isLastFocused = true;
        }
    };
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ModalFocusDirective.prototype, "handleKeyboardEvent", null);
    __decorate([
        core_1.HostListener('document:focusin', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [FocusEvent]),
        __metadata("design:returntype", void 0)
    ], ModalFocusDirective.prototype, "onFocusIn", null);
    ModalFocusDirective = __decorate([
        core_1.Directive({
            selector: '[appModalFocus]'
        })
        /* tslint:disable:no-string-literal */
        ,
        __metadata("design:paramtypes", [])
    ], ModalFocusDirective);
    return ModalFocusDirective;
}());
exports.ModalFocusDirective = ModalFocusDirective;
/* tslint:enable:no-string-literal */
//# sourceMappingURL=modal-focus.directive.js.map