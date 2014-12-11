# grunt-jscomplexity-threshold 

[![Build Status](https://travis-ci.org/slyg/grunt-jscomplexity-threshold.svg?branch=master)](https://travis-ci.org/slyg/grunt-jscomplexity-threshold)

This task is the grunt plugin port of [jscomplexity module](https://github.com/slyg/jscomplexity).

### Usage

`npm install grunt-jscomplexity-threshold --save-dev`

### Configuration

Tip : you can take a look at this repo's `Gruntfile.js`.

Example :

```javascript
...

  'jscomplexity-threshold': {
  
    all : {
      src : [
        'app/**/*.js',
        'test/**/*.js',
        '!test/fixtures/**'
      ],
      options : {
        
        quiet : true,         // display report (see screenshot), default false
      
        complexity : 10,      // default 100, lower is better
        maintainability : 50, // default 20, higher is better
        lineNumber : 300      // default 4000, lower is better
        
      }
    },
    
    ...
  }
  ...
  
```

### Sample output

![alt tag](https://raw.github.com/slyg/grunt-jscomplexity-threshold/master/doc/screen-failing-report.png)
