define('gamebox/assetloader', ['exports', 'module', 'eventmap', './log'], function (exports, module, _eventmap, _log) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _EventMap2 = _interopRequire(_eventmap);

  var _Log = _interopRequire(_log);

  'use strict';

  var audioTypes = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg'
  };

  var imageTypes = {
    'png': 'image/png',
    'jpg': 'image/jpg',
    'gif': 'image/gif'
  };

  var AssetLoader = (function (_EventMap) {
    function AssetLoader(assets) {
      _classCallCheck(this, AssetLoader);

      _get(Object.getPrototypeOf(AssetLoader.prototype), 'constructor', this).call(this);

      this.assets = assets || {};
      this.files = {};

      this.maxAssets = 0;
      this.assetsLoaded = 0;
      this.percentLoaded = 0;
      this.cache = {};
    }

    _inherits(AssetLoader, _EventMap);

    _createClass(AssetLoader, [{
      key: 'start',
      value: function start() {}
    }]);

    return AssetLoader;
  })(_EventMap2);

  module.exports = AssetLoader;
});

// TODO: Something was wrong here. So it's deleted right now
define('gamebox', ['exports', 'module', './assetloader', './input', './loop', './log', './timer', './math', './types'], function (exports, module, _assetloader, _input, _loop, _log, _timer, _math, _types) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _AssetLoader = _interopRequire(_assetloader);

  var _Input = _interopRequire(_input);

  var _Loop = _interopRequire(_loop);

  var _Log = _interopRequire(_log);

  var _Timer = _interopRequire(_timer);

  var _Math = _interopRequire(_math);

  var _Types = _interopRequire(_types);

  'use strict';

  module.exports = {
    AssetLoader: _AssetLoader,
    Input: _Input,
    Loop: _Loop,
    Log: _Log,
    Timer: _Timer,
    Math: _Math,
    Types: _Types
  };
});
define('gamebox/input', ['exports', 'module', 'eventmap', './key'], function (exports, module, _eventmap, _key) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _EventMap = _interopRequire(_eventmap);

  var _Key = _interopRequire(_key);

  'use strict';

  var Input = {};

  Input.Key = _Key;
  Input.define = _Key.define;

  // TODO: Find a different name
  Input.key = new _EventMap();

  window.addEventListener('keydown', function (evt) {
    Input.key.trigger({
      name: 'down',
      context: _Key
    }, evt.keyCode);
  }, true);

  window.addEventListener('keyup', function (evt) {
    Input.key.trigger({
      name: 'up',
      context: _Key
    }, evt.keyCode);
  }, true);

  module.exports = Input;
});
define('gamebox/key', ['exports', 'module'], function (exports, module) {
  'use strict';

  var Key = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'escape': 27,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'insert': 45,
    'delete': 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    'numpad0': 96,
    'numpad1': 97,
    'numpad2': 98,
    'numpad3': 99,
    'numpad4': 100,
    'numpad5': 101,
    'numpad6': 102,
    'numpad7': 103,
    'numpad8': 104,
    'numpad9': 105,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'semiColon': 186,
    'equalSign': 187,
    'comma': 188,
    'dash': 189,
    'period': 190,
    'forwardSlash': 191,
    'openBracket': 219,
    'backSlash': 220,
    'closeBraket': 221,
    'singleQuote': 222
  };

  Key.define = function (name, key) {
    if (name == null || key == null) {
      return;
    }

    if (!Object.hasOwnProperty.call(Key, name)) {
      if (typeof key === 'function') {
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
define('gamebox/log', ['exports', 'module'], function (exports, module) {
  'use strict';

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
      'error': ['e'],
      'warn': ['w', 'e'],
      'info': ['i', 'w', 'e'],
      'debug': ['d', 'i', 'w', 'e'],
      'verbose': ['v', 'd', 'i', 'w', 'e']
    };

    Log.logLevel = 'verbose';

    var logFunctions = ['v', 'd', 'i', 'w', 'e'];

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
define('gamebox/loop', ['exports', 'module', 'animframe', 'eventmap', './timer'], function (exports, module, _animframe, _eventmap, _timer) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _EventMap = _interopRequire(_eventmap);

  var _Timer = _interopRequire(_timer);

  'use strict';

  var loopEvents = new _EventMap();
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
        _animframe.requestAnimationFrame.call(window, loop);

        var now = _animframe.performance.now();
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
      var timer = new _Timer(interval);
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
define('gamebox/math/clamp', ['exports', 'module'], function (exports, module) {
  'use strict';

  function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

  var clamp = function clamp(value) {
    var min = arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments[2] === undefined ? 1 : arguments[2];

    if (min > max) {
      var _temp = [max, min];
      min = _temp[0];
      max = _temp[1];
      _temp;
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

  clamp.array = function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3);

    var value = _ref2[0];
    var min = _ref2[1];
    var max = _ref2[2];

    return clamp(value, min, max);
  };

  clamp.obj = function (_ref3) {
    var value = _ref3.value;
    var min = _ref3.min;
    var max = _ref3.max;

    return clamp(value, min, max);
  };

  module.exports = clamp;
});
define('gamebox/math', ['exports', 'module', './clamp', './lerp', './inverselerp'], function (exports, module, _clamp, _lerp, _inverselerp) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _clamp2 = _interopRequire(_clamp);

  var _lerp2 = _interopRequire(_lerp);

  var _inverseLerp = _interopRequire(_inverselerp);

  'use strict';

  module.exports = { clamp: _clamp2, lerp: _lerp2, inverseLerp: _inverseLerp };
});
define('gamebox/math/inverselerp', ['exports', 'module', './lerp'], function (exports, module, _lerp) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _lerp2 = _interopRequire(_lerp);

  'use strict';

  var inverseLerp = function inverseLerp(min, max, amt) {
    return max - _lerp2(min, max, amt);
  };

  module.exports = inverseLerp;
});
define('gamebox/math/lerp', ['exports', 'module', './clamp'], function (exports, module, _clamp) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _clamp2 = _interopRequire(_clamp);

  'use strict';

  var lerp = function lerp(min, max, amt) {
    var tmpAmt = _clamp2(amt, 0, 1);
    var diff = Math.abs(max - min);

    if (diff === 0) {
      return min;
    } else {
      return min + diff * tmpAmt;
    }
  };

  module.exports = lerp;
});
define('gamebox/timer', ['exports', 'module', 'eventmap', 'animframe'], function (exports, module, _eventmap, _animframe) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _EventMap2 = _interopRequire(_eventmap);

  'use strict';

  var Timer = (function (_EventMap) {
    function Timer(interval) {
      var _this2 = this;

      _classCallCheck(this, Timer);

      _get(Object.getPrototypeOf(Timer.prototype), 'constructor', this).call(this);

      this.interval = interval || 1000;
      this.startTime = -1;

      this.active = false;
      this.paused = false;

      var oldTicks = 0;

      this.tick = function (currentTime) {
        if (!_this2.active || _this2.paused) {
          return;
        }

        if (interval <= 0) {
          return;
        }

        _this2.trigger('tick', currentTime);

        if (currentTime - _this2.startTime - _this2.interval > oldTicks) {
          oldTicks = currentTime;
          _this2.trigger('interval');
        }
      };
    }

    _inherits(Timer, _EventMap);

    _createClass(Timer, [{
      key: 'start',
      value: function start() {
        this.active = true;
        this.paused = false;

        this.startTime = _animframe.performance.now();

        this.trigger('start');
      }
    }, {
      key: 'pause',
      value: function pause() {
        this.paused = true;

        this.trigger('pause');
      }
    }, {
      key: 'unpause',
      value: function unpause() {
        this.paused = false;

        this.trigger('unpause');
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.paused = false;
        this.active = false;

        this.trigger('stop');
      }
    }]);

    return Timer;
  })(_EventMap2);

  module.exports = Timer;
});
define('gamebox/tween', ['exports', 'module', 'eventmap', 'bezier-easing', './loop'], function (exports, module, _eventmap, _bezierEasing, _loop) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _EventMap2 = _interopRequire(_eventmap);

  var _BezierEasing = _interopRequire(_bezierEasing);

  var _Loop = _interopRequire(_loop);

  'use strict';

  var Tween = (function (_EventMap) {
    function Tween() {
      _classCallCheck(this, Tween);

      _get(Object.getPrototypeOf(Tween.prototype), 'constructor', this).call(this);

      this.target = null;
    }

    _inherits(Tween, _EventMap);

    _createClass(Tween, [{
      key: 'animate',
      value: function animate(property, end, time, easing) {
        var self = this;

        if (this.target && typeof this.target[property] === 'number') {
          var start = this.target[property];

          if (start === end) {
            this.trigger('start');
            this.trigger('end');
            return;
          }

          easing = easing || 'linear';

          var timer = _Loop.createTimer();

          timer.interval = time;

          timer.on('start', function () {
            self.trigger('start');
          });

          timer.start();

          timer.on('tick', function (ticks) {
            var multiplicator = _BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
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
    }]);

    return Tween;
  })(_EventMap2);

  module.exports = Tween;
});
define('gamebox/types/color', ['exports', 'module', '../math/clamp'], function (exports, module, _mathClamp) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _clamp = _interopRequire(_mathClamp);

  'use strict';

  // TODO: Provide color constants
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

    _createClass(Color, [{
      key: 'set',
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
    }, {
      key: 'lighten',
      value: function lighten(factor) {
        factor = _clamp(factor, 0, 1);

        this.r = _clamp(this.r + factor * 255 | 0, 0, 255);
        this.g = _clamp(this.g + factor * 255 | 0, 0, 255);
        this.b = _clamp(this.b + factor * 255 | 0, 0, 255);
      }
    }, {
      key: 'darken',
      value: function darken(factor) {
        factor = _clamp(factor, 0, 1);

        this.r = _clamp(this.r - factor * 255 | 0, 0, 255);
        this.g = _clamp(this.g - factor * 255 | 0, 0, 255);
        this.b = _clamp(this.b - factor * 255 | 0, 0, 255);
      }
    }, {
      key: 'fadeIn',
      value: function fadeIn(factor) {
        factor = _clamp(factor, 0, 1);

        this.a = this.a + this.a * factor;
        if (this.a > 1) {
          this.a = 1;
        }
      }
    }, {
      key: 'fadeOut',
      value: function fadeOut(factor) {
        factor = _clamp(factor, 0, 1);

        this.a = this.a - this.a * factor;
        if (this.a < 0) {
          this.a = 0;
        }
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        if (this.a < 1) {
          if (this.a === 0) {
            return 'transparent';
          } else {
            return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
          }
        } else {
          return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
        }
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.toJSON();
      }
    }, {
      key: 'toHex',
      value: function toHex() {
        return '#' + this.r.toString(16) + '' + this.g.toString(16) + '' + this.b.toString(16);
      }
    }], [{
      key: 'random',

      // Getting a random color for debugging is quite useful sometimes
      value: function random() {
        var col = [0, 0, 0];

        col = col.map(function () {
          return ~ ~(Math.random() * 255);
        });

        return new Color(col[0], col[1], col[2]);
      }
    }]);

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
define('gamebox/types', ['exports', './color', './vector2', './vector3', './rect'], function (exports, _color, _vector2, _vector3, _rect) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _Color = _interopRequire(_color);

  var _Vector2 = _interopRequire(_vector2);

  var _Vector3 = _interopRequire(_vector3);

  var _Rect = _interopRequire(_rect);

  'use strict';

  var Types = {};

  Types.Color = _Color;
  Types.Vector2 = _Vector2;
  Types.Vector3 = _Vector3;
  Types.Rect = _Rect;

  exports['default'] = Types;
  exports.Color = _Color;
  exports.Vector2 = _Vector2;
  exports.Vector3 = _Vector3;
  exports.Rect = _Rect;
});
define('gamebox/types/rect', ['exports', 'module', './vector2'], function (exports, module, _vector2) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Vector2 = _interopRequire(_vector2);

  'use strict';

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

    _createClass(Rect, [{
      key: 'clone',
      value: function clone() {
        return new Rect({ x: this.x, y: this.y, w: this.w, h: this.h });
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return { x: this.x, y: this.y, w: this.w, h: this.h };
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }, {
      key: 'center',
      value: function center() {
        return new _Vector2(this.x + this.w / 2, this.y + this.h / 2);
      }
    }, {
      key: 'contains',
      value: function contains(vector) {
        return vector.x >= this.x && vector.y >= this.y && vector.x < this.x + this.w && vector.y < this.y + this.h;
      }
    }], [{
      key: 'fromString',
      value: function fromString(str) {
        var obj = JSON.parse(str);

        return new Rect(obj.x, obj.y, obj.w, obj.h);
      }
    }]);

    return Rect;
  })();

  module.exports = Rect;
});
define('gamebox/types/vector2', ['exports', 'module'], function (exports, module) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    _createClass(Vector2, [{
      key: 'set',
      value: function set() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];

        this.x = x;
        this.y = y;
      }
    }, {
      key: 'magnitude',
      get: function () {
        return Math.sqrt(sqrMagnitude(this));
      }
    }, {
      key: 'sqrMagnitude',
      get: function () {
        return sqrMagnitude(this);
      }
    }, {
      key: 'angle',
      get: function () {
        return Math.atan2(this.x, this.y);
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.clone();
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vector2(this.x, this.y);
      }
    }, {
      key: 'add',
      value: function add(vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
      }
    }, {
      key: 'subtract',
      value: function subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
      }
    }, {
      key: 'multiply',
      value: function multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;

        return this;
      }
    }, {
      key: 'divide',
      value: function divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;

        return this;
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        this.x = this.x / this.magnitude;
        this.y = this.y / this.magnitude;

        return this;
      }
    }, {
      key: 'equals',
      value: function equals(v) {
        return this.x === v.x && this.y === v.y;
      }
    }], [{
      key: 'dot',
      value: function dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
      }
    }, {
      key: 'fromAngle',
      value: function fromAngle(angle, magnitude) {
        return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(obj) {
        return new Vector2(obj.x, obj.y);
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return Vector2.fromJSON(JSON.parse(str));
      }
    }]);

    return Vector2;
  })();

  module.exports = Vector2;
});
define('gamebox/types/vector3', ['exports', 'module'], function (exports, module) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    _createClass(Vector3, [{
      key: 'set',
      value: function set() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];
        var z = arguments[2] === undefined ? 0 : arguments[2];

        this.x = x;
        this.y = y;
        this.z = z;
      }
    }, {
      key: 'magnitude',
      get: function () {
        return Math.sqrt(sqrMagnitude(this));
      }
    }, {
      key: 'sqrMagnitude',
      get: function () {
        return sqrMagnitude(this);
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vector3(this.x, this.y, this.z);
      }
    }, {
      key: 'toJSON',
      value: function toJSON() {
        return this.clone();
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }, {
      key: 'add',
      value: function add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
      }
    }, {
      key: 'subtract',
      value: function subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;

        return this;
      }
    }, {
      key: 'multiply',
      value: function multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;

        return this;
      }
    }, {
      key: 'divide',
      value: function divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;

        return this;
      }
    }, {
      key: 'normalize',
      value: function normalize() {
        this.x = this.x / this.magnitude;
        this.y = this.y / this.magnitude;
        this.z = this.z / this.magnitude;

        return this;
      }
    }, {
      key: 'equals',
      value: function equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
      }
    }], [{
      key: 'dot',
      value: function dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
      }
    }, {
      key: 'cross',
      value: function cross(vec1, vec2) {
        return new Vector3(vec1.y * vec2.z - vec2.y * vec1.z, vec1.z * vec2.x - vec2.z * vec1.x, vec1.x * vec2.y - vec2.x * vec1.y);
      }
    }, {
      key: 'fromJSON',
      value: function fromJSON(obj) {
        return new Vector3(obj.x, obj.y, obj.z);
      }
    }, {
      key: 'fromString',
      value: function fromString(str) {
        return Vector3.fromJSON(JSON.parse(str));
      }
    }, {
      key: 'forward',
      value: function forward() {
        return new Vector3(0, 0, 1);
      }
    }, {
      key: 'right',
      value: function right() {
        return new Vector3(1, 0, 0);
      }
    }, {
      key: 'one',
      value: function one() {
        return new Vector3(1, 1, 1);
      }
    }, {
      key: 'up',
      value: function up() {
        return new Vector3(0, 1, 0);
      }
    }, {
      key: 'zero',
      value: function zero() {
        return new Vector3(0, 0, 0);
      }
    }]);

    return Vector3;
  })();

  module.exports = Vector3;
});