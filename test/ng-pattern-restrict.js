describe('ngPatternRestrict', function() {
	describe("Input restriction", function() {
		it("should allow data input if the input validates", function() {
			browser().navigateTo("/");
			input("numeric").enter("0");
			expect(input("numeric").val()).toBe("0");
		});

		it("should not allow data input if the input does not validate", function() {
			browser().navigateTo("/");
			input("numeric").enter("A");
			expect(input("numeric").val()).toBe("");
		});

		it("should revert back to the previously validating value if the input does not validate", function() {
			browser().navigateTo("/");
			input("numeric").enter("0123");
			input("numeric").enter("ABC");
			expect(input("numeric").val()).toBe("0123");
		});
	}); // section
});