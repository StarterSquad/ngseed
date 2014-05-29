define(['./module'], function (module) {
  'use strict';

  module.controller('ExampleController', ['$scope', function ($scope) {

    console.log('CTRL');

    $scope.options = {
      days: Array.apply(null, Array(30)).map(function (item, i) { return i + 1; }),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      years: Array.apply(null, Array(100)).map(function (item, i) { return i + 1900; })
    };

    $scope.user = {
      sex: 'woman'
    }
  }]);
});
