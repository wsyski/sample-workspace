package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.ByMonthDay;
import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.Image;
import com.axiell.arena.liferay.modules.calendar.model.event.Recurrence;
import com.axiell.arena.liferay.modules.calendar.service.constants.TestData;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.arrayContaining;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.iterableWithSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;

public class EventDTOModelMapperTest {
    private static final ZoneId ZONE_ID = ZoneId.of("UTC");
    private EventDTOModelMapper underTest;

    @Before
    public void setUp() {
        underTest = new EventDTOModelMapper(ZONE_ID);
    }


    @Test
    public void instant2LocalDateTime() {
        Instant instant = Instant.parse(TestData.PUBLICATION_DATE_TIMESTAMP);
        LocalDateTime localDateTime = underTest.instant2LocalDateTime(instant);
        assertThat(DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(localDateTime), is("2019-06-14T15:00:00"));
    }

    @Test
    public void localDateString2Instant() {
        LocalDateTime localDateTime = LocalDateTime.of(2019, 6, 14, 15, 0, 0);
        Instant instant = underTest.localDateTime2Instant(localDateTime);
        assertThat(DateTimeFormatter.ISO_INSTANT.format(instant), is("2019-06-14T15:00:00Z"));
    }


    @Test
    public void toModel_recurringDaily() {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setCreatedBy(TestData.CREATED_BY);
        eventDTO.setCreatedDate(Instant.parse(TestData.CREATED_DATE_TIMESTAMP));
        eventDTO.setModifiedDate(Instant.parse(TestData.MODIFIED_DATE_TIMESTAMP));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setDescription(TestData.DESCRIPTION);
        eventDTO.setId(TestData.EVENT_ID);
        eventDTO.setImages(Collections.singletonList(TestData.convertImage(TestData.IMAGE_URL, TestData.IMAGE_CAPTION)));
        eventDTO.setLocation(TestData.LOCATION);
        eventDTO.setMaxAttendees(TestData.MAX_ATTENDEES);
        eventDTO.setModifiedBy(TestData.MODIFIED_BY);
        eventDTO.setNrOfAttendees(TestData.NR_ATTENDEES);
        eventDTO.setRegisterable(TestData.REGISTERABLE);
        eventDTO.setRecurring(TestData.convertRecurring(Recurrence.DAILY.name(), TestData.INTERVAL, LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY).atStartOfDay(ZONE_ID).toInstant(), null));
        eventDTO.setRoom(TestData.ROOM);
        eventDTO.setStartDate(Instant.parse(TestData.START_DATE_TIMESTAMP));
        eventDTO.setTags(Arrays.asList(TestData.TAGS.split(",")));
        eventDTO.setTargetAudiences(Collections.singletonList(TestData.TARGET_AUDIENCE));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setStatus(TestData.STATUS);
        eventDTO.setTitle(TestData.TITLE);
        eventDTO.setPublicationDate(Instant.parse(TestData.PUBLICATION_DATE_TIMESTAMP));

        Event event = underTest.toModel(eventDTO);

