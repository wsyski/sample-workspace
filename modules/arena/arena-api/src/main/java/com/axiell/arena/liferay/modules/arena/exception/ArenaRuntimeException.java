package com.axiell.arena.liferay.modules.arena.exception;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class ArenaRuntimeException extends RuntimeException implements Serializable {

    private Map<String, Object> attributes = new HashMap<>();

    public ArenaRuntimeException(final String message) {
        super(message);
    }

    public ArenaRuntimeException(final String message, final Throwable ex) {
        super(message, ex);
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("message: ").append(getMessage());
        sb.append(" attributes: ").append(Arrays.toString(getAttributes().entrySet().toArray()));
        return sb.toString();
    }
}
