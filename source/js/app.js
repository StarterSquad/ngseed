/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
  'angular',
  'ui.router',
  './config',
  './modules/docs/index',
  './modules/home/index',
  './modules/ui/index'
], function (ng) {
  'use strict';

  return ng.module('app', [
    'app.constants',
    'app.docs',
    'app.home',
    'app.ui',
    'ui.router'
  ]).config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);

});
