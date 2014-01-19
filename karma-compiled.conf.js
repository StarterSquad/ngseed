module.exports = function (config) {
  config.set({

    files: [
      'tests-main-compiled.js',
      { pattern: 'source/vendor/jasmine-matchers/dist/jasmine-matchers.js', included: true },
      { pattern: 'source/js/config-require.js', included: false },
      { pattern: 'source/js/**/*.spec.js', included: false },
      { pattern: 'build/js/**/*', included: false },
      { pattern: 'build/vendor/**/*.js', included: false },
      { pattern: 'build/vendor/**/*.map', included: false },
    ],
    exclude: [],

    browsers: ['PhantomJS'],
    // Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

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
