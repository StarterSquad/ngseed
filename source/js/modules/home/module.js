/**
 * Attach controllers to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
  'angular',
  'ui.router',
  '../../config'
], function (ng) {
  'use strict';

  return ng.module('app.home', [
    'app.constants',
    'ui.router'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/js/modules/home/home.html',
        controller: 'HomeController'
      });
  }]);

});
