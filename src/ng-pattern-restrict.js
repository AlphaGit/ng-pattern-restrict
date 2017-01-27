/*jslint browser: true, plusplus: true, indent: 2 */

// This will be removed by uglify, along with the DEBUG code
if (typeof DEBUG === 'undefined') {
  DEBUG = true;
}

// Logic and fallbacks based on the following SO answers:
// - Getting caret position cross browser: http://stackoverflow.com/a/9370239/147507
// - Selection API on non input-text fields: http://stackoverflow.com/a/24247942/147507
// - Set cursor position on input text: http://stackoverflow.com/q/5755826/147507
angular.module('ngPatternRestrict', [])
  .directive('ngPatternRestrict', ['$log', function ($log) {
    'use strict';

    function showDebugInfo() {
      $log.debug("[ngPatternRestrict] " + Array.prototype.join.call(arguments, ' '));
    }

    return {
      restrict: 'A',
      require: "?ngModel",
      compile: function uiPatternRestrictCompile() {
        DEBUG && showDebugInfo("Loaded");

        return function ngPatternRestrictLinking(scope, iElement, iAttrs, ngModelController) {
          var regex = /.*/, // validation regex object
            catchAllregex = true, // whether the previous regex is an allow-all regex
            oldValue, // keeping track of the previous value of the element
            caretPosition, // keeping track of where the caret is at to avoid jumpiness
            // housekeeping
            initialized = false, // have we initialized our directive yet?
            eventsBound = false, // have we bound our events yet?
            // functions
            getCaretPosition, // function to get the caret position, set in detectGetCaretPositionMethods
            setCaretPosition; // function to set the caret position, set in detectSetCaretPositionMethods

          //-------------------------------------------------------------------
          // caret position
          function getCaretPositionWithInputSelectionStart() {
            return iElement[0].selectionStart; // we need to go under jqlite
          }

          function getCaretPositionWithDocumentSelection() {
            // create a selection range from where we are to the beggining
            // and measure how much we moved
            var range = document.selection.createRange();
            range.moveStart('character', -iElement.val().length);
            return range.text.length;
          }

          function getCaretPositionWithWindowSelection() {
            var s = window.getSelection(),
              originalSelectionLength = String(s).length,
              selectionLength,
              didReachZero = false,
              detectedCaretPosition,
              restorePositionCounter;

            do {
              selectionLength = String(s).length;
              s.modify('extend', 'backward', 'character');
              // we're undoing a selection, and starting a new one towards the beggining of the string
              if (String(s).length === 0) {
                didReachZero = true;
              }
            } while (selectionLength !== String(s).length);

            detectedCaretPosition = didReachZero ? selectionLength : selectionLength - originalSelectionLength;
            s.collapseToStart();

            restorePositionCounter = detectedCaretPosition;
            while (restorePositionCounter-- > 0) {
              s.modify('move', 'forward', 'character');
            }
            while (originalSelectionLength-- > 0) {
              s.modify('extend', 'forward', 'character');
            }

            return detectedCaretPosition;
          }

          function setCaretPositionWithSetSelectionRange(position) {
            iElement[0].setSelectionRange(position, position);
          }

          function setCaretPositionWithCreateTextRange(position) {
            var textRange = iElement[0].createTextRange();
            textRange.collapse(true);
            textRange.moveEnd('character', position);
            textRange.moveStart('character', position);
            textRange.select();
          }

          function setCaretPositionWithWindowSelection(position) {
            var s = window.getSelection(),
              selectionLength;

            do {
              selectionLength = String(s).length;
              s.modify('extend', 'backward', 'line');
            } while (selectionLength !== String(s).length);
            s.collapseToStart();

            while (position--) {
              s.modify('move', 'forward', 'character');
            }
          }

          // HACK: Opera 12 won't give us a wrong validity status although the input is invalid
          // we can select the whole text and check the selection size
          // Congratulations to IE 11 for doing the same but not returning the selection.
          function getValueLengthThroughSelection(input) {
            // only do this on opera, since it'll mess up the caret position
            // and break Firefox functionality
            if (!/Opera/i.test(navigator.userAgent)) {
              return 0;
            }

            input.focus();
            document.execCommand("selectAll");
            var focusNode = window.getSelection().focusNode;
            return (focusNode || {}).selectionStart || 0;
          }

          //-------------------------------------------------------------------
          // event handlers
          function revertToPreviousValue() {
            iElement.val(oldValue);

            if (!angular.isUndefined(caretPosition)) {
              setCaretPosition(caretPosition);
            }
          }

          function updateCurrentValue(newValue) {
            oldValue = newValue;
            caretPosition = getCaretPosition();
          }

          function genericEventHandler(evt) {
            DEBUG && showDebugInfo("Reacting to event:", evt.type);

            if (catchAllregex) {
              DEBUG && showDebugInfo("Currently using a catch-all regex. No checks to do.");
              return;
            }

            //HACK Chrome returns an empty string as value if user inputs a non-numeric string into a number type input
            // and this may happen with other non-text inputs soon enough. As such, if getting the string only gives us an
            // empty string, we don't have the chance of validating it against a regex. All we can do is assume it's wrong,
            // since the browser is rejecting it either way.
            var newValue = iElement.val(),
              inputValidity = iElement.prop("validity");
            if (newValue === "" && iElement.attr("type") !== "text" && inputValidity && inputValidity.badInput) {
              DEBUG && showDebugInfo("Value cannot be verified. Should be invalid. Reverting back to:", oldValue);
              evt.preventDefault();
              revertToPreviousValue();
            } else if (newValue === "" && getValueLengthThroughSelection(iElement[0]) !== 0) {
              DEBUG && showDebugInfo("Invalid input. Reverting back to:", oldValue);
              evt.preventDefault();
              revertToPreviousValue();
            } else if (regex.test(newValue)) {
              DEBUG && showDebugInfo("New value passed validation against", regex, newValue);
              updateCurrentValue(newValue);
            } else {
              DEBUG && showDebugInfo("New value did NOT pass validation against", regex, newValue, "Reverting back to:", oldValue);
              evt.preventDefault();
              revertToPreviousValue();
            }

            // make sure the model is consistent with last approach
            // needed even when we don't change what has been input -- see https://github.com/AlphaGit/ng-pattern-restrict/pull/43
            if (ngModelController) {
              scope.$apply(function () {
                ngModelController.$setViewValue(oldValue);
              });
            }
          }

          //-------------------------------------------------------------------
          // setup events
          function bindListeners() {
            if (eventsBound) {
              return;
            }

            iElement.bind('input keyup click', genericEventHandler);

            DEBUG && showDebugInfo("Bound events: input, keyup, click");
          }

          function unbindListeners() {
            if (!eventsBound) {
              return;
            }

            iElement.unbind('input', genericEventHandler);
            //input: HTML5 spec, changes in content

            iElement.unbind('keyup', genericEventHandler);
            //keyup: DOM L3 spec, key released (possibly changing content)

            iElement.unbind('click', genericEventHandler);
            //click: DOM L3 spec, mouse clicked and released (possibly changing content)

            DEBUG && showDebugInfo("Unbound events: input, keyup, click");

            eventsBound = false;
          }

          //-------------------------------------------------------------------
          // initialization
          function readPattern() {
            var entryRegex = !!iAttrs.ngPatternRestrict ? iAttrs.ngPatternRestrict : iAttrs.pattern;
            DEBUG && showDebugInfo("RegEx to use:", entryRegex);

            catchAllregex = /\^?\.\*\$?/.test(entryRegex);
            DEBUG && showDebugInfo("RegEx '" + entryRegex + "'" + (catchAllregex ? "is" : "is not") + " a catch all regex");

            try {
              regex = new RegExp(entryRegex);
            } catch (e) {
              throw "Invalid RegEx string parsed for ngPatternRestrict: " + entryRegex;
            }
          }

          function notThrows(testFn, shouldReturnTruthy) {
          	try {
          		return testFn() || !shouldReturnTruthy;
          	} catch (e) {
          		return false;
          	}
          }

          function detectGetCaretPositionMethods() {
            var input = iElement[0];

            // Chrome will throw on input.selectionStart of input type=number
            // See http://stackoverflow.com/a/21959157/147507
            if (notThrows(function () { return input.selectionStart; })) {
              getCaretPosition = getCaretPositionWithInputSelectionStart;
            } else {
              // IE 9- will use document.selection
              // TODO support IE 11+ with document.getSelection()
              if (notThrows(function () { return document.selection; }, true)) {
                getCaretPosition = getCaretPositionWithDocumentSelection;
              } else {
                getCaretPosition = getCaretPositionWithWindowSelection;
              }
            }
          }

          function detectSetCaretPositionMethods() {
            var input = iElement[0];
            if (typeof input.setSelectionRange === 'function') {
              setCaretPosition = setCaretPositionWithSetSelectionRange;
            } else if (typeof input.createTextRange === 'function') {
              setCaretPosition = setCaretPositionWithCreateTextRange;
            } else {
              setCaretPosition = setCaretPositionWithWindowSelection;
            }
          }

          function initialize() {
            if (initialized) {
              return;
            }
            DEBUG && showDebugInfo("Initializing");

            readPattern();

            oldValue = iElement.val();
            if (!oldValue) {
              oldValue = "";
            }
            DEBUG && showDebugInfo("Original value:", oldValue);

            bindListeners();

            detectGetCaretPositionMethods();
            detectSetCaretPositionMethods();

            initialized = true;
          }

          function uninitialize() {
            DEBUG && showDebugInfo("Uninitializing");
            unbindListeners();
          }

          iAttrs.$observe("ngPatternRestrict", readPattern);
          iAttrs.$observe("pattern", readPattern);

          scope.$on("$destroy", uninitialize);

          initialize();
        };
      }
    };
  }]);
