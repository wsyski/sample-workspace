package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.service.model.ObjectMapperFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class RecurringDTOSerializer extends StdSerializer<RecurringDTO> {

    public RecurringDTOSerializer() {
        this(null);
    }

    public RecurringDTOSerializer(Class<RecurringDTO> t) {
        super(t);
    }

    @Override
    public void serialize(RecurringDTO value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("frequency", value.getFrequency());
        gen.writeNumberField("interval", value.getInterval());
        if (value.getRepeatUntil() == null) {
            gen.writeNumberField("numberOfRepeats", value.getNumberOfRepeats());
        } else {
            gen.writeStringField("repeatUntil", ObjectMapperFactory.INSTANT_FORMATTER.format(value.getRepeatUntil()));
        }

        if (value.getByDay() != null) {
            gen.writeArrayFieldStart("byDay");
            for (String s : value.getByDay()) {
                gen.writeString(s);
            }
            gen.writeEndArray();
        }

        gen.writeEndObject();

    }
}
