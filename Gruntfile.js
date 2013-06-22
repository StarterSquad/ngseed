module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    name: "app",
                    baseUrl: "source/js/",
                    mainConfigFile: "source/js/main.js",
                    out: "build/main-compiled-compressed.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task(s).
    grunt.registerTask('default', ['requirejs']);

};