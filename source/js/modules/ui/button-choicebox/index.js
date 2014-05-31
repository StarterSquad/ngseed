define(['angular'], function (angular) {

  angular.module('app.ui.button-choicebox', [])
    .directive('btnChoicebox', function () {

      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModelCtrl) {

          var isCheckbox = (attrs.btnChoicebox === '');

          ngModelCtrl.$render = function () {
            if (isCheckbox) {
              var value = ngModelCtrl.$modelValue;
            } else {
              value = ngModelCtrl.$modelValue === scope.$eval(attrs.btnChoicebox);
            }
            element.toggleClass('__active', value);
          };

          element.bind('click', function () {
            scope.$apply(function () {
              if (isCheckbox) {
                var value = element.hasClass('__active');
              } else {
                value = scope.$eval(attrs.btnChoicebox);
              }
              ngModelCtrl.$setViewValue(value);
              ngModelCtrl.$render();
            });
          });
        }
      }
    });
});
