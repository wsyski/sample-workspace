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
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
        this.selectedValuesChanged = new core_1.EventEmitter();
    }
    ToggleComponent.prototype.isSelected = function () {
        return this.getSelectedIndex() >= 0;
    };
    ToggleComponent.prototype.onChange = function (event) {
        event.preventDefault();
        var selectedValues;
        if (this.isMultiselect()) {
            selectedValues = this.selectedValues || [];
            var selectedIndex = this.getSelectedIndex();
            if (selectedIndex >= 0) {
                selectedValues.splice(selectedIndex, 1);
            }
            else {
                selectedValues.push(this.value);
            }
        }
        else {
            selectedValues = [this.value];
        }
        this.selectedValuesChanged.emit(selectedValues);
    };
    ToggleComponent.prototype.isMultiselect = function () {
        return true;
    };
    ToggleComponent.prototype.getSelectedIndex = function () {
        return this.selectedValues ? this.selectedValues.indexOf(this.value) : -1;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ToggleComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ToggleComponent.prototype, "selectedValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ToggleComponent.prototype, "isTagSelector", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ToggleComponent.prototype, "selectedValuesChanged", void 0);
    ToggleComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], ToggleComponent);
    return ToggleComponent;
}());
exports.ToggleComponent = ToggleComponent;
//# sourceMappingURL=toggle.component.js.map