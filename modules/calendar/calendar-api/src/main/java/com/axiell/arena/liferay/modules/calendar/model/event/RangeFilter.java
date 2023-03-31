package com.axiell.arena.liferay.modules.calendar.model.event;

import com.axiell.arena.liferay.modules.calendar.constants.CalendarEventConstants;

public class RangeFilter {
    public static class Builder {
        private String field;
        private Type type;
        private String lte;
        private String gte;

        public static Builder endDate() {
            return new Builder(CalendarEventConstants.FIELD_END_DATE);
        }

        Builder(String field) {
            this.field = field;
        }

        public Builder in() {
            this.type = Type.IN;
            return this;
        }

        public Builder after(String gte) {
            this.gte = gte;
            return this;
        }

        public Builder before(String lte) {
            this.lte = lte;
            return this;
        }

        public RangeFilter build() {
            return new RangeFilter(type, field, lte, gte);
        }
    }

    public enum Type {
        IN,
        NOT_IN
    }

    private RangeFilter() {
    }

    private RangeFilter(Type type, String field, String lte, String gte) {
        this.type = type;
        this.field = field;
        this.lte = lte;
        this.gte = gte;
    }

    private Type type;
    private String field;
    private String lte;
    private String gte;

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

    public String getLte() {
        return lte;
    }

    public void setLte(String lte) {
        this.lte = lte;
    }

    public String getGte() {
        return gte;
    }

    public void setGte(String gte) {
        this.gte = gte;
    }
}
