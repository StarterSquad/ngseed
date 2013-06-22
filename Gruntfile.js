module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    optimize: "none", // requirejs has own copy of uglifyjs that breaks the build
                    baseUrl: "source/js/",
                    mainConfigFile: "source/js/main.js",
                    out: "build/js/main.js"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/partials/',
                        src: ['**/*'],
                        dest: 'build/partials'
                    },
                    {
                        expand: true,
                        cwd: 'source/',
                        src: ['index.html'],
                        dest: 'build/'
                     },
                    {
                        expand: true,
                        cwd: 'source/js/libs/',
                        src: ['**/*'],
                        dest: 'build/js/libs/'
                     }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('build', ['copy', 'requirejs']);

    grunt.registerTask('default', ['build']);

};