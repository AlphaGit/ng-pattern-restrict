module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Runs all unit tests with Karma
        karma: {
            options: {
                configFile: 'karma.e2e.conf.js'
            },
            continuous: {
                singleRun: true
            }
        },
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
