
var asyncBench = require("../");
var funcUtils = require("../lib/func_utils");

describe(asyncBench, function() {
  it("should call the bench func 5 times for preheat", function(done) {
    var func = sinon.spy();
    asyncBench({ 
      preHeat: 5, 
      runs: 1, 
      bench: funcUtils.wrap(func), 
      complete: function(err, results) {
        expect(func.callCount).to.equal(6);
        done();
      }
    });
  });
  
  it("should call the reset function", function(done) {
    var func = sinon.spy();
    asyncBench({ 
      preHeat: 5, 
      runs: 1,
      reset: funcUtils.wrap(func), 
      complete: function(err, results) {
        expect(func.callCount).to.equal(1);
        done();
      }
    });
  });

  it("should call the setup function", function(done) {
    var func = sinon.spy();
    asyncBench({ 
      preHeat: 3, 
      runs: 3, 
      setup: funcUtils.wrap(func), 
      complete: function(err, results) {
        expect(func.callCount).to.equal(6);
        done();
      }
    });
  });

  it("should pass things from setup to bench", function(done) {
    asyncBench({ 
      preHeat: 3, 
      runs: 3, 
      setup: function(cb) {
        cb(null, "hello world");
      },
      bench: function(arg, cb) {
        expect(arg).to.eql("hello world");  
        cb(null);
      },
      complete: function(err, results) {
        done();
      }
    });
  });

  it("should pass things from bench to teardown", function(done) {
    asyncBench({ 
      preHeat: 3, 
      runs: 3, 
      bench: function(cb) {
        cb(null, "hello world");
      },
      teardown: function(arg, cb) {
        expect(arg).to.eql("hello world");  
        cb(null);
      },
      complete: function(err, results) {
        done();
      }
    });
  });

  it("should pass things from bench to teardown", function(done) {
    var spy = sinon.spy();
    asyncBench({ 
      preHeat: 3, 
      runs: 3, 
      setup: funcUtils.wrap(spy),
      bench: function(cb) {
        cb("err");
      },
      complete: function(err, results) {
        expect(err).to.eql("err");
        done();
      }
    });
  });

  it("should return the samples", function(done) {
    var spy = sinon.spy();
    asyncBench({ 
      preHeat: 3, 
      runs: 3, 
      setup: funcUtils.wrap(spy),
      bench: function(cb) {
        cb();
      },
      complete: function(err, results, samples) {
        expect(samples).to.be.instanceof(Array);
        expect(samples).to.have.property("length", 3);
        done();
      }
    });
  });

  it("should return the samples with different preHeat and run", function(done) {
    var spy = sinon.spy();
    asyncBench({ 
      preHeat: 2, 
      runs: 5, 
      setup: funcUtils.wrap(spy),
      bench: function(cb) {
        cb();
      },
      complete: function(err, results, samples) {
        expect(samples).to.be.instanceof(Array);
        expect(samples).to.have.property("length", 5);
        done();
      }
    });
  });
});
