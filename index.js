var async = require("async");
var math = require("./lib/math");
var funcUtils = require("./lib/func_utils");
var counters = require("./lib/counters");
var Timer = require("timer");

module.exports = function runner(opts) {
  var complete = opts.complete || funcUtils.empty;
  var timer = Timer();

  counters.preHeatRunCounter(opts, function(callback) {
    async.waterfall(funcUtils.buildPipe(timer), callback);
  }, function(err) {
    if(err)
      throw err;
    complete(math.calculate(timer.results));
  });
}
