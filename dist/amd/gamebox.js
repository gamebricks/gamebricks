define('gamebox/assetloader', ["exports", "module", "eventmap", "./log"], function (exports, module, _eventmap, _log) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var EventMap = _interopRequire(_eventmap);

  var Log = _interopRequire(_log);

  var audioTypes = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg"
  };

  var imageTypes = {
    png: "image/png",
    jpg: "image/jpg",
    gif: "image/gif"
  };

  var AssetLoader = (function (_EventMap) {
    function AssetLoader(assets) {
      _classCallCheck(this, AssetLoader);

      this.assets = assets || {};
      this.files = {};

      this.maxAssets = 0;
      this.assetsLoaded = 0;
      this.percentLoaded = 0;
      this.cache = {};
    }

    _inherits(AssetLoader, _EventMap);

    _createClass(AssetLoader, {
      start: {
        value: function start() {}
      }
    });

    return AssetLoader;
  })(EventMap);

  module.exports = AssetLoader;
});

// TODO: Something was wrong here. So it's deleted right now
define('gamebox/input', ["exports", "module", "eventmap", "./key"], function (exports, module, _eventmap, _key) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var EventMap = _interopRequire(_eventmap);

  var Key = _interopRequire(_key);

  var Input = {};

  Input.define = Key.define;
  Input.key = new EventMap();

  window.addEventListener("keydown", function (evt) {
    Input.key.trigger({
      name: "down",
      context: Key
    }, evt.keyCode);
  }, true);

  window.addEventListener("keyup", function (evt) {
    Input.key.trigger({
      name: "up",
      context: Key
    }, evt.keyCode);
  }, true);

  module.exports = Input;
});
define('gamebox/key', ["exports", "module"], function (exports, module) {
  "use strict";

  var Key = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    escape: 27,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    "delete": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    numpad0: 96,
    numpad1: 97,
    numpad2: 98,
    numpad3: 99,
    numpad4: 100,
    numpad5: 101,
    numpad6: 102,
    numpad7: 103,
    numpad8: 104,
    numpad9: 105,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    semiColon: 186,
    equalSign: 187,
    comma: 188,
    dash: 189,
    period: 190,
    forwardSlash: 191,
    openBracket: 219,
    backSlash: 220,
    closeBraket: 221,
    singleQuote: 222
  };

  Key.define = function (name, key) {
    if (name == null || key == null) {
      return;
    }

    if (!Object.hasOwnProperty.call(Key, name)) {
      if (typeof key === "function") {
        Object.defineProperty(Key, name, {
          get: key
        });
      } else {
        Key[name] = key;
      }
    }
  };

  module.exports = Key;
});
define('gamebox/lib', ["exports", "module", "./assetloader", "./input", "./loop", "./log", "./timer"], function (exports, module, _assetloader, _input, _loop, _log, _timer) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var AssetLoader = _interopRequire(_assetloader);

  var Input = _interopRequire(_input);

  var Loop = _interopRequire(_loop);

  var Log = _interopRequire(_log);

  var Timer = _interopRequire(_timer);

  module.exports = {
    AssetLoader: AssetLoader,
    Input: Input,
    Loop: Loop,
    Log: Log,
    Timer: Timer
  };
});
define('gamebox/log', ["exports", "module"], function (exports, module) {
  "use strict";

  /**
   * @class
   * @alias module:gameboard/log
   */
  var Log = (function () {

    var Log = {};

    Log.connector = null;

    Log.plugins = {};

    Log.plugins.console = {
      e: function e() {
        if (window.console && window.console.error) {
          return window.console.error.apply(window.console, arguments);
        }
      },
      w: function w() {
        if (window.console && window.console.warn) {
          return window.console.warn.apply(window.console, arguments);
        }
      },
      i: function i() {
        if (window.console && window.console.info) {
          return window.console.info.apply(window.console, arguments);
        }
      },
      d: function d() {
        if (window.console && window.console.log) {
          return window.console.log.apply(window.console, arguments);
        }
      },
      v: function v() {
        if (window.console && window.console.log) {
          return window.console.log.apply(window.console, arguments);
        }
      }
    };

    Log.connector = Log.plugins.console;

    Log.logLevelMap = {
      error: ["e"],
      warn: ["w", "e"],
      info: ["i", "w", "e"],
      debug: ["d", "i", "w", "e"],
      verbose: ["v", "d", "i", "w", "e"]
    };

    Log.logLevel = "verbose";

    var logFunctions = ["v", "d", "i", "w", "e"];

    for (var i = 0, j = logFunctions.length; i < j; i++) {

      (function (iterator) {
        Log[iterator] = function () {
          if (Log.logLevelMap[Log.logLevel].indexOf(iterator) >= 0) {
            Log.connector[iterator].apply(this, arguments);
          }
        };
      })(logFunctions[i]);
    }

    return Log;
  })();

  module.exports = Log;
});
define('gamebox/loop', ["exports", "module", "requestanimationframe", "eventmap", "performance", "./timer"], function (exports, module, _requestanimationframe, _eventmap, _performance, _timer) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var requestAnimationFrame = _interopRequire(_requestanimationframe);

  var EventMap = _interopRequire(_eventmap);

  var performance = _interopRequire(_performance);

  var Timer = _interopRequire(_timer);

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
});
define('gamebox/math/clamp', ["exports", "module"], function (exports, module) {
  "use strict";

  // TODO: Make this pretties and more ES6-like
  var clamp = function clamp(value, min, max) {
    var _ref, _ref1, _ref2;
    if (typeof value === "object") {
      _ref = value, min = _ref.min, max = _ref.max, value = _ref.value;
    }
    if (Array.isArray(min)) {
      _ref1 = min, min = _ref1[0], max = _ref1[1];
    }
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1;
    }
    if (min > max) {
      _ref2 = [max, min], min = _ref2[0], max = _ref2[1];
    }
    if (min <= value && value <= max) {
      return value;
    } else {
      if (value > max) {
        return max;
      } else {
        return min;
      }
    }
  };

  module.exports = clamp;
});
define('gamebox/math/inverselerp', ["exports", "module", "./lerp"], function (exports, module, _lerp) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var lerp = _interopRequire(_lerp);

  var inverseLerp = function inverseLerp(min, max, amt) {
    return max - lerp(min, max, amt);
  };

  module.exports = inverseLerp;
});
define('gamebox/math/lerp', ["exports", "module", "./clamp"], function (exports, module, _clamp) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var clamp = _interopRequire(_clamp);

  var lerp = function lerp(min, max, amt) {
    var tmpAmt = clamp(amt, 0, 1);
    var diff = Math.abs(max - min);

    if (diff === 0) {
      return min;
    } else {
      return min + diff * tmpAmt;
    }
  };

  module.exports = lerp;
});
define('gamebox/timer', ["exports", "module", "eventmap", "performance"], function (exports, module, _eventmap, _performance) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var EventMap = _interopRequire(_eventmap);

  var performance = _interopRequire(_performance);

  var Timer = (function (_EventMap) {
    function Timer(interval) {
      var _this = this;

      _classCallCheck(this, Timer);

      this.interval = interval || 1000;
      this.startTime = -1;

      this.active = false;
      this.paused = false;

      var oldTicks = 0;

      this.tick = function (currentTime) {
        if (!_this.active || _this.paused) {
          return;
        }

        if (interval <= 0) {
          return;
        }

        _this.trigger("tick", currentTime);

        if (currentTime - _this.startTime - _this.interval > oldTicks) {
          oldTicks = currentTime;
          _this.trigger("interval");
        }
      };
    }

    _inherits(Timer, _EventMap);

    _createClass(Timer, {
      start: {
        value: function start() {
          this.active = true;
          this.paused = false;

          this.startTime = performance.now();

          this.trigger("start");
        }
      },
      pause: {
        value: function pause() {
          this.paused = true;

          this.trigger("pause");
        }
      },
      unpause: {
        value: function unpause() {
          this.paused = false;

          this.trigger("unpause");
        }
      },
      stop: {
        value: function stop() {
          this.paused = false;
          this.active = false;

          this.trigger("stop");
        }
      }
    });

    return Timer;
  })(EventMap);

  module.exports = Timer;
});
define('gamebox/tween', ["exports", "module", "eventmap", "./bezier-easing", "./loop"], function (exports, module, _eventmap, _bezierEasing, _loop) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var EventMap = _interopRequire(_eventmap);

  var BezierEasing = _interopRequire(_bezierEasing);

  var Loop = _interopRequire(_loop);

  var Tween = (function (_EventMap) {
    function Tween() {
      _classCallCheck(this, Tween);

      this.target = null;
    }

    _inherits(Tween, _EventMap);

    _createClass(Tween, {
      animate: {
        value: function animate(property, end, time, easing) {
          var self = this;

          if (this.target && typeof this.target[property] === "number") {
            var start = this.target[property];

            if (start === end) {
              this.trigger("start");
              this.trigger("end");
              return;
            }

            easing = easing || "linear";

            var timer = Loop.createTimer();

            timer.interval = time;

            timer.on("start", function () {
              self.trigger("start");
            });

            timer.start();

            timer.on("tick", function (ticks) {
              var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
              var points = (end - start) * multiplicator;

              if (points > end) {
                points = end;
              }

              self.target[property] = points;
              self.trigger("animate", points);
            });

            timer.on("interval", function () {
              timer.stop();
              self.target[property] = end;
              self.trigger("end");
            });
          }
        }
      }
    });

    return Tween;
  })(EventMap);

  module.exports = Tween;
});