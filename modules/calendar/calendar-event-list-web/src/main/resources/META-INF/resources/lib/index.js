"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var core_1 = require("@angular/core");
// @dynamic
exports.default = (function (liferayParams) {
    if (!Liferay.isAngularProdMode) {
        Liferay.isAngularProdMode = true;
        core_1.enableProdMode();
    }
    Liferay.Loader.require('calendar-event-list@5.4.0/lib/bootstrap', function (bootstrap) {
        bootstrap.default(liferayParams);
    });
});
//# sourceMappingURL=index.js.map