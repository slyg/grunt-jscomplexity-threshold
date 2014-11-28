/*
 * grunt-jscomplexity
 * https://github.com/slyg/grunt-jscomplexity
 *
 * Copyright (c) 2014 Sylvain Faucherand
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    'jscomplexity-threshold': {

      passing : {
        src : [
          './tasks/',
          './tmp/'
        ],
        options : {
          complexity : 2000
        }
      },

      failing : {
        src : [
          './tasks/',
          './tmp/'
        ],
        options : {
          complexity : 1000
        }
      }

    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
