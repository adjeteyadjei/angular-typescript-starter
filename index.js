'use strict';

require('angular');
require('angular-aria');
require('angular-animate');
require('angular-ui-router');
require('bootstrap');
require('angular-ui-bootstrap');
require('angular-sanitize');
require("./assets/js/alcomponents")
require("./assets/js/alservices")
require("./assets/js/select2.js");
require("./assets/js/select2-comp.js");

//window.humanizeDuration = require('humanize-duration');
//window.moment = require('moment');
document.write(require("./base.html"));

var app  = require('./app/app');
angular.element(document).ready(function () {  
  angular.bootstrap(document, [app.app.name], {
    // strictDi: true
  });
});
