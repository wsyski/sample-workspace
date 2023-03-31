package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.Recurrence;
import org.apache.commons.lang3.StringUtils;

import java.time.Instant;

public class RecurringDTO {
    private String frequency;
    private int numberOfRepeats;
    private Instant repeatUntil;
    private int interval;
    private int[] byHour;
    private String[] byDay;
    private int[] byMonth;
    private int[] byMonthDay;
    private int[] byYearDay;

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public int getNumberOfRepeats() {
        return numberOfRepeats;
    }

    public void setNumberOfRepeats(int numberOfRepeats) {
        this.numberOfRepeats = numberOfRepeats;
    }

    public Instant getRepeatUntil() {
        return repeatUntil;
    }

    public void setRepeatUntil(Instant repeatUntil) {
        this.repeatUntil = repeatUntil;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public int[] getByHour() {
        return byHour;
    }

    public void setByHour(int[] byHour) {
        this.byHour = byHour;
    }

    public String[] getByDay() {
        return byDay;
    }

    public void setByDay(String[] byDay) {
        this.byDay = byDay;
    }

    public int[] getByMonth() {
        return byMonth;
    }

    public void setByMonth(int[] byMonth) {
        this.byMonth = byMonth;
    }

    public int[] getByMonthDay() {
        return byMonthDay;
    }

    public void setByMonthDay(int[] byMonthDay) {
        this.byMonthDay = byMonthDay;
    }

    public int[] getByYearDay() {
        return byYearDay;
    }

    public void setByYearDay(int[] byYearDay) {
        this.byYearDay = byYearDay;
    }
}
