module.exports = function normalizeScans (scans){

  var allReports = [];

  scans
    .map(function(scan){
      return scan.report;
    })
    .forEach(function(reports){

      reports.forEach(function(report){
        allReports.push(report);
      });

    })
  ;

  return allReports;

};