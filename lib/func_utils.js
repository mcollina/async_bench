
module.exports.wrap = function(func) {
  return function() {
    var array = Array.prototype.slice.apply(arguments);
    var callback = array.pop();
    func.apply(null, array);
    array.unshift(null);
    callback.apply(null, array);
  }
};

module.exports.empty = module.exports.wrap(function() {});

var always = function(a) { return a || module.exports.empty };

module.exports.buildPipe = function(opts, timer) {
  return [
    always(opts.setup),
    timer.start,
    always(opts.bench),
    timer.stop,
    always(opts.teardown)
  ];
};
