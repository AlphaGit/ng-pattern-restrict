var configBuilder = require('./protractor-conf-builder');

var config = configBuilder.getDefaults();
config.sauceUser = process.env.SAUCE_USERNAME;
config.sauceKey = process.env.SAUCE_ACCESS_KEY;
config.baseUrl = 'http://localhost:9001/min';
config.multiCapabilities = [
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'chrome' }),
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'firefox' }),
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'internet explorer', version: '11.0' }),
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'internet explorer', version: '10.0' }),
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'internet explorer', version: '9.0' }),

    // Specifying 2.44.0 selenium version because safari won't work otherwise
    // See: https://github.com/angular/protractor/issues/2111
    configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'safari', version: '6.0', platform: 'OS X 10.8', seleniumVersion: '2.44.0' }),

    // Protractor does not support Microsoft Edge yet.
    // See: https://github.com/angular/protractor/issues/2377
    // configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'microsoftedge' }),

    // can't support automation in Opera until Selenium Opera Web Driver supports
    // async script execution.
    // See: https://github.com/angular/protractor/issues/226
    // See: https://github.com/operasoftware/operaprestodriver/issues/97
    // configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'opera'),

    // TODO fix tests for iPhone. They work ok and the actual functionality is broken
    // in the iPhone emulator, but without dev tools, it's way too difficult to troubleshoot
    // configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'iphone', seleniumVersion: null })

    // can't test on Android since Protractor fails to load its Angular module
    // See compatibility notes
    // configBuilder.getCapability({ testExtraDescriptor: '(minified source)', browserName: 'android', seleniumVersion: null })
];

exports.config = config;