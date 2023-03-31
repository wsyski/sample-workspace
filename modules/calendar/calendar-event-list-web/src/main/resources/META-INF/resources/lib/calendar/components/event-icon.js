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
var calendar_event_1 = require("../models/calendar-event");
var EventImageComponent = /** @class */ (function () {
    function EventImageComponent() {
    }
    EventImageComponent.prototype.ngOnInit = function () {
        var primaryImage = this.calendarEvent.getPrimaryImage();
        this.iconSrc = primaryImage && primaryImage.url ? primaryImage.url : null;
        this.iconAlt = primaryImage && primaryImage.caption ? primaryImage.caption : '';
        this.isCancelled = this.calendarEvent.isCancelled();
        this.isFullyBooked = this.calendarEvent.isFullyBooked() && !this.calendarEvent.isCancelled();
        this.isAlmostFullyBooked = this.calendarEvent.isAlmostFullyBooked() && !this.calendarEvent.isCancelled();
        this.classModel = {
            containerClass: true,
            'arena-event-default-image': !this.iconSrc,
            'arena-event-custom-image': this.iconSrc,
            'event-fully-booked': this.isFullyBooked,
            'event-cancelled': this.isCancelled
        };
        if (this.containerClass) {
            this.classModel[this.containerClass] = true;
        }
    };
    EventImageComponent.prototype.getContainerClass = function () {
        return this.containerClass;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", calendar_event_1.CalendarEvent)
    ], EventImageComponent.prototype, "calendarEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EventImageComponent.prototype, "containerClass", void 0);
    EventImageComponent = __decorate([
        core_1.Component({
            selector: 'app-event-icon',
            template: "\n        <div [ngClass]=\"classModel\">\n            <div *ngIf=\"isFullyBooked\" class=\"event-banner\" i18n=\"@@txtEventFullyBooked\">Fully\n                Booked\n            </div>\n            <div *ngIf=\"isCancelled\" class=\"event-banner\" i18n=\"@@txtEventCancelled\">Cancelled</div>\n            <img [src]=\"iconSrc\" [alt]=\"iconAlt\" *ngIf=\"iconSrc\"/>\n        </div>\n    "
        })
    ], EventImageComponent);
    return EventImageComponent;
}());
exports.EventImageComponent = EventImageComponent;
//# sourceMappingURL=event-icon.js.map