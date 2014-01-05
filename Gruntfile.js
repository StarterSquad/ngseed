module.exports = function (grunt) {

  var assetsDir = 'source/assets/',
    shell = require('shelljs');

  function readBuildConfig () {
    var configRequire = require('./source/js/config-require.js');
    var configBuild = {
      baseUrl               : 'source/js',
      name                  : 'main',
      optimize              : 'none',
      out                   : 'build/js/main-src.js',
      wrap                  : true
    };

    configBuild.shim = configRequire.shim;
    configBuild.paths = configRequire.paths;

    return configBuild;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      options: {
        browsers: ['> 1%']
      },
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: assetsDir + 'css/main.css',
        dest: assetsDir + 'css/main.css'
      }
    },
    sass: {
      main: {
        options: {
          bundleExec: true,
          require: [
            './source/sass/sass_extensions.rb',
            'sass-globbing'
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'source/sass/',
            src: ['*.scss', '!_*.scss'],
            dest: assetsDir + 'css/',
            ext: '.css'
          }
        ]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd   : 'source/',
            src   : ['index.html'],
            dest  : 'build/'
          },
          {
            expand: true,
            cwd   : 'source/js',
            src   : ['config-require.js'],
            dest  : 'build/js'
          },
          {
            expand: true,
            cwd   : assetsDir,
            src   : ['**/*'],
            dest  : 'build/assets/'
          },
          {
            expand: true,
            cwd   : 'source/vendor/',
            src   : ['**/*'],
            dest  : 'build/vendor/'
          }
        ]
      }
    },
    csso: {
      compress: {
        options: {
          report: 'min'
        },
        files: {
          'source/assets/css/main.css': [assetsDir + 'css/main.css']
        }
      }
    },
    karma: {
      ci: { // runs tests one time in PhantomJS, good for continuous integration
        autoWatch : false,
        configFile: 'karma-compiled.conf.js',
        browsers  : ['PhantomJS']
      },
      unit: { // start testing server that listens for code updates
        autoWatch : true,
        configFile: 'karma.conf.js',
        singleRun : false,
        browsers  : ['PhantomJS']
      },
      unitSingleRun: {
        autoWatch : false,
        configFile: 'karma.conf.js',
        singleRun : true,
        browsers  : ['PhantomJS']
      },
      watch: { // used in grunt watch context
        background: true,
        configFile: 'karma.conf.js',
        singleRun : false,
        browsers  : ['Chrome']
      }
    },
    // requires selenium to be started first ./selenium/start
    protractor: {
      options: {
        configFile: "p.conf.js",
        keepAlive: true, // If false, the grunt process stops when the test fails.
        args: {
          baseUrl: 'http://local.sq_seed.com', // Arguments passed to the command
          specs: ['source/js/**/*.e2e.js']
        }
      },
      source: {},
      build: {
        args: {
          baseUrl: 'http://local.sq_seed.com/build'
        }
      }
    },
    requirejs: {
      compile: {
        options: readBuildConfig()
      }
    },
    uglify: {
      main: {
        options: {
          mangle          : false,
          report          : 'min',
          sourceMappingURL: './source-map.js',
          sourceMap       : 'build/js/source-map.js'
        },
        files: {
          'build/js/main.js': ['build/js/main-src.js']
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          assetsDir + 'css/*.css',
          'source/index.html',
          'source/js/**/*',
          '!source/js/**/*.spec.js'
        ]
      },
      scripts: {
        files: ['source/js/**/*.js'],
        tasks: ['karma:watch:run'],
        options: {
          interrupt: true
        }
      },
      sass: {
        files: ['source/sass/**/*'],
        tasks: ['css:compile'],
        options: {
          interrupt: true
        }
      }
    },
    css: {
      compile: ['sass', 'autoprefixer'],
      compress: ['csso']
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Adds additional require(['main']) call to start built app
  grunt.registerTask('modifyBuildIndex', 'Adds js code required to start built app.', function () {
    shell.sed(
      '-i',
      "require(['./js/main.js'])",
      "require(['./js/main.js'], function () { require(['main']); })",
      'build/index.html'
    );
  });

  // Plays perfect with gitflow releases
  grunt.registerTask('bumpVersion', 'Updates cache beater.', function () {
    // get current branch name
    var branch = shell.exec('git rev-parse --abbrev-ref HEAD', {silent:true}).output;

    // verify we're on a release branch
    if (/^release\/.*/.test(branch)) {
      var newVersion = branch.split('/')[1].trim();

      var updateJson = function (file) {
        shell.sed('-i', /("version"[ ]*:[ ]*")([^"]*)(",)/g, '$1' + newVersion + '$3', file);
      };

      // update client index html
      shell.sed('-i', /(bust=v)(\d*\.?)*/g, '$1' + newVersion, './source/index.html');
      updateJson('./bower.json');
      updateJson('./package.json');

      grunt.log.ok('Successfully bumped to ' + newVersion);
    } else {
      grunt.log.error('This task should be executed on a release branch!');
    }
  });

  // register css task to have option to separate styles compilation and build
  grunt.registerMultiTask('css', function () {
    grunt.task.run(this.data);
  });

  grunt.registerTask('test', ['karma:unitSingleRun', 'karma:ci', 'protractor:source', 'protractor:build']);

  grunt.registerTask('build-js', ['copy', 'modifyBuildIndex', 'requirejs', 'uglify']);
  grunt.registerTask('build-css', ['css']);
  grunt.registerTask('build', ['build-css', 'build-js', 'karma:ci', 'protractor:build']);

  grunt.registerTask('default', ['build']);

};
