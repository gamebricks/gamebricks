'use strict';

import {requestAnimationFrame} from 'animframe';
import EventMap from 'eventmap';
import performance from 'performance';
import Timer from './timer';


var loopEvents = new EventMap();
var pausedEvents = {};
var timers = [];

/**
 * @class Loop
 * @static
 */
var Loop = (function () {

  var isRunning = true;

  /**
   * @method run
   */
  var run = function () {
    var time;

    (function loop() {
      requestAnimationFrame(loop);

      var now = performance.now();
      var dt = now - (time || now);

      time = now;

      if (!isRunning) {
        return;
      }

      timers.forEach(function (timer) {
        timer.tick(now);
      });

      var eventKeys = Object.keys(loopEvents.events.listeners);

      for (var i = 0, j = eventKeys.length; i < j; i++) {
        (function (key) {
          if (!pausedEvents[key]) {
            loopEvents.trigger(key, dt);
          }
        })(eventKeys[i]);
      }
    })();
  };

  /**
   * @method stop
   */
  var stop = function () {
    isRunning = false;
  };

  var clear = function () {
    loopEvents.clear();
    pausedEvents = {};
  };

  var on = function (taskName, taskFunction) {
    loopEvents.on(taskName, taskFunction);
    pausedEvents[taskName] = false;
  };

  var off = function (taskName) {
    loopEvents.off(taskName);
    if (pausedEvents[taskName] != null) {
      delete pausedEvents[taskName];
    }
  };

  var pause = function (taskName) {
    pausedEvents[taskName] = true;
  };

  var resume = function (taskName) {
    if (taskName == null) {
      isRunning = true;
      return;
    }

    pausedEvents[taskName] = false;
  };

  var createTimer = function (interval) {
    var timer = new Timer(interval);
    timers.push(timer);

    return timer;
  };


  return {
    run: run,

    stop: stop,
    clear: clear,

    on: on,
    off: off,

    pause: pause,
    resume: resume,

    createTimer: createTimer
  };
})();

export default Loop;