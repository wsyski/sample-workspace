"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function query2QueryParams(query) {
    var queryParams = {};
    if (query.q && query.q !== '') {
        queryParams.q = query.q;
    }
    if (query.locations && query.locations.length > 0) {
        queryParams.location = query.locations;
    }
    if (query.tags && query.tags.length > 0) {
        queryParams.tag = query.tags;
    }
    if (query.targetAudiences && query.targetAudiences.length > 0) {
        queryParams.targetAudience = query.targetAudiences;
    }
    return queryParams;
}
exports.query2QueryParams = query2QueryParams;
function queryParams2Query(queryParams) {
    var query = {};
    if (queryParams.q && queryParams.q !== '') {
        query.q = queryParams.q;
    }
    var locations = toArray(queryParams.location);
    var tags = toArray(queryParams.tag);
    var targetAudiences = toArray(queryParams.targetAudience);
    if (locations && locations.length > 0) {
        query.locations = locations;
    }
    if (tags && tags.length > 0) {
        query.tags = tags;
    }
    if (targetAudiences && targetAudiences.length > 0) {
        query.targetAudiences = targetAudiences;
    }
    return query;
}
exports.queryParams2Query = queryParams2Query;
function toArray(value) {
    if (value) {
        if (typeof value === 'string' || value instanceof String) {
            var valuesAsString = value.trim();
            return valuesAsString === '' ? [] : [valuesAsString];
        }
        else if (value instanceof Array) {
            return value.filter(function (v) { return v && v !== ''; });
        }
    }
    else {
        return [];
    }
}
//# sourceMappingURL=query.js.map