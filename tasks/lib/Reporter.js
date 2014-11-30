var Table = require('cli-table');

function Reporter(){

  this.table = new Table({
    head: ['File'.white, 'Complexity'.white],
    colAligns : ['left', 'right'],
    colWidths: [100, 12],
    style : {
      compact : true,
      header: 'white'
    }
  });

  this.data = [];

}

Reporter.prototype.add = function(path, complexity, hasPassedThreshold){

  var outputColor = hasPassedThreshold ? 'red' : 'white';

  this.table.push([
    ((hasPassedThreshold ? '\u2718' : '\u2714') + '  ' + path)[outputColor],
    (''+complexity)[outputColor]
  ]);

};

Reporter.prototype.render = function(){
  return this.table.toString();
};

module.exports = Reporter;