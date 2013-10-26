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
})(this);

require.config({
    baseUrl: 'base/',

    paths: {
        'Source': 'source/js',
        'angular-mocks': 'source/js/libs/angular-mocks/angular-mocks',
        'angular-scenario': 'source/js/libs/angular-scenario/angular-scenario',
        'angular': './source/js/libs/angular/angular',
        'angular-resource': './source/js/libs/angular-resource/angular-resource',
        'async': './source/js/libs/requirejs-plugins/src/async',
        'domReady': './source/js/libs/requirejs-domready/domReady'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        }
    },

    // array with all spec files
    deps: window.tests,

    callback: window.__karma__.start
});
