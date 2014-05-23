define(['angular'], function (angular) {

  var windowElement = angular.element(window);

  angular.module('app.ui.header', [])
    .directive('header', function () {
      return {
        restrict: 'C',
        link: function (scope, element, attrs) {
          function update () {
            var factor = Math.min(1, window.scrollY / height);
            var padding = 24 - 18 * factor;
            element.css({
              height: 96 - 52 * factor,
              opacity: 1 - 0.05 * factor,
              paddingBottom: padding,
              paddingTop: padding
            });
            element.find('.header_logo').css({
              width: 154 - 52 * factor
            });
            element.find('.header_menu').css({
              marginTop: 9 - 8 * factor
            });
          };
          var height = element.outerHeight();
          windowElement.bind('scroll', update);
          scope.$on('$destoy', function () {
            windowElement.unbind('scroll', update);
          });
        }
      };
    });
});
