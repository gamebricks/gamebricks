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
define('gamebox', ["exports", "module", "./assetloader", "./input", "./loop", "./log", "./timer"], function (exports, module, _assetloader, _input, _loop, _log, _timer) {
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
define('gamebox/loop', ["exports", "module", "animframe", "eventmap", "performance", "./timer"], function (exports, module, _animframe, _eventmap, _performance, _timer) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var requestAnimationFrame = _animframe.requestAnimationFrame;

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
define('gamebox/timer', ["exports", "module", "eventmap", "animframe"], function (exports, module, _eventmap, _animframe) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var EventMap = _interopRequire(_eventmap);

  var performance = _animframe.performance;

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
define('gamebox/types/color', ["exports", "module", "../math/clamp"], function (exports, module, _mathClamp) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var clamp = _interopRequire(_mathClamp);

  //import colorConstants from 'flockn/constants/color';

  var Color = (function () {
    function Color() {
      var r = arguments[0] === undefined ? 0 : arguments[0];
      var g = arguments[1] === undefined ? 0 : arguments[1];
      var b = arguments[2] === undefined ? 0 : arguments[2];
      var a = arguments[3] === undefined ? 1 : arguments[3];

      _classCallCheck(this, Color);

      this.set(r, g, b, a);
    }

    _createClass(Color, {
      set: {
        value: function set() {
          var r = arguments[0] === undefined ? 0 : arguments[0];
          var g = arguments[1] === undefined ? 0 : arguments[1];
          var b = arguments[2] === undefined ? 0 : arguments[2];
          var a = arguments[3] === undefined ? 1 : arguments[3];

          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
        }
      },
      lighten: {
        value: function lighten(factor) {
          factor = clamp(factor, 0, 1);

          this.r = clamp(this.r + factor * 255 | 0, 0, 255);
          this.g = clamp(this.g + factor * 255 | 0, 0, 255);
          this.b = clamp(this.b + factor * 255 | 0, 0, 255);
        }
      },
      darken: {
        value: function darken(factor) {
          factor = clamp(factor, 0, 1);

          this.r = clamp(this.r - factor * 255 | 0, 0, 255);
          this.g = clamp(this.g - factor * 255 | 0, 0, 255);
          this.b = clamp(this.b - factor * 255 | 0, 0, 255);
        }
      },
      fadeIn: {
        value: function fadeIn(factor) {
          factor = clamp(factor, 0, 1);

          this.a = this.a + this.a * factor;
          if (this.a > 1) {
            this.a = 1;
          }
        }
      },
      fadeOut: {
        value: function fadeOut(factor) {
          factor = clamp(factor, 0, 1);

          this.a = this.a - this.a * factor;
          if (this.a < 0) {
            this.a = 0;
          }
        }
      },
      toJSON: {
        value: function toJSON() {
          if (this.a < 1) {
            if (this.a === 0) {
              return "transparent";
            } else {
              return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
            }
          } else {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
          }
        }
      },
      toString: {
        value: function toString() {
          return this.toJSON();
        }
      },
      toHex: {
        value: function toHex() {
          return "#" + this.r.toString(16) + "" + this.g.toString(16) + "" + this.b.toString(16);
        }
      }
    }, {
      random: {

        // Getting a random color for debugging is quite useful sometimes

        value: function random() {
          var col = [0, 0, 0];

          col = col.map(function () {
            return ~ ~(Math.random() * 255);
          });

          return new Color(col[0], col[1], col[2]);
        }
      }
    });

    return Color;
  })();

  /*for (var colorName in colorConstants) {
    var colorValue = colorConstants[colorName];
  
    (function(colorName, colorValue) {
      Color[colorName] = function() {
        var col = new Color(colorValue.r, colorValue.g, colorValue.b, colorValue.a);
        col.name = colorName;
        return col;
      };
    })(colorName, colorValue);
  }*/

  module.exports = Color;
});
define('gamebox/types', ["exports", "./color", "./vector2", "./vector3", "./rect"], function (exports, _color, _vector2, _vector3, _rect) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  "use strict";

  var Color = _interopRequire(_color);

  var Vector2 = _interopRequire(_vector2);

  var Vector3 = _interopRequire(_vector3);

  var Rect = _interopRequire(_rect);

  var Types = {};

  Types.Color = Color;
  Types.Vector2 = Vector2;
  Types.Vector3 = Vector3;
  Types.Rect = Rect;

  exports["default"] = Types;
  exports.Color = Color;
  exports.Vector2 = Vector2;
  exports.Vector3 = Vector3;
  exports.Rect = Rect;
});
define('gamebox/types/rect', ["exports", "module", "./vector2"], function (exports, module, _vector2) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Vector2 = _interopRequire(_vector2);

  var Rect = (function () {
    function Rect() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];
      var w = arguments[2] === undefined ? 0 : arguments[2];
      var h = arguments[3] === undefined ? 0 : arguments[3];

      _classCallCheck(this, Rect);

      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }

    _createClass(Rect, {
      clone: {
        value: function clone() {
          return new Rect({ x: this.x, y: this.y, w: this.w, h: this.h });
        }
      },
      toJSON: {
        value: function toJSON() {
          return { x: this.x, y: this.y, w: this.w, h: this.h };
        }
      },
      toString: {
        value: function toString() {
          return JSON.stringify(this.toJSON());
        }
      },
      center: {
        value: function center() {
          return new Vector2(this.x + this.w / 2, this.y + this.h / 2);
        }
      },
      contains: {
        value: function contains(vector) {
          return vector.x >= this.x && vector.y >= this.y && vector.x < this.x + this.w && vector.y < this.y + this.h;
        }
      }
    }, {
      fromString: {
        value: function fromString(str) {
          var obj = JSON.parse(str);

          return new Rect(obj.x, obj.y, obj.w, obj.h);
        }
      }
    });

    return Rect;
  })();

  module.exports = Rect;
});
define('gamebox/types/vector2', ["exports", "module"], function (exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var sqrMagnitude = function sqrMagnitude(v) {
    return Vector2.dot(v, v);
  };

  var Vector2 = (function () {
    function Vector2() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];

      _classCallCheck(this, Vector2);

      this.set(x, y);
    }

    _createClass(Vector2, {
      set: {
        value: function set() {
          var x = arguments[0] === undefined ? 0 : arguments[0];
          var y = arguments[1] === undefined ? 0 : arguments[1];

          this.x = x;
          this.y = y;
        }
      },
      magnitude: {
        get: function () {
          return Math.sqrt(sqrMagnitude(this));
        }
      },
      sqrMagnitude: {
        get: function () {
          return sqrMagnitude(this);
        }
      },
      angle: {
        get: function () {
          return Math.atan2(this.x, this.y);
        }
      },
      toJSON: {
        value: function toJSON() {
          return this.clone();
        }
      },
      toString: {
        value: function toString() {
          return JSON.stringify(this.toJSON());
        }
      },
      clone: {
        value: function clone() {
          return new Vector2(this.x, this.y);
        }
      },
      add: {
        value: function add(vector) {
          this.x += vector.x;
          this.y += vector.y;

          return this;
        }
      },
      subtract: {
        value: function subtract(vector) {
          this.x -= vector.x;
          this.y -= vector.y;

          return this;
        }
      },
      multiply: {
        value: function multiply(vector) {
          this.x *= vector.x;
          this.y *= vector.y;

          return this;
        }
      },
      divide: {
        value: function divide(vector) {
          this.x /= vector.x;
          this.y /= vector.y;

          return this;
        }
      },
      normalize: {
        value: function normalize() {
          this.x = this.x / this.magnitude;
          this.y = this.y / this.magnitude;

          return this;
        }
      },
      equals: {
        value: function equals(v) {
          return this.x === v.x && this.y === v.y;
        }
      }
    }, {
      dot: {
        value: function dot(vec1, vec2) {
          return vec1.x * vec2.x + vec1.y * vec2.y;
        }
      },
      fromAngle: {
        value: function fromAngle(angle, magnitude) {
          return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
        }
      },
      fromJSON: {
        value: function fromJSON(obj) {
          return new Vector2(obj.x, obj.y);
        }
      },
      fromString: {
        value: function fromString(str) {
          return Vector2.fromJSON(JSON.parse(str));
        }
      }
    });

    return Vector2;
  })();

  module.exports = Vector2;
});
define('gamebox/types/vector3', ["exports", "module"], function (exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var sqrMagnitude = function sqrMagnitude(v) {
    return Vector3.dot(v, v);
  };

  var Vector3 = (function () {
    function Vector3() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments[2] === undefined ? 0 : arguments[2];

      _classCallCheck(this, Vector3);

      this.set(x, y, z);
    }

    _createClass(Vector3, {
      set: {
        value: function set() {
          var x = arguments[0] === undefined ? 0 : arguments[0];
          var y = arguments[1] === undefined ? 0 : arguments[1];
          var z = arguments[2] === undefined ? 0 : arguments[2];

          this.x = x;
          this.y = y;
          this.z = z;
        }
      },
      magnitude: {
        get: function () {
          return Math.sqrt(sqrMagnitude(this));
        }
      },
      sqrMagnitude: {
        get: function () {
          return sqrMagnitude(this);
        }
      },
      clone: {
        value: function clone() {
          return new Vector3(this.x, this.y, this.z);
        }
      },
      toJSON: {
        value: function toJSON() {
          return this.clone();
        }
      },
      toString: {
        value: function toString() {
          return JSON.stringify(this.toJSON());
        }
      },
      add: {
        value: function add(vector) {
          this.x += vector.x;
          this.y += vector.y;
          this.z += vector.z;

          return this;
        }
      },
      subtract: {
        value: function subtract(vector) {
          this.x -= vector.x;
          this.y -= vector.y;
          this.z -= vector.z;

          return this;
        }
      },
      multiply: {
        value: function multiply(vector) {
          this.x *= vector.x;
          this.y *= vector.y;
          this.z *= vector.z;

          return this;
        }
      },
      divide: {
        value: function divide(vector) {
          this.x /= vector.x;
          this.y /= vector.y;
          this.z /= vector.z;

          return this;
        }
      },
      normalize: {
        value: function normalize() {
          this.x = this.x / this.magnitude;
          this.y = this.y / this.magnitude;
          this.z = this.z / this.magnitude;

          return this;
        }
      },
      equals: {
        value: function equals(v) {
          return this.x === v.x && this.y === v.y && this.z === v.z;
        }
      }
    }, {
      dot: {
        value: function dot(vec1, vec2) {
          return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
        }
      },
      cross: {
        value: function cross(vec1, vec2) {
          return new Vector3(vec1.y * vec2.z - vec2.y * vec1.z, vec1.z * vec2.x - vec2.z * vec1.x, vec1.x * vec2.y - vec2.x * vec1.y);
        }
      },
      fromJSON: {
        value: function fromJSON(obj) {
          return new Vector3(obj.x, obj.y, obj.z);
        }
      },
      fromString: {
        value: function fromString(str) {
          return Vector3.fromJSON(JSON.parse(str));
        }
      },
      forward: {
        value: function forward() {
          return new Vector3(0, 0, 1);
        }
      },
      right: {
        value: function right() {
          return new Vector3(1, 0, 0);
        }
      },
      one: {
        value: function one() {
          return new Vector3(1, 1, 1);
        }
      },
      up: {
        value: function up() {
          return new Vector3(0, 1, 0);
        }
      },
      zero: {
        value: function zero() {
          return new Vector3(0, 0, 0);
        }
      }
    });

    return Vector3;
  })();

  module.exports = Vector3;
});