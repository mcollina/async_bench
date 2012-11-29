
function mean(array) {
  if(array.length == 0)
    return 0;

  return array.reduce(function(acc, e) {
    return acc + e;
  }) / array.length;
}

function standardDeviation(array) {
  var currentMean = mean(array);
  return Math.sqrt(mean(array.map(function(e) {
    return Math.pow(e - currentMean, 2);
  })));
}

function calculate(results) {
  return {
    mean: mean(results),
    standardDeviation: standardDeviation(results)
  }
}

module.exports.calculate = calculate;
module.exports.mean = mean;
module.exports.standardDeviation = standardDeviation;
