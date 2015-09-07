require('angular/angular');

angular.module('app', [
  require('./constants'),
  //require('./modules/docs/index'),
  //require('./modules/home/index'),
  //require('./modules/ui/index'),
  require('angular-ui-router')
])
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/base');
  });

angular.bootstrap(document, ['app']);
