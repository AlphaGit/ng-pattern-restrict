# ng-pattern-restrict [![Build Status](https://travis-ci.org/AlphaGit/ng-pattern-restrict.svg?branch=master)][travisci]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/AlphaSau.svg)](https://saucelabs.com/u/AlphaSau)

Allowing certain inputs based on a regex pattern, preventing the user from inputting anything invalid.

# What is this for?

It is possible that at some points you may want to restrict your user from entering certain values in your web application. Specifically, fields that conform to a very strict set of values. If you decide that it is a good idea for you to **restrict** what the user can even type in the input, this is the tool for you.

This works similar to a masked input, except that no mask is displayed, and the validation is done against a regular expression, which allows you to permit a complex class of values if that's what you need, or to be very specific if that is your necessity.

# How does it work?

The logic is quite simple:

- Initialization: save regex to be used from the `ng-pattern-restrict` attribute or the `pattern` attribute.
- Wait for user input, and reach on `input` (for any value change), `keyup` (for keyboard entry) or `click` (for text drag and drop, contextual copy-paste, etc).
- If the input matches the regex, save it as the latest valid value. Also save the current user's input caret position on the field.
- If the input does not match the regex, restore the latest valid value and set the user input caret in the same position as it was. The user experience should be as if nothing was typed or changed.

# Installation

```console
bower install ng-pattern-restrict
```

Alternatively, copy the [ng-pattern-restrict.js][srcfile] (or the minified version [ng-pattern-restrict.min.js][srcminfile]) into your project, load it into the browser and use it away.

# Usage

```html
<input type="text" pattern="[0-9]+" ng-pattern-restrict />
```

Should be the same as

```html
<input type="text" ng-pattern-restrict="[0-9]+" pattern="[0-9]+" />
```

## Notes:

- ([#15][ticket15]) **Make sure to use "progressive" regular expressions.** The expressions are validated against the full regular expression. This means that if your regex is `\d\d`, and your textbox is empty, a user will never be able to type anything because the first keypress will not validate and will be reverted. Following the example, the proper regular expression should be `\d{0,2}`.
- **Your regex must validate against empty strings if you want users to be able to remove the value from the textbox.**
- **Make sure AngularJS is compatible with your browser.** It goes without saying, but your browser compatibility with AngularJS will make a huge impact on how well this directive can behave. For example, AngularJS 1.3 with IE 8 won't really play well together, and this directive is restricted by those limitations.

If you still have problems, please make sure to check the [Compatibility notes][compatibility]. There are several issues that really depend on the browsers.

# E2E testing

In order to e2e test you need to execute the following steps:

```console
npm install
./node_modules/protractor/bin/webdriver-manager update

# then, for each time you want to test
npm test
```

That's it. Neat, huh?

Check out the [protractor configuration file][protractor conf] for the set of browsers that you want to test on your system.

## Version list

- [v0.2.0](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/v0.2.0)
- [v0.1.1](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/v0.1.1)
- [v0.1.0-alpha.6](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.6)
- [v0.1.0-alpha.5](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.5)
- [v0.1.0-alpha.4](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.4)
- [v0.1.0-alpha.3](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.3)
- [v0.1.0-alpha.2](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.2)
- [v0.1.0-alpha.1](https://github.com/AlphaGit/ng-pattern-restrict/releases/tag/0.1.0-alpha.1)

[travisci]: https://travis-ci.org/AlphaGit/ng-pattern-restrict
[ticket15]: https://github.com/AlphaGit/ng-pattern-restrict/issues/15
[compatibility]: https://github.com/AlphaGit/ng-pattern-restrict/docs/compatibility.md
[protractor conf]: https://github.com/AlphaGit/ng-pattern-restrict/protractor-conf.js
[srcfile]: https://github.com/AlphaGit/ng-pattern-restrict/src/ng-pattern-restrict.js
[srcminfile]: https://github.com/AlphaGit/ng-pattern-restrict/src/ng-pattern-restrict.min.js