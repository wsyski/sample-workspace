package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class NoWeekDaySelectedException extends PortalException {

    public NoWeekDaySelectedException() {
    }

    public NoWeekDaySelectedException(String msg) {
        super(msg);
    }

    public NoWeekDaySelectedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public NoWeekDaySelectedException(Throwable cause) {
        super(cause);
    }

}
