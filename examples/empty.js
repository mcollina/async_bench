
var asyncbench = require("../");

asyncbench({
  runs: 10000,
  preHeat: 1000,
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

