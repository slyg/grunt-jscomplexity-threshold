var _ = require('lodash');

module.exports = function hasPassedThreshold (scanReports){

  if (!_.isArray(scanReports)){
    throw new Error('passed scanReports is not an array');
  }

  if (scanReports.length === 0) {
    return false;
  }

  return scanReports.some(function(scanReport){
    return scanReport.isThresholdPassed;
  });

};