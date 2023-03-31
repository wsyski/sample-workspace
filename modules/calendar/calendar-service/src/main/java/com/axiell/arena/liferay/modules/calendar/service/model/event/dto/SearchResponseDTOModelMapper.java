package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.SearchResponse;
import com.axiell.arena.liferay.modules.calendar.service.model.event.EventAnalytics;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SearchResponseDTOModelMapper {
    private final ModelMapper dto2modelMapper;
    private final ModelMapper model2dtoMapper;

    private final Converter<List<EventAnalytics>, List<Event>> eventAnalytics2Events;
    private final Converter<List<Event>, List<EventAnalytics>> events2EventAnalytics;

    public SearchResponseDTOModelMapper(final EventDTOModelMapper eventDTOModelMapper) {
        this.eventAnalytics2Events = ctx ->
                ctx.getSource() != null ? ctx.getSource().stream().map(EventAnalytics::getEvent).map(eventDTOModelMapper::toModel).collect(Collectors.toList()) : new ArrayList<Event>();

        this.events2EventAnalytics = ctx ->
                ctx.getSource() != null ? ctx.getSource().stream().map(eventDTOModelMapper::toDto).map(event -> {
                    EventAnalytics eventAnalytics = new EventAnalytics();
                    eventAnalytics.setEvent(event);
                    return eventAnalytics;
                }).collect(Collectors.toList()) : null;
        dto2modelMapper = new ModelMapper();
        dto2modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        dto2modelMapper.createTypeMap(SearchResponseDTO.class, SearchResponse.class)
                .addMappings(model2dtoMap())
                .addMappings(mapper -> mapper.using(eventAnalytics2Events).map(SearchResponseDTO::getHits, SearchResponse::setEvents));
        dto2modelMapper.validate();

        model2dtoMapper = new ModelMapper();
        model2dtoMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        model2dtoMapper.createTypeMap(SearchResponse.class, SearchResponseDTO.class)
                .addMappings(dto2daoMap())
                .addMappings(mapper -> mapper.skip(SearchResponseDTO::setName))
                .addMappings(mapper -> mapper.using(events2EventAnalytics).map(SearchResponse::getEvents, SearchResponseDTO::setHits));
        model2dtoMapper.validate();
    }

    private PropertyMap<SearchResponseDTO, SearchResponse> model2dtoMap() {
        return new PropertyMap<SearchResponseDTO, SearchResponse>() {
            @Override
            protected void configure() {
                using(ctx -> getTotalDto(((SearchResponseDTO) ctx.getSource())))
                        .map(source, destination.getTotal());

                using(ctx -> getEndDto(((SearchResponseDTO) ctx.getSource())))
                        .map(source, destination.getEnd());

                using(ctx -> getStartDto(((SearchResponseDTO) ctx.getSource())))
                        .map(source, destination.getStart());
            }
        };
    }

    private int getEndDto(SearchResponseDTO searchResponseDTO) {
        return searchResponseDTO.getFrom() + searchResponseDTO.getSize();
    }

    private int getStartDto(SearchResponseDTO searchResponseDTO) {
        return searchResponseDTO.getFrom();
    }

    private int getTotalDto(SearchResponseDTO searchResponseDTO) {
        return searchResponseDTO.getTotalHits();
    }


    private PropertyMap<SearchResponse, SearchResponseDTO> dto2daoMap() {
        return new PropertyMap<SearchResponse, SearchResponseDTO>() {
            @Override
            protected void configure() {
                using(ctx -> getTotalHitsDTO(((SearchResponse) ctx.getSource())))
                        .map(source, destination.getTotalHits());

                using(ctx -> getFromDTO(((SearchResponse) ctx.getSource())))
                        .map(source, destination.getFrom());

                using(ctx -> getSizeDTO(((SearchResponse) ctx.getSource())))
                        .map(source, destination.getSize());
            }
        };
    }

    private int getFromDTO(SearchResponse searchResponse) {
        return searchResponse.getStart();
    }

    private int getSizeDTO(SearchResponse searchResponse) {
        return searchResponse.getEnd() - searchResponse.getStart();
    }

    private int getTotalHitsDTO(SearchResponse searchResponse) {
        return searchResponse.getTotal();
    }

    public SearchResponse toModel(SearchResponseDTO searchResoonseDTO) {
        return dto2modelMapper.map(searchResoonseDTO, SearchResponse.class);
    }

    public SearchResponseDTO toDto(SearchResponse searchResponse) {
        return model2dtoMapper.map(searchResponse, SearchResponseDTO.class);
    }

}
