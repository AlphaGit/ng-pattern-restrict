angular.module('ngPatternMask', [])
	.value('ngPatternMaskConfig', {
		//TODO
	})
	.directive('ngPatternMask', ['ngPatternMaskConfig', function(patternMaskConfig) {
		return {
			priority: 100,
			require: 'ngModel',
			restrict: 'A',
			compile: function uiPatternMaskCompile() {
				var options = patternMaskConfig;

				return function ngPatternMaskLinking(scope, iElement, iAttrs, controller) {
					var originalPattern = iAttrs.pattern;
					var eventsBound = false;
					var regex; // validation regex object
					var oldValue; // keeping track of the previous value of the element

					//-------------------------------------------------------------------
					// initialization
					function initialize() {
						originalPattern = iAttrs.pattern;
						
						//TEST should default to ngPatternMask, but if not present should check for pattern
						var entryRegex = !!ngPatternMask ? ngPatternMask : originalPattern;
						tryParseRegex(entryRegex);

						bindListeners();
					};

					function uninitialize() {
						unbindListeners();
					};

					//-------------------------------------------------------------------
					// setup events
					function bindListeners() {
						if (eventsBound) return;

			            iElement.bind('input keyup click', genericEventHandler);
					};

					function unbindListeners() {
						if (!eventsBound) return;

			            iElement.unbind('input', genericEventHandler);
			            iElement.unbind('keyup', genericEventHandler);
			            iElement.unbind('click', genericEventHandler);

			            eventsBound = false;
					};

					//-------------------------------------------------------------------
					// setup based on attributes
					function tryParseRegex(regexString) {
						try {
							regex = new RegExp(regexString);
						} catch (e) {
							//TEST should not initialize with invalid regex strings
							throw "Invalid RegEx string parsed for ngPatternMask: " + regexString;
						}
					};

					//-------------------------------------------------------------------
					// event handlers
					function genericEventHandler(evt) {
						var newValue = iElement.val();
						if (!regex.test(newValue))
							evt.preventDefault();
					};

					//TEST should update itself based on changes to the ngPatternMask attribute
					iAttrs.$observe("ngPatternMask", initialize);
					//TEST should update itself based on changes to the pattern attribute
					iAttrs.$observe("pattern", initialize);
				};
			}
		};
	}]);