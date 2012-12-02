
var funcUtils = require("./func_utils");
var microtime = require("microtime");

module.exports = function() {
  var obj = {
    results: []
  };
  var time = 0;

  obj.start = funcUtils.wrap(function() {
    time = microtime.now();
  });
  obj.stop = funcUtils.wrap(function() {
    obj.results.push(microtime.now() - time);
  });

  return obj;
};
