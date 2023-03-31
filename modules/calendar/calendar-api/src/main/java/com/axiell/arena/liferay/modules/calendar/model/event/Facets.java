package com.axiell.arena.liferay.modules.calendar.model.event;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.List;
import java.util.stream.Collectors;

public class Facets {
    private List<String> locations;
    private List<String> tags;
    private List<String> targetAudiences;

    public Facets(final List<String> locations, final List<String> tags, final List<String> targetAudiences) {
        this.locations = locations.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        this.tags = tags.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
        this.targetAudiences = targetAudiences.stream().filter(StringUtils::isNotBlank).collect(Collectors.toList());
    }

    public List<String> getLocations() {
        return locations;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<String> getTargetAudiences() {
        return targetAudiences;
    }

    @Override
    public final String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
