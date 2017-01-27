var TestPage = require('./pageObjects/basicTestPage');
var testIf = require('./testFramework/testIf');

describe('Input type=number', function() {
  function getNumericExpressionAllowedByBrowser(browserName, fullExpression, onlyNumbersExpression, emptyExpression) {
    if (typeof(emptyExpression) === 'undefined') emptyExpression = '';

    switch (browserName) {
      case 'internet explorer':
        return fullExpression;
      case 'chrome':
      case 'opera':
      case 'firefox':
        return onlyNumbersExpression;
      case 'safari':
      default:
        return emptyExpression;
    }
  }

  var page = null;
  beforeEach(function() {
    page = new TestPage();
    page.open('/test/pages/inputTypeNumber.html');
    page.setTitle(jasmine.getEnv().currentSpec.getFullName());
    page.setBrowserInfo();
  });

  it('should retrieve the valid numeric input as its value', function() {
    page.setPattern('^[123]*$');
    page.setText('123');

    expect(page.getText()).toEqual('123');
  });

  it('should not return a value if the input is non-numeric', function() {
    page.setPattern('^\\d*$');
    page.setText('ABC');
    expect(page.getText()).toEqual('');
  });

  describe('should not prevent input for catch-all regexes', function() {
    beforeEach(function() {
      page = new TestPage();
      page.open('/test/pages/inputTypeNumber.html');
      page.setTitle(jasmine.getEnv().currentSpec.getFullName());
      page.setBrowserInfo();
    });

    it('without string terminators', function() {
      var expectedBrowserValue = getNumericExpressionAllowedByBrowser(browser.browserName, '123ABC', '123');

      // With catch-all regexes, our directive won't prevent entering alpha values, and we leave validation to
      // the browser. Firefox will start reporting empty (invalid) instead of numeric (restricted)
      // This is expected by our features.
      if (browser.browserName == 'firefox') expectedBrowserValue = '';

      page.setPattern('.*');
      page.setText('123ABC');
      expect(page.getText()).toEqual(expectedBrowserValue);
    });

    it('with both string terminators', function() {
      var expectedBrowserValue = getNumericExpressionAllowedByBrowser(browser.browserName, '123ABC', '123');

      // With catch-all regexes, our directive won't prevent entering alpha values, and we leave validation to
      // the browser. Firefox will start reporting empty (invalid) instead of numeric (restricted)
      // This is expected by our features.
      if (browser.browserName == 'firefox') expectedBrowserValue = '';

      page.setPattern('^.*$');
      page.setText('123ABC');
      expect(page.getText()).toEqual(expectedBrowserValue);
    });

    it('with start-string terminator', function() {
      var expectedBrowserValue = getNumericExpressionAllowedByBrowser(browser.browserName, '123ABC', '123');

      // With catch-all regexes, our directive won't prevent entering alpha values, and we leave validation to
      // the browser. Firefox will start reporting empty (invalid) instead of numeric (restricted)
      // This is expected by our features.
      if (browser.browserName == 'firefox') expectedBrowserValue = '';

      page.setPattern('^.*');
      page.setText('123ABC');
      expect(page.getText()).toEqual(expectedBrowserValue);
    });

    it('with end-string terminator', function() {
      var expectedBrowserValue = getNumericExpressionAllowedByBrowser(browser.browserName, '123ABC', '123');

      // With catch-all regexes, our directive won't prevent entering alpha values, and we leave validation to
      // the browser. Firefox will start reporting empty (invalid) instead of numeric (restricted)
      // This is expected by our features.
      if (browser.browserName == 'firefox') expectedBrowserValue = '';

      page.setPattern('.*$');
      page.setText('123ABC');
      expect(page.getText()).toEqual(expectedBrowserValue);
    });
  }); // catch-all regexes

  testIf(['safari'].indexOf(browser.browserName) === -1, function(it) {
    it('should revert back to the last known good value', function() {
      page.setPattern('^[123]*$');
      page.setText('123');

      expect(page.getText()).toEqual('123');

      page.setText('123ABC');
      expect(page.getText()).toEqual('123');
    });
  });

  testIf(['internet explorer', 'chrome', 'safari'].indexOf(browser.browserName) === -1, function(it) {
    it('should revert back to last valid value, when input cannot be verified', function() {
      page.setPattern('^\\d*$');

      page.setText('123');
      expect(page.getText()).toEqual('123');
      page.setText('ABC');
      expect(page.getText()).toEqual('123');
    });
  });

  testIf(['internet explorer', 'chrome', 'safari'].indexOf(browser.browserName) === -1, function(it) {
    it('should leave an empty value on invalid numeric input', function() {
      page.setPattern('^\\d*$');

      page.setText('123');
      expect(page.getText()).toEqual('123');
      page.setText('ABC');
      expect(page.getText()).toEqual('123');
    });
  });

  it('should revert back to the previously know valid value if the input is numeric', function() {
    page.setPattern('^[123]*$');

    page.setText('123');
    expect(page.getText()).toEqual('123');
    page.setText('9999');
    expect(page.getText()).toEqual('123');
  });
}); // End: Input type=number