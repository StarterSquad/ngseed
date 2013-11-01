// Karma configuration to test application source files
// Usually used in development
module.exports = function (config) {
  config.set({

// base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: ['jasmine', 'requirejs'],

    plugins         : [
      'karma-script-launcher',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-requirejs',
      'karma-phantomjs-launcher'
    ],

// list of files / patterns to load in the browser
    files           : [
      'source/js/libs/jasmine/lib/jasmine-core/jasmine-html.js',
      'tests-main.js',
      { pattern: 'source/js/**/*.js', included: false }
    ],

// list of files to exclude
    exclude         : [ 'source/js/main.js' ],

    preprocessors: {
       // source files, that you wanna generate coverage for
       // do not include tests or libraries
       // (these files will be instrumented by Istanbul)
       'source/js/modules/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
    reporters       : ['dots', 'coverage'],

// web server port
// CLI --port 9876
    port            : 9876,

// cli runner port
// CLI --runner-port 9100
    runnerPort      : 9100,

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
    colors          : true,

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
    logLevel        : config.LOG_INFO,

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
    autoWatch       : false,

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
    browsers        : ['Chrome'],

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
    captureTimeout  : 60000,

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
    singleRun       : false,

// report which specs are slower than 500ms
// CLI --report-slower-than 500
    reportSlowerThan: 500

  });
};
