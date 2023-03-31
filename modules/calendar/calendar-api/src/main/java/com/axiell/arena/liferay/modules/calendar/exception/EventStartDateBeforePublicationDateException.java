package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventStartDateBeforePublicationDateException extends PortalException {

    public EventStartDateBeforePublicationDateException() {
    }

    public EventStartDateBeforePublicationDateException(String msg) {
        super(msg);
    }

    public EventStartDateBeforePublicationDateException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventStartDateBeforePublicationDateException(Throwable cause) {
        super(cause);
    }

}
