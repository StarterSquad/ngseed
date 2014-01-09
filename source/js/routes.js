/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config'], function (app) {
  'use strict';
  app.config(['$stateProvider', '$urlRouterProvider', /*'$locationProvider',*/
    function ($stateProvider, $urlRouterProvider/*, $locationProvider*/) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/js/modules/home/home.html',
        controller : 'HomeController'
      })
    ;

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  }]);
});
