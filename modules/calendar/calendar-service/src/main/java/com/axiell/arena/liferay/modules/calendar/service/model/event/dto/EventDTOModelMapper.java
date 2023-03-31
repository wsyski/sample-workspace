package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.ByMonthDay;
import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.Image;
import com.axiell.arena.liferay.modules.calendar.model.event.Location;
import com.axiell.arena.liferay.modules.calendar.model.event.Recurrence;
import com.axiell.arena.liferay.modules.calendar.util.TemporalUtil;
import com.google.common.collect.BiMap;
import com.google.common.collect.HashBiMap;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class EventDTOModelMapper {
    private static final BiMap<DayOfWeek, String> DAY_OF_WEEK_2_SERVICE = HashBiMap.create();

    static {
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.MONDAY, "MO");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.TUESDAY, "TU");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.WEDNESDAY, "WE");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.THURSDAY, "TH");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.FRIDAY, "FR");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.SATURDAY, "SA");
        DAY_OF_WEEK_2_SERVICE.put(DayOfWeek.SUNDAY, "SU");
    }

    private final ModelMapper dto2modelMapper;
    private final ModelMapper model2dtoMapper;
    private final ZoneId zoneId;

    private final Converter<Instant, LocalDateTime> instant2LocalDateTime = ctx -> instant2LocalDateTime(ctx.getSource());
    private final Converter<LocalDateTime, Instant> localDateTime2Instant = ctx -> localDateTime2Instant(ctx.getSource());

    public EventDTOModelMapper(final ZoneId zoneId) {
        this.zoneId = zoneId;
        dto2modelMapper = new ModelMapper();
        dto2modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2modelMapper.createTypeMap(EventDTO.class, Event.class)
                .addMappings(dto2modelMap())
                .addMappings(mapper -> mapper.skip(Event::setEditAll))
                .addMappings(mapper -> mapper.skip(Event::setDefaultMaxNrPerRegistration))
                .addMappings(mapper -> mapper.skip(Event::setCreatedDate))
                .addMappings(mapper -> mapper.skip(Event::setStartYear))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartYear))
                .addMappings(mapper -> mapper.skip(Event::setStartMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setStartDay))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartDay))
                .addMappings(mapper -> mapper.skip(Event::setStartHour))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartHour))
                .addMappings(mapper -> mapper.skip(Event::setStartAmPm))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartAmPm))
                .addMappings(mapper -> mapper.skip(Event::setStartMinute))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialStartMinute))
                .addMappings(mapper -> mapper.skip(Event::setEndYear))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndYear))
                .addMappings(mapper -> mapper.skip(Event::setEndMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setEndDay))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndDay))
                .addMappings(mapper -> mapper.skip(Event::setEndHour))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndHour))
                .addMappings(mapper -> mapper.skip(Event::setEndAmPm))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndAmPm))
                .addMappings(mapper -> mapper.skip(Event::setEndMinute))
                .addMappings(mapper -> mapper.skip(Event::setSeriesInitialEndMinute))
                .addMappings(mapper -> mapper.skip(Event::setFrequencyAsString))
                .addMappings(mapper -> mapper.skip(Event::setLocationId))
                .addMappings(mapper -> mapper.skip(Event::setLocationName))
                .addMappings(mapper -> mapper.skip(Event::setRoomId))
                .addMappings(mapper -> mapper.skip(Event::setRoomName))
                .addMappings(mapper -> mapper.skip(Event::setPublicationYear))
                .addMappings(mapper -> mapper.skip(Event::setPublicationMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setPublicationDay))
                .addMappings(mapper -> mapper.skip(Event::setPublicationHour))
                .addMappings(mapper -> mapper.skip(Event::setPublicationAmPm))
                .addMappings(mapper -> mapper.skip(Event::setPublicationMinute))
                .addMappings(mapper -> mapper.skip(Event::setRecurrenceByWeekDayAsString))
                .addMappings(mapper -> mapper.skip(Event::setRecurrenceByMonthDayAsString))
                .addMappings(mapper -> mapper.skip(Event::setRecurrenceEndYear))
                .addMappings(mapper -> mapper.skip(Event::setRecurrenceEndMonthIndex))
                .addMappings(mapper -> mapper.skip(Event::setRecurrenceEndDay))
                .addMappings(mapper -> mapper.skip(Event::setTargetAudienceId))
                .addMapping(EventDTO::getId, Event::setEventId)
                .addMapping(EventDTO::getCreatedDate, Event::setCreatedDateAsInstant)
                .addMapping(EventDTO::getModifiedDate, Event::setModifiedDateAsInstant)
                .addMappings(mapper -> mapper.using(instant2LocalDateTime).map(EventDTO::getStartDate, Event::setStartDate))
                .addMappings(mapper -> mapper.using(instant2LocalDateTime).map(EventDTO::getSeriesInitialStart, Event::setSeriesInitialStartDate))
                .addMappings(mapper -> mapper.using(instant2LocalDateTime).map(EventDTO::getEndDate, Event::setEndDate))
                .addMappings(mapper -> mapper.using(instant2LocalDateTime).map(EventDTO::getSeriesInitialEnd, Event::setSeriesInitialEndDate))
                .addMappings(mapper -> mapper.using(instant2LocalDateTime).map(EventDTO::getPublicationDate, Event::setPublicationDate));
        dto2modelMapper.validate();

        model2dtoMapper = new ModelMapper();
        model2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        model2dtoMapper.createTypeMap(Event.class, EventDTO.class)
                .addMappings(model2dtoMap())
                .addMappings(mapper -> mapper.skip(EventDTO::setModifiedDate))
                .addMappings(mapper -> mapper.skip(EventDTO::setAttachments))
                .addMappings(mapper -> mapper.skip(EventDTO::setSubjects))
                .addMappings(mapper -> mapper.skip(EventDTO::setTypes))
                .addMappings(mapper -> mapper.skip(EventDTO::setLinkedCatalogueRecordIds))
                .addMapping(Event::getEventId, EventDTO::setId)
                .addMapping(Event::getCreatedDateAsInstant, EventDTO::setCreatedDate)
                .addMapping(Event::getModifiedDateAsInstant, EventDTO::setModifiedDate)
                .addMappings(mapper -> mapper.using(localDateTime2Instant).map(Event::getStartDate, EventDTO::setStartDate))
                .addMappings(mapper -> mapper.using(localDateTime2Instant).map(Event::getSeriesInitialStartDate, EventDTO::setSeriesInitialStart))
                .addMappings(mapper -> mapper.using(localDateTime2Instant).map(Event::getEndDate, EventDTO::setEndDate))
                .addMappings(mapper -> mapper.using(localDateTime2Instant).map(Event::getSeriesInitialEndDate, EventDTO::setSeriesInitialEnd))
                .addMappings(mapper -> mapper.using(localDateTime2Instant).map(Event::getPublicationDate, EventDTO::setPublicationDate));
        model2dtoMapper.validate();
    }

    private PropertyMap<EventDTO, Event> dto2modelMap() {
        return new PropertyMap<EventDTO, Event>() {
            @Override
            protected void configure() {
                using(ctx -> isRecurring(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.isRecurring());
                using(ctx -> getFrequency(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.getFrequency());
                using(ctx -> getInterval(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.getInterval());
                using(ctx -> getRecurrenceEndDateAsLocalDate(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.getRecurrenceEndDate());
                using(ctx -> getRecurrenceByWeekDay(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.getRecurrenceByWeekDay());
                using(ctx -> getRecurrenceByMonthDay(((EventDTO) ctx.getSource()).getRecurring())).map(source, destination.getRecurrenceByMonthDay());
                using(ctx -> isMultiDay(((EventDTO) ctx.getSource()).getStartDate(), ((EventDTO) ctx.getSource()).getEndDate())).map(source, destination.isMultiDay());
                using(ctx -> getLocationName(((EventDTO) ctx.getSource()).getLocation())).map(source, destination.getLocationName());
                using(ctx -> getImage(((EventDTO) ctx.getSource()).getImages())).map(source, destination.getImage());
                using(ctx -> getImageAlt(((EventDTO) ctx.getSource()).getImages())).map(source, destination.getImageAlt());
                using(ctx -> getAssetTagNames(((EventDTO) ctx.getSource()).getTags())).map(source, destination.getAssetTagNames());
            }
        };
    }

    private PropertyMap<Event, EventDTO> model2dtoMap() {
        return new PropertyMap<Event, EventDTO>() {
            @Override
            protected void configure() {
                using(ctx -> getRecurringDTO(((Event) ctx.getSource()).getStartDate(),
                        ((Event) ctx.getSource()).isRecurring(),
                        ((Event) ctx.getSource()).getFrequency(),
                        ((Event) ctx.getSource()).getInterval(),
                        ((Event) ctx.getSource()).getRecurrenceEndDate(),
                        ((Event) ctx.getSource()).getRecurrenceByMonthDay(),
                        ((Event) ctx.getSource()).getRecurrenceByWeekDay()))
                        .map(source, destination.getRecurring());
                using(ctx -> getImagesDto(((Event) ctx.getSource()).getImage(), ((Event) ctx.getSource()).getImageAlt())).map(source, destination.getImages());
                using(ctx -> getTagsDto(((Event) ctx.getSource()).getAssetTagNames())).map(source, destination.getTags());
            }
        };
    }

    private static Object getImageAlt(final List<Image> images) {
        if (images != null && !images.isEmpty()) {
            return images.get(0).getImageCaption();
        }
        return StringUtils.EMPTY;
    }

    private static String getLocationName(Location location) {
        return location != null ? location.getValue() : "";
    }


    private static List<String> getTagsDto(String assetTagNames) {
        if (assetTagNames == null || assetTagNames.isEmpty()) {
            return null;
        } else {
            return Arrays.asList(assetTagNames.split(","));
        }
    }

    private static List<Image> getImagesDto(String image, String imageAlt) {
        if (image == null || image.isEmpty()) {
            return null;
        } else {
            Image img = new Image();
            img.setImageUrl(image);
            img.setImageId(String.valueOf(image.hashCode()));
            img.setImageCaption(imageAlt);
            img.setPrimaryImage(true);
            return Collections.singletonList(img);
        }
    }

    private static String getAssetTagNames(List<String> tags) {
        return tags != null ? String.join(",", tags) : "";
    }

    private static String getImage(List<Image> images) {
        if (images != null && !images.isEmpty()) {
            return images.get(0).getImageUrl();
        }
        return "";
    }

    private boolean isMultiDay(final Instant startDate, final Instant endDate) {
        if (startDate == null || endDate == null) {
            return false;
        }
        LocalDate startDateAsLocalDate = instant2LocalDate(startDate);
        LocalDate endDateAsLocalDate = instant2LocalDate(endDate);
        return !startDateAsLocalDate.equals(endDateAsLocalDate);
    }

    private List<DayOfWeek> getRecurrenceByWeekDay(final RecurringDTO recurringDTO) {
        if (recurringDTO != null && Recurrence.WEEKLY.name().equals(recurringDTO.getFrequency()) && recurringDTO.getByDay() != null) {
            return Arrays.stream(recurringDTO.getByDay()).map(s -> DAY_OF_WEEK_2_SERVICE.inverse().get(s)).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    private static int getInterval(RecurringDTO recurring) {
        return recurring == null ? 0 : recurring.getInterval();
    }

    private static boolean isRecurring(RecurringDTO recurring) {
        return recurring != null && recurring.getFrequency() != null;
    }

    private static Recurrence getFrequency(RecurringDTO recurring) {
        return recurring == null || StringUtils.isBlank(recurring.getFrequency())? null : Recurrence.valueOf(recurring.getFrequency());
    }

    public Event toModel(EventDTO dao) {
        return dto2modelMapper.map(dao, Event.class);
    }

    public EventDTO toDto(Event dto) {
        return model2dtoMapper.map(dto, EventDTO.class);
    }

    private RecurringDTO getRecurringDTO(final LocalDateTime startDate, final boolean recurring, final Recurrence frequency, final int interval, final LocalDate recurrenceEndDate,
                                         final ByMonthDay recurrenceByMonthDay, final List<DayOfWeek> recurrenceByWeekDay) {
        if (recurring) {
            RecurringDTO recurringDTO = new RecurringDTO();
            recurringDTO.setRepeatUntil(localDate2Instant(recurrenceEndDate));
            recurringDTO.setInterval(interval);
            recurringDTO.setFrequency(getFrequencyAsString(frequency));
            if (Recurrence.WEEKLY.equals(frequency)) {
                if (recurrenceByWeekDay != null) {
                    recurringDTO.setByDay(recurrenceByWeekDay.stream().map(DAY_OF_WEEK_2_SERVICE::get).toArray(String[]::new));
                }
                return recurringDTO;
            } else if (Recurrence.MONTHLY.equals(frequency)) {
                if (recurrenceByMonthDay == ByMonthDay.WEEK_DAY) {
                    if (startDate != null) {
                        int dayOfWeekOccurenceInMonth = TemporalUtil.getDayOfWeekOccurenceInMonth(startDate);
                        int dayOfWeekAsInt = startDate.getDayOfWeek().getValue();
                        DayOfWeek dayOfWeek = DayOfWeek.values()[dayOfWeekAsInt - 1];
                        recurringDTO.setByDay(new String[]{String.format("%d%s", dayOfWeekOccurenceInMonth, DAY_OF_WEEK_2_SERVICE.get(dayOfWeek))});
                    }
                    return recurringDTO;
                }
            }
            return recurringDTO;
        }
        return null;
    }

    private static String getFrequencyAsString(final Recurrence frequency) {
        return frequency == null ? null : frequency.name();
    }

    private ByMonthDay getRecurrenceByMonthDay(final RecurringDTO recurringDTO) {
        if (recurringDTO != null && Recurrence.MONTHLY.name().equals(recurringDTO.getFrequency())) {
            if (recurringDTO.getByDay() != null && recurringDTO.getByDay().length > 0) {
                return ByMonthDay.WEEK_DAY;
            } else {
                return ByMonthDay.MONTH_DAY;
            }
        } else {
            return null;
        }
    }

    private LocalDate getRecurrenceEndDateAsLocalDate(final RecurringDTO recurringDTO) {
        return recurringDTO == null || recurringDTO.getRepeatUntil() == null ? null : instant2LocalDate(recurringDTO.getRepeatUntil());
    }

    LocalDateTime instant2LocalDateTime(final Instant instant) {
        if (instant == null) {
            return null;
        }
        return instant.atZone(zoneId).toLocalDateTime();
    }

    Instant localDateTime2Instant(final LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.atZone(zoneId).toInstant();
    }

    LocalDate instant2LocalDate(final Instant instant) {
        if (instant == null) {
            return null;
        }
        return instant.atZone(zoneId).toLocalDate();
    }

    Instant localDate2Instant(final LocalDate localDate) {
        if (localDate == null) {
            return null;
        }
        return localDate.atStartOfDay().atZone(zoneId).toInstant();
    }
}
