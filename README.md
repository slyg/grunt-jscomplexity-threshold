# grunt-jscomplexity-threshold 

[![Build Status](https://travis-ci.org/slyg/grunt-jscomplexity-threshold.svg?branch=master)](https://travis-ci.org/slyg/grunt-jscomplexity-threshold)

This task is the grunt plugin port of [jscomplexity module](https://github.com/slyg/jscomplexity).

### Usage

Tip : you can take a look at this repo's `Gruntfile.js`.

```javascript

grunt.initConfig({

  'jscomplexity-threshold': {
  
      all : {
        src : [
          './tasks/',                           // /!\ src paths are not using glob,
          './test/fixtures'                     // use folders paths for now
        ],
        options : {
          complexity : 10,                      // complexity threshold
          skippedDirectories : ['skipped/']     // array of file path patterns to skip
        }
      },
      
      ...
      
  }

});
```

### Sample output

![alt tag](https://raw.github.com/slyg/grunt-jscomplexity-threshold/master/doc/screen-failing-report.png)
