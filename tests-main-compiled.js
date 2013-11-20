/**
 * Monkey patching for RequireJS 'define' method in order to remove ^app/ substring in
 * dependency path for controllers, filters, services and directives.
 */
(function (global) {
  var original_define = global.define;
  // reg exp for testing if dependency is app file
  var isAppFile = /^Source\/modules\//;

  // Override
  global.define = function (name, deps, callback) {
    var args = Array.prototype.slice.apply(arguments);

    // Process only anonymous definitions
    if (args.length != 2) {
      return original_define.apply(null, args);
    }

    // basically deps and callback are defined only for specs for testing
    var deps = args[0], callback = args[1];
    if (deps instanceof Array && typeof callback == "function") {
      for (var i = 0; i < deps.length; i++) {
        if (isAppFile.test(deps[i])) {
          deps[i] = deps[i].replace('Source/', '');
        }
      }
    }

    original_define.apply(null, args);
  };

  // Enable AMD mode
  // Without this code line libs such as 'moment' or 'accounting' aren't being loaded
  // when we try to run tests for compiled .js file
  global.define.amd = original_define.amd;
})(this);

/**
 * another one monkey patch to prevent "no timestamp" error
 * https://github.com/karma-runner/karma-requirejs/issues/6#issuecomment-23037725
 */
(function (global) {
  var fileWithoutLeadingSlash;
  // array where all spec files will be included
  global.tests = [];

  for (var file in global.__karma__.files) {
    if (global.__karma__.files.hasOwnProperty(file)) {
      // get rid of leading slash in file path - prevents "no timestamp" error
      fileWithoutLeadingSlash = file.replace(/^\//, '');
      global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
      delete global.__karma__.files[file];

      // we get all the test files automatically and store to window.tests array
      if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
        global.tests.push(fileWithoutLeadingSlash);
      }
    }
  }
}(this));

require.config({
  baseUrl: 'base/',

  paths: {
    'angular'         : './build/vendor/angular/angular',
    'angular-resource': './build/vendor/angular/angular-resource',
    'angular-mocks'   : './build/vendor/angular-mocks/angular-mocks',
    'async'           : './build/vendor/requirejs-plugins/src/async',
    'domReady'        : './build/vendor/requirejs-domready/domReady',
    'Specs'           : './tests/specs'
  },

  shim: {
    'angular'      : {
      exports: 'angular'
    },
    'angular-mocks': {
      deps: ['angular']
    }
  },

  deps: ['require', './build/js/main'],

  callback: function (require) {
    // to ensure that source is already loaded before tests are tried to run
    require(
      // array with all spec files
      window.tests,
      // callback
      window.__karma__.start
    );
  }
});

// let Angular know that we're bootstrapping manually
// https://github.com/angular/angular.js/commit/603fe0d19608ffe1915d8bc23bf412912e7ee1ac
window.name = "NG_DEFER_BOOTSTRAP!";
