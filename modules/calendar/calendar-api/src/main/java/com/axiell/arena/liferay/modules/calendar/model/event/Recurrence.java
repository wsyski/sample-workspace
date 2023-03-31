package com.axiell.arena.liferay.modules.calendar.model.event;

public enum Recurrence {
    DAILY("day"),
    WEEKLY("week"),
    MONTHLY("month"),
    YEARLY("year");

    private String label;

    Recurrence(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
