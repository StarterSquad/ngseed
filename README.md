# Angularjs Requirejs Seed


## Installation

	# get npm dependencies
	npm install

	# install global npm dependencies
	npm -g install grunt-cli
	npm -g install bower
	npm -g install karma

	# also to be able to run tests from cli
	# without browser window popping
	# consider to install PhantomJS
	http://phantomjs.org/download.html

	# get ruby dependencies
	bundle install

## Usage

There are several grunt tasks available:

* `grunt karma:unit` starts karma test runner with `singleRun: false`, it polls for changes and re-runs tests
* `grunt karma:ci` starts karma test runner with `singleRun: true` enabled, good to use in CI scenarios
* `grunt compass` compiles compass project
* `grunt`, `grunt build` will build project into `build` directory. It compiles project into single file, minifies it and compiles styles.

## Libs update

To update all the dependencies to latest compatible versions run `bower install`.

## Tests

Tests use Jasmin and Chai (optional, can be enabled per spec) for assertions.