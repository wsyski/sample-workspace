package com.axiell.arena.liferay.modules.calendar.exception;

import com.liferay.portal.kernel.exception.PortalException;

public class UnauthorizedException extends PortalException {

    public UnauthorizedException() {
    }

    public UnauthorizedException(String msg) {
        super(msg);
    }

    public UnauthorizedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public UnauthorizedException(Throwable cause) {
        super(cause);
    }

}
