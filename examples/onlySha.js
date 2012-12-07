
var asyncbench = require("../");
var crypto = require("crypto");
var fs = require("fs");

asyncbench({
  runs: 10000,
  preHeat: 10000,
  setup: function(cb) {
    fs.readFile(__filename, cb);
  },
  bench: function(data, cb) { 
    var shasum = crypto.createHash('sha1');
    shasum.update(data);
    var d = shasum.digest('hex');
    cb();
  },
  complete: function(err, results) {
    if (err)
      throw err;

    console.log(results);
  }
});

