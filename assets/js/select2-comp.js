/*
    Select2 wrapper from https://github.com/splendidcode/ng-select2/blob/master/src/select2.js
    I dey feel the guy pass. I sent him an email and he sent me this code
*/

(function () {
    "use strict";
    var module = angular.module('ui.select2', []);

    module.value('uiSelect2Config', {});

    module.directive('uiSelect2', ['uiSelect2Config', '$timeout', '$compile', '$parse', '$q', '$rootScope',
      function (uiSelect2Config, $timeout, $compile, $parse, $q, $rootScope) {
          var options = {};
          if (uiSelect2Config) {
              angular.extend(options, uiSelect2Config);
          }
          return {
              require: '?ngModel',
              link: function (scope, element, attrs, ngModel) {

                  // instance-specific options
                  var opts = setupOptions();
                  setupAttributeAndClassSynchronization();
                  setupCleanupOnDestroy();

                  if (attrs.isOpen) {
                      setupIsOpenBinding();
                  }

                  if (attrs.query) {
                      setupQueryHandler();
                  } else {
                      scheduleResyncAfterEveryDigest();
                  }

                  element.select2(opts);
                  return;


                  //Privates
                  function setupOptions() {
                      return angular.extend({}, options, scope.$eval(attrs.uiSelect2));
                  }

                  function scheduleResyncAfterEveryDigest() {
                      //After every digest make sure that select2's value is in sync
                      var scheduledValue = false;
                      scope.$watch(function () {
                          //Only schedule once per digest cycle regardles of times watch is called;
                          if (!scheduledValue) {
                              scheduledValue = true;
                              $timeout(function () {
                                  //I added if statement because val() cannot be called if initSelection() is not defined ::By Olonka
                                  // This error occurs when I'm using 
                                  if (element[0].childElementCount > 0) {
                                      element.select2('val', element.val());
                                      scheduledValue = false;
                                  }
                              }, 0, false);
                          }
                      });
                  }


                  function setupIsOpenBinding() {
                      var isOpen = false;
                      var isOpenExpression = $parse(attrs.isOpen);
                      scope.$watch(isOpenExpression, function (value) {
                          if (value && !isOpen) {
                              $timeout(function () {
                                  isOpen = true;
                                  element.select2('open');
                              }, 0, false);

                          }
                          if (!value && isOpen) {
                              $timeout(function () {
                                  element.select2('close');
                                  isOpen = false;
                                  element.select2('close');
                              }, 0, false);
                          }
                      });

                      element.on('select2-open.select2', function () {
                          scope.$apply(function () {
                              isOpen = true;
                              isOpenExpression.assign(scope, true);
                          });
                      });

                      element.on('select2-close.select2', function () {
                          scope.$apply(function () {
                              isOpen = false;
                              isOpenExpression.assign(scope, false);
                          });
                      });
                  }


                  function setupCleanupOnDestroy() {
                      element.on("$destroy", function () {
                          element.select2("destroy");
                          element.off('.select2');
                      });
                  }


                  function setupAttributeAndClassSynchronization() {
                      attrs.$observe('disabled', function (value) {
                          element.select2('enable', !value);
                      });

                      attrs.$observe('readonly', function (value) {
                          element.select2('readonly', !!value);
                      });

                      // Update valid and dirty statuses
                      if (ngModel) {
                          ngModel.$parsers.push(function (value) {
                              var div = element.select2("container");
                              div
                                  .toggleClass('ng-invalid', !ngModel.$valid)
                                  .toggleClass('ng-valid', ngModel.$valid)
                                  .toggleClass('ng-invalid-required', !ngModel.$valid)
                                  .toggleClass('ng-valid-required', ngModel.$valid)
                                  .toggleClass('ng-dirty', ngModel.$dirty)
                                  .toggleClass('ng-pristine', ngModel.$pristine);
                              return value;
                          });
                      }
                  }


                  function setupQueryHandler() {
                      var queryResults = [];
                      ngModel.$parsers.unshift(function (value) {
                          var result = queryResults[value];
                          return result;
                      });

                      ngModel.$formatters.push(function (value) {
                          if (value) {
                              var label = scope.$eval(attrs.queryLabel, {
                                  option: value
                              });
                              element.select2('data', {
                                  text: label
                              });
                          }
                      });

                      opts.query = function (query) {
                          if (query.page === 1) {
                              queryResults = [];
                          }

                          var queryOptions = {
                              term: query.term,
                              page: query.page,
                              context: query.context
                          };
                          var resultPromiseOrObject = scope.$eval(attrs.query, {
                              query: queryOptions
                          });

                          $q.when(resultPromiseOrObject).then(function (result) {
                              var select2Results = [];
                              var i = queryResults.length;

                              angular.forEach(result.results, function (option) {
                                  var context = {
                                      option: option
                                  };
                                  var label = scope.$eval(attrs.queryLabel, context);
                                  select2Results.push({
                                      id: i,
                                      text: label
                                  });
                                  i++;
                              });

                              queryResults = queryResults.concat(result.results);
                              query.callback({
                                  results: select2Results,
                                  more: result.more
                              });
                          });
                      };
                  }

              }
          };
      }
    ]);
})();