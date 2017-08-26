'use strict';

document.write(require("./base.html"));

var app  = require('./app/app');
angular.element(document).ready(function () {  
  angular.bootstrap(document, [app.app.name], {
    // strictDi: true
  });
});
