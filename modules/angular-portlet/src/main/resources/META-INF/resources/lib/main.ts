import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppComponent} from './app/app.component';
import {AppModule} from './app/app.module';
import {DynamicLoader} from './app/dynamic.loader';

export default function (rootId: any) {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then((injector: any) => {
            const dynamicLoader = new DynamicLoader(injector);
            dynamicLoader.loadComponent(AppComponent, rootId);
        });
}
