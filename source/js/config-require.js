if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  // Here paths are set relative to `/source/js` folder
  paths: {
    'angular': '../vendor/angular/angular',
    'angular-resource': '../vendor/angular-resource/angular-resource',
    'async': '../vendor/requirejs-plugins/src/async',
    'domReady': '../vendor/requirejs-domready/domReady'
  },

  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-mocks': ['angular'],
    'angular-resource': ['angular']
  }
});
