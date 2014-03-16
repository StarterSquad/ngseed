if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  // Here paths are set relative to `/source/js` folder
  paths: {
    'angular'       : '../vendor/angular/angular',
    'async'         : '../vendor/requirejs-plugins/src/async',
    'domReady'      : '../vendor/requirejs-domready/domReady',
    'ngResource'    : '../vendor/angular-resource/angular-resource',
    'ui.router'     : '../vendor/angular-ui-router/release/angular-ui-router'
  },

  shim: {
    'angular': {
      'exports': 'angular'
    },
    'ngResource': ['angular'],
    'ui.router' : ['angular']
  }
});
