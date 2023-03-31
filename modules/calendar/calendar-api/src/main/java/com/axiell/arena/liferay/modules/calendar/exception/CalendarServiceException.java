package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class CalendarServiceException extends PortalException {
    private Apierror apierror;

    public Apierror getApierror() {
        return apierror;
    }

    public void setApierror(Apierror apierror) {
        this.apierror = apierror;
    }

    @Override
    public String getMessage() {
        return apierror.getMessage();
    }

}
