define([
  'angular',
  'ui.router',
  '../../config'
], function (angular) {
  'use strict';

  return angular.module('app.home', [
    'app.constants',
    'ui.router'
  ]).config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/modules/home/home.html',
        controller: function ($scope, $inject, $modal) {
          $modal.open({
            template: 'template',
            controller: function ($scope) {
              console.log($scope);
            },
            resolve: {
              foo: function ($stateParams) {
                return $stateParams;
              },
              bar: function (someService) {
                return someService;
              }
            }
          });
        },
        resolve: {
          foo: function ($stateParams) {
            return $stateParams;
          },
          bar: function (someService) {
            return someService;
          }
        }
      });
  });

});
