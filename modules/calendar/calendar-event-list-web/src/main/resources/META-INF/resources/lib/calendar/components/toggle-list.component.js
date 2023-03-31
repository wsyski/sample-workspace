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
var portal_util_1 = require("../../core/utils/portal-util");
var ToggleListComponent = /** @class */ (function () {
    function ToggleListComponent() {
        this.selectedValuesChanged = new core_1.EventEmitter();
    }
    ToggleListComponent.prototype.ngOnInit = function () {
        this.end = this.pageSize;
    };
    ToggleListComponent.prototype.showMore = function () {
        this.end += Number.MAX_SAFE_INTEGER;
    };
    ToggleListComponent.prototype.isShowMore = function () {
        return this.values.length > this.end;
    };
    ToggleListComponent.prototype.onSelectedValuesChanged = function (selectedValues) {
        this.selectedValues = selectedValues;
        this.selectedValuesChanged.emit(selectedValues);
    };
    ToggleListComponent.prototype.isSelected = function (value) {
        return this.getSelectedIndex(value) >= 0;
    };
    ToggleListComponent.prototype.getSelectedIndex = function (value) {
        return this.selectedValues ? this.selectedValues.indexOf(value) : -1;
    };
    ToggleListComponent.prototype.getSortedValues = function (values) {
        var localeId = portal_util_1.PortalUtil.getLocaleId().slice(0, 2);
        return localeId.length === 2 ? values.sort(new Intl.Collator(localeId).compare) : values.sort(Intl.Collator().compare);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ToggleListComponent.prototype, "values", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ToggleListComponent.prototype, "selectedValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ToggleListComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ToggleListComponent.prototype, "selectedValuesChanged", void 0);
    ToggleListComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], ToggleListComponent);
    return ToggleListComponent;
}());
exports.ToggleListComponent = ToggleListComponent;
//# sourceMappingURL=toggle-list.component.js.map