"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_service_1 = require("../services/file.service");
var portal_util_1 = require("../utils/portal-util");
function getI18nProviders(liferayParams) {
    var EMPTY_PROVIDERS = [];
    var localeId = portal_util_1.PortalUtil.getLocaleId();
    if (!localeId || localeId === 'en-US') {
        return Promise.resolve(EMPTY_PROVIDERS);
    }
    var injector = core_1.Injector.create({ providers: [{ provide: file_service_1.FileService, deps: [] }] });
    var fileService = injector.get(file_service_1.FileService);
    var translationFile = liferayParams.contextPath + "/i18n/messages." + localeId + ".xlf";
    return fileService.getFile(translationFile)
        .then(function (translations) { return [
        { provide: core_1.TRANSLATIONS, useValue: translations },
        { provide: core_1.TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: core_1.LOCALE_ID, useValue: localeId }
    ]; })
        .catch(function () { return EMPTY_PROVIDERS; });
}
exports.getI18nProviders = getI18nProviders;
//# sourceMappingURL=i18n.provider.js.map