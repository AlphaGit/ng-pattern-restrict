# ng-pattern-restrict [![Build Status](https://travis-ci.org/AlphaGit/ng-pattern-restrict.png)][travisci]

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

## Unit testing

In order to unit test you need to execute the following steps:

    node karma-server.js

Leave that running on the background, it will open up an HTTP server at port 8000.

    grunt karma
    
[travisci]: https://travis-ci.org/AlphaGit/ng-pattern-restrict
[ticket15]: https://github.com/AlphaGit/ng-pattern-restrict/issues/15
