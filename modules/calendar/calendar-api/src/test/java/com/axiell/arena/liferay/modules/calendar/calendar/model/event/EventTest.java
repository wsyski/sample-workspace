package com.axiell.arena.liferay.modules.calendar.calendar.model.event;

import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.liferay.portal.kernel.language.Language;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.servlet.http.HttpServletRequest;
import java.time.DayOfWeek;
import java.util.ArrayList;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(MockitoJUnitRunner.class)
public class EventTest {
    @Mock
    HttpServletRequest httpServletRequestMock;
    @Mock
    Language languageMock;
    private Event underTest;

    @Before
    public void setUp() {
        underTest = new Event();
    }

    @Test
    public void hasWeekday() {
        underTest.setRecurrenceByWeekDayAsString(new String[]{DayOfWeek.MONDAY.name(), DayOfWeek.WEDNESDAY.name()});
        assertThat(underTest.hasWeekday(DayOfWeek.MONDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.TUESDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.WEDNESDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.THURSDAY), is(false));

        underTest.setRecurrenceByWeekDayAsString(new String[]{DayOfWeek.SUNDAY.name()});
        assertThat(underTest.hasWeekday(DayOfWeek.MONDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.TUESDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.WEDNESDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.THURSDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.SUNDAY), is(true));

        underTest.setRecurrenceByWeekDay(new ArrayList<>());
        assertThat(underTest.hasWeekday(DayOfWeek.MONDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.TUESDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.WEDNESDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.THURSDAY), is(false));
        assertThat(underTest.hasWeekday(DayOfWeek.SUNDAY), is(false));

        underTest.setRecurrenceByWeekDayAsString(new String[]{DayOfWeek.MONDAY.name(),
                DayOfWeek.TUESDAY.name(), DayOfWeek.WEDNESDAY.name(),
                DayOfWeek.THURSDAY.name(), DayOfWeek.FRIDAY.name(),
                DayOfWeek.SATURDAY.name(), DayOfWeek.SUNDAY.name()});
        assertThat(underTest.hasWeekday(DayOfWeek.MONDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.TUESDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.WEDNESDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.THURSDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.FRIDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.SATURDAY), is(true));
        assertThat(underTest.hasWeekday(DayOfWeek.SUNDAY), is(true));

    }

    @Test
    public void isRegistrationAllowed() {
        Event tested = new Event();
        assertThat(tested.isRegistrationAllowed(), is(false));
        tested.setRegisterable(true);
        assertThat(tested.isRegistrationAllowed(), is(true));
        tested.setMaxAttendees(3);
        assertThat(tested.isRegistrationAllowed(), is(true));
        tested.setNrOfAttendees(1);
        assertThat(tested.isRegistrationAllowed(), is(true));
        tested.setNrOfAttendees(3);
        assertThat(tested.isRegistrationAllowed(), is(false));
    }

    @Test
    public void isFullyBooked() {
        Event tested = new Event();
        assertThat(tested.isFullyBooked(), is(false));
        tested.setRegisterable(true);
        assertThat(tested.isFullyBooked(), is(false));
        tested.setMaxAttendees(3);
        assertThat(tested.isFullyBooked(), is(false));
        tested.setNrOfAttendees(1);
        assertThat(tested.isFullyBooked(), is(false));
        tested.setNrOfAttendees(3);
        assertThat(tested.isFullyBooked(), is(true));
    }

    @Test
    public void setHour() {
        underTest.setEndHour(11);
        assertThat(underTest.getEndHour(), is(11));
    }
}
