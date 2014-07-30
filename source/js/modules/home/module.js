define([
  'angular',
  'ui.router',
  '../../config'
], function (angular) {
  'use strict';

  return angular.module('app.home', [
    'app.constants',
    'ui.router'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/modules/home/home.html',
        controller: 'HomeController'
      });
  }]);

});
