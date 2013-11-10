describe('ngPatternRestrict', function() {
	beforeEach(function() {
		browser().navigateTo("/");
	});

	describe("numeric inputs", function() {
		var numericInput;
		beforeEach(function() {
			numericInput = input("numericOneToThree");
		});

		it("should not return a value if the input is non-numeric", function() {
			numericInput.enter("Non valid number");
			expect(numericInput.val()).toBe("");
		});

		it("should revert back to last valid value, when input cannot be verified", function() {
			numericInput.enter("123");
			expect(numericInput.val()).toBe("123");
			numericInput.enter("ABC");
			expect(numericInput.val()).toBe("123");
		});

		it("should allow data input if the input validates", function() {
			numericInput.enter("1");
			expect(numericInput.val()).toBe("1");
		});

		it("should revert back to the previously validating value if the input does not validate", function() {
			numericInput.enter("123");
			expect(numericInput.val()).toBe("123");
			numericInput.enter("9999");
			expect(numericInput.val()).toBe("123");
		});
	}); // END: numeric inputs

	describe("text inputs", function() {
		var alphabeticalInput;
		beforeEach(function() {
			alphabeticalInput = input("alphabeticalInput");
		});

		it("should allow alphabetical input", function() {
			alphabeticalInput.enter("ABC");
			expect(alphabeticalInput.val()).toBe("ABC");
		});

		it("should not allow non-alphabetical input", function() {
			alphabeticalInput.enter("ABC");
			expect(alphabeticalInput.val()).toBe("ABC");
			alphabeticalInput.enter("1");
			expect(alphabeticalInput.val()).toBe("ABC");
		});
	}); // END: text inptus

	describe("ng-pattern-restrict attribute", function() {
		var changeRegexInput,
			regexToChangeInput;

		beforeEach(function() {
			changeRegexInput = input("changeRegex");
			regexToChangeInput = input("regexToChange");
		});

		it("should detect changes", function() {
			regexToChangeInput.enter("^[A-Za-z]*$");
			changeRegexInput.enter("ABC");
			expect(changeRegexInput.val()).toBe("ABC");
			changeRegexInput.enter("");

			regexToChangeInput.enter("^\\d+$");
			changeRegexInput.enter("123");
			expect(changeRegexInput.val()).toBe("123");
		});

		it("should throw exceptions if the regex is invalid", function() {
			/*
			var setInvalidInput = function() {
				regexToChangeInput.enter("+");
			}
			expect(setInvalidInput).toThrow();
			*/
			//TODO fix test -- at the moment angular.scenario does not support .toThrow()
			// maybe swtiching for another testing framework?
		});
	}); // END: ng-pattern-restrict attribute

	describe("pattern attribute", function() {
		var patternTestInput,
			patternUpdateTest,
			regexToChangePattern;
		beforeEach(function() {
			patternTestInput = input("patternTest");
			patternUpdateTest = input("patternUpdateTest");
			regexToChangePattern = input("regexToChangePattern");
		});

		it("should be read if ng-pattern-restrict does not have value", function() {
			patternTestInput.enter("ABC");
			expect(patternTestInput.val()).toBe("ABC");
			patternTestInput.enter("123");
			expect(patternTestInput.val()).toBe("ABC");
		});

		it("should be re-read if updated", function() {
			patternUpdateTest.enter("ABC");
			expect(patternUpdateTest.val()).toBe("ABC");
			patternUpdateTest.enter("");

			regexToChangePattern.enter("^\\d+$");
			patternUpdateTest.enter("123");
			expect(patternUpdateTest.val()).toBe("123");
		});
	});
});