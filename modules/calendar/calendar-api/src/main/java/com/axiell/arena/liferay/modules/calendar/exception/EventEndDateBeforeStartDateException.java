package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventEndDateBeforeStartDateException extends PortalException {

    public EventEndDateBeforeStartDateException() {
    }

    public EventEndDateBeforeStartDateException(String msg) {
        super(msg);
    }

    public EventEndDateBeforeStartDateException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventEndDateBeforeStartDateException(Throwable cause) {
        super(cause);
    }

}
