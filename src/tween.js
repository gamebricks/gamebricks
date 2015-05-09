'use strict';

import EventMap from 'eventmap';
import BezierEasing from 'bezier-easing';
import Loop from './loop';

class Tween extends EventMap {
  constructor() {
    this.target = null;
  }

  animate(property, end, time, easing) {
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

      timer.on('start', function () {
        self.trigger('start');
      });

      timer.start();

      timer.on('tick', function (ticks) {
        var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
        var points = (end - start) * multiplicator;

        if (points > end) {
          points = end;
        }

        self.target[property] = points;
        self.trigger('animate', points);
      });

      timer.on('interval', function () {
        timer.stop();
        self.target[property] = end;
        self.trigger('end');
      });

    }
  }
}

export default Tween;
