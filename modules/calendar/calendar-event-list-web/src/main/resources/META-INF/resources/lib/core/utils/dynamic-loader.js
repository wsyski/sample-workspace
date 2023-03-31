"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * This class loads an Angular component dynamically so that we can attach it to
 * the portlet's DOM, which is different for each portlet instance and thus,
 * cannot be determined until the page is rendered (during runtime).
 */
var DynamicLoader = /** @class */ (function () {
    function DynamicLoader(ngModuleRef) {
        this.ngModuleRef = ngModuleRef;
    }
    DynamicLoader.prototype.loadComponent = function (component, liferayParams) {
        var element = document.getElementById(liferayParams.portletElementId);
        var injector = this.ngModuleRef.injector;
        injector.get(core_1.NgZone).run(function () {
            var componentFactoryResolver = injector.get(core_1.ComponentFactoryResolver);
            var applicationRef = injector.get(core_1.ApplicationRef);
            var componentFactory = componentFactoryResolver.resolveComponentFactory(component);
            applicationRef.bootstrap(componentFactory, element);
        });
    };
    return DynamicLoader;
}());
exports.DynamicLoader = DynamicLoader;
//# sourceMappingURL=dynamic-loader.js.map