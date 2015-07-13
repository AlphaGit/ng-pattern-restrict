function copyOwnProperties(dst, src) {
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
}

function extend(baseObject, newProperties) {
  var extendedObject = {};
  copyOwnProperties(extendedObject, baseObject);
  copyOwnProperties(extendedObject, newProperties);
  return extendedObject;
}

var defaultsForCapability = {
  'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  build: process.env.TRAVIS_BUILD_NUMBER,
  shardTestFiles: false,
  maxInstances: 5,
  seleniumVersion: '2.47.1'
};

function getCapability(options) {
  var capability = extend(defaultsForCapability, options);
  capability.name = 'ng-pattern-restrict build ' + process.env.TRAVIS_BUILD_NUMBER + ' ' + options.browserName;
  if (options.version) capability.name += ' ' + options.version;
  return capability;
}

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  specs: ['test/*.js'],
  baseUrl: 'http://localhost:9001',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
  // http://stackoverflow.com/a/23873194/147507: Getting current browser name and platform
  onPrepare: function() {
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    return browser.getCapabilities().then(function(capabilities) {
      browser.browserName = capabilities.caps_.browserName;
      browser.platformName = capabilities.caps_.platform;
      browser.browserVersion = capabilities.caps_.version;
    });
  },
  multiCapabilities: [
    getCapability({ browserName: 'chrome' }),
    getCapability({ browserName: 'firefox' }),
    getCapability({ browserName: 'internet explorer', version: '11.0' }),
    getCapability({ browserName: 'internet explorer', version: '10.0' }),
    getCapability({ browserName: 'internet explorer', version: '9.0' }),

    // Specifying 2.44.0 selenium version because safari won't work otherwise
    // See: https://github.com/angular/protractor/issues/2111
    getCapability({ browserName: 'safari', platform: 'OS X 10.11', seleniumVersion: '2.44.0' }),

    // Protractor does not support Microsoft Edge yet.
    // See: https://github.com/angular/protractor/issues/2377
    // getCapability({ browserName: 'microsoftedge' }),

    // can't support automation in Opera until Selenium Opera Web Driver supports
    // async script execution.
    // See: https://github.com/angular/protractor/issues/226
    // See: https://github.com/operasoftware/operaprestodriver/issues/97
    // getCapability({ browserName: 'opera'),

    // TODO fix tests for iPhone. They work ok and the actual functionality is broken
    // in the iPhone emulator, but without dev tools, it's way too difficult to troubleshoot
    // getCapability({ browserName: 'iphone', seleniumVersion: null })

    // can't test on Android since Protractor fails to load its Angular module
    // See compatibility notes
    // getCapability({ browserName: 'android', seleniumVersion: null })
  ]
};
