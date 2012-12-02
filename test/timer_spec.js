var timer = require("../lib/timer");
var async = require("async");
var microtime = require("microtime");

describe(timer, function () {

  var instance = null;

  beforeEach(function() {
    instance = timer();
  });

  it("should expose a start function", function() {
    expect(instance).to.respondTo("start");
  });

  it("should expose a stop function", function() {
    expect(instance).to.respondTo("stop");
  });

  it("should expose a results array", function() {
    expect(instance).to.have.property("results").and.eql([]);
  });

  it("should add an element to result when calling start and stop", function() {
    instance.start(function() {
      instance.stop(function() {
        expect(instance).to.have.deep.property("results.length", 1);
      });
    });
  });

  it("should add an element to result when calling start and stop in waterfall", function() {
    async.waterfall([
      instance.start,
      instance.stop,
      instance.start,
      instance.stop
    ], function() {
      expect(instance).to.have.deep.property("results.length", 2);
    });
  });

  it("should measure time using microtime", function() {
    var stub = sinon.stub(microtime, "now");
    stub.returns(4);
    instance.start(function() {
      stub.returns(6);
      instance.stop(function() {
        expect(instance.results).to.eql([2]);
        stub.restore();
      });
    });
  });

  it("should measure time using microtime (bis)", function() {
    var stub = sinon.stub(microtime, "now");
    stub.returns(4);
    instance.start(function() {
      stub.returns(7);
      instance.stop(function() {
        expect(instance.results).to.eql([3]);
        stub.restore();
      });
    });
  });
});
