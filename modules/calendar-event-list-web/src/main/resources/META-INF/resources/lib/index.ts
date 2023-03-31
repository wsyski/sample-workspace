import './polyfills';

import {enableProdMode} from '@angular/core';

import LiferayParams from './core/models/liferay-params';

declare var Liferay: any;

// @dynamic

export default (liferayParams: LiferayParams) => {
    if (!Liferay.isAngularProdMode) {
        Liferay.isAngularProdMode = true;
        enableProdMode();
    }

    Liferay.Loader.require(
        'calendar-event-list@5.4.0/lib/bootstrap',
        (bootstrap: any) => {
            bootstrap.default(liferayParams);
        },
    );
};





