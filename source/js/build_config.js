/*
 * Config for compiling .js app resources
 */

({
    baseUrl: '.',

    paths: {
        /*named modules for src*/
        'libs': './libs',
        'async': './libs/requirejs/2.1.5/async',
        'domReady': './libs/requirejs/2.1.5/domReady',
        'angular': './libs/angular/1.1.3/angular',
        'angular-resource': './libs/angular/1.1.3/angular-resource'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
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
    },

    // r.js contains itw own version of uglifyjs that brakes minified version
    optimize: "none",

    out: 'main-compiled.js',
    name: 'main.js'
})