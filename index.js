var fs = require("fs");
var microtime = require("microtime");
var util = require("util");
var async = require("async");
var math = require("./lib/math");
var funcUtils = require("./lib/func_utils");

module.exports = function runner(opts) {
  var setup = opts.setup || funcUtils.empty;
  var bench = opts.bench || funcUtils.empty;
  var teardown = opts.teardown || funcUtils.empty;
  var runs = opts.runs;
  var complete = opts.complete || funcUtils.empty;
  var preheat = opts.preheat || 0;
  var total = 0;
  var remainingRuns = runs;
  var results = [];

  var execute = function() {
    var pre = 0;
    var preFunc = funcUtils.wrap(function() {
      pre = microtime.now();
    });
    
    var postFunc = funcUtils.wrap(function() {
      var post = microtime.now();
      var duration = post - pre;
      results.push(duration);
    });
    
    async.waterfall([
      setup,
      preFunc,
      bench,
      postFunc,
      teardown
    ], function(err) {
      if(err) throw err;

      if(--remainingRuns === 0) {
        complete(math.calculate(results));
      } else {
        process.nextTick(execute);
      }
    });
  }
  execute();
}
