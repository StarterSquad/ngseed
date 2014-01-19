/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', ['$scope', function ($scope) {
    $scope.twoTimesTwo = 2 * 2;
  }]);
});
