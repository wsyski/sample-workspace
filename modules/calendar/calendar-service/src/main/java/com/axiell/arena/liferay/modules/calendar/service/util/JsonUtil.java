package com.axiell.arena.liferay.modules.calendar.service.util;

import com.axiell.arena.liferay.modules.arena.exception.ArenaRuntimeException;
import com.axiell.arena.liferay.modules.calendar.exception.CalendarServiceException;
import com.axiell.arena.liferay.modules.calendar.exception.UnauthorizedException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.portal.kernel.exception.PortalException;
import lombok.CustomLog;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.core.Response;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@CustomLog
public class JsonUtil {
    public static final String APIERROR = "{\"apierror\":";

    private JsonUtil() {
    }

    public static <T> T fromJson(final ObjectMapper objectMapper, final String json, final Class<T> clazz) throws CalendarServiceException {
        if (StringUtils.isBlank(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, clazz);
        } catch (IOException ex) {
            log.error(ex.getMessage(), ex);
            throw new ArenaRuntimeException(ex.getMessage(), ex);
        }
    }

    public static String toJson(final ObjectMapper objectMapper, final Object o) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            objectMapper.writeValue(outputStream, o);
            return new String(outputStream.toByteArray());
        } catch (IOException ex) {
            log.error(ex.getMessage(), ex);
            throw new ArenaRuntimeException(ex.getMessage(), ex);
        }
    }

    public static void checkError(final ObjectMapper objectMapper, final Response response, final String uri) throws PortalException {
        Response.StatusType statusInfo = response.getStatusInfo();
        String msg = "url: " + uri + " status: " + statusInfo.getStatusCode();
        log.info(msg);
        if (statusInfo.getStatusCode() == 401) {
            throw new UnauthorizedException();
        } else {
            if ((statusInfo.getStatusCode() >= 400)) {
                String body = response.readEntity(String.class);
                if (body.startsWith(APIERROR)) {
                    try {
                        throw objectMapper.readValue(body, CalendarServiceException.class);
                    } catch (IOException ex) {
                        log.error(ex.getMessage(), ex);
                    }
                }
                msg += " " + statusInfo.getReasonPhrase();
                log.error(msg);
                throw new ArenaRuntimeException(msg);
            }
        }
    }
}
