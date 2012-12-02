
var async = require("async");

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

  runCounter({ runs: preHeat, func: func }, function(err) {
    if(err) {
      callback(err);
      return;
    }

    runCounter({ runs: runs, func: func }, callback);
  });
};
