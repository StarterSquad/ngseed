define(['./module'], function (module) {
  'use strict';

  module.controller('ExampleController', function ($scope) {

    $scope.options = {
      days: Array.apply(null, Array(30)).map(function (item, i) { return i + 1; }),
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: Array.apply(null, Array(100)).map(function (item, i) { return i + 1900; })
    };

    $scope.user = {
      sex: 'woman'
    };
  });
});
