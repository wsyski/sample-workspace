import {ApplicationRef, ComponentFactoryResolver, Injector, NgZone, Type} from '@angular/core';

export class DynamicLoader {
    constructor(private injector: Injector) {
    }

    loadComponent<T>(component: Type<T>, dom: Element) {
        (<NgZone>this.injector.get(NgZone)).run(() => {
            const componentFactory = this.injector
                .get(ComponentFactoryResolver)
                .resolveComponentFactory(component);
            const componentRef = componentFactory.create(
                this.injector,
                [],
                dom,
            );
            this.injector.get(ApplicationRef).attachView(componentRef.hostView);
        });
    }
}
