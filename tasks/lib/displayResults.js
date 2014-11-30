var _ = require('lodash');
var Reporter = require('./Reporter');

module.exports = function displayResults (scanReports){

  var reporter = new Reporter();

  _.chain(scanReports)
    .sortBy('complexity').reverse()
    .each(function(scanReport){
      reporter.add(scanReport.path, scanReport.complexity, scanReport.isThresholdPassed);
    });

  console.log(reporter.render());

};