        assertThat(event, is(notNullValue()));
        assertThat(event.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(event.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(event.getNrOfAttendees(), Matchers.is(TestData.NR_ATTENDEES));
        assertThat(event.isEditAll(), is(false));
        assertThat(event.getStatus(), Matchers.is(TestData.STATUS));
        assertThat(event.getTitle(), Matchers.is(TestData.TITLE));
        assertThat(event.getDescription(), Matchers.is(TestData.DESCRIPTION));
        assertThat(event.getStartYear(), Matchers.is(TestData.START_YEAR));
        assertThat(event.getStartMonthIndex(), Matchers.is(TestData.START_MONTH - 1));
        assertThat(event.getStartDay(), Matchers.is(TestData.START_DAY));
        assertThat(event.getStartHour(), Matchers.is(TestData.START_HOUR));
        assertThat(event.getStartMinute(), Matchers.is(TestData.START_MINUTE));
        assertThat(event.getEndDate(), nullValue());
        assertThat(event.getEndHour(), is(0));
        assertThat(event.getEndAmPm(), is(0));
        assertThat(event.getEndMinute(), Matchers.is(TestData.END_MINUTE));
        assertThat(event.isRecurring(), Matchers.is(TestData.RECURRING));
        assertThat(event.getInterval(), Matchers.is(TestData.INTERVAL));
        assertThat(event.getFrequency(), Matchers.is(Recurrence.DAILY));
        assertThat(event.getRecurrenceByWeekDay(), is(new ArrayList<>()));
        assertThat(event.getRecurrenceByMonthDay(), Matchers.nullValue());
        assertThat(event.getRecurrenceEndDate(), Matchers.is(LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY)));
        assertThat(event.getPublicationYear(), Matchers.is(TestData.PUBLICATION_YEAR));
        assertThat(event.getPublicationMonthIndex(), Matchers.is(TestData.PUBLICATION_MONTH - 1));
        assertThat(event.getPublicationDay(), Matchers.is(TestData.PUBLICATION_DAY));
        assertThat(event.getPublicationHour(), is(TestData.PUBLICATION_HOUR));
        assertThat(event.getPublicationMinute(), is(TestData.PUBLICATION_MINUTE));
        assertThat(event.getTargetAudiences(), Matchers.is(Collections.singletonList(TestData.TARGET_AUDIENCE)));
        assertThat(event.isRegisterable(), Matchers.is(TestData.REGISTERABLE));
        assertThat(event.getMaxAttendees(), Matchers.is(TestData.MAX_ATTENDEES));
        assertThat(event.getAssetTagNames(), Matchers.is(TestData.TAGS));
        assertThat(event.getLocationId(), Matchers.is(TestData.LOCATION.getId()));
        assertThat(event.getRoom(), Matchers.is(TestData.ROOM));
        assertThat(event.getImage(), Matchers.is(TestData.IMAGE_URL));
        assertThat(event.getCreatedDate(), Matchers.is(TestData.CREATED_DATE_TIMESTAMP));
        assertThat(event.getModifiedDate(), Matchers.is(TestData.MODIFIED_DATE_TIMESTAMP));
        assertThat(event.getCreatedBy(), Matchers.is(TestData.CREATED_BY));
    }

    @Test
    public void toModel_recurringWeekly() {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setCreatedBy(TestData.CREATED_BY);
        eventDTO.setCreatedDate(Instant.parse(TestData.CREATED_DATE_TIMESTAMP));
        eventDTO.setModifiedDate(Instant.parse(TestData.MODIFIED_DATE_TIMESTAMP));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setDescription(TestData.DESCRIPTION);
        eventDTO.setId(TestData.EVENT_ID);
        eventDTO.setImages(Collections.singletonList(TestData.convertImage(TestData.IMAGE_URL, TestData.IMAGE_CAPTION)));
        eventDTO.setLocation(TestData.LOCATION);
        eventDTO.setMaxAttendees(TestData.MAX_ATTENDEES);
        eventDTO.setModifiedBy(TestData.MODIFIED_BY);
        eventDTO.setNrOfAttendees(TestData.NR_ATTENDEES);
        eventDTO.setRegisterable(TestData.REGISTERABLE);
        eventDTO.setRecurring(TestData.convertRecurring(Recurrence.WEEKLY.name(), TestData.INTERVAL, LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY).atStartOfDay(ZONE_ID).toInstant(), TestData.WEEKLY_RECURRING_BY_DAY));
        eventDTO.setRoom(TestData.ROOM);
        eventDTO.setStartDate(Instant.parse(TestData.START_DATE_TIMESTAMP));
        eventDTO.setTags(Arrays.asList(TestData.TAGS.split(",")));
        eventDTO.setTargetAudiences(Collections.singletonList(TestData.TARGET_AUDIENCE));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setStatus(TestData.STATUS);
        eventDTO.setTitle(TestData.TITLE);
        eventDTO.setPublicationDate(Instant.parse(TestData.PUBLICATION_DATE_TIMESTAMP));

        Event result = underTest.toModel(eventDTO);

