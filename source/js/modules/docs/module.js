define([
  'angular',
  'ui.router',
  '../../config'
], function (angular) {
  'use strict';

  return angular.module('app.docs', [
    'app.constants',
    'ui.router'
  ]).config(function ($stateProvider) {
    $stateProvider
      .state('docs', {
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state('docs.base', {
        url: '/base',
        templateUrl: 'js/modules/docs/base.html'
      })
      .state('docs.project', {
        url: '/project',
        templateUrl: 'js/modules/docs/project.html'
      })
      .state('docs.cosmetic', {
        url: '/cosmetic',
        templateUrl: 'js/modules/docs/cosmetic.html'
      })
      .state('docs.functions', {
        url: '/functions',
        templateUrl: 'js/modules/docs/functions.html'
      })
      .state('docs.mixins', {
        url: '/mixins',
        templateUrl: 'js/modules/docs/mixins.html'
      })
  });

});
