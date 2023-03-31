package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class AttendeeDTOSerializer extends StdSerializer<AttendeeDTO> {
    public AttendeeDTOSerializer() {
        this(null);
    }

    public AttendeeDTOSerializer(Class<AttendeeDTO> t) {
        super(t);
    }

    @Override
    public void serialize(AttendeeDTO value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("email", value.getEmail());
        gen.writeStringField("firstName", value.getFirstName());
        gen.writeStringField("lastName", value.getLastName());
        gen.writeNumberField("nrRegistered", value.getNrRegistered());
        gen.writeEndObject();

    }
}
