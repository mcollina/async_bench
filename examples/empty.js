
var asyncbench = require("../");

asyncbench({
  runs: 10000,
  preHeat: 1000,
  setup: function(cb) {
    cb();
  },
  func: function(cb) { 
    console.log(arguments);
    cb(); 
  },
  complete: function(err, results) {
    if (err)
      throw err;

    console.log(results);
  }
});

