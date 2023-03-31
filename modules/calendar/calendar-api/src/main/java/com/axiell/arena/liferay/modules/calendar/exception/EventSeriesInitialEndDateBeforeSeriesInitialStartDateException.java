package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class EventSeriesInitialEndDateBeforeSeriesInitialStartDateException extends PortalException {

    public EventSeriesInitialEndDateBeforeSeriesInitialStartDateException() {
    }

    public EventSeriesInitialEndDateBeforeSeriesInitialStartDateException(String msg) {
        super(msg);
    }

    public EventSeriesInitialEndDateBeforeSeriesInitialStartDateException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public EventSeriesInitialEndDateBeforeSeriesInitialStartDateException(Throwable cause) {
        super(cause);
    }

}
