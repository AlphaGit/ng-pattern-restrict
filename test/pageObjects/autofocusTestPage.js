module.exports = function AutoFocusTestPage() {
  var textBox1 = null;
  var textBox2 = null;
  var title = null;
  var browserInfo = null;

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
      textBox2 = element(by.id('textbox2'));
      title = element(by.id('title'));
      browserInfo = element(by.id('browserInfo'));
    },

    sendKeys: function(text) {
      return browser.actions().sendKeys(text).perform();
    },

    getText1: function() {
      return textBox1.getAttribute('value');
    },

    getText2: function() {
      return textBox2.getAttribute('value');
    },

    setTitle: function(titleText) {
      return setText(title, titleText);
    },

    setBrowserInfo: function() {
      var browserInfoText = browser.browserName + ' ' + browser.browserVersion + ' (' + browser.platformName + ')';
      return setText(browserInfo, browserInfoText);
    }
  }
};