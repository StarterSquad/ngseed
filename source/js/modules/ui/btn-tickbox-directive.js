define(['./module'], function (module) {
  'use strict';

  module.directive('btnTickbox', function () {

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ngModelCtrl) {

        var isCheckbox = (attrs.btnTickbox === '');

        ngModelCtrl.$render = function () {
          if (isCheckbox) {
            element.toggleClass('__active', ngModelCtrl.$modelValue);
          } else {
            element.toggleClass('__active', ngModelCtrl.$modelValue === scope.$eval(attrs.btnTickbox));
          }
        };

        element.bind('click', function () {
          scope.$apply(function () {
            if (isCheckbox) {
              ngModelCtrl.$setViewValue(element.hasClass('__active'));
            } else {
              ngModelCtrl.$setViewValue(scope.$eval(attrs.btnTickbox));
            }
            ngModelCtrl.$render();
          });
        });
      }
    }
  });
});
