define(['angular', './module'], function (angular, module) {

  return module.directive('example', function () {

      function unindent (text) {

        // Remove leading newlines and trailing whitespace:
        text = text.replace(/^\n+/, '').replace(/\s+$/, '');

        // Detect number of spaces used for indentation:
        var indentation = text.match(/^( *)/)[1].length;

        // Expression to match those spaces on every line
        var regexp = new RegExp('^ {' + indentation + '}', 'gm');

        return text.replace(regexp, '');
      }

      return {
        replace: true,
        restrict: 'E',
        scope: true,
        templateUrl: '/js/modules/docs/example-directive.html',
        transclude: true,
        link: function (scope, element) {
          var example = element.children('.example_main').clone();
          example.find('.ng-scope').removeClass('ng-scope');
          example.find('.example-label').parent().html('');
          scope.content = unindent(example.html());
        }
      };
    });
});
