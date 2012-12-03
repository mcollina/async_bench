var funcUtils = require("../lib/func_utils");

describe(funcUtils, function () {

  describe(funcUtils.empty, function() {

    it("should call the callback", function() {
      var spy = sinon.spy(); 
      funcUtils.empty(spy);
      expect(spy).to.have.been.calledWith(null);
    });
  });

  describe(funcUtils.wrap, function() {

    it("should call the wrapped function", function() {
      var spy = sinon.spy(); 
      var callback = sinon.spy();
      funcUtils.wrap(spy)(callback);
      expect(spy).to.have.been.called;
    });

    it("should call the callback", function() {
      var spy = sinon.spy(); 
      var callback = sinon.spy();
      funcUtils.wrap(spy)(callback);
      expect(callback).to.have.been.calledWith(null);
    });

    it("should call the callback passing on a parameter", function() {
      var spy = sinon.spy(); 
      var callback = sinon.spy();
      funcUtils.wrap(spy)("first", callback);
      expect(callback).to.have.been.calledWith(null, "first");
    });

    it("should call the callback passing on two parameters", function() {
      var spy = sinon.spy(); 
      var callback = sinon.spy();
      funcUtils.wrap(spy)("first", "second", callback);
      expect(callback).to.have.been.calledWith(null, "first", "second");
    });

    it("should call the wrapped function passing on two parameters", function() {
      var spy = sinon.spy(); 
      var callback = sinon.spy();
      funcUtils.wrap(spy)("first", "second", callback);
      expect(spy).to.have.been.calledWith("first", "second");
    });
  });

  describe(funcUtils.buildPipe, function() {
    var timer;
    var opts;

    beforeEach(function() {
      timer = {};
      opts = {};
    });

    it("should return an array of five elements", function() {
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("length", 5);
    });

    it("should put the setup function at the first place", function() {
      opts.setup = function() {};
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("0", opts.setup);
    });

    it("should put the empty function if the setup function is null", function() {
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("0", funcUtils.empty);
    });

    it("should put the bench function at the third place", function() {
      opts.bench = function() {};
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("2", opts.bench);
    });

    it("should put the empty function if the bench function is null", function() {
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("2", funcUtils.empty);
    });

    it("should put the teardown function at the fifth place", function() {
      opts.teardown = function() {};
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("4", opts.teardown);
    });

    it("should put the empty function if the teardown function is null", function() {
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("4", funcUtils.empty);
    });

    it("should put the start function at the first place", function() {
      timer.start = function() {};
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("1", timer.start);
    });

    it("should put the stop function at the first place", function() {
      timer.stop = function() {};
      expect(funcUtils.buildPipe(opts, timer)).to.have.property("3", timer.stop);
    });
  });
});
