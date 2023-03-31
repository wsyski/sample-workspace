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
var EventDetailAttachmentsComponent = /** @class */ (function () {
    function EventDetailAttachmentsComponent() {
    }
    EventDetailAttachmentsComponent.prototype.isShowAttachments = function () {
        return this.calendarEvent && this.calendarEvent.attachments && this.calendarEvent.attachments.length > 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", calendar_event_1.CalendarEvent)
    ], EventDetailAttachmentsComponent.prototype, "calendarEvent", void 0);
    EventDetailAttachmentsComponent = __decorate([
        core_1.Component({
            selector: 'app-event-detail-attachments',
            template: "\n        <div *ngIf=\"isShowAttachments()\" class=\"arena-event-detail-attachment\">\n            <h4 i18n=\"@@lblAttachments\" class=\"arena-event-detail-attachments-header\">Attachments</h4>\n            <ul>\n                <li *ngFor=\"let attachment of calendarEvent.attachments\"\n                    class=\"arena-event-detail-attachment\">\n                    <a [href]=\"attachment.fileUrl\" download target=\"_blank\">{{attachment.title}}</a>\n                </li>\n            </ul>\n        </div>\n    "
        })
    ], EventDetailAttachmentsComponent);
    return EventDetailAttachmentsComponent;
}());
exports.EventDetailAttachmentsComponent = EventDetailAttachmentsComponent;
//# sourceMappingURL=event-detail-attachments.component.js.map