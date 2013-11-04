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

	# get ruby dependencies required to compile styles from sass 
	bundle install

## Grunt flows

To make development faster and more automated there are several grunt tasks available:

### Development

* `grunt karma:watch:start watch`

  Starts karma server and all the watch tasks

* `grunt watch:sass`

  Compiles styles on change to sass files


* `grunt karma:watch:start watch:scripts`

  Runs tests on changes to js sources. Won't run without karma test server started first

* `grunt watch:livereload`
 
  Listens to changes to css and js sources and reloads browser page during development


### Testing

* `grunt karma:ci`

  runs tests against build (which should be run first), is good to use in CI scenarios as quits after single run

* see `grunt karma:watch:start watch` and `grunt karma:watch:start watch:scripts`

### Styles compilation

* `grunt css`

  Builds compass project by running 2 next tasks

* `grunt css:compile`

  Builds sass and feeds output to [autoprefixer](https://github.com/ai/autoprefixer)

* `grunt css:compress`

  Feeds css file to [csso](https://github.com/t32k/grunt-csso)

### Build

* `grunt`, `grunt build`

  builds project into `build` directory. Under the hood compiles and compresses css, compiles (with [requirejs](https://github.com/gruntjs/grunt-contrib-requirejs)) and [uglifies](https://github.com/gruntjs/grunt-contrib-uglify).

## Libs update

To update all the dependencies to latest compatible versions run `bower install`.

## Tests

Tests use Jasmin for assertions.
