/*
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 * <p>
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 * <p>
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.axiell.arena.liferay.modules.calendar.service.impl;

import com.axiell.arena.liferay.modules.calendar.model.attendee.Attendee;
import com.axiell.arena.liferay.modules.calendar.model.attendee.AttendeePage;
import com.axiell.arena.liferay.modules.calendar.service.base.AttendeeLocalServiceBaseImpl;
import com.axiell.arena.liferay.modules.calendar.service.model.ObjectMapperFactory;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeeDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeeDTOModelMapper;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeePageDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.attendee.dto.AttendeePageDTOModelMapper;
import com.axiell.arena.liferay.modules.calendar.service.util.JsonUtil;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.axiell.arena.liferay.modules.common_services.util.CommonServicesUtil;
import com.liferay.portal.aop.AopService;
import com.liferay.portal.kernel.exception.PortalException;
import org.apache.cxf.jaxrs.client.WebClient;
import org.osgi.service.component.annotations.Component;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.Response;
import java.util.Base64;
import java.util.Collections;

import static com.axiell.arena.liferay.modules.calendar.constants.CalendarEventConstants.CALENDAR_EVENT_DEFAULT_ATTENDEE_PAGE_SIZE;
import static com.axiell.arena.liferay.modules.common_services.constants.CommonServicesConstants.HEADER_API_KEY;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

/**
 * The implementation of the calendar event attendee local service.
 *
 * <p>
 * All custom service methods should be put in this class. Whenever methods are added, rerun ServiceBuilder to copy their definitions into the {@link com.axiell.arena.liferay.modules.calendar.service.AttendeeLocalService} interface.
 *
 * <p>
 * This is a local service. Methods of this service will not have security checks based on the propagated JAAS credentials because this service can only be accessed from within the same VM.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see AttendeeLocalServiceBaseImpl
 * @see com.axiell.arena.liferay.modules.calendar.service.AttendeeLocalServiceUtil
 */
@Component(
        property = "model.class.name=com.axiell.arena.liferay.modules.calendar.model.Attendee",
        service = AopService.class
)
public class AttendeeLocalServiceImpl
        extends AttendeeLocalServiceBaseImpl {
    /*
     * NOTE FOR DEVELOPERS:
     *
     * Never reference this class directly. Always use {@link com.axiell.arena.liferay.modules.calendar.service.AttendeeLocalServiceUtil} to access the calendar event attendee local service.
     */

    @Override
    public Attendee createAttendee(String customerId, String eventId, Attendee attendee) throws PortalException {
        AttendeeDTO attendeeDTO = AttendeeDTOModelMapper.INSTANCE.toDto(attendee);
        String attendeeJson = JsonUtil.toJson(ObjectMapperFactory.INSTANCE, attendeeDTO);
        WebClient webClient = attendeeClient(customerId, eventId, 0, CALENDAR_EVENT_DEFAULT_ATTENDEE_PAGE_SIZE);
        Response response = webClient.post(attendeeJson);
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        attendeeDTO = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), AttendeeDTO.class);
        return AttendeeDTOModelMapper.INSTANCE.toModel(attendeeDTO);
    }

    @Override
    public Attendee readAttendee(String customerId, String eventId, String attendeeId) throws PortalException {
        if (attendeeId == null || attendeeId.isEmpty()) {
            return null;
        }
        WebClient webClient = attendeeClient(customerId, eventId, 0, CALENDAR_EVENT_DEFAULT_ATTENDEE_PAGE_SIZE).path(attendeeId);
        Response response = webClient.get();
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        AttendeeDTO attendee = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), AttendeeDTO.class);
        Attendee attendeeDto = AttendeeDTOModelMapper.INSTANCE.toModel(attendee);
        attendeeDto.setCustomerId(customerId);
        attendeeDto.setEventId(eventId);
        attendeeDto.setAttendeeId(attendeeId);
        return attendeeDto;
    }

    @Override
    public Attendee updateAttendee(String customerId, String eventId, String attendeeId, Attendee attendee) throws PortalException {
        AttendeeDTO attendeeDTO = AttendeeDTOModelMapper.INSTANCE.toDto(attendee);
        final WebClient webClient = attendeeClient(customerId, eventId, 0, CALENDAR_EVENT_DEFAULT_ATTENDEE_PAGE_SIZE).path(attendeeId);
        Response response = webClient.put(JsonUtil.toJson(ObjectMapperFactory.INSTANCE, attendeeDTO));
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        attendeeDTO = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), AttendeeDTO.class);
        return AttendeeDTOModelMapper.INSTANCE.toModel(attendeeDTO);
    }

    @Override
    public void deleteAttendee(String customerId, String eventId, String attendeeId) throws PortalException {
        final WebClient webClient = attendeeClient(customerId, eventId, 0, CALENDAR_EVENT_DEFAULT_ATTENDEE_PAGE_SIZE).path(attendeeId);
        Response response = webClient.delete();
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        String json = response.readEntity(String.class);
        JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, json, String.class);
    }

    @Override
    public AttendeePage listAttendees(String customerId, String eventId, int page, int size) throws PortalException {
        final WebClient webClient = attendeeClient(customerId, eventId, page, size);
        Response response = webClient.get();
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        AttendeePageDTO attendeePageDTO = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), AttendeePageDTO.class);
        return AttendeePageDTOModelMapper.INSTANCE.toModel(attendeePageDTO);
    }

    WebClient attendeeClient(String customerId, String eventId, int page, int size) {
        CommonServicesSystemConfiguration commonServicesSystemConfiguration = getCommonServicesSystemConfiguration();
        String calendarApiEndpoint = commonServicesSystemConfiguration.calendarApiEndpoint();
        WebClient webClient = WebClient.create(calendarApiEndpoint)
                .path("customers").path(customerId)
                .path("events").path(eventId).path("attendees")
                .query("page", page)
                .query("size", size)
                .type(MediaType.APPLICATION_JSON_TYPE)
                .accept(MediaType.APPLICATION_JSON_TYPE);
        return withAuth(webClient);
    }

    private WebClient withAuth(final WebClient webClient) {
        CommonServicesSystemConfiguration commonServicesSystemConfiguration = getCommonServicesSystemConfiguration();
        String calendarApiKey = commonServicesSystemConfiguration.calendarApiKey();
        String calendarApiUser = commonServicesSystemConfiguration.calendarApiUser();
        String calendarApiPassword = commonServicesSystemConfiguration.calendarApiPassword();
        String encode = Base64.getEncoder().encodeToString((String.format("%s:%s", calendarApiUser, calendarApiPassword)).getBytes());
        MultivaluedHashMap<String, String> map = new MultivaluedHashMap<>();
        if (isNotBlank(calendarApiUser) && isNotBlank(calendarApiPassword)) {
            map.put(AUTHORIZATION, Collections.singletonList("Basic " + encode));
        }
        map.put(HEADER_API_KEY, Collections.singletonList(calendarApiKey));
        return webClient.headers(map);
    }

    CommonServicesSystemConfiguration getCommonServicesSystemConfiguration() {
        return CommonServicesUtil.getCommonServicesSystemConfiguration();
    }
}
