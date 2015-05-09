var Gamebox = require('gamebox');
var {Loop} = Gamebox;

var timer = Loop.createTimer();

timer.interval = 1000;

timer.on('interval', function() {
  var child = document.createElement('div');
  child.innerHTML = 'Hello there';

  document.body.appendChild(child);
});

timer.start();

Loop.run();
