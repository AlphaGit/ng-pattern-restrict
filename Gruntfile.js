'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: '.'
                }
            }
        },
        protractor_webdriver: {
            webDriverStart: {
                options: {
                    path: './node_modules/protractor/bin/',
                    command: 'webdriver-manager start'
                }
            },
        },
        protractor: {
            options: {
                configFile: 'protractor-conf.js',
                keepAlive: false,
                noColor: false,
                args: { }
            },
            test: {
                options: {
                    configFile: 'protractor-conf.js',
                    args: { }
                }
            },
            travis: {
                options: {
                    configFile: 'protractor-travis-conf.js',
                    args: { }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');

    grunt.registerTask('test', ['connect', 'protractor_webdriver:webDriverStart', 'protractor:test']);
    grunt.registerTask('test:travis', ['connect', 'protractor:travis']);
};
