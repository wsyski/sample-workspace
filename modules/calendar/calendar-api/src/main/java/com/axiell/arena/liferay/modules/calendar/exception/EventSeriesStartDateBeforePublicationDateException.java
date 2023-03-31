package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventSeriesStartDateBeforePublicationDateException extends PortalException {

    public EventSeriesStartDateBeforePublicationDateException() {
    }

    public EventSeriesStartDateBeforePublicationDateException(String msg) {
        super(msg);
    }

    public EventSeriesStartDateBeforePublicationDateException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventSeriesStartDateBeforePublicationDateException(Throwable cause) {
        super(cause);
    }

}
