var TestPage = require('./pageObjects/basicTestPage');

describe('Input type=text', function() {
  var page = null;
  beforeEach(function() {
    page = new TestPage();
    page.open('/test/pages/inputTypeText.html');
    page.setTitle(jasmine.getEnv().currentSpec.getFullName());
    page.setBrowserInfo();
  });

  describe('Alphabetical input', function() {
    it('should allow alphabetical input', function() {
      page.setPattern('[A-Za-z]*');
      page.setText('ABC');

      expect(page.getText()).toEqual('ABC');
    });

    it('should not allow non-alphabetical input', function() {
      page.setPattern('^[A-Za-z]*$');
      page.setText('ABC');

      expect(page.getText()).toEqual('ABC');
      page.setText('1');
      expect(page.getText()).toEqual('ABC');
    });
  }); // End: Alphabetical input

  describe('Numerical input', function() {
    it('should allow numerical input', function() {
      page.setPattern('^\\d*$');
      page.setText('123');

      expect(page.getText()).toEqual('123');
    });

    it('should not allow alphabetical input', function() {
      page.setPattern('^\\d*$');
      page.setText('123');
      page.setText('ABC');
      expect(page.getText()).toEqual('123');
    });
  });
}); // End: Input type=text