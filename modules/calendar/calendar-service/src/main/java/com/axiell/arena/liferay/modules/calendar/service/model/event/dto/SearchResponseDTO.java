package com.axiell.arena.liferay.modules.calendar.service.model.event.dto;

import com.axiell.arena.liferay.modules.calendar.service.model.event.EventAnalytics;

import java.util.List;

public class SearchResponseDTO {
    private List<EventAnalytics> hits;
    private String name;
    private int from;
    private int size;
    private int totalHits;

    public List<EventAnalytics> getHits() {
        return hits;
    }

    public void setHits(List<EventAnalytics> hits) {
        this.hits = hits;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getTotalHits() {
        return totalHits;
    }

    public void setTotalHits(int totalHits) {
        this.totalHits = totalHits;
    }
}
