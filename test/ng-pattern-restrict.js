describe('ngPatternRestrict', function() {
	var formHtml = "<form name='test'><input name='input' ng-model='x' ng-pattern-restrict='{{patternRestrict}}'></form>";
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
	}));

	describe("Meta-tests", function() {
		describe("compileElement", function() {
			it("compileElement with form data should return a form", function() {
				var form = compileElement(formHtml);
				expect(form[0].nodeName.toLowerCase()).toBe("form");
			});

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
		});
	});

	describe("initialization", function() {
		it("should be invoked when present", function() {
			var element = compileElement(inputHtml);
			
		}); // should be invoked when present
	}); // section
});