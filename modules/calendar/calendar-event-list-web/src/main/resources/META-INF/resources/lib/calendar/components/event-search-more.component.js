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
var SearchActions = require("../store/actions/event-search.actions");
var EventSearchMoreComponent = /** @class */ (function () {
    function EventSearchMoreComponent(store) {
        this.store = store;
    }
    EventSearchMoreComponent.prototype.showMore = function () {
        this.store.dispatch(new SearchActions.More());
    };
    EventSearchMoreComponent.prototype.isShowMore = function () {
        return this.store.select(fromRoot.isShowMore);
    };
    EventSearchMoreComponent = __decorate([
        core_1.Component({
            selector: 'app-event-search-more',
            template: "\n    <ng-container *ngIf=\"(isShowMore() | async )\">\n      <p class=\"text-center arena-event-list-load-more col-sm-12 col-md-12\">\n        <button class=\"btn btn-md btn-primary\" (click)=\"showMore()\" title=\"Load more events\" i18n=\"@@btnShowMoreEvents.label\" i18n-title=\"@@btnShowMoreEvents.title\">Load more events</button>\n      </p>\n    </ng-container>\n  ",
            styles: ["\n    .arena-event-list-load-more {\n      margin: 2em 0;\n    }\n\n    .arena-event-list-load-more button {\n      text-transform: uppercase;\n      min-width: 60%;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [store_1.Store])
    ], EventSearchMoreComponent);
    return EventSearchMoreComponent;
}());
exports.EventSearchMoreComponent = EventSearchMoreComponent;
//# sourceMappingURL=event-search-more.component.js.map