        assertThat(result, is(notNullValue()));
        assertThat(result.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(result.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(result.getNrOfAttendees(), Matchers.is(TestData.NR_ATTENDEES));
        assertThat(result.isEditAll(), is(false));
        assertThat(result.getStatus(), Matchers.is(TestData.STATUS));
        assertThat(result.getTitle(), Matchers.is(TestData.TITLE));
        assertThat(result.getDescription(), Matchers.is(TestData.DESCRIPTION));
        assertThat(result.getStartYear(), Matchers.is(TestData.START_YEAR));
        assertThat(result.getStartMonthIndex(), Matchers.is(TestData.START_MONTH - 1));
        assertThat(result.getStartDay(), Matchers.is(TestData.START_DAY));
        assertThat(result.getStartHour(), Matchers.is(TestData.START_HOUR));
        assertThat(result.getStartMinute(), Matchers.is(TestData.START_MINUTE));
        assertThat(result.getEndDate(), nullValue());
        assertThat(result.getEndHour(), is(0));
        assertThat(result.getEndAmPm(), is(0));
        assertThat(result.getEndMinute(), Matchers.is(TestData.END_MINUTE));
        assertThat(result.isRecurring(), Matchers.is(TestData.RECURRING));
        assertThat(result.isMultiDay(), is(false));
        assertThat(result.getInterval(), Matchers.is(TestData.INTERVAL));
        assertThat(result.getFrequency(), Matchers.is(Recurrence.valueOf(Recurrence.WEEKLY.name())));
        assertThat(result.getRecurrenceByWeekDay(), is(Arrays.asList(DayOfWeek.MONDAY, DayOfWeek.FRIDAY)));
        assertThat(result.getRecurrenceByMonthDay(), Matchers.nullValue());
        assertThat(result.getRecurrenceEndYear(), Matchers.is(TestData.RECURRENCE_END_YEAR));
        assertThat(result.getRecurrenceEndMonthIndex(), Matchers.is(TestData.RECURRENCE_END_MONTH - 1));
        assertThat(result.getRecurrenceEndDay(), Matchers.is(TestData.RECURRENCE_END_DAY));
        assertThat(result.getPublicationYear(), Matchers.is(TestData.PUBLICATION_YEAR));
        assertThat(result.getPublicationMonthIndex(), Matchers.is(TestData.PUBLICATION_MONTH - 1));
        assertThat(result.getPublicationDay(), Matchers.is(TestData.PUBLICATION_DAY));
        assertThat(result.getPublicationHour(), is(TestData.PUBLICATION_HOUR));
        assertThat(result.getPublicationAmPm(), is(1));
        assertThat(result.getPublicationMinute(), is(TestData.PUBLICATION_MINUTE));
        assertThat(result.getTargetAudiences(), Matchers.is(Collections.singletonList(TestData.TARGET_AUDIENCE)));
        assertThat(result.isRegisterable(), Matchers.is(TestData.REGISTERABLE));
        assertThat(result.getMaxAttendees(), Matchers.is(TestData.MAX_ATTENDEES));
        assertThat(result.getAssetTagNames(), Matchers.is(TestData.TAGS));
        assertThat(result.getLocationId(), Matchers.is(TestData.LOCATION.getId()));
        assertThat(result.getRoom(), Matchers.is(TestData.ROOM));
        assertThat(result.getImage(), Matchers.is(TestData.IMAGE_URL));
        assertThat(result.getImageAlt(), Matchers.is(TestData.IMAGE_CAPTION));
        assertThat(result.getCreatedDate(), Matchers.is(TestData.CREATED_DATE_TIMESTAMP));
        assertThat(result.getModifiedDate(), Matchers.is(TestData.MODIFIED_DATE_TIMESTAMP));
        assertThat(result.getCreatedBy(), Matchers.is(TestData.CREATED_BY));
    }

    @Test
    public void toModel_recurringMonthly() {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setCreatedBy(TestData.CREATED_BY);
        eventDTO.setCreatedDate(Instant.parse(TestData.CREATED_DATE_TIMESTAMP));
        eventDTO.setModifiedDate(Instant.parse(TestData.MODIFIED_DATE_TIMESTAMP));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setDescription(TestData.DESCRIPTION);
        eventDTO.setId(TestData.EVENT_ID);
        eventDTO.setImages(Collections.singletonList(TestData.convertImage(TestData.IMAGE_URL, TestData.IMAGE_CAPTION)));
        eventDTO.setLocation(TestData.LOCATION);
        eventDTO.setMaxAttendees(TestData.MAX_ATTENDEES);
        eventDTO.setModifiedBy(TestData.MODIFIED_BY);
        eventDTO.setNrOfAttendees(TestData.NR_ATTENDEES);
        eventDTO.setRegisterable(TestData.REGISTERABLE);
        eventDTO.setRecurring(TestData.convertRecurring(Recurrence.MONTHLY.name(), TestData.INTERVAL, LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY).atStartOfDay(ZONE_ID).toInstant(), TestData.MONTHLY_RECURRING_BY_DAY));
        eventDTO.setRoom(TestData.ROOM);
        eventDTO.setStartDate(Instant.parse(TestData.START_DATE_TIMESTAMP));
        eventDTO.setTags(Arrays.asList(TestData.TAGS.split(",")));
        eventDTO.setTargetAudiences(Collections.singletonList(TestData.TARGET_AUDIENCE));
        eventDTO.setCustomerId(TestData.CUSTOMER_ID);
        eventDTO.setStatus(TestData.STATUS);
        eventDTO.setTitle(TestData.TITLE);
        eventDTO.setPublicationDate(Instant.parse(TestData.PUBLICATION_DATE_TIMESTAMP));

        Event result = underTest.toModel(eventDTO);

        assertThat(result, is(notNullValue()));
        assertThat(result.getEventId(), Matchers.is(TestData.EVENT_ID));
        assertThat(result.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(result.getNrOfAttendees(), Matchers.is(TestData.NR_ATTENDEES));
        assertThat(result.isEditAll(), is(false));
        assertThat(result.getStatus(), Matchers.is(TestData.STATUS));
        assertThat(result.getTitle(), Matchers.is(TestData.TITLE));
        assertThat(result.getDescription(), Matchers.is(TestData.DESCRIPTION));
        assertThat(result.getStartYear(), Matchers.is(TestData.START_YEAR));
        assertThat(result.getStartMonthIndex(), Matchers.is(TestData.START_MONTH - 1));
        assertThat(result.getStartDay(), Matchers.is(TestData.START_DAY));
        assertThat(result.getStartHour(), Matchers.is(TestData.START_HOUR));
        assertThat(result.getStartMinute(), Matchers.is(TestData.START_MINUTE));
        assertThat(result.getEndDate(), nullValue());
        assertThat(result.getEndHour(), is(0));
        assertThat(result.getEndAmPm(), is(0));
        assertThat(result.getEndMinute(), Matchers.is(TestData.END_MINUTE));
        assertThat(result.isRecurring(), Matchers.is(TestData.RECURRING));
        assertThat(result.isMultiDay(), is(false));
        assertThat(result.getInterval(), Matchers.is(TestData.INTERVAL));
        assertThat(result.getFrequency(), Matchers.is(Recurrence.valueOf(Recurrence.MONTHLY.name())));
        assertThat(result.getRecurrenceByMonthDay(), Matchers.is(ByMonthDay.WEEK_DAY));
        assertThat(result.getRecurrenceEndYear(), Matchers.is(TestData.RECURRENCE_END_YEAR));
        assertThat(result.getRecurrenceEndMonthIndex(), Matchers.is(TestData.RECURRENCE_END_MONTH - 1));
        assertThat(result.getRecurrenceEndDay(), Matchers.is(TestData.RECURRENCE_END_DAY));
        assertThat(result.getPublicationYear(), Matchers.is(TestData.PUBLICATION_YEAR));
        assertThat(result.getPublicationMonthIndex(), Matchers.is(TestData.PUBLICATION_MONTH - 1));
        assertThat(result.getPublicationDay(), Matchers.is(TestData.PUBLICATION_DAY));
        assertThat(result.getPublicationHour(), is(TestData.PUBLICATION_HOUR));
        assertThat(result.getPublicationAmPm(), is(1));
        assertThat(result.getPublicationMinute(), is(TestData.PUBLICATION_MINUTE));
        assertThat(result.getTargetAudiences(), Matchers.is(Collections.singletonList(TestData.TARGET_AUDIENCE)));
        assertThat(result.isRegisterable(), Matchers.is(TestData.REGISTERABLE));
        assertThat(result.getMaxAttendees(), Matchers.is(TestData.MAX_ATTENDEES));
        assertThat(result.getAssetTagNames(), Matchers.is(TestData.TAGS));
        assertThat(result.getLocationId(), Matchers.is(TestData.LOCATION.getId()));
        assertThat(result.getRoom(), Matchers.is(TestData.ROOM));
        assertThat(result.getImage(), Matchers.is(TestData.IMAGE_URL));
        assertThat(result.getImageAlt(), Matchers.is(TestData.IMAGE_CAPTION));
        assertThat(result.getCreatedDate(), Matchers.is(TestData.CREATED_DATE_TIMESTAMP));
        assertThat(result.getModifiedDate(), Matchers.is(TestData.MODIFIED_DATE_TIMESTAMP));
        assertThat(result.getCreatedBy(), Matchers.is(TestData.CREATED_BY));
    }

    @Test
    public void toDto() {
        Event event = new Event();
        event.setCreatedBy(TestData.CREATED_BY);
        event.setCreatedDate(TestData.CREATED_DATE_TIMESTAMP);
        event.setModifiedDate(TestData.MODIFIED_DATE_TIMESTAMP);
        event.setCustomerId(TestData.CUSTOMER_ID);
        event.setDescription(TestData.DESCRIPTION);
        event.setEventId(TestData.EVENT_ID);
        event.setImage(TestData.IMAGE_URL);
        event.setImageAlt(TestData.IMAGE_CAPTION);
        event.setLocationId(TestData.LOCATION.getId());
        event.setLocationName(TestData.LOCATION.getValue());
        event.setMaxAttendees(TestData.MAX_ATTENDEES);
        event.setModifiedBy(TestData.MODIFIED_BY);
        event.setNrOfAttendees(TestData.NR_ATTENDEES);
        event.setRegisterable(TestData.REGISTERABLE);
        event.setRecurring(true);
        event.setEditAll(TestData.EDIT_ALL);
        event.setRecurrenceEndDate(LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY));
        event.setFrequency(Recurrence.WEEKLY);
        event.setInterval(TestData.INTERVAL);
        event.setRecurrenceByWeekDayAsString(new String[]{"MONDAY", "FRIDAY"});
        event.setRoom(TestData.ROOM);
        event.setStartYear(TestData.START_YEAR);
        event.setStartMonthIndex(TestData.START_MONTH - 1);
        event.setStartDay(TestData.START_DAY);
        event.setStartHour(TestData.START_HOUR);
        event.setStartAmPm(1);
        event.setStartMinute(TestData.START_MINUTE);
        event.setPublicationDate(LocalDate.parse(TestData.PUBLICATION_DATE2, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay());
        event.setPublicationHour(TestData.PUBLICATION_HOUR2);
        event.setPublicationMinute(TestData.PUBLICATION_MINUTE);
        event.setAssetTagNames(TestData.TAGS);
        event.setTargetAudiences(Collections.singletonList(TestData.TARGET_AUDIENCE));
        event.setCustomerId(TestData.CUSTOMER_ID);
        event.setStatus(TestData.STATUS);
        event.setTitle(TestData.TITLE);

        EventDTO eventDTO = underTest.toDto(event);

        assertThat(eventDTO.getCreatedBy(), Matchers.is(TestData.CREATED_BY));
        assertThat(eventDTO.getCreatedDate(), is(Instant.parse(TestData.CREATED_DATE_TIMESTAMP)));
        assertThat(eventDTO.getModifiedDate(), is(Instant.parse(TestData.MODIFIED_DATE_TIMESTAMP)));
        assertThat(eventDTO.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(eventDTO.getDescription(), Matchers.is(TestData.DESCRIPTION));
        assertThat(eventDTO.getId(), Matchers.is(TestData.EVENT_ID));
        List<Image> images = eventDTO.getImages();
        assertThat(images, iterableWithSize(1));
        assertThat(images.get(0).getImageUrl(), Matchers.is(TestData.IMAGE_URL));
        assertThat(images.get(0).getImageCaption(), Matchers.is(TestData.IMAGE_CAPTION));
        assertThat(images.get(0).getImageId(), Matchers.is(String.valueOf(TestData.IMAGE_URL.hashCode())));
        assertThat(images.get(0).isPrimaryImage(), is(true));
        assertThat(eventDTO.getLocation(), is(notNullValue()));
        assertThat(eventDTO.getLocation().getId(), Matchers.is(String.valueOf(TestData.LOCATION.getId())));
        assertThat(eventDTO.getMaxAttendees(), Matchers.is(TestData.MAX_ATTENDEES));
        assertThat(eventDTO.getModifiedBy(), Matchers.is(TestData.MODIFIED_BY));
        assertThat(eventDTO.getNrOfAttendees(), Matchers.is(TestData.NR_ATTENDEES));
        assertThat(eventDTO.getModifiedDate(), is(Instant.parse(TestData.MODIFIED_DATE_TIMESTAMP)));
        assertThat(eventDTO.isRegisterable(), Matchers.is(TestData.REGISTERABLE));
        assertThat(eventDTO.getRecurring(), is(notNullValue()));
        assertThat(eventDTO.getRecurring().getFrequency(), Matchers.is(Recurrence.WEEKLY.name()));
        assertThat(eventDTO.getRecurring().getInterval(), Matchers.is(TestData.INTERVAL));
        assertThat(eventDTO.getRecurring().getByDay(), is(arrayContaining("MO", "FR")));
        assertThat(eventDTO.getRecurring().getRepeatUntil(), is(Instant.parse(TestData.RECURRENCE_END_TIMESTAMP)));
        assertThat(eventDTO.getRoom(), Matchers.is(TestData.ROOM));
        assertThat(eventDTO.getStartDate(), is(Instant.parse(TestData.START_DATE_TIMESTAMP)));
        assertThat(eventDTO.getPublicationDate(), is(Instant.parse(TestData.PUBLICATION_DATE_TIMESTAMP2)));
        assertThat(eventDTO.getTags(), Matchers.is(Arrays.asList(TestData.TAGS.split(","))));
        assertThat(eventDTO.getTargetAudiences(), is(notNullValue()));
        assertThat(eventDTO.getTargetAudiences(), Matchers.is(Collections.singletonList(TestData.TARGET_AUDIENCE)));
        assertThat(eventDTO.getCustomerId(), Matchers.is(TestData.CUSTOMER_ID));
        assertThat(eventDTO.getStatus(), Matchers.is(TestData.STATUS));
        assertThat(eventDTO.getTitle(), Matchers.is(TestData.TITLE));
    }

    @Test
    public void toModel_noTags() {
        Event event = new Event();
        event.setCreatedBy(TestData.CREATED_BY);
        event.setCreatedDate(TestData.CREATED_DATE_TIMESTAMP);
        event.setModifiedDate(TestData.MODIFIED_DATE_TIMESTAMP);
        event.setCustomerId(TestData.CUSTOMER_ID);
        event.setDescription(TestData.DESCRIPTION);
        event.setEventId(TestData.EVENT_ID);
        event.setImage(TestData.IMAGE_URL);
        event.setLocationId(TestData.LOCATION.getId());
        event.setLocationName(TestData.LOCATION.getValue());
        event.setMaxAttendees(TestData.MAX_ATTENDEES);
        event.setModifiedBy(TestData.MODIFIED_BY);
        event.setNrOfAttendees(TestData.NR_ATTENDEES);
        event.setRegisterable(TestData.REGISTERABLE);
        event.setRecurring(true);
        event.setEditAll(TestData.EDIT_ALL);
        event.setRecurrenceEndDate(LocalDate.of(TestData.RECURRENCE_END_YEAR, TestData.RECURRENCE_END_MONTH, TestData.RECURRENCE_END_DAY));
        event.setFrequency(Recurrence.WEEKLY);
        event.setInterval(TestData.INTERVAL);
        event.setRecurrenceByWeekDayAsString(new String[]{"MONDAY", "FRIDAY"});
        event.setRoom(TestData.ROOM);
        event.setStartYear(TestData.START_YEAR);
        event.setStartMonthIndex(TestData.START_MONTH - 1);
        event.setStartDay(TestData.START_DAY);
        event.setStartHour(TestData.START_HOUR);
        event.setStartAmPm(1);
        event.setStartMinute(TestData.START_MINUTE);
        event.setPublicationDate(LocalDate.parse(TestData.PUBLICATION_DATE2, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay());
        event.setPublicationHour(TestData.PUBLICATION_HOUR2);
        event.setPublicationMinute(TestData.PUBLICATION_MINUTE);
        event.setAssetTagNames("");
        event.setTargetAudiences(Collections.singletonList(TestData.TARGET_AUDIENCE));
        event.setCustomerId(TestData.CUSTOMER_ID);
        event.setStatus(TestData.STATUS);
        event.setTitle(TestData.TITLE);
        EventDTO result = underTest.toDto(event);
        assertThat(result.getTags(), is(empty()));
    }
}
