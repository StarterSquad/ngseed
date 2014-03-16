/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
  'angular',
  'ui.router',
  './config',
  './modules/home/index'
], function (ng) {
  'use strict';

  return ng.module('app', [
    'app.constants',
    'app.home',
    'ui.router'
  ]).config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);

});
