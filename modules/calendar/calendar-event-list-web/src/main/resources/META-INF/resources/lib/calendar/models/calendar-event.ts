import {Organizer} from './organizer';
import {Image} from './image';
import {Attachment} from './attachment';
import DateUtil from '../utils/date-util';
import {Component, Property} from 'immutable-ics';
import {FormattedDateInterval} from './formatted-date-interval';
import {MiscUtil} from '../../core/utils/misc-util';
import {CalendarEventDto} from './dto/calendar-event-dto';
import {ImageDto} from './dto/image-dto';

export class CalendarEvent {
    id: string;
    customerId: string;
    title: string;
    description: string;
    location: string;
    room: string;
    organizer: Organizer;
    status: string;
    startDate: string;
    endDate: string;
    createdDate: string;
    images: Image[];
    attachments: Attachment[];
    nrOfAttendees: number;
    maxAttendees: number;
    maxNrPerRegistration: number;
    isRegisterable: boolean;
    tags: string[];
    targetAudiences: string[];

    private static getDateProperty(name: string, dateTimeAsObject: any): Property {
        if (dateTimeAsObject) {
            return new Property({
                name: name,
                parameters: {VALUE: 'DATE-TIME'},
                value: DateUtil.object2Date(dateTimeAsObject)
            });
        } else {
            return null;
        }
    }

    public getPrimaryImage(): Image {
        if (!this.images) {
            return null;
        }
        const primaryImages = this.images.filter(image => image.primary === true);
        return primaryImages.length > 0 ? primaryImages[0] : null;
    }

    public getAsICalendar(document: Document): string {
        let calendar = new Component({name: 'VCALENDAR'});
        const versionProperty = new Property({name: 'VERSION', value: '2.0'});
        calendar = calendar.pushProperty(versionProperty);
        const prodidProperty = new Property({name: 'PRODID', value: '-//Google Inc//Google Calendar 70.9054//EN'});
        calendar = calendar.pushProperty(prodidProperty);
        const calscaleProperty = new Property({name: 'CALSCALE', value: 'GREGORIAN'});
        calendar = calendar.pushProperty(calscaleProperty);

        let event = new Component({name: 'VEVENT'});
        const eventStartProperty = CalendarEvent.getDateProperty('DTSTART', this.startDate);
        if (eventStartProperty) {
            event = event.pushProperty(eventStartProperty);
        }
        const eventEndProperty = CalendarEvent.getDateProperty('DTEND', this.endDate);
        if (eventEndProperty) {
            event = event.pushProperty(eventEndProperty);
        }
        if (this.location) {
            const eventLocationProperty = new Property({name: 'LOCATION', value: this.location});
            event = event.pushProperty(eventLocationProperty);
        }
        if (this.title) {
            const eventSummaryProperty = new Property({name: 'SUMMARY', value: MiscUtil.html2text(this.title)});
            event = event.pushProperty(eventSummaryProperty);
        }
        if (this.description) {
            const eventDescriptionProperty = new Property({
                name: 'DESCRIPTION',
                value: MiscUtil.html2text(this.description)
            });
            event = event.pushProperty(eventDescriptionProperty);
        }
        if (this.createdDate) {
            const eventCreatedProperty = new Property({name: 'CREATED', value: DateUtil.object2Date(this.createdDate)});
            event = event.pushProperty(eventCreatedProperty);
        }
        if (this.organizer && this.organizer.email) {
            const eventOrganizerProperty = new Property({
                name: 'ORGANIZER',
                value: 'CN=' + this.organizer.email + ':mailto:' + this.organizer.email
            });
            event = event.pushProperty(eventOrganizerProperty);
        }
        const eventUrlProperty = new Property({name: 'URL', value: document.location.href});
        event = event.pushProperty(eventUrlProperty);
        calendar = calendar.pushComponent(event);
        return calendar.toString();
    }

    public getFormattedDateInterval(): FormattedDateInterval {
        return DateUtil.formattedDateInterval(this.startDate, this.endDate);
    }

    public isCancelled(): boolean {
        return this.status === 'CANCELLED';
    }

    public isFullyBooked(): boolean {
        return this.isRegisterable && this.maxAttendees > 0 && (this.nrOfAttendees >= this.maxAttendees);
    }

    public isAlmostFullyBooked(): boolean {
        if (this.maxAttendees === 0) {
            return false;
        }
        const limit = Math.ceil(this.maxAttendees * 10 / 100);
        return this.isRegisterable && ((this.maxAttendees - this.nrOfAttendees) <= limit);
    }

    constructor(calendarEventDto: CalendarEventDto) {
        this.id = calendarEventDto.id;
        this.customerId = calendarEventDto.customerId;
        this.title = calendarEventDto.title;
        this.description = calendarEventDto.description;
        this.tags = calendarEventDto.tags;
        this.location = calendarEventDto.location ? calendarEventDto.location.value : null;
        this.room = calendarEventDto.room ? calendarEventDto.room.value : null;

        this.isRegisterable = calendarEventDto.registerable;

        this.organizer = <Organizer>{
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
        this.targetAudiences = calendarEventDto.targetAudiences ? calendarEventDto.targetAudiences.map(targetAudience => targetAudience.value) : [];

        if (calendarEventDto.images) {
            this.images = calendarEventDto.images.map((imageDTO: ImageDto) =>
                <Image>{
                    caption: imageDTO.imageCaption,
                    id: imageDTO.imageId,
                    url: imageDTO.imageUrl,
                    mimeType: imageDTO.mimeType,
                    primary: imageDTO.primaryImage
                }
            );
        }

    }
}

