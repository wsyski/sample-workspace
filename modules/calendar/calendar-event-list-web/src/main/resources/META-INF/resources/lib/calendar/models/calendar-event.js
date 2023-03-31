"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_util_1 = require("../utils/date-util");
var immutable_ics_1 = require("immutable-ics");
var misc_util_1 = require("../../core/utils/misc-util");
var CalendarEvent = /** @class */ (function () {
    function CalendarEvent(calendarEventDto) {
        this.id = calendarEventDto.id;
        this.customerId = calendarEventDto.customerId;
        this.title = calendarEventDto.title;
        this.description = calendarEventDto.description;
        this.tags = calendarEventDto.tags;
        this.location = calendarEventDto.location ? calendarEventDto.location.value : null;
        this.room = calendarEventDto.room ? calendarEventDto.room.value : null;
        this.isRegisterable = calendarEventDto.registerable;
        this.organizer = {
            name: calendarEventDto.createdBy
        };
        this.status = calendarEventDto.status;
        this.startDate = calendarEventDto.startDate;
        this.endDate = calendarEventDto.endDate;
        this.createdDate = calendarEventDto.createdDate;
        this.attachments = calendarEventDto.attachments;
        this.maxAttendees = calendarEventDto.maxAttendees;
        this.nrOfAttendees = calendarEventDto.nrOfAttendees;
        this.maxNrPerRegistration = calendarEventDto.maxNrPerRegistration;
        this.targetAudiences = calendarEventDto.targetAudiences ? calendarEventDto.targetAudiences.map(function (targetAudience) { return targetAudience.value; }) : [];
        if (calendarEventDto.images) {
            this.images = calendarEventDto.images.map(function (imageDTO) {
                return ({
                    caption: imageDTO.imageCaption,
                    id: imageDTO.imageId,
                    url: imageDTO.imageUrl,
                    mimeType: imageDTO.mimeType,
                    primary: imageDTO.primaryImage
                });
            });
        }
    }
    CalendarEvent.getDateProperty = function (name, dateTimeAsObject) {
        if (dateTimeAsObject) {
            return new immutable_ics_1.Property({
                name: name,
                parameters: { VALUE: 'DATE-TIME' },
                value: date_util_1.default.object2Date(dateTimeAsObject)
            });
        }
        else {
            return null;
        }
    };
    CalendarEvent.prototype.getPrimaryImage = function () {
        if (!this.images) {
            return null;
        }
        var primaryImages = this.images.filter(function (image) { return image.primary === true; });
        return primaryImages.length > 0 ? primaryImages[0] : null;
    };
    CalendarEvent.prototype.getAsICalendar = function (document) {
        var calendar = new immutable_ics_1.Component({ name: 'VCALENDAR' });
        var versionProperty = new immutable_ics_1.Property({ name: 'VERSION', value: '2.0' });
        calendar = calendar.pushProperty(versionProperty);
        var prodidProperty = new immutable_ics_1.Property({ name: 'PRODID', value: '-//Google Inc//Google Calendar 70.9054//EN' });
        calendar = calendar.pushProperty(prodidProperty);
        var calscaleProperty = new immutable_ics_1.Property({ name: 'CALSCALE', value: 'GREGORIAN' });
        calendar = calendar.pushProperty(calscaleProperty);
        var event = new immutable_ics_1.Component({ name: 'VEVENT' });
        var eventStartProperty = CalendarEvent.getDateProperty('DTSTART', this.startDate);
        if (eventStartProperty) {
            event = event.pushProperty(eventStartProperty);
        }
        var eventEndProperty = CalendarEvent.getDateProperty('DTEND', this.endDate);
        if (eventEndProperty) {
            event = event.pushProperty(eventEndProperty);
        }
        if (this.location) {
            var eventLocationProperty = new immutable_ics_1.Property({ name: 'LOCATION', value: this.location });
            event = event.pushProperty(eventLocationProperty);
        }
        if (this.title) {
            var eventSummaryProperty = new immutable_ics_1.Property({ name: 'SUMMARY', value: misc_util_1.MiscUtil.html2text(this.title) });
            event = event.pushProperty(eventSummaryProperty);
        }
        if (this.description) {
            var eventDescriptionProperty = new immutable_ics_1.Property({
                name: 'DESCRIPTION',
                value: misc_util_1.MiscUtil.html2text(this.description)
            });
            event = event.pushProperty(eventDescriptionProperty);
        }
        if (this.createdDate) {
            var eventCreatedProperty = new immutable_ics_1.Property({ name: 'CREATED', value: date_util_1.default.object2Date(this.createdDate) });
            event = event.pushProperty(eventCreatedProperty);
        }
        if (this.organizer && this.organizer.email) {
            var eventOrganizerProperty = new immutable_ics_1.Property({
                name: 'ORGANIZER',
                value: 'CN=' + this.organizer.email + ':mailto:' + this.organizer.email
            });
            event = event.pushProperty(eventOrganizerProperty);
        }
        var eventUrlProperty = new immutable_ics_1.Property({ name: 'URL', value: document.location.href });
        event = event.pushProperty(eventUrlProperty);
        calendar = calendar.pushComponent(event);
        return calendar.toString();
    };
    CalendarEvent.prototype.getFormattedDateInterval = function () {
        return date_util_1.default.formattedDateInterval(this.startDate, this.endDate);
    };
    CalendarEvent.prototype.isCancelled = function () {
        return this.status === 'CANCELLED';
    };
    CalendarEvent.prototype.isFullyBooked = function () {
        return this.isRegisterable && this.maxAttendees > 0 && (this.nrOfAttendees >= this.maxAttendees);
    };
    CalendarEvent.prototype.isAlmostFullyBooked = function () {
        if (this.maxAttendees === 0) {
            return false;
        }
        var limit = Math.ceil(this.maxAttendees * 10 / 100);
        return this.isRegisterable && ((this.maxAttendees - this.nrOfAttendees) <= limit);
    };
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;
//# sourceMappingURL=calendar-event.js.map