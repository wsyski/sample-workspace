package com.axiell.arena.liferay.modules.calendar.model.attendee;

import org.apache.commons.lang3.StringUtils;

public class Attendee {

    private String attendeeId;
    private String customerId;
    private String email;
    private String eventId;
    private String firstName;
    private String lastName;
    private int nrRegistered;

    public void init(final String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAttendeeId() {
        return attendeeId;
    }

    public void setAttendeeId(final String attendeeId) {
        this.attendeeId = StringUtils.isBlank(attendeeId) ? null : attendeeId;
    }

    public int getNrActualRegistered() {
        return nrRegistered;
    }

    public int getNrRegistered() {
        return nrRegistered <= 0 ? 1 : nrRegistered;
    }

    public void setNrRegistered(int nrRegistered) {
        this.nrRegistered = nrRegistered;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getFullname() {
        return String.format("%s %s", firstName == null ? "" : firstName, lastName == null ? "" : lastName).trim();
    }
}
