import {FacetDto} from './facet-dto';

export interface AggregationDto {
    name: string;
    buckets: FacetDto[];
}
