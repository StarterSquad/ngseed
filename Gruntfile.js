module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg      : grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: grunt.file.readJSON('source/js/build-config.json')
      }
    },
    copy     : {
      main: {
        files: [
          {
            expand: true,
            cwd   : 'source/partials/',
            src   : ['**/*'],
            dest  : 'build/partials'
          },
          {
            expand: true,
            cwd   : 'source/',
            src   : ['index.html'],
            dest  : 'build/'
          },
          {
            expand: true,
            cwd   : 'source/js/libs/',
            src   : ['**/*'],
            dest  : 'build/js/libs/'
          }
        ]
      }
    },
    uglify   : {
      main: {
        options: {
          sourceMappingURL: './source-map.js',
          sourceMap       : 'build/js/source-map.js',
          mangle          : false
        },
        files  : {
          'build/js/main.js': ['build/js/main-src.js']
        }
      }
    },
    compass  : {
      main: {
        options: {
          config: 'config.rb'
        }
      }
    },
    karma    : {
      ci  : { // runs tests one time in PhantomJS, good for continuous integration
        configFile: 'karma-compiled.conf.js'
      },
      unit: { // start testing server that listens for code updates
        configFile: 'karma.conf.js',
        singleRun : false,
        browsers  : ['Chrome']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build-js', ['copy', 'requirejs', 'uglify']);
  grunt.registerTask('build-css', ['compass']);
  grunt.registerTask('build', ['build-js', 'build-css']);

  grunt.registerTask('default', ['build']);

};
