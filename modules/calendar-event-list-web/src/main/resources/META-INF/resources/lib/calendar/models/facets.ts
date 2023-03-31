import {Facet} from './facet';
import {FacetsDto} from './dto/facets-dto';
import {AggregationDto} from './dto/aggregation-dto';
import {FacetDto} from './dto/facet-dto';
import {LOCATION_FIELD_NAME, TAG_FIELD_NAME, TARGET_AUDIENCE_FIELD_NAME} from '../services/calendar.service';

export class Facets {
    public fields: Map<string, Facet[]> = new Map<string, Facet[]>();

    constructor(facetsDTO: FacetsDto) {
        this.fields.set(LOCATION_FIELD_NAME, []);
        this.fields.set(TAG_FIELD_NAME, []);
        this.fields.set(TARGET_AUDIENCE_FIELD_NAME, []);
        if (facetsDTO) {
            const aggregations = facetsDTO.aggregations;
            aggregations.forEach((aggregationDTO: AggregationDto) => {
                const facets: Facet[] = aggregationDTO.buckets.map((facetDto: FacetDto) =>
                    new Facet(facetDto.key, facetDto.count));
                this.fields.set(aggregationDTO.name, facets);
            });
        }
    }
}
