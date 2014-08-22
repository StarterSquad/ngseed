/**
 * Home controller definition
 */
define(['./module'], function (module) {
  'use strict';

  module.controller('HomeController', function ($scope) {
    $scope.twoTimesTwo = 2 * 2;
  });
});
