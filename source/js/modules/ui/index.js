define([
  'angular',
  './button-tickbox/index',
  './header/index',
  './menu/index'
], function (angular) {
  'use strict';

  return angular.module('app.ui', [
    'app.ui.button-tickbox',
    'app.ui.header',
    'app.ui.menu'
  ]);
});
