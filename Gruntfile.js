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
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    'jscomplexity-threshold': {
      passing : {
        src : [
          './tasks/',
          './test/fixtures'
        ],
        options : {
          complexity : 5
        }
      },
      failing : {
        src : [
          './tasks/',
          './test/fixtures'
        ],
        options : {
          complexity : 4
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
