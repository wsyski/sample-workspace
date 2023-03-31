package com.axiell.arena.liferay.modules.calendar.model.event;

import com.axiell.arena.liferay.modules.calendar.exception.*;
import com.liferay.portal.kernel.exception.PortalException;

import org.apache.commons.lang3.StringUtils;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalField;
import java.util.*;
import java.util.stream.Collectors;

public class Event {
    private static final int DEFAULT_START_HOUR = 12;
    private static final int DEFAULT_END_HOUR = 13;
    private String eventId;
    private String createdBy;
    private String customerId;
    private boolean deleted;
    private boolean registerable;
    private String title;
    private String description;
    private String modifiedBy;
    private boolean editAll;
    private Instant createdDate;
    private Instant modifiedDate;

    private Status status = Status.DRAFT;
    private int maxAttendees;
    private long defaultMaxNrPerRegistration;
    private int maxNrPerRegistration;
    private int nrOfAttendees;
    private int nrAttended;
    private String assetTagNames;

    private LocalDateTime startDate;

    private LocalDateTime seriesInitialStartDate;

    private LocalDateTime endDate;

    private LocalDateTime seriesInitialEndDate;

    private boolean multiDay;

    private boolean recurring;
    private int interval = 1;
    private Recurrence frequency;
    private LocalDate recurrenceEndDate;
    private ByMonthDay recurrenceByMonthDay;
    private List<DayOfWeek> recurrenceByWeekDay;

    private LocalDateTime publicationDate;

    private List<TargetAudience> targetAudiences = new ArrayList<>();

    private String image;
    private String imageAlt;

    private Location location;
    private Location room;

    public Event() {
        Instant now = Instant.now();
        this.createdDate = now;
        this.modifiedDate = now;
    }

    public void init(final ZoneId zoneId, final String userName, final String customerId) {
        LocalDateTime now = LocalDateTime.now(zoneId);
        LocalDateTime tomorrow = now.plusDays(1);
        this.startDate = tomorrow.withHour(DEFAULT_START_HOUR).withMinute(0).withSecond(0);
        this.endDate = tomorrow.withHour(DEFAULT_END_HOUR).withMinute(0).withSecond(0);
        this.publicationDate = now;
        this.recurrenceEndDate = tomorrow.toLocalDate();
        this.interval = 1;
        this.createdBy = userName;
        this.modifiedBy = userName;
        this.customerId = customerId;
    }

    public void save(final ZoneId zoneId, final String userName, final Status status) throws PortalException {
        LocalDateTime now = LocalDateTime.now(zoneId);
        if (publicationDate == null) {
            publicationDate = startDate.isBefore(now) ? startDate : now;
        }
        this.status = publicationDate.isAfter(now) && status == Status.PUBLISHED ? Status.PLANNED : status;
        this.modifiedBy = userName;
        if (!this.isMultiDay()) {
            this.endDate = this.endDate.withYear(this.startDate.getYear()).withMonth(this.startDate.getMonthValue()).withDayOfMonth(this.startDate.getDayOfMonth());
        }
        if (this.isEditAll() && this.isRecurring()) {
            this.seriesInitialEndDate = this.seriesInitialEndDate.withYear(this.seriesInitialStartDate.getYear()).withMonth(this.seriesInitialStartDate.getMonthValue()).withDayOfMonth(this.seriesInitialStartDate.getDayOfMonth());
        }
        if (this.isRecurring()) {
            if (Recurrence.WEEKLY.equals(frequency) && (recurrenceByWeekDay == null || recurrenceByWeekDay.isEmpty())) {
                throw new NoWeekDaySelectedException();
            }
        } else {
            this.recurrenceEndDate = null;
            this.interval = 0;
            this.frequency = null;
            this.recurrenceByMonthDay = null;
            this.recurrenceByWeekDay = null;
        }
        if (endDate.isBefore(startDate) && !isRecurring()) {
            throw new EventEndDateBeforeStartDateException();
        }
        if(seriesInitialEndDate != null && seriesInitialStartDate !=null ){
            if (endDate.isBefore(startDate)  && !isEditAll()) {
                throw new EventEndDateBeforeStartDateException();
            }
            if (seriesInitialEndDate.isBefore(seriesInitialStartDate)  && isEditAll() ) {
                throw new EventSeriesInitialEndDateBeforeSeriesInitialStartDateException();
            }
        }
        if ( startDate.isBefore(publicationDate)) {
            throw new EventStartDateBeforePublicationDateException();
        }
        if (recurrenceEndDate != null && recurrenceEndDate.isBefore(startDate.toLocalDate())) {
            throw new EventRecurrenceEndDateBeforeStartDateException();
        }
        if (status == Status.PUBLISHED && endDate.isBefore(now)) {
            throw new EventEndDateBeforeNowException();
        }
    }

