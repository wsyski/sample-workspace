"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var fromRoot = require("../store/store");
var EventLocationFilterComponent = /** @class */ (function () {
    function EventLocationFilterComponent(store$) {
        this.store$ = store$;
    }
    EventLocationFilterComponent.prototype.ngOnInit = function () {
        this.locationsDropdown$ = this.store$.select(fromRoot.selectLocations);
    };
    EventLocationFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-event-location-filter',
            template: "\n      <ng-container>\n        <div aria-live=\"assertive\" >\n          <app-location-dropdown-selector [values]=\"locationsDropdown$ | async\"></app-location-dropdown-selector>\n        </div>\n      </ng-container>\n    ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], EventLocationFilterComponent);
    return EventLocationFilterComponent;
}());
exports.EventLocationFilterComponent = EventLocationFilterComponent;
//# sourceMappingURL=event-location-filter.component.js.map