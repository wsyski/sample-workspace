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
var TagSelectorComponent = /** @class */ (function (_super) {
    __extends(TagSelectorComponent, _super);
    function TagSelectorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagSelectorComponent = __decorate([
        core_1.Component({
            selector: 'app-tag-selector',
            template: "\n      <fieldset class=\"form-group\">\n        <legend i18n=\"@@lgdTagSelector\">Tags</legend>\n        <div class=\"input-group arena-event-tags\">\n          <ul>\n            <ng-container *ngFor=\"let value of getSortedValues(values)|slice:0:end\">\n             <li [ngClass]=\"{'arena-link-selected': isSelected(value)}\"> \n                <app-checkbox-toggle-component [value]=\"value\"  [selectedValues]=\"selectedValues\" [isTagSelector] =\"true\" (selectedValuesChanged)=\"onSelectedValuesChanged($event)\">\n                {{value}}</app-checkbox-toggle-component>\n             </li>\n            </ng-container>\n          </ul>\n        </div>\n        <ng-container *ngIf=\"isShowMore()\">\n          <div class=\"arena-facet-show-all\">\n            <a class=\"arena-show-all\" href=\"javascript:\" (click)=\"showMore()\" title=\"Show all\" i18n=\"@@lnkShowAllTags.label\" i18n-title=\"@@lnkShowAllTags.title\">\n              Show all\n            </a>\n          </div>\n        </ng-container>\n      </fieldset>\n    "
        })
    ], TagSelectorComponent);
    return TagSelectorComponent;
}(toggle_list_component_1.ToggleListComponent));
exports.TagSelectorComponent = TagSelectorComponent;
//# sourceMappingURL=tag-selector.component.js.map