package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

public class AttendeeDTO {

    private String attendeeId;
    private String customerId;
    private String email;
    private String eventId;
    private String firstName;
    private String lastName;
    private int nrRegistered;

    public String getAttendeeId() {
        return attendeeId;
    }

    public void setAttendeeId(String attendeeId) {
        this.attendeeId = attendeeId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
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

    public int getNrRegistered() {
        return nrRegistered;
    }

    public void setNrRegistered(int nrRegistered) {
        this.nrRegistered = nrRegistered;
    }
}
