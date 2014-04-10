module.exports = function (config) {
  config.set({

    files: [
      'tests-main-compiled.js',
      { pattern: 'source/js/config-require.js', included: false },
      { pattern: 'source/js/**/*.spec.js', included: false },
      { pattern: 'source/js/**/*.spec.coffee', included: false },
      { pattern: 'build/js/**/*', included: false },
      { pattern: 'build/vendor/**/*.js', included: false },
      { pattern: 'build/vendor/**/*.map', included: false },
    ],
    exclude: [],

    browsers: ['PhantomJS'],
    // Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

    preprocessors: {
      'source/js/modules/**/*.spec.coffee': 'coffee'
    },
    coffeePreprocessor: {
      options: { sourceMap: true },
      transformPath: function (filepath) {
        return filepath.replace(/spec\.coffee$/, 'coffee.spec.js');
      }
    },

    basePath: './',
    captureTimeout: 60000,
    colors: true,
    frameworks: ['jasmine', 'requirejs'],
    logLevel: config.LOG_INFO,
    port: 9876,
    reporters: ['dots'],
    reportSlowerThan: 500,
    runnerPort: 9100,

  });
};
