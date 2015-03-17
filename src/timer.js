'use strict';

import EventMap from 'eventmap';
import performance from 'performance';

class Timer extends EventMap {
  constructor(interval) {
    this.interval = interval || 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = (currentTime) => {
      if (!this.active || this.paused) {
        return;
      }

      if (interval <= 0) {
        return;
      }

      this.trigger('tick', currentTime);

      if ((currentTime - this.startTime - this.interval) > oldTicks) {
        oldTicks = currentTime;
        this.trigger('interval');
      }
    };
  }

  start() {
    this.active = true;
    this.paused = false;

    this.startTime = performance.now();

    this.trigger('start');
  }

  pause() {
    this.paused = true;

    this.trigger('pause');
  }

  unpause() {
    this.paused = false;

    this.trigger('unpause');
  }

  stop() {
    this.paused = false;
    this.active = false;

    this.trigger('stop');
  }
}

export default Timer;