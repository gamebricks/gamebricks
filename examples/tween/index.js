var Gamebox = require('gamebox');
var {Tween} = Gamebox;

var timer = Loop.createTimer();

timer.interval = 1000;

timer.on('interval', function() {
  var child = document.createElement('div');
  child.style.color = 'red';
  child.innerHTML = 'Hello there';

  document.body.appendChild(child);
});

timer.start();

Loop.run();
