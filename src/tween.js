udefine(['mixedice', 'eventmap', 'gameboard/bezier-easing', 'gameboard/loop'], function(mixedice, EventMap, BezierEasing, Loop) {

  var Tween = function() {
    mixedice([this, Tween.prototype], new EventMap());
    
    this.target = null;
  };

  Tween.prototype.animate = function(property, end, time, easing) {
    var self = this;
    
    if (this.target && typeof this.target[property] === 'number') {
      var start = this.target[property];
      
      easing = easing || 'linear';

      var timer = Loop.createTimer();
      
      timer.interval = time;
      
      timer.on('start', function() {
        self.trigger('start');
      });
      
      timer.start();
      
      timer.on('tick', function(ticks) {
        var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
        var points = (end - start) * multiplicator;
        
        self.target[property] = points;
        self.trigger('animate', points);
      });
      
      timer.on('interval', function() {
        timer.stop();
        self.trigger('end');
      });

    }
  };

  return Tween;

});
