package com.axiell.arena.liferay.modules.calendar.service.model.event;

public enum EventFacetsEnum {
    LOCATION(0),
    TAG(1),
    TARGET_AUDIENCE(2);


    private final int index;

    EventFacetsEnum(int index) {
        this.index = index;
    }

    public int getIndex() {
        return this.index;
    }
}
