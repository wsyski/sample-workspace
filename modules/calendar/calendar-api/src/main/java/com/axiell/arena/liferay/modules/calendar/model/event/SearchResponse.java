package com.axiell.arena.liferay.modules.calendar.model.event;

import java.util.List;

public class SearchResponse {

    private int _end;
    private int _start;
    private int _total;

    private List<Event> _events;

    private SearchResponse() {
    }

    public SearchResponse(List<Event> events, int total, int start, int end) {
        _events = events;
        _total = total;
        _start = start;
        _end = end;
    }

    public int getEnd() {
        return _end;
    }

    public int getPage() {
        if ((_end > 0) && (_start >= 0)) {
            return _end / (_end - _start);
        }
        return 0;
    }

    public int getStart() {
        return _start;
    }

    public int getTotal() {
        return _total;
    }

    public List<Event> getEvents() {
        return _events;
    }

    public void setEnd(int end) {
        _end = end;
    }

    public void setStart(int start) {
        _start = start;
    }

    public void setTotal(int total) {
        _total = total;
    }

    public void setEvents(List<Event> events) {
        _events = events;
    }
}
