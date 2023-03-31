package com.axiell.arena.liferay.modules.calendar.model.event;

import com.axiell.arena.liferay.modules.calendar.constants.CalendarEventConstants;

import java.util.Arrays;

public class TermFilter {
    public static TermFilter statusFilter(Type type, Status... values) {
        return new TermFilter(type, CalendarEventConstants.FIELD_STATUS, Arrays.stream(values).map(value -> value.name().toUpperCase()).toArray(String[]::new));
    }

    public static TermFilter fieldDeletedFilter(Type type, String... values) {
        return new TermFilter(type, CalendarEventConstants.FIELD_DELETED, Arrays.stream(values).toArray(String[]::new));
    }

    public static TermFilter locationFilter(Type type, String... values) {
        return new TermFilter(type, CalendarEventConstants.FIELD_LOCATION, Arrays.stream(values).toArray(String[]::new));
    }

    public static TermFilter targetAudienceFilter(Type type, String... values) {
        return new TermFilter(type, CalendarEventConstants.FIELD_TARGET_AUDIENCE, Arrays.stream(values).toArray(String[]::new));
    }

    public enum Type {
        IN,
        NOT_IN
    }

    private TermFilter(Type type, String field, String... values) {
        this.type = type;
        this.field = field;
        this.values = values;
    }

    private Type type;
    private String field;
    private String[] values;

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String[] getValues() {
        return values;
    }

    public void setValues(String[] values) {
        this.values = values;
    }
}
