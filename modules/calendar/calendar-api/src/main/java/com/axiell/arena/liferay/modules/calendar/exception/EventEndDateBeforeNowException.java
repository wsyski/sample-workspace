package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventEndDateBeforeNowException extends PortalException {

    public EventEndDateBeforeNowException() {
    }

    public EventEndDateBeforeNowException(String msg) {
        super(msg);
    }

    public EventEndDateBeforeNowException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventEndDateBeforeNowException(Throwable cause) {
        super(cause);
    }

}
