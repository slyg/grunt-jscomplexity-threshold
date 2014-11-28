/*
 * grunt-jscomplexity
 * https://github.com/slyg/grunt-jscomplexity
 *
 * Copyright (c) 2014 Sylvain Faucherand
 * Licensed under the MIT license.
 */

'use strict';

var jscomplexity = require('jscomplexity');
var Promise = require('bluebird');
var colors =

module.exports = function(grunt) {

  function computeThresholdsFromScans(options){

    return function(scans){

      var hasError = false;

      scans
        .map(function(result){
          return result.report;
        })
        .forEach(function(reports){

          reports.forEach(function(report){

            var isThresholdPassed = (report.complexity > options.complexity);

            if (isThresholdPassed){
              hasError = true;
            }

            var output = '%s %s'[isThresholdPassed ? 'red' : 'green'];

            grunt.log.writeln(output, report.path, report.complexity);

          });

        })
      ;

      return hasError;

    };

  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jscomplexity-threshold', 'Simple javascript complexity threshold task', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      complexity: 100
    });

    var done = this.async();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var scans = [];

      f.orig.src.forEach(function(filepath) {
        scans.push(jscomplexity(filepath));
      });

      Promise
        .all(scans)
        .then(computeThresholdsFromScans(options))
        .then(function(hasError){
          if (hasError) {
            throw new Error('Complexity threshold passed');
          }
        })
        .nodeify(done)
      ;

    });

  });

};
