package com.axiell.arena.liferay.modules.calendar.calendar.model.attendee;

import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Test;
import static org.hamcrest.MatcherAssert.assertThat;

public class AttendeeTest {

    @Test
    public void getFullname() {
        Attendee tested = new Attendee();
        tested.setFirstName("John");
        assertThat(tested.getFullname(), Matchers.is("John"));
        tested.setLastName("Doe");
        assertThat(tested.getFullname(), Matchers.is("John Doe"));
        tested.setFirstName(null);
        assertThat(tested.getFullname(), Matchers.is("Doe"));
    }
}
