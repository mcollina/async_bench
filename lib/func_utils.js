
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
