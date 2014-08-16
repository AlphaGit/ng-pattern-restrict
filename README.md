# ng-pattern-restrict [![Build Status](https://travis-ci.org/AlphaGit/ng-pattern-restrict.png)](https://travis-ci.org/AlphaGit/ng-pattern-restrict)

Allowing certain inputs based on a regex pattern, preventing the user from inputting anything invalid.

## Usage

    <input type="text" pattern="[0-9]+" ng-pattern-restrict />

Should be the same as

    <input type="text" ng-pattern-restrict="[0-9]+" pattern="[0-9]+" />

## Unit testing

In order to unit test you need to execute the following steps:

    node karma-server.js

Leave that running on the background, it will open up an HTTP server at port 8000.

    grunt karma