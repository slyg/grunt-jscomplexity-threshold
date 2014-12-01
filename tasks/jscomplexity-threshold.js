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

var normalize = require('./lib/normalize');
var markThresholds = require('./lib/markThresholds');
var render = require('./lib/render');
var hasPassedThreshold = require('./lib/hasPassedThreshold');

module.exports = function(grunt) {

  grunt.registerMultiTask(
    'jscomplexity-threshold',
    'Simple javascript complexity threshold task',
    function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      complexity: 100
    });

    // This is async stuff
    var done = this.async();

    // Iterate over all specified file groups
    this.files.forEach(function(f) {

      var scans = [];

      f.orig.src.forEach(function(filepath) {
        scans.push(jscomplexity(filepath, options.skippedDirectories));
      });

      Promise.all(scans)
        .then(normalize)
        .then(markThresholds(options))
        .then(function(data){
          return Promise.join(
            hasPassedThreshold(data),
            render(data)
          );
        })
        .spread(function(isThresholdPassed, output){
          console.log(output);
          if (isThresholdPassed) {
            grunt.fail.warn(new Error('Complexity threshold passed'));
          }
        })
        .done(done)
      ;

    });

  });

};
