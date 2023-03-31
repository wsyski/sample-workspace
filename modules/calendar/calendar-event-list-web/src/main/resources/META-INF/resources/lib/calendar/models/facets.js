"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var facet_1 = require("./facet");
var calendar_service_1 = require("../services/calendar.service");
var Facets = /** @class */ (function () {
    function Facets(facetsDTO) {
        var _this = this;
        this.fields = new Map();
        this.fields.set(calendar_service_1.LOCATION_FIELD_NAME, []);
        this.fields.set(calendar_service_1.TAG_FIELD_NAME, []);
        this.fields.set(calendar_service_1.TARGET_AUDIENCE_FIELD_NAME, []);
        if (facetsDTO) {
            var aggregations = facetsDTO.aggregations;
            aggregations.forEach(function (aggregationDTO) {
                var facets = aggregationDTO.buckets.map(function (facetDto) {
                    return new facet_1.Facet(facetDto.key, facetDto.count);
                });
                _this.fields.set(aggregationDTO.name, facets);
            });
        }
    }
    return Facets;
}());
exports.Facets = Facets;
//# sourceMappingURL=facets.js.map