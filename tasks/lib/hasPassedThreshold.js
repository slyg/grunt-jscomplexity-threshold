module.exports = function hasPassedThreshold (scanReports){

  return scanReports.some(function(scanReport){
    return scanReport.isThresholdPassed;
  });

};