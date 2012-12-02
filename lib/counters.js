
var async = require("async");
var funcUtils = require("./func_utils");

module.exports.runCounter = function(opts, callback) {
  var remainingRuns = opts.runs;

  async.whilst(function() {
    return remainingRuns-- > 0
  }, opts.func, callback);
};

module.exports.preHeatRunCounter = function(opts, callback) {
  var runCounter = module.exports.runCounter;
  var runs = opts.runs;
  var func = opts.func;
  var preHeat = opts.preHeat;
  var reset = opts.reset || funcUtils.empty;

  runCounter({ runs: preHeat, func: func }, function(err) {
    if(err) {
      callback(err);
      return;
    }
    reset(runCounter.bind(null, { runs: runs, func: func }, callback));
  });
};
