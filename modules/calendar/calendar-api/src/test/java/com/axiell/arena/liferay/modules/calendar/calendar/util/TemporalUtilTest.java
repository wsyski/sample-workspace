package com.axiell.arena.liferay.modules.calendar.calendar.util;

import com.axiell.arena.liferay.modules.calendar.util.TemporalUtil;
import org.hamcrest.Matchers;
import org.junit.Test;
import static org.hamcrest.MatcherAssert.assertThat;

import java.time.LocalDateTime;

public class TemporalUtilTest {

    @Test
    public void dayOfWeekOccurenceInMonth_0() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 11, 7, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(1));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_1() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 11, 8, 18, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(2));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_2() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 11, 11, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(2));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_3() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 7, 15, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(3));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_4() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 7, 16, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(3));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_5() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 7, 14, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(2));
    }

    @Test
    public void dayOfWeekOccurenceInMonth_6() {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 2, 12, 0, 0);
        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(localDateTime);
        assertThat(dayOfWeekOccurenceInMonth, Matchers.is(1));
    }
}
