var TestPage = require('./pageObjects/autofocusTestPage');
var testIf = require('./testFramework/testIf');

describe('Focus', function() {
  var page = null;
  beforeEach(function() {
    page = new TestPage();
    page.open('/test/pages/autoFocus.html');
    
    // These would affect the focus of the page
    // page.setTitle(jasmine.getEnv().currentSpec.getFullName());
    // page.setBrowserInfo();
  });

  // SafariWebDriver interactions are not implemented, cannot sendKeys to page
  // https://code.google.com/p/selenium/issues/detail?id=4136
  testIf(['safari'].indexOf(browser.browserName) === -1, function(it) {
    it('should not focus the elements it uses', function() {
      page.sendKeys('ABC');

      expect(page.getText1()).toEqual('ABC');
      expect(page.getText2()).toEqual('');
    });
  });
}); // End: Focus