    public long getDefaultMaxNrPerRegistration() {
        return defaultMaxNrPerRegistration;
    }

    public void setDefaultMaxNrPerRegistration(long defaultMaxNrPerRegistration) {
        this.defaultMaxNrPerRegistration = defaultMaxNrPerRegistration;
    }

    public boolean isEditAll() {
        return editAll;
    }

    public void setEditAll(boolean editAll) {
        this.editAll = editAll;
    }

    public List<TargetAudience> getTargetAudiences() {
        return targetAudiences;
    }

    public boolean containsTargetAudience(final String targetAudienceId) {
        return getTargetAudiences().stream().anyMatch(targetAudience -> targetAudience.getId().equals(targetAudienceId));
    }

    public void setTargetAudiences(final List<TargetAudience> targetAudiences) {
        this.targetAudiences = targetAudiences == null ? new ArrayList<>() : targetAudiences.stream().filter(targetAudience -> StringUtils.isNotBlank(targetAudience.getValue())).collect(Collectors.toList());
    }

    public void setTargetAudienceId(final String[] targetAudienceId) {
        for (String id : targetAudienceId) {
            getTargetAudiences().add(new TargetAudience(id, StringUtils.EMPTY));
        }
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(final String eventId) {
        this.eventId = StringUtils.isBlank(eventId) ? null : eventId;
    }

    public boolean isNew() {
        return StringUtils.isBlank(eventId);
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean isRegisterable() {
        return registerable;
    }

    public void setRegisterable(boolean registerable) {
        this.registerable = registerable;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedDate() {
        return createdDate == null ? StringUtils.EMPTY : DateTimeFormatter.ISO_INSTANT.format(createdDate);
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = StringUtils.isBlank(createdDate) ? null : Instant.parse(createdDate);
    }

    public Instant getCreatedDateAsInstant() {
        return createdDate;
    }

    public void setCreatedDateAsInstant(final Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getModifiedDate() {
        return modifiedDate == null ? StringUtils.EMPTY : DateTimeFormatter.ISO_INSTANT.format(modifiedDate);
    }

    public void setModifiedDate(final String modifiedDate) {
        this.modifiedDate = StringUtils.isBlank(modifiedDate) ? null : Instant.parse(modifiedDate);
    }

    public Instant getModifiedDateAsInstant() {
        return modifiedDate;
    }

    public void setModifiedDateAsInstant(final Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public void setStartDate(final LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public LocalDateTime getSeriesInitialStartDate() {
        return seriesInitialStartDate;
    }

    public void setSeriesInitialStartDate(final LocalDateTime seriesInitialStartDate) {
        this.seriesInitialStartDate = seriesInitialStartDate;
    }


    public String getStartDateAsString(final Locale locale) {
        return this.startDate == null ? null : DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale).format(startDate);
    }

    public String getSeriesInitialStartDateAsString(final Locale locale) {
        return this.seriesInitialStartDate == null ? null : DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale).format(seriesInitialStartDate);
    }

    public void setStartYear(int startYear) {
        this.startDate = setTemporalField(this.startDate, ChronoField.YEAR, startYear);
    }

    public void setSeriesInitialStartYear(int startYear) {
        this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.YEAR, startYear);
    }

    public int getStartYear() {
        return localDateTimeWithDefaultValue(startDate).getYear();
    }

    public int getSeriesInitialStartYear() {
        return localDateTimeWithDefaultValue(seriesInitialStartDate).getYear();
    }

    public void setStartMonthIndex(int startMonthIndex) {
        this.startDate = setTemporalField(this.startDate, ChronoField.MONTH_OF_YEAR, startMonthIndex + 1);
    }

    public void setSeriesInitialStartMonthIndex(int seriesInitialStartMonthIndex) {
        this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.MONTH_OF_YEAR, seriesInitialStartMonthIndex + 1);
    }

    public int getStartMonthIndex() {
        return localDateTimeWithDefaultValue(startDate).getMonth().getValue() - 1;
    }

    public int getSeriesInitialStartMonthIndex() {
        return localDateTimeWithDefaultValue(seriesInitialStartDate).getMonth().getValue() - 1;
    }

    public void setStartDay(int startDay) {
        this.startDate = setTemporalField(this.startDate, ChronoField.DAY_OF_MONTH, startDay);
    }

    public void setSeriesInitialStartDay(int seriesInitialStartDay) {
        this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.DAY_OF_MONTH, seriesInitialStartDay);
    }

    public int getStartDay() {
        return localDateTimeWithDefaultValue(startDate).getDayOfMonth();
    }

    public int getSeriesInitialStartDay() {
        return  localDateTimeWithDefaultValue(seriesInitialStartDate).getDayOfMonth();
    }

    public void setStartHour(final int hour) {
        if (getStartAmPm() == 1) {
            this.startDate = setTemporalField(this.startDate, ChronoField.HOUR_OF_AMPM, hour2amPm(hour));
        } else {
            this.startDate = setTemporalField(this.startDate, ChronoField.HOUR_OF_DAY, hour);
        }
    }

    public void setSeriesInitialStartHour(final int hour) {
        if (getSeriesInitialStartAmPm() == 1) {
            this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.HOUR_OF_AMPM, hour2amPm(hour));
        } else {
            this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.HOUR_OF_DAY, hour);
        }
    }

    public int getStartHour() {
        return localDateTimeWithDefaultValue(startDate).get(getHourField(getStartAmPm()));
    }

    public int getSeriesInitialStartHour() {
        return localDateTimeWithDefaultValue(seriesInitialStartDate).get(getHourField(getSeriesInitialStartAmPm()));
    }

    public void setStartAmPm(final int amPm) {
        if (getStartAmPm() == 1) {
            if (amPm == 0) {
                this.startDate = setTemporalField(this.startDate, ChronoField.HOUR_OF_DAY, 12 + getStartHour());
            }
        } else {
            if (amPm == 1) {
                this.startDate = setTemporalField(this.startDate, ChronoField.HOUR_OF_AMPM, hour2amPm(getStartHour()));
            }
        }
        this.startDate = setTemporalField(this.startDate, ChronoField.AMPM_OF_DAY, amPm);
    }

    public void setSeriesInitialStartAmPm(final int amPm) {
        if (getSeriesInitialStartAmPm() == 1) {
            if (amPm == 0) {
                this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.HOUR_OF_DAY, 12 + getSeriesInitialStartHour());
            }
        } else {
            if (amPm == 1) {
                this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.HOUR_OF_AMPM, hour2amPm(getSeriesInitialStartHour()));
            }
        }
        this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.AMPM_OF_DAY, amPm);
    }

    public int getStartAmPm() {
        return localDateTimeWithDefaultValue(startDate).get(ChronoField.AMPM_OF_DAY);
    }

    public int getSeriesInitialStartAmPm() {
        return localDateTimeWithDefaultValue(seriesInitialStartDate).get(ChronoField.AMPM_OF_DAY);
    }

    public void setStartMinute(int minute) {
        this.startDate = setTemporalField(this.startDate, ChronoField.MINUTE_OF_HOUR, minute);
    }

    public void setSeriesInitialStartMinute(int minute) {
        this.seriesInitialStartDate = setTemporalField(this.seriesInitialStartDate, ChronoField.MINUTE_OF_HOUR, minute);
    }

    public int getStartMinute() {
        return localDateTimeWithDefaultValue(startDate).getMinute();
    }

    public int getSeriesInitialStartMinute() {
        return localDateTimeWithDefaultValue(seriesInitialStartDate).getMinute();
    }

    public void setEndDate(final LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void setSeriesInitialEndDate(LocalDateTime seriesInitialEnd) {
        this.seriesInitialEndDate = seriesInitialEnd;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public LocalDateTime getSeriesInitialEndDate() {
        return seriesInitialEndDate;
    }

    public String getEndDateAsString(final Locale locale) {
        return this.endDate == null ? null : DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale).format(endDate);
    }

    public void setEndYear(int endYear) {
        this.endDate = setTemporalField(this.endDate, ChronoField.YEAR, endYear);
    }

    public void setSeriesInitialEndYear(int seriesInitialEndYear) {
        this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.YEAR, seriesInitialEndYear);
    }

    public int getEndYear() {
        return localDateTimeWithDefaultValue(endDate).getYear();
    }

    public int getSeriesInitialEndYear() {
        return localDateTimeWithDefaultValue(seriesInitialEndDate).getYear();
    }

    public void setEndMonthIndex(int endMonthIndex) {
        this.endDate = setTemporalField(this.endDate, ChronoField.MONTH_OF_YEAR, endMonthIndex + 1);
    }

    public void setSeriesInitialEndMonthIndex(int seriesInitialEndMonthIndex) {
        this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.MONTH_OF_YEAR, seriesInitialEndMonthIndex + 1);
    }

    public int getEndMonthIndex() {
        return localDateTimeWithDefaultValue(endDate).getMonth().getValue() - 1;
    }

    public int getSeriesInitialEndMonthIndex() {
        return localDateTimeWithDefaultValue(seriesInitialEndDate).getMonth().getValue() - 1;
    }


    public void setEndDay(int endDay) {
        this.endDate = setTemporalField(this.endDate, ChronoField.DAY_OF_MONTH, endDay);
    }

    public void setSeriesInitialEndDay(int endDay) {
        this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.DAY_OF_MONTH, endDay);
    }

    public int getEndDay() {
        return localDateTimeWithDefaultValue(endDate).getDayOfMonth();
    }

    public int getSeriesInitialEndDay() {
        return localDateTimeWithDefaultValue(seriesInitialEndDate).getDayOfMonth();
    }


    public void setEndHour(final int hour) {
        if (getEndAmPm() == 1) {
            this.endDate = setTemporalField(this.endDate, ChronoField.HOUR_OF_AMPM, hour2amPm(hour));
        } else {
            this.endDate = setTemporalField(this.endDate, ChronoField.HOUR_OF_DAY, hour);
        }
    }

    public void setSeriesInitialEndHour(final int hour) {
        if (getSeriesInitialEndAmPm() == 1) {
            this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.HOUR_OF_AMPM, hour2amPm(hour));
        } else {
            this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.HOUR_OF_DAY, hour);
        }
    }

    public int getEndHour() {
        return localDateTimeWithDefaultValue(endDate).get(getHourField(getEndAmPm()));
    }

    public int getSeriesInitialEndHour() {
        return localDateTimeWithDefaultValue(seriesInitialEndDate).get(getHourField(getSeriesInitialEndAmPm()));
    }

    public void setEndAmPm(final int amPm) {
        if (getEndAmPm() == 1) {
            if (amPm == 0) {
                this.endDate = setTemporalField(this.endDate, ChronoField.HOUR_OF_DAY, 12 + getEndHour());
            }
        } else {
            if (amPm == 1) {
                this.endDate = setTemporalField(this.endDate, ChronoField.HOUR_OF_AMPM, hour2amPm(getEndHour()));
            }
        }
        this.endDate = setTemporalField(this.endDate, ChronoField.AMPM_OF_DAY, amPm);
    }

    public void setSeriesInitialEndAmPm(final int amPm) {
        if (getSeriesInitialEndAmPm() == 1) {
            if (amPm == 0) {
                this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.HOUR_OF_DAY, 12 + getSeriesInitialEndHour());
            }
        } else {
            if (amPm == 1) {
                this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.HOUR_OF_AMPM, hour2amPm(getSeriesInitialEndHour()));
            }
        }
        this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.AMPM_OF_DAY, amPm);
    }

    public int getEndAmPm() {
        return localDateTimeWithDefaultValue(endDate).get(ChronoField.AMPM_OF_DAY);
    }

    public int getSeriesInitialEndAmPm(){
        return localDateTimeWithDefaultValue(seriesInitialEndDate).get(ChronoField.AMPM_OF_DAY);
    }

    public void setEndMinute(int endMinute) {
        this.endDate = setTemporalField(this.endDate, ChronoField.MINUTE_OF_HOUR, endMinute);
    }

    public void setSeriesInitialEndMinute(int seriesInitialEndMinute) {
        this.seriesInitialEndDate = setTemporalField(this.seriesInitialEndDate, ChronoField.MINUTE_OF_HOUR, seriesInitialEndMinute);
    }

    public int getEndMinute() {
        return localDateTimeWithDefaultValue(endDate).getMinute();
    }

    public int getSeriesInitialEndMinute() {
        return localDateTimeWithDefaultValue(seriesInitialEndDate).getMinute();
    }

    public void setPublicationDate(final LocalDateTime publicationDate) {
        this.publicationDate = publicationDate;
    }

    public LocalDateTime getPublicationDate() {
        return publicationDate;
    }

    public String getPublicationDateAsString(final Locale locale) {
        return this.publicationDate == null ? null : DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale).format(publicationDate);
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationDate = setTemporalField(this.publicationDate, ChronoField.YEAR, publicationYear);
    }

    public int getPublicationYear() {
        return localDateTimeWithDefaultValue(publicationDate).getYear();
    }

    public void setPublicationMonthIndex(int publicationMonthIndex) {
        this.publicationDate = setTemporalField(this.publicationDate, ChronoField.MONTH_OF_YEAR, publicationMonthIndex + 1);
    }

    public int getPublicationMonthIndex() {
        return localDateTimeWithDefaultValue(publicationDate).getMonth().getValue() - 1;
    }

    public void setPublicationDay(int publicationDay) {
        this.publicationDate = setTemporalField(this.publicationDate, ChronoField.DAY_OF_MONTH, publicationDay);
    }

    public int getPublicationDay() {
        return localDateTimeWithDefaultValue(publicationDate).getDayOfMonth();
    }

    public void setPublicationHour(final int hour) {
        if (getPublicationAmPm() == 1) {
            this.publicationDate = setTemporalField(this.publicationDate, ChronoField.HOUR_OF_AMPM, hour2amPm(hour));
        } else {
            this.publicationDate = setTemporalField(this.publicationDate, ChronoField.HOUR_OF_DAY, hour);
        }
    }

    public int getPublicationHour() {
        return localDateTimeWithDefaultValue(publicationDate).get(getHourField(getPublicationAmPm()));
    }

    public void setPublicationAmPm(final int amPm) {
        if (getPublicationAmPm() == 1) {
            if (amPm == 0) {
                this.publicationDate = setTemporalField(this.publicationDate, ChronoField.HOUR_OF_DAY, 12 + getPublicationHour());
                this.publicationDate = setTemporalField(this.publicationDate, ChronoField.AMPM_OF_DAY, 1);
            }
        } else {
            if (amPm == 1) {
                this.publicationDate = setTemporalField(this.publicationDate, ChronoField.HOUR_OF_AMPM, hour2amPm(getPublicationHour()));
                this.publicationDate = setTemporalField(this.publicationDate, ChronoField.AMPM_OF_DAY, 1);
            }
        }
    }

    public int getPublicationAmPm() {
        return localDateTimeWithDefaultValue(publicationDate).get(ChronoField.AMPM_OF_DAY);
    }

    public void setPublicationMinute(int publicationMinute) {
        this.publicationDate = setTemporalField(this.publicationDate, ChronoField.MINUTE_OF_HOUR, publicationMinute);
    }

    public int getPublicationMinute() {
        return localDateTimeWithDefaultValue(publicationDate).getMinute();
    }


    public void setRecurrenceEndDate(final LocalDate recurrenceEndDate) {
        this.recurrenceEndDate = recurrenceEndDate;
    }

    public LocalDate getRecurrenceEndDate() {
        return recurrenceEndDate;
    }

    public String getRecurrenceEndDateAsString(final Locale locale) {
        return this.recurrenceEndDate == null ? null : DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT).withLocale(locale).format(recurrenceEndDate);
    }

    public void setRecurrenceEndYear(int recurrenceEndYear) {
        this.recurrenceEndDate = setTemporalField(this.recurrenceEndDate, ChronoField.YEAR, recurrenceEndYear);
    }

    public int getRecurrenceEndYear() {
        return localDateWithDefaultValue(recurrenceEndDate).getYear();
    }

    public void setRecurrenceEndMonthIndex(int recurrenceEndMonthIndex) {
        this.recurrenceEndDate = setTemporalField(this.recurrenceEndDate, ChronoField.MONTH_OF_YEAR, recurrenceEndMonthIndex + 1);
    }

    public int getRecurrenceEndMonthIndex() {
        return localDateWithDefaultValue(recurrenceEndDate).getMonth().getValue() - 1;
    }

    public void setRecurrenceEndDay(int recurrenceEndDay) {
        this.recurrenceEndDate = setTemporalField(this.recurrenceEndDate, ChronoField.DAY_OF_MONTH, recurrenceEndDay);
    }

    public int getRecurrenceEndDay() {
        return localDateWithDefaultValue(recurrenceEndDate).getDayOfMonth();
    }

    public String getStatus() {
        return status.name();
    }

    public void setStatus(String status) {
        this.status = Status.valueOf(status);
    }

    public int getNrOfAttendees() {
        return nrOfAttendees;
    }

    public void setNrOfAttendees(int nrOfAttendees) {
        this.nrOfAttendees = nrOfAttendees;
    }

    public int getMaxAttendees() {
        return maxAttendees;
    }

    public void setMaxAttendees(int maxAttendees) {
        this.maxAttendees = maxAttendees;
    }

    public String getAssetTagNames() {
        return assetTagNames;
    }

    public void setAssetTagNames(String assetTagNames) {
        this.assetTagNames = assetTagNames;
    }

    public boolean isMultiDay() {
        return multiDay;
    }

    public void setMultiDay(boolean multiDay) {
        this.multiDay = multiDay;
    }

    public boolean isRecurring() {
        return recurring;
    }

    public void setRecurring(boolean recurring) {
        this.recurring = recurring;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public Recurrence getFrequency() {
        return frequency;
    }

    public void setFrequencyAsString(final String frequency) {
        this.frequency = StringUtils.isBlank(frequency) ? null : Recurrence.valueOf(frequency);
    }

    public String getFrequencyAsString() {
        return this.frequency == null ? null : this.frequency.name();
    }

    public void setFrequency(Recurrence frequency) {
        this.frequency = frequency;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setLocation(final Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public String getLocationId() {
        return location == null ? null : location.getId();
    }

    public void setLocationId(final String id) {
        if (StringUtils.isBlank(id)) {
            this.location = null;
        } else {
            if (this.location == null) {
                this.location = new Location(id, StringUtils.EMPTY);
            } else {
                this.location.setId(id);
            }
        }
    }

    public String getLocationName() {
        return location == null ? null : location.getValue();
    }

    public void setLocationName(String name) {
        if (StringUtils.isBlank(name)) {
            this.location = null;
        } else {
            if (this.location == null) {
                this.location = new Location(generateId(name), name);
            } else {
                this.location.setValue(name);
            }
        }
    }

    public Location getRoom() {
        return room;
    }

    public void setRoom(final Location room) {
        this.room = room;
    }

    public String getRoomId() {
        return room == null ? null : room.getId();
    }

    public void setRoomId(final String id) {
        if (StringUtils.isBlank(id)) {
            this.room = null;
        } else {
            if (this.room == null) {
                this.room = new Location(id, StringUtils.EMPTY);
            } else {
                this.room.setId(id);
            }
        }
    }

    public String getRoomName() {
        return room == null ? null : room.getValue();
    }

    public void setRoomName(final String name) {
        if (StringUtils.isBlank(name)) {
            this.room = null;
        } else {
            if (this.room == null) {
                this.room = new Location(generateId(name), name);
            } else {
                this.room.setValue(name);
            }
        }
    }

    public ByMonthDay getRecurrenceByMonthDay() {
        return recurrenceByMonthDay;
    }

    public void setRecurrenceByMonthDay(final ByMonthDay recurrenceByMonthDay) {
        this.recurrenceByMonthDay = recurrenceByMonthDay;
    }

    public void setRecurrenceByMonthDayAsString(final String recurrenceByMonthDay) {
        this.recurrenceByMonthDay = StringUtils.isBlank(recurrenceByMonthDay) ? null : ByMonthDay.valueOf(recurrenceByMonthDay);
    }

    public String getRecurrenceByMonthDayAsString() {
        return recurrenceByMonthDay == null ? null : recurrenceByMonthDay.name();
    }

    public List<DayOfWeek> getRecurrenceByWeekDay() {
        return recurrenceByWeekDay;
    }

    public void setRecurrenceByWeekDay(final List<DayOfWeek> recurrenceByWeekDay) {
        this.recurrenceByWeekDay = recurrenceByWeekDay;
    }

    public void setRecurrenceByWeekDayAsString(final String[] recurrenceByWeekDay) {
        this.recurrenceByWeekDay = recurrenceByWeekDay == null ? null : Arrays.stream(recurrenceByWeekDay).map(DayOfWeek::valueOf).collect(Collectors.toList());
    }

    public String getImageAlt() {
        return imageAlt;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public boolean hasWeekday(final DayOfWeek dayOfWeek) {
        if (recurrenceByWeekDay != null) {
            return recurrenceByWeekDay.contains(dayOfWeek);
        } else {
            return false;
        }
    }

    public int getMaxNrPerRegistration() {
        return maxNrPerRegistration == 0 ? (int) defaultMaxNrPerRegistration : maxNrPerRegistration;
    }

    public void setMaxNrPerRegistration(int maxNrPerRegistration) {
        this.maxNrPerRegistration = maxNrPerRegistration;
    }

    public int getNrAttended() {
        return nrAttended;
    }

    public void setNrAttended(int nrAttended) {
        this.nrAttended = nrAttended;
    }

    public boolean isRegistrationAllowed() {
        return !isCancelled() && registerable && (nrOfAttendees < maxAttendees || maxAttendees == 0);
    }

    public boolean isFullyBooked() {
        return registerable && nrOfAttendees == maxAttendees && maxAttendees > 0;
    }

    public boolean isCancelled() { return Status.CANCELLED.equals(status);}

    public boolean isCompleted() { return Status.COMPLETED.equals(status);}

    public boolean isDraft() {
        return Status.DRAFT.equals(status);
    }

    public boolean isPublished() {
        return Status.PUBLISHED.equals(status);
    }

    public boolean isPlanned() {
        return Status.PLANNED.equals(status);
    }

    private static ChronoField getHourField(final int amPm) {
        return amPm == 0 ? ChronoField.HOUR_OF_DAY : ChronoField.HOUR_OF_AMPM;
    }

    private static int hour2amPm(int hour) {
        return hour >= 12 ? hour - 12 : hour;
    }

    private static LocalDateTime setTemporalField(final LocalDateTime localDateTime, final TemporalField field, final long value) {
        LocalDateTime newLocalDateTime = localDateTime;
        if (localDateTime == null) {
            newLocalDateTime = getDefaultLocalDateTime();
            if (value == newLocalDateTime.get(field)) {
                return null;
            }
        }
        return newLocalDateTime.with(field, value);
    }

    private static LocalDate setTemporalField(final LocalDate localDate, final TemporalField field, final long value) {
        LocalDate newLocalDate = localDate;
        if (localDate == null) {
            newLocalDate = getDefaultLocalDateTime().toLocalDate();
            if (value == newLocalDate.get(field)) {
                return null;
            }
        }
        return newLocalDate.with(field, value);
    }

    private static LocalDate localDateWithDefaultValue(final LocalDate localDate) {
        return localDate == null ? getDefaultLocalDateTime().toLocalDate() : localDate;
    }

    private static LocalDateTime localDateTimeWithDefaultValue(final LocalDateTime localDateTime) {
        return localDateTime == null ? getDefaultLocalDateTime() : localDateTime;
    }

    private static LocalDateTime getDefaultLocalDateTime() {
        Instant now = Instant.now();
        return now.atZone(ZoneId.systemDefault()).withMonth(1).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS).toLocalDateTime();
    }

    private static String generateId(final String s) {
        return String.valueOf(StringUtils.isBlank(s) ? 0 : Math.abs(s.hashCode()));
    }
}
