"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attendee = /** @class */ (function () {
    function Attendee(attendeeDto) {
        this.id = attendeeDto.attendeeId;
        this.firstName = attendeeDto.firstName;
        this.lastName = attendeeDto.lastName;
        this.email = attendeeDto.email;
        this.nrRegistered = attendeeDto.nrRegistered;
    }
    return Attendee;
}());
exports.Attendee = Attendee;
//# sourceMappingURL=attendee.js.map