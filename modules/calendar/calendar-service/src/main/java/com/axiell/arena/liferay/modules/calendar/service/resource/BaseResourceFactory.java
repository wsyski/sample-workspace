package com.axiell.arena.liferay.modules.calendar.service.resource;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import org.apache.cxf.jaxrs.client.JAXRSClientFactory;

import java.util.Collections;
import java.util.List;

public class BaseResourceFactory {
    protected static List<?> CLIENT_PROVIDERS = Collections.singletonList(new JacksonJsonProvider());

    public <T> T createResource(final String apiEndpoint, final Class<T> clazz) {
        return JAXRSClientFactory.create(apiEndpoint, clazz, Collections.singletonList(CLIENT_PROVIDERS));
    }
}
