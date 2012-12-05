
var async = require("async");
var funcUtils = require("./func_utils");

module.exports.runCounter = function(opts, callback) {
  var remainingRuns = opts.runs;

  async.whilst(function() {
    return remainingRuns-- > 0
  }, opts.bench, callback);
};

module.exports.preHeatRunCounter = function(opts, callback) {
  var runCounter = module.exports.runCounter;
  var runs = opts.runs;
  var bench = opts.bench;
  var preHeat = opts.preHeat;
  var reset = opts.reset || funcUtils.empty;

  runCounter({ runs: preHeat, bench: bench }, function(err) {
    if(err) {
      callback(err);
      return;
    }
    reset(runCounter.bind(null, { runs: runs, bench: bench }, callback));
  });
};
