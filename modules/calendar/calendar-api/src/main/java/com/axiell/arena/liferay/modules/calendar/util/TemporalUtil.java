package com.axiell.arena.liferay.modules.calendar.util;

import java.time.LocalDateTime;
import java.util.Locale;

import static java.time.format.TextStyle.FULL_STANDALONE;

public class TemporalUtil {
    public static Integer getDayOfWeekOccurenceInMonth(final LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        int day = localDateTime.getDayOfMonth();
        int weekNo = 1 + (day - 1) / 7;
        return weekNo;
    }

    public static Integer getDayOfMonth(final LocalDateTime localDateTime) {
        return localDateTime == null ? null : localDateTime.getDayOfMonth();
    }

    public static String getDayOfWeek(final LocalDateTime localDateTime, final Locale locale) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.getDayOfWeek().getDisplayName(FULL_STANDALONE, locale);
    }
}
