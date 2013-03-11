// Sample Testacular configuration file, that contain pretty much all the available options
// It's used for running client tests on Travis (http://travis-ci.org/#!/vojtajina/testacular)
// Most of the options can be overriden by cli arguments (see testacular --help)
//
// For all available config options and default values, see:
// https://github.com/vojtajina/testacular/blob/stable/lib/config.js#L54

urlRoot = '/__testacular/';

// base path, that will be used to resolve files and exclude
basePath = '..';

// list of files / patterns to load in the browser

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'tests/e2e/scenarios.js'
];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
reporters = ['dots'];

proxies = {
  '/': 'http://local.hubskip.com/'
};

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_ERROR;

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
browsers = ['ChromeCanary'];

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
captureTimeout = 5000;

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = false;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;