"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var requestAnimationFrame = require("animframe").requestAnimationFrame;

var EventMap = _interopRequire(require("eventmap"));

var performance = _interopRequire(require("performance"));

var Timer = _interopRequire(require("./timer"));

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
  var run = function run() {
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
  var stop = function stop() {
    isRunning = false;
  };

  var clear = function clear() {
    loopEvents.clear();
    pausedEvents = {};
  };

  var on = function on(taskName, taskFunction) {
    loopEvents.on(taskName, taskFunction);
    pausedEvents[taskName] = false;
  };

  var off = function off(taskName) {
    loopEvents.off(taskName);
    if (pausedEvents[taskName] != null) {
      delete pausedEvents[taskName];
    }
  };

  var pause = function pause(taskName) {
    pausedEvents[taskName] = true;
  };

  var resume = function resume(taskName) {
    if (taskName == null) {
      isRunning = true;
      return;
    }

    pausedEvents[taskName] = false;
  };

  var createTimer = function createTimer(interval) {
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

module.exports = Loop;