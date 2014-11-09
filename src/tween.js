udefine(['eventmap', 'gameboard/bezier-easing', 'gameboard/loop'], function(EventMap, BezierEasing, Loop) {

  var Tween = function() {
    EventMap.mixin(this, Tween.prototype);
    
    this.target = null;
  };

  Tween.prototype.animate = function(property, end, time, easing) {
    var self = this;
    
    if (this.target && typeof this.target[property] === 'number') {
      var start = this.target[property];
      
      if (start === end) {
        this.trigger('start');
        this.trigger('end');
        return;
      }
      
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
        
        if (points > end) {
          points = end;
        }
        
        self.target[property] = points;
        self.trigger('animate', points);
      });
      
      timer.on('interval', function() {
        timer.stop();
        self.target[property] = end;
        self.trigger('end');
      });

    }
  };

  return Tween;

});
