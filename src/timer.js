udefine(['mixedice', 'eventmap', 'performance'], function(mixedice, EventMap, performance) {

  var Timer = function() {
    mixedice([this, Timer.prototype], new EventMap());

    this.interval = 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = function(currentTime) {
      if (!this.active || !this.paused) {
        return;
      }

      this.trigger('tick');

      if (currentTime - this.startTime) {
        
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

});
