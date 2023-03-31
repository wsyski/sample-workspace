package com.axiell.arena.liferay.modules.calendar.service.model.event;

import com.axiell.arena.liferay.modules.calendar.model.event.RangeFilter;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class RangeFilterSerializer extends StdSerializer<RangeFilter> {
    public RangeFilterSerializer() {
        this(null);
    }

    public RangeFilterSerializer(Class<RangeFilter> t) {
        super(t);
    }

    @Override
    public void serialize(RangeFilter value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("type", value.getType().name());
        gen.writeStringField("field", value.getField());
        if (value.getLte() != null && !value.getLte().isEmpty()) {
            gen.writeStringField("lte", value.getLte());
        }
        if (value.getGte() != null && !value.getGte().isEmpty()) {
            gen.writeStringField("gte", value.getGte());
        }
        gen.writeEndObject();
    }
}
