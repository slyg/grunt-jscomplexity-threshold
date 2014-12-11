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
        'app/**',
        'test/**',
        '!test/fixtures/**'
      ],
      options : {
        complexity : 10,        // default 100
        maintainability : 50,   // default 20
        lineNumber : 300        // default 4000
      }
    },
    
    ...
        
  }
  
  ...
      
```

### Sample output

![alt tag](https://raw.github.com/slyg/grunt-jscomplexity-threshold/master/doc/screen-failing-report.png)
