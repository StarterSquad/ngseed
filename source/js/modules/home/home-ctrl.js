/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function (controllers) {
  'use strict';

  controllers.controller('HomeController', function ($scope) {
    $scope.twoTimesTwo = 2 * 2;
  });
});
