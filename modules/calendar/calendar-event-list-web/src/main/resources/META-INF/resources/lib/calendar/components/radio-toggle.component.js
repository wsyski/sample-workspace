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
var toggle_component_1 = require("./toggle.component");
var RadioToggleComponent = /** @class */ (function (_super) {
    __extends(RadioToggleComponent, _super);
    function RadioToggleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioToggleComponent.prototype.isMultiselect = function () {
        return false;
    };
    RadioToggleComponent = __decorate([
        core_1.Component({
            selector: 'app-radio-toggle-component',
            template: "\n          <label class=\"control-label\">\n              <input type=\"radio\" name=\"timeInterval\"[value]=\"value\" [checked]=\"isSelected()\" (change)=\"onChange($event)\"/>\n              <ng-content></ng-content>\n        </label>\n    "
        })
    ], RadioToggleComponent);
    return RadioToggleComponent;
}(toggle_component_1.ToggleComponent));
exports.RadioToggleComponent = RadioToggleComponent;
//# sourceMappingURL=radio-toggle.component.js.map