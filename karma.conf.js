module.exports = function (config) {
  config.set({

    files: [
      'tests-main.js',
      { pattern: 'source/js/**/*.js', included: false },
      { pattern: 'source/js/**/*.coffee', included: false },
      { pattern: 'source/js/**/*.map', included: false },
      { pattern: 'source/vendor/**/*.js', included: false },
      { pattern: 'source/vendor/**/*.map', included: false },
    ],
    exclude: [
      'source/vendor/**/*spec.js',
      'source/vendor/**/*spec.coffee'
    ],

    browsers: ['PhantomJS'],
    // Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

    reporters: [
      'dots',
      // 'coverage',
    ],
    preprocessors: {
      //'source/js/modules/**/*.js': 'coverage',
      'source/js/modules/**/*.spec.coffee': 'coffee'
    },
    coffeePreprocessor: {
      options: { sourceMap: true },
      transformPath: function (filepath) {
        return filepath.replace(/spec\.coffee$/, 'coffee.spec.js');
      }
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
