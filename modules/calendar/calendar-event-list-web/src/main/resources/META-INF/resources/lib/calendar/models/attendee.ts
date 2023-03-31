import {AttendeeDto} from './dto/attendee-dto';

export class Attendee {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    nrRegistered: number;

    constructor(attendeeDto: AttendeeDto) {
        this.id = attendeeDto.attendeeId;
        this.firstName = attendeeDto.firstName;
        this.lastName = attendeeDto.lastName;
        this.email = attendeeDto.email;
        this.nrRegistered = attendeeDto.nrRegistered;
    }
}
