package com.axiell.arena.liferay.modules.calendar.exception;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.List;

public class Apierror {
    private String status;
    private String message;
    private String debugMessage;
    private String errorCode;
    private List<SubError> subErrors;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDebugMessage() {
        return debugMessage;
    }

    public void setDebugMessage(String debugMessage) {
        this.debugMessage = debugMessage;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public List<SubError> getSubErrors() {
        return subErrors;
    }

    public void setSubErrors(List<SubError> subErrors) {
        this.subErrors = subErrors;
    }

    @Override
    public final String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
