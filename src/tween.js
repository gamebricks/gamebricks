udefine(['bezier-easing', 'gameboard/loop'], function(BezierEasing, Loop) {

  var Tween = function() {
    this.target = null;
  };

  Tween.prototype.animate = function(property, end, time, easing) {
    var self = this;
    
    if (this.target && typeof this.target[property] === 'number') {
      var start = this.target[property];
      
      easing = easing || 'linear';

      var timer = Loop.createTimer();
      
      timer.interval = time;
      
      timer.on('tick', function(ticks) {
        var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
        
        self.target[property] = (end - start) * multiplicator;
      });
      
      timer.on('interval', function() {
        timer.stop();
      });

    }
  };

  return Tween;

});
