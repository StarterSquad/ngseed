module.exports = function (grunt) {

  var assetsDir = 'source/assets/';

  // Project configuration.
  grunt.initConfig({
    pkg      : grunt.file.readJSON('package.json'),
    autoprefixer: {
      options    : {
        browsers: ['> 1%']
      },
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src    : assetsDir + 'css/main.css',
        dest   : assetsDir + 'css/main.css'
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
    copy     : {
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
    karma    : {
      ci  : { // runs tests one time in PhantomJS, good for continuous integration
        autoWatch: false,
        configFile: 'karma-compiled.conf.js',
        browsers  : ['PhantomJS']
      },
      unit: { // start testing server that listens for code updates
        autoWatch: false,
        configFile: 'karma.conf.js',
        singleRun : true,
        browsers  : ['Chrome']
      },
      watch: { // used in grunt watch context
        background: true,
        configFile: 'karma.conf.js',
        singleRun: false,
        browsers  : ['Chrome']
      }
    },
    requirejs: {
      compile: {
        options: grunt.file.readJSON('source/js/build-config.json')
      }
    },
    uglify   : {
      main: {
        options: {
          mangle          : false,
          report          : 'min',
          sourceMappingURL: './source-map.js',
          sourceMap       : 'build/js/source-map.js'
        },
        files  : {
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

  // register css task to have option to separate styles compilation and build
  grunt.registerMultiTask('css', function () {
    grunt.task.run(this.data);
  });

  grunt.registerTask('build-js', ['copy', 'requirejs', 'uglify']);
  grunt.registerTask('build-css', ['css']);
  grunt.registerTask('build', ['build-js', 'build-css']);

  grunt.registerTask('default', ['build']);

};
