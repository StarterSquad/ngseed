require.config({
    baseUrl: 'base/'
    ,paths: {
        /* paths */
        'Specs': './tests/specs'
        ,'Source': './source/js'
        /*named modules for app deps*/
        ,'angular': './source/js/libs/angular/angular'
        ,'angular-resource': './source/js/libs/angular-resource/angular-resource'
        ,'async': './source/js/libs/requirejs-plugins/src/async'
        ,'domReady': './source/js/libs/requirejs-domready/domReady'
        /*named modules for test dependencies*/
        ,'angular-mocks': './source/js/libs/angular-mocks/angular-mocks'
        ,'chai': './source/js/libs/chai/chai'
    }
    ,shim: {
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
require([
    ,'require'
    ,'Specs/controllers/index'
    ,'Specs/services/index'
    ,'Specs/filters/index'
    ,'Specs/directives/index'
    ], function () {
    dump('tests/main.js is starting requirejs');

    if (window.__testacular__) {
        window.__testacular__.start();
    } else {
        window.__karma__.start();
    }
});
