describe('ngPatternRestrict', function() {
	var inputHtml = "<input name='input' ng-model='x' ng-pattern-restrict='{{patternRestrict}}'>";

	// call example: triggerEvent(input, 'keypress', { which: 13 });
	var triggerEvent = function(element, eventName, eventData) {
		var e = $.Event(eventName);
		$.extend(e, eventData);
		$(element).trigger(e);
	};

	beforeEach(module('ngPatternRestrict'));
	beforeEach(inject(function ($rootScope, $compile, ngPatternRestrictConfig) {
		scope = $rootScope;
		config = ngPatternRestrictConfig;
		compileElement = function(html) {
			return $compile(html)(scope);
		};
		setPattern = function(pattern) {
			scope.$apply(function() {
				scope.patternRestrict = pattern;
			});
		};
	}));

	describe("Meta-tests", function() {
		describe("compileElement", function() {
			it("compileElement with input data should return an input", function() {
				var input = compileElement(inputHtml);
				expect(input[0].nodeName.toLowerCase()).toBe("input");
			});
		}); // compileElement

		describe("triggerEvent", function() {
			it("should be able to raise a keypress event", function() {
				var input = compileElement(inputHtml);
				var expectedCode = 65;

				var keypressRaised = false;
				var keypressReceivedCode;

				$(input).bind("keypress", function(e) {
					keypressRaised = true;
					keypressReceivedCode = e.which;
				});
				triggerEvent(input, "keypress", { which: expectedCode });

				expect(keypressRaised).toBe(true);
				expect(keypressReceivedCode).toBe(expectedCode);
			});

			it("should be able to raise a keydown event", function() {
				var input = compileElement(inputHtml);
				var expectedCode = 65;

				var keypressRaised = false;
				var keypressReceivedCode;

				$(input).bind("keydown", function(e) {
					keypressRaised = true;
					keypressReceivedCode = e.which;
				});
				triggerEvent(input, "keydown", { which: expectedCode });

				expect(keypressRaised).toBe(true);
				expect(keypressReceivedCode).toBe(expectedCode);
			});

			it("should be able to raise a keyup event", function() {
				var input = compileElement(inputHtml);
				var expectedCode = 65;

				var keypressRaised = false;
				var keypressReceivedCode;

				$(input).bind("keyup", function(e) {
					keypressRaised = true;
					keypressReceivedCode = e.which;
				});
				triggerEvent(input, "keyup", { which: expectedCode });

				expect(keypressRaised).toBe(true);
				expect(keypressReceivedCode).toBe(expectedCode);
			});

			it("should be able to raise a change event", function() {
				var input = compileElement(inputHtml),
					$input = $(input),
					oldValue = "A",
					newValue = "B";
				$input.val(oldValue);

				var eventRaised = false;
				var receivedValue;
				$(input).bind("change", function(e) {
					eventRaised = true;
					receivedValue = $(this).val();
				});

				$input.val(newValue);
				triggerEvent(input, "change");

				expect(eventRaised).toBe(true);
				expect(receivedValue).toBe(newValue);
				expect(receivedValue).not.toBe(oldValue);
			});
		}); // triggerEvent

		describe("setPattern", function() {
			it("should change the pattern on the scope for the test", function() {
				expect(scope.patternRestrict).toBeUndefined();
				var newPattern = "[0-9]+";
				setPattern(newPattern);
				expect(scope.patternRestrict).toBe(newPattern);
			});

			it("should bind the change into the input tests", function() {
				var pattern = "[0-9]+";
				var $input = $(compileElement(inputHtml));
				scope.$digest();
				expect($input).not.toBeUndefined();
				expect($input.attr("ng-pattern-restrict")).toBeFalsy();
				setPattern(pattern);
				expect($input.attr("ng-pattern-restrict")).toBe(pattern);
			});
		});
	});

	describe("Input restriction", function() {
		it("should allow event 'input' if the input validates", function() {
			var input = compileElement(inputHtml);
			var $input = $(input);
			setPattern("[0-9]+");

			$input.val("0");
			triggerEvent(input, 'input'); //TODO: why won't jquery raise this event?
			expect($input.val()).toBe("0");
		});

		it("should not allow event 'input' if the input does not validate", function() {
			var input = compileElement(inputHtml);
			var $input = $(input);
			setPattern("[0-9]+");

			$input.val("A");
			triggerEvent(input, 'input');  //TODO: why won't jquery raise this event?
			expect($input.val()).toBe("");
		});

		it("should allow event 'keypress' if the input validates", function() {
			var input = compileElement(inputHtml);
			var $input = $(input);
			setPattern("[0-9]+");

			$input.val("0");
			triggerEvent(input, 'keypress', { which: 48 }); // "0"
			expect($input.val()).toBe("0");
		});

		it("should not allow event 'keypress' if the input does not validate", function() {
			var input = compileElement(inputHtml);
			var $input = $(input);
			setPattern("[0-9]+");

			$input.val("A");
			triggerEvent(input, 'keypress', { which: 65 }); // "A"
			expect($input.val()).toBe("");
		});
	}); // section
});