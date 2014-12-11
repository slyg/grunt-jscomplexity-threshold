var Table = require('cli-table');

function Reporter(){

  this.table = new Table({
    head: ['File'.white, 'Complexity'.white, 'Maintainability'.white, 'Line number'.white],
    colAligns : ['left', 'right', 'right', 'right'],
    colWidths: [70, 12, 17, 13],
    style : {
      compact : true,
      header: 'white'
    }
  });

  this.data = [];

}

Reporter.prototype.add = function(path, complexity, maintainability, lineNumber, hasPassedThreshold){

  var outputColor = hasPassedThreshold ? 'red' : 'white';

  this.table.push([
    ((hasPassedThreshold ? '\u2718' : '\u2714') + '  ' + path)[outputColor],
    (''+complexity)[outputColor],
    (''+maintainability)[outputColor],
    (''+lineNumber)[outputColor]
  ]);

};

Reporter.prototype.render = function(){
  return this.table.toString();
};

module.exports = Reporter;