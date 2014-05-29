define(['angular', './module'], function (angular, module) {

  return module.directive('example', function () {

      function unindent (text) {

        // Remove leading newlines and trailing whitespace:
        text = text.replace(/^\s*\n/, '').replace(/\s+$/, '');

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
          example.find('.ng-pristine, .ng-scope, .ng-valid').removeClass('ng-pristine ng-scope ng-valid');
          example.find('.example-label').each(function () {
            var item = $(this);
            if (item.children().length > 0) {
              item.children().unwrap();
            } else {
              item.parent().html('');
            }
          });
          scope.content = unindent(example.html());
        }
      };
    });
});
