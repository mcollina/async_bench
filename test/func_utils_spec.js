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
});
