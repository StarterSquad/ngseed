var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webdriver = require('gulp-protractor').webdriver_standalone;

var handleError;

// Bump version
gulp.task('bump-version', function () {
  var spawn = require('child_process').spawn;

  spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.on('data', function (data) {

    // Get current branch name
    var branch = data.toString();

    // Verify we're on a release branch
    if (/^release\/.*/.test(branch)) {
      var newVersion = branch.split('/')[1].trim();

      // Update client index.html
      gulp.src('./source/index.html')
        .pipe(replace(/(bust=v)(\d*\.?)*/g, '$1' + newVersion))
        .pipe(gulp.dest('./source'));

      var updateJson = function (file) {
        gulp.src(file)
          .pipe(replace(/("version" *: *")([^"]*)(",)/g, '$1' + newVersion + '$3'))
          .pipe(gulp.dest('./'));
      };

      updateJson('./bower.json');
      updateJson('./package.json');

      console.log('Successfully bumped to ' + newVersion);
    } else {
      console.error('This task should be executed on a release branch!');
    }
  });
});

// Copy
gulp.task('copy', ['sass'], function () {
  var es = require('event-stream');
  var uglify = require('gulp-uglify');

  return es.concat(
    // update index.html to work when built
    gulp.src(['source/index.html'])
      .pipe(gulp.dest('build')),
    // copy config-require
    gulp.src(['source/js/config-require.js'])
      .pipe(plumber(handleError))
      .pipe(uglify())
      .pipe(gulp.dest('build/js')),
    // copy template files
    gulp.src(['source/js/**/*.html'])
      .pipe(gulp.dest('build/js')),
    // copy vendor files
    gulp.src(['source/vendor/**/*'])
      .pipe(gulp.dest('build/vendor')),
    // copy assets
    gulp.src(['source/assets/**/*'])
      .pipe(gulp.dest('build/assets')),
    // minify requirejs
    gulp.src(['build/vendor/requirejs/require.js'])
      .pipe(plumber(handleError))
      .pipe(uglify())
      .pipe(gulp.dest('build/vendor/requirejs'))
  );
});

// JavaScript
gulp.task('js', function () {
  var amdOptimize = require('amd-optimize');
  var concat = require('gulp-concat');
  var insert = require('gulp-insert');
  var ngAnnotate = require('gulp-ng-annotate');
  var uglify = require('gulp-uglify');

  var config = require('./source/js/config-require.js');
  config.baseUrl = 'source';

  return gulp.src(['source/js/main.js'])
    .pipe(plumber(handleError))
    .pipe(amdOptimize('js/main', config))
    .pipe(concat('main.js'))
    .pipe(insert.append(';require(["js/main"]);'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

// Karma
gulp.task('karma', function () {
  var karma = require('gulp-karma');

  return gulp.src(['no need to supply files because everything is in config file'])
    .pipe(plumber(handleError))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('karma-ci', function () {
  var karma = require('gulp-karma');

  return gulp.src(['no need to supply files because everything is in config file'])
    .pipe(plumber(handleError))
    .pipe(karma({
      configFile: 'karma-compiled.conf.js',
      action: 'run'
    }));
});

// Sass
gulp.task('sass', function () {
  var cssGlobbing = require('gulp-css-globbing');
  var postcss = require('gulp-postcss');
  var sass = require('gulp-sass');

  return gulp.src(['source/sass/*.scss', '!source/sass/_*.scss'])
    .pipe(plumber(handleError))
    .pipe(cssGlobbing({
      extensions: '.scss'
    }))
    .pipe(sass())
    .pipe(postcss([
      require('postcss-assets')({
        basePath: 'source/',
        loadPaths: ['assets/fonts/', 'assets/images/']
      }),
      require('postcss-import')({
        path: 'source/'
      }),
      require('autoprefixer-core'),
      require('csswring')({
        preserveHacks: true,
        removeAllComments: true
      })
    ]))
    .pipe(gulp.dest('source/assets/css'));
});

// Protractor
gulp.task('protractor', function () {
  var protractor = require('gulp-protractor').protractor;

  return gulp.src('source/js/**/*.e2e.js')
    .pipe(protractor({ configFile: 'p.conf.js' }));
});

gulp.task('protractor-ci', function () {
  var protractor = require('gulp-protractor').protractor;

  return gulp.src('source/js/**/*.e2e.js')
    .pipe(protractor({ configFile: 'p-compiled.conf.js' }));
});

gulp.task('webdriver', webdriver);

// Watch
gulp.task('watch', ['sass'], function () {
  handleError = function (err) {
    console.log(err.name, ' in ', err.plugin, ': ', err.message);
    console.log(err.getStack());
    this.emit('end');
  };
  var livereload = require('gulp-livereload');

  gulp.run('karma');

  gulp.watch('source/sass/**/*.scss', ['sass']);

  // enable Livereload
  livereload.listen();
  gulp.watch([
    'source/assets/*.css',
    'source/index.html',
    'source/js/**/*',
    '!source/js/**/*.spec.js'
  ]).on('change', livereload.changed);
});

gulp.task('default', ['js', 'copy'], function () {
  gulp.run('karma-ci');
  gulp.run('protractor-ci');
});
