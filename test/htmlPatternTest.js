var TestPage = require('./pageObjects/basicTestPage');

describe('HTML pattern attribute', function() {
  var page = null;
  beforeEach(function() {
    page = new TestPage();
    page.open('/test/pages/inputTypeText.html');
    page.setTitle(jasmine.getEnv().currentSpec.getFullName());
    page.setBrowserInfo();
  });

  it("should be read if ng-pattern-restrict does not have value", function() {
    page.setHtmlPattern('A');
    page.setText('A');
    page.setText('1');
    expect(page.getText()).toBe('A');
  });

  it("should be re-read if updated", function() {
    page.setHtmlPattern('A?');
    page.setText('A');

    page.setHtmlPattern('1?');
    page.setText('1');

    expect(page.getText()).toBe('1');
  });
}); // End: HTML pattern attribute