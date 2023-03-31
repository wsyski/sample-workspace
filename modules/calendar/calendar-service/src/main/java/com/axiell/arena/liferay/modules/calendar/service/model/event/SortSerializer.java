package com.axiell.arena.liferay.modules.calendar.service.model.event;

import com.axiell.arena.liferay.modules.calendar.model.event.Sort;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class SortSerializer extends StdSerializer<Sort> {
    public SortSerializer() {
        this(null);
    }

    public SortSerializer(Class<Sort> t) {
        super(t);
    }

    @Override
    public void serialize(Sort value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        String field = value.getField();
        if ("location".equals(field)) {
            field = "location.value";
        }
        gen.writeStringField("field", field);
        gen.writeStringField("order", value.getOrder().name());
        gen.writeEndObject();
    }
}
