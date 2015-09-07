define([
  'angular',
  'ui.router',
  '../../config'
], function (angular) {

  return angular.module('app.home', [
    'app.constants',
    'ui.router'
  ]).config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/modules/home/home.html',
        controller: 'HomeController'
      });
  });

});
