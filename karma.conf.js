module.exports = function (config) {
  config.set({

    files: [
      'tests-main.js',
      { pattern: 'source/js/**/*.js', included: false },
      { pattern: 'source/js/**/*.map', included: false },
      { pattern: 'source/vendor/**/*.js', included: false },
      { pattern: 'source/vendor/**/*.map', included: false },
    ],
    exclude: [
      'source/vendor/**/*spec.js',
    ],

    browsers: ['PhantomJS'],
    // Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

    reporters: [
      'dots',
      // 'coverage',
    ],
    preprocessors: {
      // Source files, that you wanna generate coverage for.
      // Do not include tests or libraries (these files
      // will be instrumented by Istanbul):
      //
      // 'source/js/modules/**/*.js': ['coverage'],
    },
    // Optionally, configure the reporter:
    //
    // coverageReporter: {
    //   type: 'html',
    //   dir: 'coverage/',
    // },

    basePath: './',
    captureTimeout: 60000,
    colors: true,
    frameworks: ['jasmine', 'requirejs'],
    logLevel: config.LOG_INFO,
    port: 9876,
    reportSlowerThan: 500,
    runnerPort: 9100,

  });
};
