package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

import com.axiell.arena.liferay.modules.calendar.service.constants.TestData;
import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import com.axiell.arena.liferay.modules.calendar.model.attendee.AttendeePage;
import org.hamcrest.Matchers;
import org.junit.Test;

import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

public class AttendeePageDTOModelMapperTest {

    private AttendeePageDTOModelMapper underTest = new AttendeePageDTOModelMapper();

    @Test
    public void toModel() {
        AttendeeDTO attendee = new AttendeeDTO();
        attendee.setAttendeeId(TestData.ATTENDEE_ID);
        attendee.setCustomerId(TestData.CUSTOMER_ID);
        attendee.setEmail(TestData.ATTENDEE_EMAIL);
        attendee.setEventId(TestData.EVENT_ID);
        attendee.setFirstName(TestData.ATTENDEE_FIRSTNAME);
        attendee.setLastName(TestData.ATTENDEE_LASTNAME);
        AttendeePageDTO attendeePage = new AttendeePageDTO();
        attendeePage.setContent(Collections.singletonList(attendee));
        attendeePage.setNumber(1);
        attendeePage.setFirst(true);
        attendeePage.setLast(true);
        attendeePage.setTotalElements(1);
        attendeePage.setSize(1);
        attendeePage.setTotalPages(1);
        AttendeePage attendeePageDto = underTest.toModel(attendeePage);
        assertThat(attendeePageDto.getNumber(), is(1));
        assertThat(attendeePageDto.getSize(), is(1));
        assertThat(attendeePageDto.getTotalPages(), is(1));
        assertThat(attendeePageDto.getTotalElements(), is(1));
        Attendee attendeeDto = attendeePageDto.getContent().get(0);
        assertThat(attendeeDto, is(notNullValue()));
        assertThat(attendeeDto.getEmail(), Matchers.is(TestData.ATTENDEE_EMAIL));
        assertThat(attendeeDto.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(attendeeDto.getAttendeeId(), Matchers.is(TestData.ATTENDEE_ID));
        assertThat(attendeeDto.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(attendeeDto.getFirstName(), Matchers.is(TestData.ATTENDEE_FIRSTNAME));
        assertThat(attendeeDto.getLastName(), Matchers.is(TestData.ATTENDEE_LASTNAME));
        assertThat(attendeeDto.getFullname(), Matchers.is(String.format("%s %s", TestData.ATTENDEE_FIRSTNAME, TestData.ATTENDEE_LASTNAME)));
    }

    @Test
    public void toDto() {
        Attendee attendeeDto = new Attendee();
        attendeeDto.setAttendeeId(TestData.ATTENDEE_ID);
        attendeeDto.setCustomerId(TestData.CUSTOMER_ID);
        attendeeDto.setEmail(TestData.ATTENDEE_EMAIL);
        attendeeDto.setEventId(TestData.EVENT_ID);
        attendeeDto.setFirstName(TestData.ATTENDEE_FIRSTNAME);
        attendeeDto.setLastName(TestData.ATTENDEE_LASTNAME);
        AttendeePage attendeePageDto = new AttendeePage();
        attendeePageDto.setContent(Collections.singletonList(attendeeDto));
        attendeePageDto.setNumber(1);
        attendeePageDto.setFirst(true);
        attendeePageDto.setLast(true);
        attendeePageDto.setTotalElements(1);
        attendeePageDto.setSize(1);
        attendeePageDto.setTotalPages(1);
        AttendeePageDTO attendeePage = underTest.toDto(attendeePageDto);
        assertThat(attendeePage.getNumber(), is(1));
        assertThat(attendeePage.getSize(), is(1));
        assertThat(attendeePage.getTotalPages(), is(1));
        assertThat(attendeePage.getTotalElements(), is(1));
        AttendeeDTO attendee = attendeePage.getContent().get(0);
        assertThat(attendee, is(notNullValue()));
        assertThat(attendee.getEmail(), Matchers.is(TestData.ATTENDEE_EMAIL));
        assertThat(attendee.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(attendee.getAttendeeId(), Matchers.is(TestData.ATTENDEE_ID));
        assertThat(attendee.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(attendee.getFirstName(), Matchers.is(TestData.ATTENDEE_FIRSTNAME));
        assertThat(attendee.getLastName(), Matchers.is(TestData.ATTENDEE_LASTNAME));
    }
}
