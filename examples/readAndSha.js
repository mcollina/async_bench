
var asyncbench = require("../");
var crypto = require("crypto");
var fs = require("fs");

asyncbench({
  runs: 10000,
  preHeat: 10000,
  bench: function(cb) { 
    var shasum = crypto.createHash('sha1');

    var s = fs.ReadStream(__filename);
    s.on('data', function(d) {
      shasum.update(d);
    });

    s.on('end', function() {
      var d = shasum.digest('hex');
      cb();
    });
    
    s.on("error", cb);
  },
  complete: function(err, results) {
    if (err)
      throw err;

    console.log(results);
  }
});

