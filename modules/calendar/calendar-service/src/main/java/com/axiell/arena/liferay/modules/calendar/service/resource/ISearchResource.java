package com.axiell.arena.liferay.modules.calendar.service.resource;


import com.axiell.arena.liferay.modules.calendar.service.model.dto.AggregationsDTO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public interface ISearchResource {

    @GET
    @Path("/customers/{customerId}/aggregation/terms")
    AggregationsDTO getAggregations(
            @PathParam("customerId") String customerId,
            @DefaultValue("*") @QueryParam("queryString") String queryString,
            @QueryParam("aggFields") List<String> aggFields,
            @QueryParam("rangeFilters") String rangeFilters,
            @QueryParam("termFilters") String termFilters
    );

}
