package com.axiell.arena.liferay.modules.calendar.model;

public class CalendarConfig {
    private String customerId;
    private String calendarApiEndpoint;

    private CalendarConfig() {
    }

    public CalendarConfig(String customerId, String calendarApiEndpoint) {
        this.customerId = customerId;
        this.calendarApiEndpoint = calendarApiEndpoint;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getCalendarApiEndpoint() {
        return calendarApiEndpoint;
    }
}
