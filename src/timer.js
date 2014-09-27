udefine(['mixedice', 'eventmap', 'performance'], function(mixedice, EventMap, performance) {

  var Timer = function(interval) {
    mixedice([this, Timer.prototype], new EventMap());
    
    var self = this;

    this.interval = interval || 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = function(currentTime) {
      if (!self.active || self.paused) {
        return;
      }
      
      if (interval <= 0) {
        return;
      }

      self.trigger('tick');

      if ((currentTime - self.startTime - self.interval) > oldTicks) {
        oldTicks = currentTime;
        self.trigger('interval');
      }
    };
  };

  Timer.prototype.start = function() {
    this.active = true;
    this.paused = false;

    this.startTime = performance.now();

    this.trigger('start');
  };

  Timer.prototype.pause = function() {
    this.paused = true;

    this.trigger('pause');
  };

  Timer.prototype.unpause = function() {
    this.paused = false;

    this.trigger('unpause');
  };

  Timer.prototype.stop = function() {
    this.paused = false;
    this.active = false;

    this.trigger('stop');
  };
  
  return Timer;

});
