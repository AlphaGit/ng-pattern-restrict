var configBuilder = require('./protractor-conf-builder');

var config = configBuilder.getDefaults();
config.seleniumAddress = 'http://localhost:4444/wd/hub';
config.multiCapabilities = [{ browserName: 'firefox' }];
exports.config = config;