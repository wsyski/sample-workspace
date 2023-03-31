import {ApplicationRef, ComponentFactoryResolver, Injector, NgModuleRef, NgZone, Type} from '@angular/core';
import LiferayParams from '../models/liferay-params';

/**
 * This class loads an Angular component dynamically so that we can attach it to
 * the portlet's DOM, which is different for each portlet instance and thus,
 * cannot be determined until the page is rendered (during runtime).
 */
export class DynamicLoader {
    constructor(private ngModuleRef: NgModuleRef<any>) {
    }

    loadComponent<T>(component: Type<T>, liferayParams: LiferayParams) {
        const element = document.getElementById(liferayParams.portletElementId);
        const injector: Injector = this.ngModuleRef.injector;
        (<NgZone>injector.get(NgZone)).run(() => {
            const componentFactoryResolver = injector.get(ComponentFactoryResolver);
            const applicationRef = injector.get(ApplicationRef);
            const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
            applicationRef.bootstrap(componentFactory, element);
        });
    }
}
