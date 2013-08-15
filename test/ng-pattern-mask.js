describe('ngPatternMask', function() {
	var formHtml = "<form name='test'><input name='input' ng-model='x' ng-pattern-mask='{{patternMask}}'></form>";
	var inputHtml = "<input name='input' ng-model='x' ng-pattern-mask='{{patternMask}}'>";

	beforeEach(module('ngPatternMask'));
	beforeEach(inject(function ($rootScope, $compile, ngPatternMaskConfig) {
		c = console.log;
		scope = $rootScope;
		config = ngPatternMaskConfig;
		compileElement = function(html) {
			return $compile(html)(scope);
		};
	}));

	describe("section", function() {
		it("test", function() {
			expect(1).toBe(1);
		}); // test
	}); // section
});