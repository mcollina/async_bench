var fs = require("fs");
var microtime = require("microtime");
var util = require("util");
var async = require("async");
var math = require("math");

module.exports = function runner(opts) {
  var setup = opts.setup;
  var bench = opts.bench;
  var teardown = opts.teardown;
  var runs = opts.runs;
  var complete = opts.complete;
  var preheat = opts.preheat || 0;
  var total = 0;
  var remainingRuns = runs;
  var results = [];

  var execute = function() {
    var pre = 0;
    var preFunc = function() {
      var array = Array.prototype.slice.apply(arguments);
      var callback = array.pop();
      array.unshift(null);
      pre = microtime.now();
      callback.apply(null, array);
    };
    
    var postFunc = function() {
      var post = microtime.now();
      var duration = post - pre;
      results.push(duration);

      var array = Array.prototype.slice.apply(arguments);
      var callback = array.pop();
      array.unshift(null);
      callback.apply(null, array);
    };
    
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
