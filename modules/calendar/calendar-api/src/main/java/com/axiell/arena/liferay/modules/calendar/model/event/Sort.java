package com.axiell.arena.liferay.modules.calendar.model.event;

public class Sort {

    private String field;
    private Order order;

    public Sort(String field, Order order) {
        this.field = field;
        this.order = order;
    }

    public String getField() {
        return field;
    }

    public Order getOrder() {
        return order;
    }

    public enum Order {
        ASC,
        DESC
    }
}
