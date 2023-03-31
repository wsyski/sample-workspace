package com.axiell.arena.liferay.modules.calendar.service.model.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE, setterVisibility = JsonAutoDetect.Visibility.NONE)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AggregationsDTO {
    private String name;
    private AggregationDTO[] aggregations;

    private AggregationsDTO() {
    }

    public String getName() {
        return name;
    }

    public AggregationDTO[] getAggregations() {
        return aggregations;
    }
}
