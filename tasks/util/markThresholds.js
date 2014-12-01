var _ = require('lodash');

module.exports = function markThresholds (options){

  var hasOptions = (options !== undefined);

  return function(reports){

    if (!_.isArray(reports)){
      throw new Error('no report array provided');
    }

    return reports.map(function(report){
      report.isThresholdPassed = hasOptions ? (report.complexity > options.complexity) : false;
      return report;
    });

  };

};