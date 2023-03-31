import {IdStringDto} from './id-string-dto';
import {ImageDto} from './image-dto';
import {Attachment} from '../attachment';

export interface CalendarEventDto {
    id: string;
    customerId: string;
    createdBy: string;
    modifiedBy: string;
    title: string;
    description: string;
    location: IdStringDto;
    room: IdStringDto;
    status: string;
    startDate: string;
    endDate: string;
    createdDate: string;
    publicationDate: string;
    images: ImageDto[];
    attachments: Attachment[];
    nrOfAttendees: number;
    maxAttendees: number;
    maxNrPerRegistration: number;
    registerable: boolean;
    tags: string[];
    types: string[];
    linkedCatalogueRecordIds: string[];
    targetAudiences: IdStringDto[];
    subjects: string[];
}
