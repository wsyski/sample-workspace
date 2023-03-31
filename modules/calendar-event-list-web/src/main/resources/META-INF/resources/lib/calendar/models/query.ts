export interface Query {
    q?: string;
    locations?: string[];
    tags?: string[];
    targetAudiences?: string[];
}

export interface QueryParams {
    q?: string;
    location?: string | string[];
    tag?: string | string[];
    targetAudience?: string | string[];
}

export function query2QueryParams(query: Query): QueryParams {
    const queryParams: QueryParams = {};
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

export function queryParams2Query(queryParams: QueryParams): Query {
    const query: Query = {};
    if (queryParams.q && queryParams.q !== '') {
        query.q = queryParams.q;
    }
    const locations = toArray(queryParams.location);
    const tags = toArray(queryParams.tag);
    const targetAudiences = toArray(queryParams.targetAudience);
    if (locations && locations.length > 0) {
        query.locations = locations;
    }
    if (tags  && tags.length > 0) {
        query.tags = tags;
    }
    if (targetAudiences  && targetAudiences.length > 0) {
        query.targetAudiences = targetAudiences;
    }
    return query;
}

function toArray(value: string | string[]): string[] {
    if (value) {
        if (typeof value === 'string' || value instanceof String) {
            const valuesAsString = <string>value.trim();
            return valuesAsString === '' ? [] : [valuesAsString];
        } else if (value instanceof Array) {
            return value.filter(v => v && v !== '');
        }
    } else {
        return [];
    }
}

