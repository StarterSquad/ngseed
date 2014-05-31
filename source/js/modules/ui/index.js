define([
  'angular',
  './button-choicebox/index',
  './header/index',
  './menu/index'
], function (angular) {
  'use strict';

  return angular.module('app.ui', [
    'app.ui.button-choicebox',
    'app.ui.header',
    'app.ui.menu'
  ]);
});
