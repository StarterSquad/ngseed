define(['angular'], function (angular) {

  var windowElement = angular.element(window);

  angular.module('app.ui.button-choicebox', [])
    .directive('btnChoicebox', function () {

      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModelCtrl) {

          var isCheckbox = (attrs.btnChoicebox === '');

          ngModelCtrl.$render = function () {
            if (isCheckbox) {
              element.toggleClass('__active', ngModelCtrl.$modelValue);
            } else {
              element.toggleClass('__active', ngModelCtrl.$modelValue === scope.$eval(attrs.btnChoicebox));
            }
          };

          element.bind('click', function () {
            scope.$apply(function () {
              if (isCheckbox) {
                ngModelCtrl.$setViewValue(element.hasClass('__active'));
              } else {
                ngModelCtrl.$setViewValue(scope.$eval(attrs.btnChoicebox));
              }
              ngModelCtrl.$render();
            });
          });
        }
      }
    });
});
