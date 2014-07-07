/**
 * Home controller definition
 */
define(['./module'], function (module) {
  'use strict';

  module.controller('HomeController', ['$scope', function ($scope) {
    $scope.twoTimesTwo = 2 * 2;
  }]);
});
