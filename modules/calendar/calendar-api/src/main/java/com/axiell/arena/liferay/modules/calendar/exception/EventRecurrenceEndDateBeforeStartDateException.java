package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventRecurrenceEndDateBeforeStartDateException extends PortalException {

    public EventRecurrenceEndDateBeforeStartDateException() {
    }

    public EventRecurrenceEndDateBeforeStartDateException(String msg) {
        super(msg);
    }

    public EventRecurrenceEndDateBeforeStartDateException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventRecurrenceEndDateBeforeStartDateException(Throwable cause) {
        super(cause);
    }

}
