// Sample Testacular configuration file, that contain pretty much all the available options
// It's used for running client tests on Travis (http://travis-ci.org/#!/vojtajina/testacular)
// Most of the options can be overriden by cli arguments (see testacular --help)
//
// For all available config options and default values, see:
// https://github.com/vojtajina/testacular/blob/stable/lib/config.js#L54
module.exports = function (config) {
    config.set({

// base path, that will be used to resolve files and exclude
        basePath: '..',

        frameworks: ["jasmine", "requirejs"],

// list of files / patterns to load in the browser
        files: [
            // all the party
            {pattern: './source/js/libs/**/*.js', included: false}
            // all the sources, tests
            , {pattern: './tests/specs/**/*.js', included: false}
            , {pattern: './build/js/*.js', included: false }
            , './tests/main-compiled.js'
        ],

// list of files to exclude
        exclude: [],

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
        reporters: ['progress'],

// web server port
// CLI --port 9876
        port: 9876,

// cli runner port
// CLI --runner-port 9100
        runnerPort: 9100,

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
        colors: true,

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
        logLevel: config.LOG_INFO,

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
        autoWatch: true,

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
        browsers: ['ChromeCanary'],

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
        captureTimeout: 10000,

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
        singleRun: false,

// report which specs are slower than 500ms
// CLI --report-slower-than 500
        reportSlowerThan: 500

    });
};