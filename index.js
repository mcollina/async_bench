var fs = require("fs");
var microtime = require("microtime");
var util = require("util");
var async = require("async");
var math = require("./lib/math");
var funcUtils = require("./lib/func_utils");
var counters = require("./lib/counters");
var Timer = require("timer");

module.exports = function runner(opts) {
  var setup = opts.setup || funcUtils.empty;
  var bench = opts.bench || funcUtils.empty;
  var teardown = opts.teardown || funcUtils.empty;
  var complete = opts.complete || funcUtils.empty;

  var timer = Timer();

  counters.preHeatRunCounter(opts, function(callback) {

    async.waterfall([
                    setup,
                    timer.start,
                    bench,
                    timer.stop,
                    teardown
    ], callback);
  }, function(err) {
    if(err)
      throw err;
    complete(math.calculate(timer.results));
  });
}
