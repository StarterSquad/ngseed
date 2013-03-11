/*
 * Monkey patching for RequireJS 'define' method in order to remove ^app/ substring in
 * dependency path for controllers, filters, services and directives.
 */
(function(global) {
    var original_define = global.define;
    // reg exp for testing if dependency is app file
    var isAppFile = /^app\/(controllers|services|filters|directives)\//;

    // Override
    global.define = function(name, deps, callback) {
        var args = Array.prototype.slice.apply(arguments);

        // Process only anonymous definitions
        if(args.length != 2) {
            return original_define.apply(null, args);
        }

        // basically deps and callback are defined only for specs for testing
        var deps = args[0], callback = args[1];
        if(deps instanceof Array && typeof callback == "function") {
            for(var i = 0; i < deps.length; i++) {
                if(isAppFile.test(deps[i]))
                    deps[i] = deps[i].replace('app/', '');
            }
        }

        original_define.apply(null, args);
    };

    // Enable AMD mode
    // Without this code line libs such as 'moment' or 'accounting' aren't being loaded
    // when we try to run tests for compiled .js file
    global.define.amd = original_define.amd;
})(this);

require.config({
    paths: {
        /* paths */
        'Specs': './tests/specs', 'Source': './source/js'
        /*named modules for app deps*/
        , 'angular': './source/js/libs/angular/1.1.3/angular'
        , 'angular-resource': './source/js/libs/angular/1.1.3/angular-resource'
        , 'async': './source/js/libs/requirejs/2.1.5/async'
        , 'domReady': './source/js/libs/requirejs/2.1.5/domReady'
        /*named modules for test dependencies*/
        , 'angular-mocks': './source/js/libs/angular/1.1.3/angular-mocks'
    }, shim: {
        'angular': {
            exports: 'angular',
            deps: []
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        }
    }
});

/* add yo specs here */
require(['require', 'base/build/js/main-compiled-compressed.js'
    ,'specs/services/index'
    ,'specs/filters/index'
    ,'specs/directives/index'
    ,'specs/controllers/index'
   ], function () {
        dump('tests/main-compiled.js is starting requirejs');
        window.__testacular__.start();
});