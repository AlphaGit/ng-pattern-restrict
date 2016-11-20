var configBuilder = require('./protractor-conf-builder');

var config = configBuilder.getDefaults();
config.sauceUser = process.env.SAUCE_USERNAME;
config.sauceKey = process.env.SAUCE_ACCESS_KEY;
config.multiCapabilities = [
    configBuilder.getCapability({ browserName: 'chrome', chromedriverVersion: '2.20' }),
    configBuilder.getCapability({ browserName: 'firefox' }),
    configBuilder.getCapability({ browserName: 'internet explorer', version: '11.0', iedriverVersion: '2.48.0' }),
    configBuilder.getCapability({ browserName: 'internet explorer', version: '10.0', iedriverVersion: '2.48.0' }),
    configBuilder.getCapability({ browserName: 'internet explorer', version: '9.0', iedriverVersion: '2.48.0' }),

    // Specifying 2.44.0 selenium version because safari won't work otherwise
    // See: https://github.com/angular/protractor/issues/2111
    configBuilder.getCapability({ browserName: 'safari', version: '6.0', plaftorm: 'OS X 10.8', seleniumVersion: '2.44.0' }),

    // Protractor does not support Microsoft Edge yet.
    // See: https://github.com/angular/protractor/issues/2377
    // configBuilder.getCapability({ browserName: 'microsoftedge' }),

    // can't support automation in Opera until Selenium Opera Web Driver supports
    // async script execution.
    // See: https://github.com/angular/protractor/issues/226
    // See: https://github.com/operasoftware/operaprestodriver/issues/97
    //configBuilder.getCapability({ browserName: 'opera', seleniumVersion: '2.48.2' }),

    // TODO fix tests for iPhone. They work ok and the actual functionality is broken
    // in the iPhone emulator, but without dev tools, it's way too difficult to troubleshoot
    // TODO test this with Appium integration instead of Selenium
    //configBuilder.getCapability({ browserName: 'iphone', seleniumVersion: '2.48.2' }),

    // can't test on Android since Protractor fails to load its Angular module
    // See compatibility notes
    // TODO test this with Appium integration instead of Selenium
    //configBuilder.getCapability({ browserName: 'android', seleniumVersion: '2.48.2' })
];

exports.config = config;