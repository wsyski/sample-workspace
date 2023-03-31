"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toggle_list_component_1 = require("./toggle-list.component");
var TimeIntervalSelectorComponent = /** @class */ (function (_super) {
    __extends(TimeIntervalSelectorComponent, _super);
    function TimeIntervalSelectorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeIntervalSelectorComponent = __decorate([
        core_1.Component({
            selector: 'app-time-interval-selector',
            template: "\n      <fieldset class=\"form-group\">\n        <legend i18n=\"@@lgdTimeIntervalSelector\">Time interval</legend>\n        <div class=\"input-group arena-event-time-intervals\">\n          <div *ngFor=\"let value of values|slice:0:end\">\n            <app-radio-toggle-component [value]=\"value\" [selectedValues]=\"selectedValues\" (selectedValuesChanged)=\"onSelectedValuesChanged($event)\">\n              <ng-container i18n=\"@@txtTimeIntervalName\">\n              {value, select,\n                ALL {All events}\n                TODAY {Today}\n                ONE_WEEK {One week ahead}\n                ONE_MONTH {One month ahead}\n                ONE_YEAR {One year ahead}\n                }\n              </ng-container>\n            </app-radio-toggle-component>\n          </div>\n        </div>\n        <ng-container *ngIf=\"isShowMore()\">\n          <div class=\"arena-facet-show-all\">\n            <a class=\"arena-show-all\" href=\"javascript:\" (click)=\"showMore()\" title=\"Show all\" i18n=\"@@lnkShowAllTimeIntervals.label\" i18n-title=\"@@lnkShowAllTimeIntervals.title\">\n              Show all\n            </a>\n          </div>\n        </ng-container>\n      </fieldset>\n    "
        })
    ], TimeIntervalSelectorComponent);
    return TimeIntervalSelectorComponent;
}(toggle_list_component_1.ToggleListComponent));
exports.TimeIntervalSelectorComponent = TimeIntervalSelectorComponent;
//# sourceMappingURL=time-interval-selector.component.js.map