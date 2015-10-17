module.exports = function AutoFocusTestPage() {
  var textBox1 = null;
  var title = null;
  var browserInfo = null;
  var validStatusElement = null;

  function setText(textElement, text) {
    // .clear().sendKeys() will POST value="" and POST value=text
    // a workaround to this is Ctrl+A + text (will overwrite it), but
    // OSX does not support the COMMAND key emulation, so it doesn't work
    // See https://github.com/angular/protractor/issues/690
    return textElement.clear().sendKeys(text);
  }

  return {
    open: function(url) {
      browser.get(url);

      textBox1 = element(by.id('textbox1'));
      title = element(by.id('title'));
      browserInfo = element(by.id('browserInfo'));
      validStatusElement = element(by.id('ngValid'));
    },

    setText: function(text) {
      return setText(textBox1, text);
    },

    getText: function() {
      return textBox1.getAttribute('value');
    },

    setTitle: function(titleText) {
      return setText(title, titleText);
    },

    setBrowserInfo: function() {
      var browserInfoText = browser.browserName + ' ' + browser.browserVersion + ' (' + browser.platformName + ')';
      return setText(browserInfo, browserInfoText);
    },

    getValidStatusPromise: function() {
      return validStatusElement.getText();
    }
  }
};