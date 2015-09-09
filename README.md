# ng-pattern-restrict [![Build Status](https://travis-ci.org/AlphaGit/ng-pattern-restrict.svg?branch=master)][travisci]

[![Sauce Test Status](https://saucelabs.com/browser-matrix/AlphaSau.svg)](https://saucelabs.com/u/AlphaSau)

Allowing certain inputs based on a regex pattern, preventing the user from inputting anything invalid.

## Usage

    <input type="text" pattern="[0-9]+" ng-pattern-restrict />

Should be the same as

    <input type="text" ng-pattern-restrict="[0-9]+" pattern="[0-9]+" />

### Notes:

- ([#15][ticket15]) **Make sure to use "progressive" regular expressions.** The expressions are validated
  against the full regular expression. This means that if your regex is `\d\d`, and your textbox is empty,
  a user will never be able to type anything because the first keypress will not validate and will be reverted.
  Following the example, the proper regular expression should be `\d{0,2}`.
- **Your regex must validate against empty strings if you want users to be able to remove the value from the
  textbox.**
- **Make sure AngularJS is compatible with your browser.** It goes without saying, but your browser compatibility
  with AngularJS will make a huge impact on how well this directive can behave. For example, AngularJS 1.3 with
  IE 8 won't really play well together, and this directive is restricted by those limitations.

If you still have problems, please make sure to check the [Compatibility notes][compatibility]. There are several issues that really depend on the browsers.

## E2E testing

In order to e2e test you need to execute the following steps:

    npm install
    ./node_modules/protractor/bin/webdriver-manager update

    # then, for each time you want to test
    npm test

That's it. Neat, huh?

Check out the [protractor configuration file][protractor conf] for the set of browsers that you want to test on your system.

[travisci]: https://travis-ci.org/AlphaGit/ng-pattern-restrict
[ticket15]: https://github.com/AlphaGit/ng-pattern-restrict/issues/15
[compatibility]: docs/compatibility.md
[protractor conf]: protractor-conf.js