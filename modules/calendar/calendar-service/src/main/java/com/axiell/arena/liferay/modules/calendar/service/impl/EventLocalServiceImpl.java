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

import com.axiell.arena.liferay.modules.arena.util.ArenaUtil;
import com.axiell.arena.liferay.modules.calendar.constants.CalendarEventConstants;
import com.axiell.arena.liferay.modules.calendar.model.event.Event;
import com.axiell.arena.liferay.modules.calendar.model.event.Facets;
import com.axiell.arena.liferay.modules.calendar.model.event.RangeFilter;
import com.axiell.arena.liferay.modules.calendar.model.event.SearchResponse;
import com.axiell.arena.liferay.modules.calendar.model.event.Sort;
import com.axiell.arena.liferay.modules.calendar.model.event.TermFilter;
import com.axiell.arena.liferay.modules.calendar.service.base.EventLocalServiceBaseImpl;
import com.axiell.arena.liferay.modules.calendar.service.model.ObjectMapperFactory;
import com.axiell.arena.liferay.modules.calendar.service.model.dto.AggregationsDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.dto.FacetDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.event.EventFacetsEnum;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.EventDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.EventDTOModelMapper;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.SearchResponseDTO;
import com.axiell.arena.liferay.modules.calendar.service.model.event.dto.SearchResponseDTOModelMapper;
import com.axiell.arena.liferay.modules.calendar.service.resource.ISearchResource;
import com.axiell.arena.liferay.modules.calendar.service.resource.SearchResourceFactory;
import com.axiell.arena.liferay.modules.calendar.service.util.JsonUtil;
import com.axiell.arena.liferay.modules.common_services.configuration.CommonServicesSystemConfiguration;
import com.axiell.arena.liferay.modules.common_services.constants.CommonServicesConstants;
import com.axiell.arena.liferay.modules.common_services.util.CommonServicesUtil;
import com.liferay.asset.kernel.service.AssetTagLocalServiceUtil;
import com.liferay.portal.aop.AopService;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.model.User;
import org.apache.cxf.jaxrs.client.WebClient;
import org.osgi.service.component.annotations.Component;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.Response;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.axiell.arena.liferay.modules.arena.util.EncodingUtil.encodePath;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

/**
 * The implementation of the ces calendar service local service.
 *
 * <p>
 * All custom service methods should be put in this class. Whenever methods are added, rerun ServiceBuilder to copy their definitions into the {@link com.axiell.arena.liferay.modules.calendar.service.EventLocalService} interface.
 *
 * <p>
 * This is a local service. Methods of this service will not have security checks based on the propagated JAAS credentials because this service can only be accessed from within the same VM.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see EventLocalServiceBaseImpl
 * @see com.axiell.arena.liferay.modules.calendar.service.EventLocalServiceUtil
 */
@Component(
        property = "model.class.name=com.axiell.arena.liferay.modules.calendar.model.Event",
        service = AopService.class
)
public class EventLocalServiceImpl extends EventLocalServiceBaseImpl {
    /*
     * NOTE FOR DEVELOPERS:
     *
     * Never reference this class directly. Always use {@link com.axiell.arena.liferay.modules.calendar.service.EventLocalServiceUtil} to access the calendar service local service.
     */

    @Override
    public Facets getEventFacets(final String customerId, final TermFilter[] termFilters, final RangeFilter[] rangeFilters) {
        ISearchResource cesSearchResource = SearchResourceFactory.INSTANCE.createResource(ISearchResource.class);
        String queryString = "*";
        List<String> aggFields = Arrays.asList(CalendarEventConstants.FIELD_LOCATION, CalendarEventConstants.FIELD_TAGS, CalendarEventConstants.FIELD_TARGET_AUDIENCE);
        AggregationsDTO aggregationsDTO = cesSearchResource.getAggregations(
                encodePath(customerId),
                queryString,
                aggFields,
                JsonUtil.toJson(ObjectMapperFactory.INSTANCE, rangeFilters),
                JsonUtil.toJson(ObjectMapperFactory.INSTANCE, termFilters)
        );
        List<String> locations = getFacetValues(aggregationsDTO, EventFacetsEnum.LOCATION);
        List<String> tags = getFacetValues(aggregationsDTO, EventFacetsEnum.TAG);
        List<String> targetAudiences = getFacetValues(aggregationsDTO, EventFacetsEnum.TARGET_AUDIENCE);
        return new Facets(locations, tags, targetAudiences);
    }

