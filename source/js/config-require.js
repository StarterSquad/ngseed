if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  // Here paths are set relative to `/source/js` folder
  paths: {
    'angular'               : '../vendor/angular/angular',
    'angular-resource'      : '../vendor/angular-resource/angular-resource',
    'angular-mocks'         : '../vendor/angular-mocks/angular-mocks',
    'angular-ui-router'     : '../vendor/angular-ui-router/release/angular-ui-router',
    'async'                 : '../vendor/requirejs-plugins/src/async',
    'domReady'              : '../vendor/requirejs-domready/domReady'
  },

  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-ui-router' : {
      'deps': ['angular']
    },
    'angular-mocks': ['angular'],
    'angular-resource': ['angular']
  }
});
