var _ = require('lodash');
var Reporter = require('./Reporter');

module.exports = function displayResults (scanReports){

  if (!_.isArray(scanReports)){
    throw new Error('Passed scanReports parameter is not an array');
  }

  var reporter = new Reporter();

  _.chain(scanReports)
    .sortBy('complexity').reverse()
    .each(function(scanReport){
      if (
        scanReport.path !== undefined &&
        scanReport.complexity !== undefined &&
        scanReport.isThresholdPassed !== undefined
      ) {
        reporter.add(scanReport.path, scanReport.complexity, scanReport.isThresholdPassed);
      }
    });

  return reporter.render();

};