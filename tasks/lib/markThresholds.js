module.exports = function markThresholds (options){

  return function(reports){

    return reports.map(function(report){
      report.isThresholdPassed = (report.complexity > options.complexity);
      return report;
    });

  };

};