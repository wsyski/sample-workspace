package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

import com.axiell.arena.liferay.modules.calendar.service.constants.TestData;
import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import org.hamcrest.Matchers;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

public class AttendeeDTOModelMapperTest {
    private AttendeeDTOModelMapper underTest = new AttendeeDTOModelMapper();

    @Test
    public void toModel() {
        AttendeeDTO attendee = new AttendeeDTO();
        attendee.setAttendeeId(TestData.ATTENDEE_ID);
        attendee.setCustomerId(TestData.CUSTOMER_ID);
        attendee.setEmail(TestData.ATTENDEE_EMAIL);
        attendee.setEventId(TestData.EVENT_ID);
        attendee.setFirstName(TestData.ATTENDEE_FIRSTNAME);
        attendee.setLastName(TestData.ATTENDEE_LASTNAME);

        Attendee result = underTest.toModel(attendee);

        assertThat(result, is(notNullValue()));
        assertThat(result.getEmail(), Matchers.is(TestData.ATTENDEE_EMAIL));
        assertThat(result.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(result.getAttendeeId(), Matchers.is(TestData.ATTENDEE_ID));
        assertThat(result.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(result.getFirstName(), Matchers.is(TestData.ATTENDEE_FIRSTNAME));
        assertThat(result.getLastName(), Matchers.is(TestData.ATTENDEE_LASTNAME));
        assertThat(result.getFullname(), Matchers.is(String.format("%s %s", TestData.ATTENDEE_FIRSTNAME, TestData.ATTENDEE_LASTNAME)));
    }

    @Test
    public void toDto() {
        Attendee attendee = new Attendee();
        attendee.setAttendeeId(TestData.ATTENDEE_ID);
        attendee.setCustomerId(TestData.CUSTOMER_ID);
        attendee.setEmail(TestData.ATTENDEE_EMAIL);
        attendee.setEventId(TestData.EVENT_ID);
        attendee.setFirstName(TestData.ATTENDEE_FIRSTNAME);
        attendee.setLastName(TestData.ATTENDEE_LASTNAME);

        AttendeeDTO result = underTest.toDto(attendee);

        assertThat(result, is(notNullValue()));
        assertThat(result.getEmail(), Matchers.is(TestData.ATTENDEE_EMAIL));
        assertThat(result.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(result.getAttendeeId(), Matchers.is(TestData.ATTENDEE_ID));
        assertThat(result.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(result.getFirstName(), Matchers.is(TestData.ATTENDEE_FIRSTNAME));
        assertThat(result.getLastName(), Matchers.is(TestData.ATTENDEE_LASTNAME));
    }
}
