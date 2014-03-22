Angularjs Requirejs Seed
========================

Installation
------------

    # Get NPM dependencies:
    npm install

    # Install global NPM dependencies:
    npm -g install bower
    npm -g install gulp
    npm -g install karma

    # Also to be able to run tests from CLI
    # without browser window popping consider
    # to install PhantomJS:
    # http://phantomjs.org/download.html

    # Get Ruby dependencies required to compile styles from Sass:
    bundle install

[Gulp](http://gulpjs.com/) flows
----------

To make development faster and more automated there are several Gulp tasks available:

* `gulp`

  Builds project into `build` directory. Under the hood compiles and compresses Sass/CSS, compiles scripts
  with ([RequireJs](http://requirejs.org/)) and [uglifies](http://lisperator.net/uglifyjs/) it.

* `gulp bump-version`

  Works with gitglow releases.
  E.g. when you’re on `release/0.4.4` branch it will update cache beaters to follow version.

* `gulp karma`

  Starts Karma server watching scripts updates.

* `gulp karma-ci`

  Runs tests against the build (which should be run first) and quits, is good to use in CI scenarios.

* `gulp protractor`

  Runs E2E tests against source files.

* `gulp protractor-ci`

  Runs E2E tests against the build.

* `gulp sass`

  Compiles Sass project, feeds output to [Autoprefixer](https://github.com/ai/autoprefixer) and minifies it via
  [CSSO](https://github.com/css/csso).

* `gulp watch`

  Listens to changes to stylesheets and scripts and reloads browser page during development.

Vendor update
-------------

* `bower install`

  To update all the dependencies to the latest compatible versions.

## Tests

Tests use Jasmin for assertions.

You can write tests in both Coffee and JS
(see `/source/js/modules/home/home-ctrl.spec.js` and `/source/js/modules/home/home-ctrl.spec.coffee`).

### E2E Tests

[Protractor](https://github.com/angular/protractor) is used to provide way to do E2E tests. To install go to `client`
directory and run:

    npm install -g protractor

    // This installs Selenium standalone
    // server and Chrome driver:
    webdriver-manager update

    // Start the server with:
    gulp webdriver

    // To test source:
    gulp protractor

Check `p.conf` and `p-compiled.conf` for Protractor settings.

Checkout [Protractor docs](https://github.com/angular/protractor/blob/master/docs/) for more information.

## Future Releases

You can checkout planned new features on the [Trello Board](https://trello.com/b/XXevXg3l/angular-require-seed).
Also feel free to create feature requests on github issues.
