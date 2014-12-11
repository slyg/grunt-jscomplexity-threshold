var _ = require('lodash');

var defaultOptions = {
  complexity      : 100,
  maintainability : 20,
  lineNumber      : 4000
};

module.exports = function markThresholds (options){

  // Merge task-specific and/or target-specific options with these default values.
  _.merge(defaultOptions, options);

  return function(reports){

    if (!_.isArray(reports)){
      throw new Error('no report array provided');
    }

    return reports.map(function(report){
      report.isThresholdPassed = (
        (+report.complexity > +defaultOptions.complexity) ||
        (+report.maintainability < +defaultOptions.maintainability) ||
        (+report.lineNumber > +defaultOptions.lineNumber)
      );
      return report;
    });

  };

};