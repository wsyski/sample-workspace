package com.axiell.arena.liferay.modules.calendar.service.model;

import com.axiell.arena.liferay.modules.calendar.model.event.RangeFilter;
import com.axiell.arena.liferay.modules.calendar.model.event.Sort;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeeDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeeDTOSerializer;
import com.axiell.arena.liferay.modules.calendar.service.model.event.RangeFilterSerializer;
import com.axiell.arena.liferay.modules.calendar.service.model.event.SortSerializer;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.RecurringDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.RecurringDTOSerializer;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;

import java.io.IOException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class ObjectMapperFactory {
    public final static ObjectMapper INSTANCE = create();
    public static final DateTimeFormatter INSTANT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX").withZone(ZoneId.of("UTC"));

    public static ObjectMapper create() {
        final SimpleModule applicationModule = new SimpleModule()
                .addSerializer(AttendeeDTO.class, new AttendeeDTOSerializer())
                .addSerializer(RangeFilter.class, new RangeFilterSerializer())
                .addSerializer(Sort.class, new SortSerializer())
                .addSerializer(RecurringDTO.class, new RecurringDTOSerializer());
        final SimpleModule javaTimeModule = new JavaTimeModule()
                .addSerializer(Instant.class, new JsonSerializer<Instant>() {
                    @Override
                    public void serialize(Instant instant, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
                        final String serializedInstant = INSTANT_FORMATTER.format(instant);
                        jsonGenerator.writeString(serializedInstant);
                    }
                });

        return new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
                .registerModule(applicationModule)
                .registerModule(new ParameterNamesModule())
                .registerModule(new Jdk8Module())
                .registerModule(javaTimeModule);
    }
}
