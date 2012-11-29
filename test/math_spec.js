var math = require("../lib/math");

describe(math, function () {

  describe(math.mean, function() {
    it("should work with 3 element", function() {
      expect(math.mean([1,2,3])).to.equal(2);
    });

    it("should work with no element", function() {
      expect(math.mean([])).to.equal(0);
    });

    it("should work with 1 element", function() {
      expect(math.mean([42])).to.equal(42);
    });

    it("should work with a fraction", function() {
      expect(math.mean([1,2])).to.equal(1.5);
    });
  });

  describe(math.standardDeviation, function() {
    it("should work with no element", function() {
      expect(math.standardDeviation([])).to.equal(0);
    });

    it("should work with 1 element", function() {
      expect(math.standardDeviation([42])).to.equal(0);
    });

    it("should work with a big population", function() {
      expect(math.standardDeviation([2,4,4,4,5,5,7,9])).to.equal(2);
    });
  });

  describe(math.caclulate, function() {
    it("should include the mean result", function() {
      var array = [1,2,3];
      var mean = math.mean(array);
      expect(math.calculate(array)).to.have.property("mean", mean);
    });

    it("should include the standardDeviation result", function() {
      var array = [1,2,3];
      var standardDeviation = math.standardDeviation(array);
      expect(math.calculate(array)).to.have.property("standardDeviation", standardDeviation);
    });
  });
});
