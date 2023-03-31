package com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto;

import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class AttendeeDTOModelMapper {
    public final static AttendeeDTOModelMapper INSTANCE = new AttendeeDTOModelMapper();
    private final ModelMapper dto2modelMapper;
    private final ModelMapper model2dtoMapper;

    public AttendeeDTOModelMapper() {
        dto2modelMapper = new ModelMapper();
        dto2modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2modelMapper.createTypeMap(AttendeeDTO.class, Attendee.class);
        dto2modelMapper.validate();

        model2dtoMapper = new ModelMapper();
        model2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        model2dtoMapper.createTypeMap(Attendee.class, AttendeeDTO.class);
        model2dtoMapper.validate();
    }

    public Attendee toModel(AttendeeDTO dao) {
        return dto2modelMapper.map(dao, Attendee.class);
    }

    public AttendeeDTO toDto(Attendee dto) {
        return model2dtoMapper.map(dto, AttendeeDTO.class);
    }

}
