module.exports = function ngModelTestPage() {
  var textBox = null;
  var title = null;
  var browserInfo = null;
  var modelValue = null;

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

      textBox = element(by.id('textbox'));
      title = element(by.id('title'));
      browserInfo = element(by.id('browserInfo'));
      modelValue = element(by.id('modelValue'));
    },

    setText: function(text) {
      return setText(textBox, text);
    },

    getText: function() {
      return textBox.getAttribute('value');
    },

    getModelValue: function() {
      return modelValue.getInnerHtml();
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