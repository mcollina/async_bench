var counters = require("../lib/counters");
var runCounter = counters.runCounter;
var preHeatRunCounter = counters.preHeatRunCounter;
var funcUtils = require("../lib/func_utils");

describe(runCounter, function () {

  it("should call a function x times", function(done) {
    var spy = sinon.spy();
    runCounter({ runs: 5, func: funcUtils.wrap(spy) }, function() {
      expect(spy.callCount).to.equal(5); 
      done();
    });
  });

  it("should call a function y times", function(done) {
    var spy = sinon.spy();
    runCounter({ runs: 7, func: funcUtils.wrap(spy) }, function() {
      expect(spy.callCount).to.equal(7); 
      done();
    });
  });

  it("should forward an error", function(done) {
    var error = "this is an error";
    var func = function(cb) {
      cb(error);
    };
    runCounter({ runs: 7, func: func }, function(err) {
      expect(err).to.equal(error); 
      done();
    });
  });
});

describe(preHeatRunCounter, function () {

  it("should call the function x times for preheat", function(done) {
    var func = sinon.spy();
    preHeatRunCounter({ preHeat: 5, runs: 0, func: funcUtils.wrap(func) }, function() {
      expect(func.callCount).to.equal(5);
      done();
    });
  });

  it("should call the function y times for preheat", function(done) {
    var func = sinon.spy();
    preHeatRunCounter({ preHeat: 7, runs: 0, func: funcUtils.wrap(func) }, function() {
      expect(func.callCount).to.equal(7);
      done();
    });
  });

  it("should forward an error", function(done) {
    var error = "this is an error";
    var func = function(cb) {
      cb(error);
    };
    preHeatRunCounter({ preHeat: 1, runs: 7, func: func }, function(err) {
      expect(err).to.equal(error);
      done();
    });
  });
});
