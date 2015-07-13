exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/*.js'],
  baseUrl: 'http://localhost:9001',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
  multiCapabilities: [{ browserName: 'firefox' }],
  // http://stackoverflow.com/a/23873194/147507: Getting current browser name
  onPrepare: function() {
    return browser.getCapabilities().then(function(capabilities) {
      browser.browserName = capabilities.caps_.browserName;
      browser.platformName = capabilities.caps_.platform;
      browser.browserVersion = capabilities.caps_.version;
    });
  }
};