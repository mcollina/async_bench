var async = require("async");
var math = require("./lib/math");
var funcUtils = require("./lib/func_utils");
var counters = require("./lib/counters");
var Timer = require("./lib/timer");

module.exports = function runner(opts) {
  var timer = Timer();

  var pipe = funcUtils.buildPipe(opts, timer);
  opts.bench = async.apply(async.waterfall, pipe);

  counters.preHeatRunCounter(opts, function(err) {
    funcUtils.always(opts.complete)(err, math.calculate(timer.results));
  });
}