    @Override
    public Event createEvent(final Event event, final User user, final long groupId) throws PortalException {
        EventDTOModelMapper eventDTOModelMapper = createEventDTOModelMapper(user);
        EventDTO eventDto = eventDTOModelMapper.toDto(event);
        onEventDtoUpdate(user, groupId, eventDto);
        WebClient webClient = eventClient(eventDto.getCustomerId());
        Response response = webClient.post(JsonUtil.toJson(ObjectMapperFactory.INSTANCE, eventDto));
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        eventDto = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), EventDTO.class);
        return eventDTOModelMapper.toModel(eventDto);
    }

    @Override
    public Event readEvent(final String customerId, final String eventId, final User user) throws PortalException {
        EventDTOModelMapper eventDTOModelMapper = createEventDTOModelMapper(user);
        EventDTO eventDTO = get(eventClient(customerId).path(eventId), EventDTO.class);
        return eventDTOModelMapper.toModel(eventDTO);
    }

    @Override
    public Event updateEvent(final Event event, final boolean isEditAll, final User user, final long groupId) throws PortalException {
        EventDTOModelMapper eventDTOModelMapper = createEventDTOModelMapper(user);
        EventDTO eventDTO = eventDTOModelMapper.toDto(event);
        onEventDtoUpdate(user, groupId, eventDTO);
        WebClient webClient = eventClient(eventDTO.getCustomerId()).path(eventDTO.getId()).query("updateAll", Boolean.toString(isEditAll));
        Response response = webClient.put(JsonUtil.toJson(ObjectMapperFactory.INSTANCE, eventDTO));
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        eventDTO = JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), EventDTO.class);
        return eventDTOModelMapper.toModel(eventDTO);
    }

    @Override
    public void deleteEvents(String customerId, String[] eventIds) throws PortalException {
        for (String eventId : eventIds) {
            deleteEvent(customerId, eventId, false);
        }
    }

    @Override
    public void deleteEvent(final String customerId, final String eventId, final boolean isDeleteAll) throws PortalException {
        WebClient webClient = eventClient(customerId).path(eventId).query("deleteAll", String.valueOf(isDeleteAll));
        Response response = webClient.delete();
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), String.class);
    }

    @Override
    public SearchResponse searchEvents(final String customerId, final String searchQuery, final int start, final int end, final Sort sort,
                                       final TermFilter[] termFilters, final RangeFilter[] rangeFilters, final User user) throws PortalException {
        WebClient webClient = getCalendarEventsClient(customerId, start, end, searchQuery, sort, termFilters, rangeFilters);
        SearchResponseDTO searchResponse = get(webClient, SearchResponseDTO.class);
        EventDTOModelMapper eventDTOModelMapper = createEventDTOModelMapper(user);
        SearchResponseDTOModelMapper searchResponseDTOModelMapper = createSearchResponseDTOModelMapper(eventDTOModelMapper);
        return searchResponseDTOModelMapper.toModel(searchResponse);
    }

    private static List<String> getFacetValues(final AggregationsDTO aggregationsDTO, final EventFacetsEnum facetsEnum) {
        int index = facetsEnum.getIndex();
        if (aggregationsDTO.getAggregations() == null || aggregationsDTO.getAggregations().length <= index) {
            return new ArrayList<>();
        } else {
            return Arrays.stream(aggregationsDTO.getAggregations()[index].getBuckets()).map(FacetDTO::getKey).collect(Collectors.toList());
        }
    }

    private static String nowAsUtcString() {
        return OffsetDateTime.now(ZoneOffset.UTC).toString();
    }

    private static <T> T get(WebClient webClient, Class<T> responseType) throws PortalException {
        Response response = webClient.get();
        JsonUtil.checkError(ObjectMapperFactory.INSTANCE, response, webClient.getCurrentURI().toString());
        return JsonUtil.fromJson(ObjectMapperFactory.INSTANCE, response.readEntity(String.class), responseType);
    }

    private static EventDTOModelMapper createEventDTOModelMapper(final User user) {
        ZoneId zoneId = ArenaUtil.getZoneId(user);
        return new EventDTOModelMapper(zoneId);
    }

    private static SearchResponseDTOModelMapper createSearchResponseDTOModelMapper(EventDTOModelMapper eventDTOModelMapper) {
        return new SearchResponseDTOModelMapper(eventDTOModelMapper);
    }

    private void onEventDtoUpdate(final User user, final long groupId, final EventDTO eventDto) throws PortalException {
        if (eventDto.getTags() != null) {
            AssetTagLocalServiceUtil.checkTags(user.getUserId(), groupId, eventDto.getTags().toArray(new String[0]));
        }
    }


    private WebClient eventClient(final String customerId) {
        CommonServicesSystemConfiguration commonServicesSystemConfiguration = getCommonServicesSystemConfiguration();
        String calendarApiEndpoint = commonServicesSystemConfiguration.calendarApiEndpoint();
        return withAuth(WebClient.create(calendarApiEndpoint).path("customers").path(customerId)
                .path("events").type(MediaType.APPLICATION_JSON_TYPE).accept(MediaType.APPLICATION_JSON_TYPE));
    }

    private WebClient getCalendarEventsClient(String customerId, int start, int end, String query, Sort sort,
                                              TermFilter[] termFilters, RangeFilter[] rangeFilters) {
        CommonServicesSystemConfiguration calendarEventSystemConfiguration = getCommonServicesSystemConfiguration();
        if (query == null) {
            query = "*";
        }
        int size = end - start;
        String calendarApiEndpoint = calendarEventSystemConfiguration.calendarApiEndpoint();
        WebClient webClient = WebClient.create(calendarApiEndpoint).path("customers").path(customerId).path("search")
                .query("start", start).query("queryString", query).query("size", size)
                .query("sorts", JsonUtil.toJson(ObjectMapperFactory.INSTANCE, new Sort[]{sort}))
                .query("termFilters", JsonUtil.toJson(ObjectMapperFactory.INSTANCE, termFilters))
                .type(MediaType.APPLICATION_JSON_TYPE).accept(MediaType.APPLICATION_JSON_TYPE);
        if (rangeFilters != null) {
            webClient = webClient.query("rangeFilters", JsonUtil.toJson(ObjectMapperFactory.INSTANCE, rangeFilters));
        }
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
        map.put(CommonServicesConstants.HEADER_API_KEY, Collections.singletonList(calendarApiKey));
        return webClient.headers(map);
    }

    CommonServicesSystemConfiguration getCommonServicesSystemConfiguration() {
        return CommonServicesUtil.getCommonServicesSystemConfiguration();
    }
}
