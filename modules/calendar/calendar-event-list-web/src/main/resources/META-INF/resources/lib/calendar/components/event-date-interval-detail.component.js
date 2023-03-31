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
var EventDateIntervalDetailComponent = /** @class */ (function () {
    function EventDateIntervalDetailComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EventDateIntervalDetailComponent.prototype, "formattedDateInterval", void 0);
    EventDateIntervalDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-event-date-interval-detail',
            template: "\n    <ng-container *ngIf=\"formattedDateInterval\">\n      <div class=\"arena-event-date-interval\">\n        <div class=\"arena-event-dateonly\">\n          <span  [attr.aria-label]=\"formattedDateInterval.startDateFull\" >{{formattedDateInterval.startDateFull}}</span>\n            <span *ngIf=\"!formattedDateInterval.date\">&ndash;</span>\n          <span [attr.aria-label]=\"formattedDateInterval.endDateFull\" *ngIf=\"!formattedDateInterval.date\" [attr.datetime]=\"formattedDateInterval.endDate\">{{formattedDateInterval.endDateFull}}</span>\n        </div>  \n          <time class=\"arena-event-start\" [attr.datetime]=\"formattedDateInterval.start\">\n          {{formattedDateInterval.start}}\n        </time>\n        &ndash;\n        <time [attr.datetime]=\"formattedDateInterval.end\">{{formattedDateInterval.end}}</time>\n      </div>\n    </ng-container>\n  "
        })
    ], EventDateIntervalDetailComponent);
    return EventDateIntervalDetailComponent;
}());
exports.EventDateIntervalDetailComponent = EventDateIntervalDetailComponent;
//# sourceMappingURL=event-date-interval-detail.component.js.map