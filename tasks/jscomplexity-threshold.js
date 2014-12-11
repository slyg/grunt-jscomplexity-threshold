/*
 * grunt-jscomplexity
 * https://github.com/slyg/grunt-jscomplexity
 *
 * Copyright (c) 2014 Sylvain Faucherand
 * Licensed under the MIT license.
 */

'use strict';

var analyse = require('jscomplexity').analyse;
var Promise = require('bluebird');
var _ = require('lodash');

var markThresholds = require('./util/markThresholds');
var render = require('./util/render');
var hasPassedThreshold = require('./util/hasPassedThreshold');

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

    var scans = [];

    // Iterate over all specified file groups,
    // create file list,
    // push analysis promises into an array
    this.files.forEach(function(f) {

      var targets = _.filter(grunt.file.expand(f.orig.src), function(path){
        return grunt.file.isFile(path);
      });

      targets.forEach(function(file){
        scans.push(analyse(file));
      });

    });

    // Once promises are resolved
    // output results
    Promise.all(scans)
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

};
