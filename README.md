ng-pattern-restrict
===================

Allowing certain inputs based on a regex pattern, preventing the user from inputting anything invalid.

## Usage:

    <input type="text" pattern="/[0-9]+/" ng-pattern-restrict />

Should be the same as

    <input type="text" ng-pattern-restrict="/[0-9]+/" pattern="/[0-9]+/" />