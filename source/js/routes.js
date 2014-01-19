/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config'], function (app) {
  'use strict';
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/js/modules/home/home.html',
      controller : 'HomeController'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true);
  }]);
});
