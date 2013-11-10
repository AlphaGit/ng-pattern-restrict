describe('ngPatternRestrict', function() {
	describe("Input restriction", function() {
		it("should allow data input if the input validates", function() {
			browser().navigateTo("/");
			input("numericOneToThree").enter("1");
			expect(input("numericOneToThree").val()).toBe("1");
		});

		it("should not allow data input if the input does not validate", function() {
			browser().navigateTo("/");
			input("numericOneToThree").enter("A");
			expect(input("numericOneToThree").val()).toBe("");
		});

		it("should revert back to the previously validating value if the input does not validate", function() {
			browser().navigateTo("/");
			input("numericOneToThree").enter("123");
			expect(input("numericOneToThree").val()).toBe("123");
			input("numericOneToThree").enter("9999");
			expect(input("numericOneToThree").val()).toBe("123");
		});
	}); // section
});