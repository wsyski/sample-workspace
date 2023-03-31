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
var EventDateIntervalComponent = /** @class */ (function () {
    function EventDateIntervalComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EventDateIntervalComponent.prototype, "formattedDateInterval", void 0);
    EventDateIntervalComponent = __decorate([
        core_1.Component({
            selector: 'app-event-date-interval',
            template: "\n    <ng-container *ngIf=\"formattedDateInterval\">\n      <div class=\"arena-event-date-interval\">\n        <div class=\"arena-event-dateonly\">\n          <span class=\"sr-only\" i18n=\"@@eventDate\">Date</span>\n          <span class=\"icon-calendar\" aria-hidden=\"true\"></span>\n          <span  [attr.aria-label]=\"formattedDateInterval.startDateFull\" >{{formattedDateInterval.startDate}}</span>\n          <span [attr.aria-label]=\"formattedDateInterval.endDateFull\" *ngIf=\"!formattedDateInterval.date\" [attr.datetime]=\"formattedDateInterval.endDate\">&ndash; {{formattedDateInterval.endDate}}</span>\n        </div>\n        <span class=\"sr-only\" i18n=\"@@eventTime\">Time</span>\n        <span class=\"icon-time\" aria-hidden=\"true\"></span>\n        <time class=\"arena-event-start\" [attr.datetime]=\"formattedDateInterval.start\">\n          {{formattedDateInterval.start}}\n        </time>\n        &ndash;\n        <time [attr.datetime]=\"formattedDateInterval.end\">{{formattedDateInterval.end}}</time>\n      </div>\n    </ng-container>\n  "
        })
    ], EventDateIntervalComponent);
    return EventDateIntervalComponent;
}());
exports.EventDateIntervalComponent = EventDateIntervalComponent;
//# sourceMappingURL=event-date-interval.component.js.map