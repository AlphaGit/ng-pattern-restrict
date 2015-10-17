module.exports = {
  getDefaults: getConfigurationDefaults,
  getCapability: getCapability
};

function getConfigurationDefaults() {
  return {
    specs: ['test/*.js'],
    baseUrl: 'http://localhost:9001/',
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
    }
  };
}

function getCapability(options) {
  var capability = extend(defaultsForCapability, options);

  var nameParts = [];
  nameParts.push('ng-pattern-restrict build');
  nameParts.push(process.env.TRAVIS_BUILD_NUMBER);
  nameParts.push(options.testExtraDescriptor);
  nameParts.push(options.browserName);
  nameParts.push(options.version);
  
  capability.name =  nameParts.join(' ').trim();
  return capability;
}

/* private to this module */

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
  seleniumVersion: '2.48.2'
};