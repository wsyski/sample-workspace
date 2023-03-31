(function (exports) {
  'use strict';


  function PortletURL() {

    function createResourceURL() {
      return new ResourceURL();
    }

    return {
      createResourceURL: createResourceURL
    };
  }

  function ThemeDisplay() {
    var _languageId = 'en_US';
    var _scopeGroupId = 40915;

    function getLanguageId() {
      return _languageId;
    }

    function setLanguageId(languageId) {
      _languageId = languageId;
    }

    function getLayoutURL() {
      return '';
    }

    function getScopeGroupId() {
      return _scopeGroupId;
    }

    function setScopeGroupId(scopeGroupId) {
      _scopeGroupId = scopeGroupId;
    }

    function getLayoutRelativeURL() {
      return '/web/arena/welcome';
    }

    return {
      getLayoutURL: getLayoutURL,
      getLayoutRelativeURL: getLayoutRelativeURL,
      getLanguageId: getLanguageId,
      setLanguageId: setLanguageId,
      getScopeGroupId: getScopeGroupId,
      setScopeGroupId: setScopeGroupId
    };
  }

  function Browser() {
    var _userAgent = navigator.userAgent.toLowerCase();

    function isEdge() {
      return _userAgent.indexOf('edge') >= 0;

    }

    function isChrome() {
      if (isEdge()) {
        return false;
      }
      return _userAgent.indexOf('chrome') >= 0;

    }

    function isIe() {
      return (_userAgent.indexOf('msie') >= 0 || _userAgent.indexOf('trident') >= 0) && !_userAgent.indexOf('opera') >= 0;

    }

    return {
      isChrome: isChrome,
      isEdge: isEdge,
      isIe: isIe
    };
  }

  function Service(serviceUrl, body, callback) {
    var calendarConfig = {"calendarApiEndpoint":"https:\/\/test.axiell.io\/api\/calendar-event\/latest\/api","calendarCustomerId":"5eb14995a35e365eb4bda5ea"};
    switch(serviceUrl) {
      case `/o/common-services/v1.0/groups/${Liferay.ThemeDisplay.getScopeGroupId()}/config`:
        callback(calendarConfig);
        break;
      default:
        console.error("Invalid service url: " + serviceUrl);
    }
  }

  function ResourceURL() {
    var _baseUrl = location.origin;
    var _resourceId;
    var _portletId;

    function getPortletName(portletId) {
      if (portletId) {
        return portletId.replace(/_INSTANCE_\w+$/g, '');
      }
    }

    /*eslint no-unused-vars: off*/
    function setParameter(key, value) {
    }

    function setPortletId(portletId) {
      _portletId = portletId;
    }

    function setResourceId(resourceId) {
      _resourceId = resourceId;
    }

    function toString() {
      var url = _baseUrl + '/resources';
      if (_resourceId) {
        url += _resourceId;
      }
      var portletName = getPortletName(_portletId);
      if (portletName) {
        url += '-' + portletName;
      }
      return url + '.json';
    }

    return {
      setParameter: setParameter,
      setResourceId: setResourceId,
      setPortletId: setPortletId,
      toString: toString
    };
  }

  exports.Browser = new Browser();
  exports.PortletURL = new PortletURL();
  exports.Service = Service;
  exports.ThemeDisplay = new ThemeDisplay();
  exports.ResourceURL = ResourceURL;

}(window.Liferay = window.Liferay || {}));

