package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import com.axiell.arena.liferay.modules.calendar.model.attendee.AttendeePage;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.util.List;
import java.util.stream.Collectors;

public class AttendeePageDTOModelMapper {

    public final static AttendeePageDTOModelMapper INSTANCE = new AttendeePageDTOModelMapper();
    private final ModelMapper dao2dtoMapper;
    private final ModelMapper dto2daoMapper;

    private final Converter<List<AttendeeDTO>, List<Attendee>> attendees2AttendeDtos = ctx ->
            ctx.getSource() != null ? ctx.getSource().stream().map(AttendeeDTOModelMapper.INSTANCE::toModel).collect(Collectors.toList()) : null;
    private final Converter<List<Attendee>,List<AttendeeDTO>> attendeeDtos2Attendes = ctx ->
            ctx.getSource() != null ? ctx.getSource().stream().map(AttendeeDTOModelMapper.INSTANCE::toDto).collect(Collectors.toList()) : null;

    public AttendeePageDTOModelMapper() {
        dao2dtoMapper = new ModelMapper();
        dao2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dao2dtoMapper.createTypeMap(AttendeePageDTO.class, AttendeePage.class)
                .addMappings(mapper -> mapper.using(attendees2AttendeDtos).map(AttendeePageDTO::getContent, AttendeePage::setContent));
        dao2dtoMapper.validate();

        dto2daoMapper = new ModelMapper();
        dto2daoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2daoMapper.createTypeMap(AttendeePage.class, AttendeePageDTO.class)
                .addMappings(mapper -> mapper.using(attendeeDtos2Attendes).map(AttendeePage::getContent, AttendeePageDTO::setContent));
        dto2daoMapper.validate();
    }

    public AttendeePage toModel(AttendeePageDTO dao) {
        return dao2dtoMapper.map(dao, AttendeePage.class);
    }

    public AttendeePageDTO toDto(AttendeePage dto) {
        return dto2daoMapper.map(dto, AttendeePageDTO.class);
    }

}
