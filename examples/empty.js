
var asyncbench = require("../");

asyncbench({
  runs: 100000,
  preHeat: 10000,
  setup: function(cb) {
    cb();
  },
  bench: function(cb) { 
    cb(); 
  },
  complete: function(err, results) {
    if (err)
      throw err;

    console.log(results);
  }
});

