/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
  'angular',
  'ui.router',
  './config',
  './modules/docs/index',
  './modules/home/index',
  './modules/ui/index'
], function (angular) {

  return angular.module('app', [
    'app.constants',
    'app.docs',
    'app.home',
    'app.ui',
    'ui.router'
  ]).config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/base');
  });

});
